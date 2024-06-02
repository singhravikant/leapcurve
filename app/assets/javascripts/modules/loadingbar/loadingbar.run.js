/**=========================================================
 * Module: LoadingbarRun
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .run(appRun);
    /* @ngInject */
    function appRun($rootScope, $timeout, cfpLoadingBar) {
      // Loading bar transition

      var latency;
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          $rootScope.app.showLoader=true;
          $('.loader').show();
          $('.loader-overlay').show();
         // if( document.querySelector('.app-container') ) // check if bar container exists
         //   latency = $timeout(function() {
         //     cfpLoadingBar.start();
         //   }, 50); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(latency);
            cfpLoadingBar.complete();
              $rootScope.app.showLoader=false;
              $('.loader').hide();
              $('.loader-overlay').hide();
          });
      });

    }
    appRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];

})();
