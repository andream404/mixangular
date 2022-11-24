'use strict';

angular.
  module('core.phone').
  factory('Phone', ['$resource',
    function ($resource: any) {
      return $resource('phones/:phoneId.json', {}, {
        query: {
          method: 'GET',
          params: { phoneId: 'phones' },
          isArray: true
        }
      });
    }
  ]);
