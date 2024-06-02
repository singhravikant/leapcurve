/**=========================================================
 * Module: LoadingBarConfig.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .config(loadingBarConfig);
    
    /* @ngInject */
    function loadingBarConfig(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.app-container';
    }
    loadingBarConfig.$inject = ['cfpLoadingBarProvider'];

})();

