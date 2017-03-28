'use strict';

let angular = require('angular');

import _ from 'lodash';

module.exports = angular.module('spinnaker.oracle.serverGroup.transformer', [])
  .factory('oraclebmcsServerGroupTransformer', function ($q) {

    function normalizeServerGroup(serverGroup) {
      return $q.when(serverGroup);
    }

    function convertServerGroupCommandToDeployConfiguration(base) {
      let command = _.defaults({backingData: [], viewState: []}, base);
      command.cloudProvider = 'oraclebmcs';
      return command;
    }

    return {
      convertServerGroupCommandToDeployConfiguration: convertServerGroupCommandToDeployConfiguration,
      normalizeServerGroup: normalizeServerGroup,
    };
  });
