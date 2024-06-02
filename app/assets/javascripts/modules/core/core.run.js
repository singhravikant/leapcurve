/**=========================================================
 * Module: ApplicationRun.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .run(appRun);


    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$localStorage',  'settings', 'browser'];
    function appRun($rootScope, $state, $stateParams, $localStorage,  settings, browser) {

      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $localStorage;


      settings.init();
      
      // add a classname to target different platforms form css
      var root = document.querySelector('html');
      root.className += ' ' + browser.platform;
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            //vm.headerMenuCollapsed = true;
            var requirLogin=toState.data.requireLogin;
            // if($localStorage["User"]==""&&requirLogin)
            // {
            //     event.preventDefault();
            //     //event.stopPropagation();
            //     $state.go('page.index');
            // }


        });
    }

})();

