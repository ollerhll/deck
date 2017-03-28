'use strict';

import {CLOUD_PROVIDER_REGISTRY} from 'core/cloudProvider/cloudProvider.registry';

let angular = require('angular');

let templates = require.context('./', true, /\.html$/);
templates.keys().forEach(function(key) {
  templates(key);
});

module.exports = angular.module('spinnaker.oraclebmcs', [
  CLOUD_PROVIDER_REGISTRY,
  require('./cache/cacheConfigurer.service.js'),
  // Server Groups
  require('./serverGroup/serverGroup.transformer.js'),
])
  .config(function (cloudProviderRegistryProvider) {
    cloudProviderRegistryProvider.registerProvider('oraclebmcs', {
      name: 'Oracle',
      cache: {
        configurer: 'oraclebmcsCacheConfigurer',
      },
      image: {
      },
      loadBalancer: {
      },
      serverGroup: {
        transformer: 'oraclebmcsServerGroupTransformer',
      },
      instance: {
      },
      securityGroup: {
      }
    });
  });
