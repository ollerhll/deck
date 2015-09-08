'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.serverGroup.configure.aws.awsServerGroupBasicSettingsSelector', [
    require('../../../serverGroups/configure/common/basicSettingsMixin.controller.js'),
    require('../../../region/regionSelectField.directive.js'),
    require('../../../account/accountSelectField.directive.js'),
    require('../../subnet/subnetSelectField.directive.js'),
  ])
  .directive('awsServerGroupBasicSettingsSelector', function() {
    return {
      restrict: 'E',
      scope: {
        command: '=',
        application: '=',
        hideClusterNamePreview: '=',
      },
      templateUrl: require('./serverGroupBasicSettingsDirective.html'),
      controller: 'ServerGroupBasicSettingsSelectorCtrl as basicSettingsCtrl',
    };
  })
  .controller('ServerGroupBasicSettingsSelectorCtrl', function($scope, $controller, RxService, imageReader, namingService, $modalStack, $state) {

    angular.extend(this, $controller('BasicSettingsMixin', {
      $scope: $scope,
      RxService: RxService,
      imageReader: imageReader,
      namingService: namingService,
      $modalStack: $modalStack,
      $state: $state,
    }));
  })
  .name;