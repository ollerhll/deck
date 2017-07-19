'use strict';

let angular = require('angular');

import {V2_MODAL_WIZARD_SERVICE} from 'core/modal/wizard/v2modalWizard.service';
import {ACCOUNT_SERVICE} from 'core/account/account.service';
import {LOAD_BALANCER_READ_SERVICE} from 'core/loadBalancer/loadBalancer.read.service';
import {LOAD_BALANCER_WRITE_SERVICE} from 'core/loadBalancer/loadBalancer.write.service';

module.exports = angular.module('spinnaker.oraclebmcs.loadBalancer.create.controller', [
  V2_MODAL_WIZARD_SERVICE,
  ACCOUNT_SERVICE,
  LOAD_BALANCER_WRITE_SERVICE,
  LOAD_BALANCER_READ_SERVICE,
  require('../loadBalancer.transformer.js'),
])
  .controller('oraclebmcsCreateLoadBalancerCtrl', function ($scope, $state, loadBalancer, isNew,
                                                            $uibModalInstance, accountService,
                                                            loadBalancerWriter,
                                                            taskMonitorBuilder,
                                                            oraclebmcsLoadBalancerTransformer, application) {

    const provider = 'oraclebmcs';

    var ctrl = this;

    $scope.isNew = isNew;

    $scope.pages = {
      properties: require('./createLoadBalancerProperties.html'),
    };

    $scope.state = {
      accountsLoaded: false,
    };

    this.updateName = function() {
      $scope.loadBalancer.name = this.getName();
    };

    this.getName = function() {
      let lb = $scope.loadBalancer;
      let lbName = [application.name, (lb.stack || ''), (lb.detail || '')].join('-');
      return _.trimEnd(lbName, '-');
    };

    function onApplicationRefresh() {
      // If the user has already closed the modal, do not navigate to the new details view
      if ($scope.$$destroyed) {
        return;
      }
      $uibModalInstance.close();
    }

    function onTaskComplete() {
      application.loadBalancers.refresh();
      application.loadBalancers.onNextRefresh($scope, onApplicationRefresh);
    }

    $scope.taskMonitor = taskMonitorBuilder.buildTaskMonitor({
      application: application,
      title: (isNew ? 'Creating ' : 'Updating ') + 'your load balancer',
      modalInstance: $uibModalInstance,
      onTaskComplete: onTaskComplete,
    });

    this.accountUpdated = function () {
      accountService.getRegionsForAccount($scope.loadBalancer.account).then(regions => {
        $scope.regions = regions;
      });
    };

    this.regionUpdated = function() {
      ctrl.updateName();
    };

    function loadAccounts() {
      accountService.listAccounts(provider).then(accounts => {
        $scope.accounts = accounts;
        $scope.state.accountsLoaded = true;
      });
    }

    function initializeController() {
      loadAccounts();
      $scope.loadBalancer = oraclebmcsLoadBalancerTransformer.constructNewLoadBalancerTemplate(application);
    }

    initializeController();

    ctrl.submit = function () {
      let descriptor = isNew ? 'Create' : 'Update';
      $scope.taskMonitor.submit(
        function() {
            let params = {
                cloudProvider: provider,
                appName: application.name,
                loadBalancerName: $scope.loadBalancer.name || 'my-loadbalancer'
          };
            return loadBalancerWriter.upsertLoadBalancer($scope.loadBalancer, application, descriptor, params);
        }
      );
    };

    this.cancel = function () {
      $uibModalInstance.dismiss();
    };
  });
