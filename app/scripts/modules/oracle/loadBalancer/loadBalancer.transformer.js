'use strict';

const angular = require('angular');

import {OracleBMCSProviderSettings} from '../oraclebmcs.settings';

module.exports = angular.module('spinnaker.oraclebmcs.loadBalancer.transformer', [])
  .factory('oraclebmcsLoadBalancerTransformer', function ($q) {
    function normalizeLoadBalancer(loadBalancer) {
      return $q.when(loadBalancer);
    }

    function constructNewLoadBalancerTemplate(application) {
      let defaultAccount = application.defaultCredentials.oraclembcs || OracleBMCSProviderSettings.defaults.account;
      return {
        account: defaultAccount
      };
    }

    return {
      normalizeLoadBalancer: normalizeLoadBalancer,
      constructNewLoadBalancerTemplate: constructNewLoadBalancerTemplate
    };
  });
