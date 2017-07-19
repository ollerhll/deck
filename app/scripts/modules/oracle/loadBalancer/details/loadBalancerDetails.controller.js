'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.oraclebmcs.loadBalancer.details.controller', [

])
  .controller('oraclebmcsLoadBalancerDetailsCtrl', function ($scope) {

    $scope.state = {
      loading: true
    };
  }
);
