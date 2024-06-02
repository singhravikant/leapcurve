/**=========================================================
 * Module: resetPasswordCtrl.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('naut')
        .controller('resetPasswordCtrl', resetPasswordCtrl);
    resetPasswordCtrl.$inject = ["$scope", '$state',"$localStorage", "toaster", "$http", "$location",'SweetAlert'];

    function resetPasswordCtrl($scope, $state, $localStorage, toaster, $http, $location,SweetAlert) {
        $scope.token = '';
        $scope.msg = "";
        $scope.isShowmsg = false;
        $scope.token = $location.search().token;
        if($scope.token.length >0){
            $scope.loader = true;
            $http({
                url: '/users/reset_password',
                method: 'post',
                data: {token:$scope.token}
            }).then(function success(response) {
                var data = response["data"];
                if(data["status"]==200 && data["msg"] == 'valid token'){
                    $scope.show_reset = true;
                    $scope.loader = false;
                    $scope.user_email = data["email"];
                }else{
                    $scope.show_reset = false;
                    $scope.loader = false;
                }
            },function error(response) {
                $scope.show_reset = false;
                $scope.loader = false;
            })
        }else{
            $scope.show_reset = false;
            $scope.loader = false;
        }

        $scope.reset_passwords = {
            new_password:'',
            confirm_password:''
        }
        $scope.user_reset_password = function(){
            $scope.msg = "";
            $scope.isShowmsg = false;
            if($scope.reset_passwords.new_password.length> 5){
                if($scope.reset_passwords.confirm_password.length> 5){
                    if($scope.reset_passwords.confirm_password == $scope.reset_passwords.new_password){
                        var params = {email:$scope.user_email,token:$scope.token,password:$scope.reset_passwords.new_password}

                        $http({
                            url: '/users/user_reset_password',
                            method: 'post',
                            data: params
                        }).then(function success(response) {
                            var data = response["data"];
                            if(data["status"]==200 && data["msg"] == 'reset successfully'){
                                toaster.pop("success","","password reset successfully, please login");

                                $scope.reset_passwords = {
                                    new_password:'',
                                    confirm_password:''
                                }
                                //$scope.msg = "Your Password has been successfully changed !";
                                //$scope.isShowmsg = true;
                                setInterval(function(){
                                    $state.go('page.index');
                                },3000);

                            }else if(data["status"]==200 && data["msg"] == 'old password matched'){
                                $scope.reset_passwords = {
                                    new_password:'',
                                    confirm_password:''
                                }
                                 toaster.pop("info","","please enter different password that you are not used");
                                //$scope.msg = "please enter different password that you are not used";
                                //$scope.isShowmsg = true;
                            }else if(data["status"]==200 && data["msg"] == 'invalid email'){
                                 toaster.pop("info","","invalid email id");
                                //$scope.msg = "invalid email id";
                                //$scope.isShowmsg = true;
                            }else if(data["status"]==200 && data["msg"] == 'invalid inputs'){
                                 toaster.pop("info","","invalid token or email id or password");
                                //$scope.msg = "invalid token or email id or password";
                                //$scope.isShowmsg = true;
                            }else{
                                 toaster.pop("info","","something went wrong try again later");
                                //$scope.msg = "something went wrong try again later";
                                //$scope.isShowmsg = true;
                            }
                        },function error(response) {

                        });
                    }
                    else{
                         toaster.pop("info","","new password and confirm password must be same");
                        //$scope.msg = "new password and confirm password must be same";
                        //$scope.isShowmsg = true;
                    }
                }else{
                     toaster.pop("info","","please fill confirm password of 6 character");
                    //$scope.msg = "please fill confirm password of 6 character";
                    //$scope.isShowmsg = true;
                }
            }else{
                //$scope.msg = "please fill new password of 6 character";
                //$scope.isShowmsg = true;
                 toaster.pop('alert',"please fill new password of 6 character");

            }

        }
    }
})();