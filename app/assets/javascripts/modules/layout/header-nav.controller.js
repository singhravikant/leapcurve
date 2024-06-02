/**=========================================================
 * Module: HeaderNavController
 * Controls the header navigation
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .controller('HeaderNavController', HeaderNavController);
    /* @ngInject */    
    function HeaderNavController($rootScope,$state,$scope,$localStorage,SweetAlert,$http) {
      var vm = this;
      vm.headerMenuCollapsed = true;
      vm.isShowDashBoard=true;
      vm.isLogin=false;
      vm.toggleHeaderMenu = function() {
      vm.headerMenuCollapsed = !vm.headerMenuCollapsed;
      };

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams)
      {
        vm.headerMenuCollapsed = true;
          if(toState["url"]=='/questions')
          {
              vm.isShowDashBoard=false;
          }
       else
        {
            vm.isShowDashBoard=true;


        }
      });
        if(angular.isUndefined($localStorage["User"]))
        {
            $localStorage["User"]='';
          //  $state.go('page.index');

        }
        else if($localStorage["User"].hasOwnProperty("Email")&& $localStorage["Email"]!='')
        {
           // $state.go('app.dashboard');
            vm.isLogin=true;
        }
    function isScoreCalculated () {
        if(angular.isUndefined($localStorage["User"]))
        {
            $localStorage["User"]='';
            $state.go('page.index');

        }
        else if($localStorage["User"].hasOwnProperty("Level")&& $localStorage["User"]["Level"]>0)
        {
            $state.go('app.dashboard');
            vm.isShowDashBoard=true;
        }

    }
        $rootScope.logout=function ()
        {
            //$localStorage["User"]='';
            var user={};
            if($localStorage["User"].hasOwnProperty('UserChoices'))
            {
                user=$localStorage["User"];
                if(user['UserChoices']!=null && user['UserChoices'].length>0)
                {
                    user['UserChoices']=user['UserChoices'];
                }

            }
          
            if(user.hasOwnProperty('UserChoices'))
            {
                var params = {data: user}
                $http({
                    url: '/users/updateUserInfo',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    var data = response["data"];
                    if (data["status"] == 200) {
                        if (data["msg"] == "sucessfully updated") {
                            $localStorage["User"] = '';
                            $localStorage["guestUser"] = '';
                            $state.go('page.index');
                        }
                        else {
                            toaster.pop('error', '', data["msg"]);
                            return;
                        }


                    }
                    else {
                        return;
                    }
                }, function error(response) {

                })
            }
            else {
                $localStorage["User"] = '';
                $localStorage["guestUser"] = '';
                $state.go('page.index');
            }




        }
    }
    HeaderNavController.$inject = ['$rootScope','$state','$scope','$localStorage','SweetAlert','$http'];

})();
