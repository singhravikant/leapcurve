(function()
{
    angular.module('naut').controller('BaseController',BaseController);
    BaseController.$inject=['$scope','$http','$localStorage','$state'];
    function BaseController($scope,$http,$localStorage,$state)
    {

        $scope.checkForUserLogin = function () {
            if(angular.isUndefined($localStorage["User"])){
                $localStorage["User"]='',
                    $state.go("app.index")
            }
            else if($localStorage["User"].hasOwnProperty('Email'))
            {
                $state.go('app.dashboard')
            }
        }

        $scope.logout=function () {
            $localStorage["User"]=''
            $scope.isLogin=true;
        }
    }
})();