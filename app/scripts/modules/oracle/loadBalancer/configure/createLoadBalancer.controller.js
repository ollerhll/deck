'use strict';

const angular = require('angular');

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
  .controller('oraclebmcsCreateLoadBalancerCtrl', function ($scope, $state, loadBalancer,
                                                            $uibModalInstance, accountService,
                                                            oraclebmcsLoadBalancerTransformer, application) {

    const provider = 'oraclebmcs';

    $scope.pages = {
      properties: require('./createLoadBalancerProperties.html'),
    };

    $scope.state = {
      accountsLoaded: false,
    };

    /** Loads all accounts async and updates the UI state */
    function loadAccounts() {
      accountService.listAccounts(provider).then(accounts => {
        $scope.accounts = accounts;
        $scope.state.accountsLoaded = true;
      });
    }

    /** Event handler that gets triggered when the account select control is changed */
    this.accountUpdated = function () {
      accountService.getRegionsForAccount($scope.loadBalancer.account).then(regions => {
        $scope.regions = regions;
      });
    };

    /** Bootstrap all data */
    function initializeController() {
      loadAccounts();

      $scope.loadBalancer = oraclebmcsLoadBalancerTransformer.constructNewLoadBalancerTemplate(application);
    }

    initializeController();

    this.cancel = function () {
      $uibModalInstance.dismiss();
    };
  });
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
  .controller('oraclebmcsCreateLoadBalancerCtrl', function ($scope, $state, loadBalancer,
                                                            $uibModalInstance, accountService,
                                                            oraclebmcsLoadBalancerTransformer, application) {

    const provider = 'oraclebmcs';

    $scope.pages = {
      properties: require('./createLoadBalancerProperties.html'),
    };

    $scope.state = {
      accountsLoaded: false,
    };

    /** Loads all accounts async and updates the UI state */
    function loadAccounts() {
      accountService.listAccounts(provider).then(accounts => {
        $scope.accounts = accounts;
        $scope.state.accountsLoaded = true;
      });
    }

    /** Event handler that gets triggered when the account select control is changed */
    this.accountUpdated = function () {
      accountService.getRegionsForAccount($scope.loadBalancer.account).then(regions => {
        $scope.regions = regions;
      });
    };

    /** Bootstrap all data */
    function initializeController() {
      loadAccounts();

      $scope.loadBalancer = oraclebmcsLoadBalancerTransformer.constructNewLoadBalancerTemplate(application);
    }

    initializeController();

    this.cancel = function () {
      $uibModalInstance.dismiss();
    };
  });
