/**
 * Created by Jyoti Jain on 10/20/2017.
 */

(function()
{
    angular.module('naut').controller('homeController',homeController);
    homeController.$inject=['$scope','$http','$localStorage','$state','$http'];
    function homeController($scope,$http,$localStorage,$state,$http)
    {
        $scope.Score="";
        if(angular.isUndefquined($localStorage["User"])){
            $localStorage["User"]='',
                $state.go("page.index")
        }
        else
        {
            if ($localStorage["User"]["Designation"]=="CUSTOMER CARE - CALL CENTRE")
            {
                $localStorage["User"]["Designation"]="CUSTOMER CARE   CALL CENTRE"
            }
            $scope.Score=$localStorage["User"]["Level"];

        }
        $scope.changeLevel=function()
        {
            $localStorage["User"]["Level"]=$scope.Score;
            alert("Level Updated");
        }
        function getLevel()
        {
            $http({
                url: '/qustioner/getMyLevel',
                method: 'post',
                data: {Score:$scope.Score}
            }).then(function success(response) {
                var data = response["data"];
                $scope.Score=data["level"];
            })
        }
        $scope.logout=function()
        {
            $localStorage["User"]="";
            $localStorage["guestUser"]="";


            $state.go('page.index');
        }

    }




})();
