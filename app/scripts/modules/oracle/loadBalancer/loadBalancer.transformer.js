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
<<<<<<< HEAD
        stack: '',
        detail: '',
        shape: '100Mbps',
        subnetIds: ["ocid1.subnet.oc1.phx.aaaaaaaafmp5uv5o6bmbmk6zrcb3sx4vngukcxklhblwfei2d2nb54pfmekq",
        "ocid1.subnet.oc1.phx.aaaaaaaampespb6ojinqvvv2vtgqg4g3njhrawolbwbv37gbziyi6u4i7bqa"],
=======
>>>>>>> Updates create lb
        credentials: OracleBMCSProviderSettings.defaults.account,
        region: OracleBMCSProviderSettings.defaults.region,
        healthCheck: {
          protocol: 'HTTP',
          port: 80,
        },
        listener: {
          port: 80,
          protocol: 'HTTP'
        }
      };
    }

    return {
      normalizeLoadBalancer: normalizeLoadBalancer,
      constructNewLoadBalancerTemplate: constructNewLoadBalancerTemplate
    };
  });
