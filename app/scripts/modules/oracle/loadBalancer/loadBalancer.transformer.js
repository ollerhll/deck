'use strict';

const angular = require('angular');

import {OracleBMCSProviderSettings} from '../oraclebmcs.settings';

module.exports = angular.module('spinnaker.oraclebmcs.loadBalancer.transformer', [])
  .factory('oraclebmcsLoadBalancerTransformer', function ($q) {

    function normalizeLoadBalancer(loadBalancer) {
      return $q.when(loadBalancer);
    }

    function constructNewLoadBalancerTemplate() {
      return {
        provider: 'oraclebmcs',
        credentials: OracleBMCSProviderSettings.defaults.account,
        region: OracleBMCSProviderSettings.defaults.region,
        healthCheckProtocol: 'HTTP',
        healthCheckPort: 80,
        healthCheckPath: '/',
        listeners: [
        ]
      };
    }

    return {
      normalizeLoadBalancer: normalizeLoadBalancer,
      constructNewLoadBalancerTemplate: constructNewLoadBalancerTemplate
    };
  });
