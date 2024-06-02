/**=========================================================
 * Module: ChangePersonalInfoCtrl.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('naut')
        .controller('ChangePersonalInfoCtrl', ChangePersonalInfoCtrl);
    ChangePersonalInfoCtrl.$inject = ["$scope", "$localStorage", "toaster", "$http"];

    function ChangePersonalInfoCtrl($scope, $localStorage, toaster, $http) {
        $scope.editableBasic = false;
        $scope.editableCompany = false;
        $scope.tabname = "";
        $scope.editbasic = function () {
            $scope.editableBasic = true;
        }
        $scope.revertbasic = function () {
            $scope.editableBasic = false;
        }
        $scope.editcompany = function () {
            $scope.editableCompany = true;
        }
        $scope.revertcompany = function () {
            $scope.editableCompany = false;
        }
        $scope.getUserInfo = function () {
            var params = {Email: $localStorage["User"]["Email"]}
            $http({
                url: '/users/getUserInfo',
                method: 'post',
                data: params
            }).then(function success(response) {
                $scope.userInfo = response.data.user
            })
        }
        $scope.updateUserInfo = function (type) {
            var params = {};

            if (type == 'basic') {
                if ($scope.userInfo.Name == undefined || $scope.userInfo.Name == "") {
                    toaster.pop('alert', "Please enter a valid name");
                    return false;
                }
                else if ($scope.userInfo.Contact == undefined || $scope.userInfo.Contact == "") {
                    toaster.pop('alert', "Please enter a valid Contact No");
                    return false;
                }
                else if ($scope.userInfo.Institute == undefined || $scope.userInfo.Institute == "") {
                    toaster.pop('alert', "Please enter Institute/University of highest education");
                    return false;
                }
                else if ($scope.userInfo.Education == "Select Highest Education") {
                    toaster.pop('alert', "Please Select your highest Qualification");
                    return false;
                }
                else if ($scope.userInfo.YOG == undefined || $scope.userInfo.YOG == "") {
                    toaster.pop('alert', "Please enter year of Graduation");
                    return false;
                }
                else {
                    params = {data: $scope.userInfo}
                    $http({
                        url: '/users/updateUserInfo',
                        method: 'post',
                        data: params
                    }).then(function success(response) {
                        console.log(response);
                        if (response.data.msg === "sucessfully updated") {
                            toaster.pop('success', 'Successfully Personal Information updated')
                            $scope.revertbasic();
                        }
                    })
                }
            } else if (type == 'company') {
                if ($scope.userInfo.Salary == undefined || $scope.userInfo.Salary == "") {
                    toaster.pop('alert', "Please enter a valid Salary");
                    return false;
                }

                else if ($scope.userInfo.Experience == "Years Of Experience") {
                    toaster.pop('alert', "Please Select your total working experience");
                    return false;
                }
                else if ($scope.userInfo.Designation == "Select Designation") {
                    toaster.pop('alert', "Select your Designation");
                    return false;
                }
                else if ($scope.userInfo.Industry == "Select Industry") {
                    toaster.pop('alert', "Select Industry");
                    return false;
                }
                else {
                    params = {data: $scope.userInfo}
                    $http({
                        url: '/users/updateUserInfo',
                        method: 'post',
                        data: params
                    }).then(function success(response) {
                        console.log(response);
                        if (response.data.msg === "sucessfully updated") {
                            toaster.pop('success', 'Successfully Personal Information updated')
                            $scope.revertcompany();
                        }
                    })
                }
            }
        }
        $scope.changeTab = function (id) {
            $scope.tabname = id;
        }
    }
})();