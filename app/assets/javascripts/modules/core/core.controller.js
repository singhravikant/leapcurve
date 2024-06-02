/**=========================================================
 * Module: CoreController.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .controller('CoreController', CoreController);

    /* @ngInject */
    function CoreController($rootScope,$http) {

      // Get title for each page
       $rootScope.record_log=function(info) {
           $http({
               url: '/corporate/record_log',
               method: 'post',
               data:{data:info}
           }).then(function success(response) {});

        }
      $rootScope.pageTitle = function() {
        return $rootScope.app.name + ' - ' + $rootScope.app.description;
      };

      // Cancel events from templates
      // ----------------------------------- 
      $rootScope.cancel = function($event){
        $event.preventDefault();
        $event.stopPropagation();
      };
    }
    CoreController.$inject = ['$rootScope','$http'];

})();
