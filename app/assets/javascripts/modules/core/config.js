/**=========================================================
 * Module: CoreConfig
 =========================================================*/
(function () {
  'use strict';

  angular
    .module('naut')
    .config(commonConfig)
    .config(lazyLoadConfig);

  // Common object accessibility
  commonConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide','$linkedInProvider'];
  function commonConfig($controllerProvider, $compileProvider, $filterProvider, $provide,$linkedInProvider)
  {

    var app = angular.module('naut');
    app.controller = $controllerProvider.register;
    app.directive  = $compileProvider.directive;
    app.filter     = $filterProvider.register;
    app.factory    = $provide.factory;
    app.service    = $provide.service;
    app.constant   = $provide.constant;
    app.value      = $provide.value;
      $linkedInProvider.set('appKey', '78nobwpt6cvxdt');
      $linkedInProvider.set('authorize', true);
      $linkedInProvider.set('scope', 'r_basicprofile r_emailaddress');
      //cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
      //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
  }

  // Lazy load configuration
  lazyLoadConfig.$inject = ['$ocLazyLoadProvider', 'VENDOR_ASSETS'];
  function lazyLoadConfig($ocLazyLoadProvider, VENDOR_ASSETS) {

    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: VENDOR_ASSETS.modules
    });

  }

})();


