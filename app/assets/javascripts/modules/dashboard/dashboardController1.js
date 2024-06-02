/**=========================================================
 * Module: DashboardController.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('naut')
        .controller('DashboardController1', DashboardController1);
    // Route.require('icons', 'toaster', 'animate');
    DashboardController1.$inject = ['$scope', '$localStorage', '$uibModal', '$stateParams', '$state', '$http', 'SweetAlert', '$linkedIn', '$rootScope','toaster']

  async  function DashboardController1($scope, $localStorage, $uibModal, $stateParams, $state, $http, SweetAlert, $linkedIn, $rootScope,toaster) {
        var vm = this;
        var  data= await  $http({
                url: '/admin/getDistnicValues',
                method: 'get',
                data: {}
            }).then(function success(response) {
                data = response['data'];
                return data;
            });

        vm.allFunction = data["allFunctions"];
        vm.Industries = data["allIndustry"];
        vm.Companies = data["allCompanies"];
        vm.Institute = data["allInstitute"];
        vm.degree = data["alldgree"];
        vm.userinfo = {email: "", password: ""};
        vm.showTopBar = true;
        $scope.load = function () {
            var w = $(window).height();
            $('#home1').css('height', w);
        }
        $scope.openmodal=function(src){
            document.getElementById('myModal').style.display='block'
            document.getElementById('showimg').src=src;
            setTimeout(function () {
                document.getElementById('close').style.display='block'
            },200)
        }
        $scope.closemodal=function(modal){
            document.getElementById(modal).style.display='none'
            document.getElementById('close').style.display='none'
        }
        $(document).ready(function () {



            if (location.hash == '#!/page/index#home3') {
                location.href = location.origin+'/#!/page/index';
                setTimeout(function () {
                    location.href = location.origin+'/#!/page/index#home3';
                    // document.getElementsByClassName('act')[2].click();
                    // window.scrollBy(0, $('#navbar').height());
                    toaster.pop('alert', "Please login to continue");
                    return;
                },1000)
                $scope.maped = {
                    "margin-top": "" + (-nav) + "px",
                    "position": "absolute",
                    "z-index": -1
                };
                // var div = $("#home3");
                // var offset = div.offset();
                // var a=$("#home3").scrollTop()
                // window.scrollBy(offset.left, (offset.top+$(window).height()));
            }

            $("#mycontact").click(function() {
                $('html, body').animate({
                    scrollTop: $("#myform").offset().top
                }, 200);
            });


            $('.new-nav  li a').click(function () {
                $('.new-nav  li a').removeClass("active");
                $(this).addClass("active");
            });





            $(document).ready(function () {
                $(document).on("scroll", onScroll);
                $('a[href^="#"]').on('click', function (e) {
                    e.preventDefault();
                    $(document).off("scroll");

                    $('a').each(function () {
                        $(this).removeClass('active');
                    })
                    $(this).addClass('active');

                    var target = this.hash,
                        menu = target;
                    var targ = $(target);
                    $('html, body').stop().animate({
                        'scrollTop': targ.offset().top+2
                    }, 500, 'swing', function () {
                        window.location.hash = target;
                        $(document).on("scroll", onScroll);
                    });
                });
            });

            var prevScroll = 0;
            function onScroll(event){
                var winHyt = $(window).height();
                var scrollPos = $(document).scrollTop();
                // if (scrollPos <= winHyt){
                //     if(prevScroll < scrollPos){
                //     //    going downword
                //
                //         $('#home').css({
                //             'transform': "translate3d(0, -" + (scrollPos*1.6) + "px,0)"
                //         })
                //     } else if(prevScroll > scrollPos){
                //     //    going upword
                //         $('#home').css({
                //             'transform': "translate3d(0, -" + (scrollPos*1.6) + "px,0)"
                //         })
                //     }
                //     prevScroll = scrollPos;
                // }
                // else{
                //     $('#home').css({
                //         'transform': "translate3d(0, -" + prevScroll + "px,0)"
                //     })
                // }

                // $('#links a').each(function () {
                //     // $(this).addClass('active');
                //     var currLink = $(this);
                //     var ref = currLink.attr("href").substring(14,20);
                //     var refElement = $(ref +'0');
                //     if ((ref.toString() != '#home2') && ((refElement.position().top - 80) <= scrollPos) && (((refElement.position().top - 80) + refElement.height()) > scrollPos)) {
                //         $('#links a').removeClass("active");
                //         currLink.addClass("active");
                //     }
                //     else if ((ref.toString() == '#home2') && ((refElement.position().top - 80) <= scrollPos) && (((refElement.position().top - 80) + ((refElement.height() + 80) * 3)) > scrollPos)) {
                //         $('#links a').removeClass("active");
                //         currLink.addClass("active");
                //     }
                //     else{
                //         currLink.removeClass("active");
                //     }
                // });

            }



            $(window).on('scroll', function () {
                var hT = $('#scroll-h1').offset().top,
                    hH = $('#scroll-h1').outerHeight(),
                    wH = $(window).height(),
                    wS = $(this).scrollTop();
                // console.log((hT - wH), wS);
                if (wS > (hT + (hH - wH))) {
                    $("#scroll-to").addClass("assess-animation");
                    $("#scroll-to").removeClass("opacity-assess");
                    $("#scroll-two").addClass("assess-animation2");
                    $("#scroll-two").removeClass("opacity-assess2");
                    $("#scroll-h1").addClass("assess-animation2");
                    $("#scroll-h1").removeClass("opacity-assess2");

                }
                else if (wS < (hT + (hH - wH))) {
                    $("#scroll-to").removeClass("assess-animation");
                    $("#scroll-to").addClass("opacity-assess");
                    $("#scroll-two").removeClass("assess-animation2");
                    $("#scroll-two").addClass("opacity-assess2");
                    $("#scroll-h1").removeClass("assess-animation2");
                    $("#scroll-h1").addClass("opacity-assess2");
                }
            });

            $(window).on('scroll', function () {
                var hT = $('#animation-comh1').offset().top,
                    hH = $('#animation-comh1').outerHeight(),
                    wH = $(window).height(),
                    wS = $(this).scrollTop();
                // console.log((hT - wH), wS);
                if (wS > (hT + (hH - wH))) {
                    $("#animation-comh1").addClass("assess-animation3");
                    $("#animation-compara").removeClass("opacity-assess");
                    $("#animation-compara").addClass("assess-animation-compare");
                    $("#animation-comh1").removeClass("opacity-assess");
                    $("#animation-combtn").addClass("assess-animation3");
                    $("#animation-combtn").removeClass("opacity-assess");
                    $("#animation-comimg").addClass("assess-animation-comparebtn");
                    $("#animation-comimg").removeClass("opacity-assess");


                }
                else if (wS < (hT + (hH - wH))) {
                    $("#animation-comh1").removeClass("assess-animation3");
                    $("#animation-comh1").addClass("opacity-assess");
                    $("#animation-compara").removeClass("assess-animation-compare");
                    $("#animation-compara").addClass("opacity-assess");
                    $("#animation-combtn").removeClass("assess-animation3");
                    $("#animation-combtn").addClass("opacity-assess");
                    $("#animation-comimg").removeClass("assess-animation-comparebtn");
                    $("#animation-comimg").addClass("opacity-assess");
                }
            });
        });


        $(window).on('scroll', function () {
            var hT = $('#scroll-explore-h').offset().top,
                hH = $('#scroll-explore-h').outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            // console.log((hT - wH), wS);
            if (wS > (hT + (hH - wH))) {

                $("#scroll-explore").addClass("assess-animation2");
                $("#scroll-explore-h").addClass("assess-animation2");
                $("#scroll-explore-img").addClass("assess-animation");
                $("#scroll-explore").removeClass("opacity-assess");
                $("#scroll-explore-h").removeClass("opacity-assess");
                $("#scroll-explore-img").removeClass("opacity-assess");


            }
            else if (wS < (hT + (hH - wH))) {

                $("#scroll-explore").removeClass("assess-animation2");
                $("#scroll-explore-h").removeClass("assess-animation2");
                $("#scroll-explore-img").removeClass("assess-animation");
                $("#scroll-explore").addClass("opacity-assess");
                $("#scroll-explore-h").addClass("opacity-assess");
                $("#scroll-explore-img").addClass("opacity-assess");

            }
        });


        $(window).on('scroll', function () {
            var hT = $('#corporate-h1-animate').offset().top,
                hH = $('#corporate-h1-animate').outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            // console.log((hT - wH), wS);
            if (wS > (hT + (hH - wH))) {

                $("#corporate-form-animate").addClass("assess-animation2");
                $("#corporate-h1-animate").addClass("assess-animation2");
                $("#corporate-div-animate").addClass("assess-animation");
                $("#corporate-form-animate").removeClass("opacity-assess");
                $("#corporate-h1-animate").removeClass("opacity-assess");
                $("#corporate-div-animate").removeClass("opacity-assess");


            }
            else if (wS < (hT + (hH - wH))) {

                $("#corporate-form-animate").removeClass("assess-animation2");
                $("#corporate-h1-animate").removeClass("assess-animation2");
                $("#corporate-div-animate").removeClass("assess-animation");
                $("#corporate-form-animate").addClass("opacity-assess");
                $("#corporate-h1-animate").addClass("opacity-assess");
                $("#corporate-div-animate").addClass("opacity-assess");

            }
        });
        $(window).scroll(function(e){
            var nav = $('#navbar').height();
            var height = $(window).height()-nav-2;

            if($(this).scrollTop() <= parseInt(height)){
                $('#add-border').css({'background': '#f2f6f9'});

            } else if ($(this).scrollTop() <=( height*2)){
                $('#add-border').css({'background': '#f7f7f9'});
            } else if($(this).scrollTop() <= parseInt(height*3)){
                $('#add-border').css({'background': '#fff7ea'});

            } else if($(this).scrollTop() <= parseInt(height*4)){
                $('#add-border').css({'background': '#fef5f6'});

            } else if($(this).scrollTop() <= parseInt(height*5)){
                $('#add-border').css({'background': '#f9fafc'});

            } else if($(this).scrollTop() <= parseInt(height*6)){
                $('#add-border').css({'background': '#fdfdfd'});

            }

        });

        // function changeHeight() {
        setInterval(function () {
            var width = $(window).height();
            var nav = $('#navbar').height();
            $(".resize").css({
                "height": width-nav,
                "max-height":width-nav,
            });
        }, 500)

// $scope.scroll=function () {
//     var width = $(window).height();
//     var nav = $('#navbar').height();
//     $(".resize").css({
//         "height": width,
//         "padding-top": 0
//     });
//
// }
//         // }
        // window.addEventListener('resize', changeHeight);
        // window.addEventListener('loadeddata', changeHeight);
//
        var nav = $('#navbar').height();

        $scope.maped1 = {
            "margin-top": "" + (+nav) + "px",
        };
        $scope.changeHeight = function () {
            var nav = $('#navbar').height();

            $scope.maped = {
                "margin-top": "" + (-nav) + "px",
                "position": "absolute",
                "z-index": -1
            };

        }

        $scope.advance = function () {
            document.getElementById("advance").style.display = 'block';
        }

        $scope.sort1 = function () {
            document.getElementById("advance").style.display = 'none';
        }


        if (angular.isUndefined($localStorage["User"])) {
            $localStorage["User"] = '',
                vm.isLogin = false;
        }
        else if (!$localStorage["User"].hasOwnProperty("Email")) {
            vm.isLogin = false;

        }
        else {
            vm.isLogin = true;
            $scope.username = $localStorage["User"]
            vm.userinfo["email"] = $localStorage["Email"];
            vm.userinfo["password"] = $localStorage["Password"];
        }

        $scope.logout = function () {
            $localStorage["User"] = "";
            $localStorage["guestUser"] = "";
            vm.isLogin = false;
            vm.userinfo = {email: "", password: ""};
            toaster.pop("info", "", " User successfully logged out.");
            $state.go('page.index');
        }
        vm.userLogin = function () {

            // vm.userinfo["isLogin"] = vm.isLogin
            if (vm.userinfo.email == undefined || vm.userinfo.email == "") {
                toaster.pop('alert', "Please enter a valid Email-ID");
                return;
            }

            if (vm.userinfo.password == undefined || vm.userinfo.password == "") {
                toaster.pop('alert', "Please enter a valid Password");
                return;
            }


            var params = {data: vm.userinfo}
            $http({
                url: '/users/Login_user',
                method: 'post',
                data: params
            }).then(function success(response) {
                var data = response["data"];
                if (data["status"] == 200) {
                    {
                        if (data["msg"] == "Successfully Logged In!") {
                            toaster.pop('success', '', data["msg"]);
                            $scope.username = $localStorage["User"] = data['username'];
                            vm.isLogin = true;
                            if (data['username']["Role"].length > 0) {
                                if (data['username']["Level"] > 0) {
                                    $state.go('app.briefreport')
                                }
                                else {
                                    SweetAlert.swal({
                                        title: "Questionnaire",
                                        text: "Please finish the questionnaire to view your Dashboard. ",
                                        type: "info",
                                        showCancelButton: true,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "Continue !",
                                        cancelButtonText: "Exit !",
                                        closeOnConfirm: false,
                                        closeOnCancel: false
                                    }, function (isConfirm) {
                                        if (isConfirm) {
                                            swal.close();
                                            $state.go('page.questions');

                                        } else {
                                            swal.close();

                                        }
                                    });

                                }
                            }
                            else {
                                // toaster.pop('info', '', "Please choose an option below.");
                                //vm.guestuserinfo['email']=data['username']['Email'];
                                //vm.guestuserinfo['password']=data['username']['Password'];
                                //var modalInstance=$uibModal.open({
                                //    templateUrl: "/assets/templates/SignUpForm.html",
                                //    controller: userUpdateCtrl,
                                //    size: "lg",
                                //    backdrop: 'static',
                                //    resolve:{'userInfo':function(){return vm.guestuserinfo} }
                                //});
                            }
                        }
                        else {
                            toaster.pop('info', '', data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
                    }

                }
                else {
                    toaster.pop('error', '', data["msg"]);
                    //*9+alert(data["msg"]);
                    return;
                }
            }, function error() {
            });

        }
        $scope.email = "";
        $scope.password = "";
        $scope.corporateLogin = function () {
            if ($scope.email != "" && $scope.password != "") {


                $http({
                    url: '/corporate/corporate_login',
                    method: 'post',
                    data: {"Password": $scope.password, "Email": $scope.email, "user_type": $scope.user_type?'recruiter':'' }
                }).then(function success(response) {
                    var status = response["data"]["status"];
                    var msg = response["data"]["msg"];

                    toaster.pop('alert', msg);
                    if (status == 200 && msg == 'Successfully Logged In') {

                        location.href = "/corporate/dashboard"
                    }


                }, function error() {
                });

            }
        }

        $scope.email = "";
        $scope.ForgetPass =async function () {
            // var istrue= await forgot_password()

            $rootScope.hide='show';
            if ($scope.email != "") {

                $http({
                    url: '/corporate/corporate_forgot_password',
                    method: 'post',
                    data: {"email": $scope.email}
                    // data: {"email": $scope.email, "user_type":istrue?'recruiter':'' }

                }).then(function success(response) {
                    $rootScope.hide='hide';
                    var status = response["data"]["status"];
                    var msg = response["data"]["msg"];
                    toaster.pop('alert', msg);
                    if (status == 200 && msg == 'Email Has Been Successfully Sent !') {
                        document.getElementById("advance").style.display = 'none';
                    }
                }, function error() {
                    $rootScope.hide='hide';
                });
            }
        }


        $scope.Username = "";
        $scope.Email = "";
        $scope.comment = "";
        $scope.Contact = function () {
            showloader();
            if ($scope.Username != "" && $scope.Email != "" && $scope.comment != "") {

                $http({
                    url: '/corporate/Contact',
                    method: 'post',
                    data: {"Username": $scope.Username, "Email": $scope.Email, "comment": $scope.comment}
                }).then(function success(response) {
                    var status = response["data"]["status"];
                    var msg = response["data"]["msg"];
                    toaster.pop('alert', msg);


                    if (status == 200 && msg == 'Request Successfully Send') {

                        $scope.Email = '';
                        $scope.Username = '';
                        $scope.comment = '';
                        // location.href = ""
                        hideloader();
                    }
                }, function error() {
                });
            }
        }


        $rootScope.showPopup = function (clickMode) {
            if ($localStorage["User"] == "") {
                SweetAlert.swal({
                    title: "Log In",
                    text: "Continue without logging in? ",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes ",
                    cancelButtonText: "No ",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (!isConfirm) {
                        swal.close();
                        //alert("Login User");
                        var modalInstance = $uibModal.open({
                            templateUrl: "/assets/templates/signUpPop.html",
                            controller: initialUserLogin,
                            size: "sm",
                            backdrop: 'static',
                            resolve: {
                                clickButton: function () {
                                    return clickMode;
                                }
                            }
                        });

                    }
                    else {
                        swal.close();
                        //alert("Without Login User");
                        if (!angular.isUndefined($localStorage["User"])) {
                            $localStorage["User"] = '',
                                vm.isLogin = false;
                        }
                        vm.guestuserinfo["email"] = "";
                        vm.guestuserinfo["password"] = "";
                        vm.guestuserinfo["clickMode"] = clickMode;
                        var modalInstance = $uibModal.open({
                            templateUrl: "/assets/templates/SignUpForm.html",
                            controller: userSignUpCtrl,
                            size: "lg",
                            backdrop: 'static',
                            resolve: {
                                'userInfo': function () {
                                    return vm.guestuserinfo
                                }
                            }
                        });
                    }
                });

            } else {
                $localStorage["User"]["clickMode"] = clickMode;
                vm.guestuserinfo["email"] = $localStorage["User"]["Email"];
                vm.guestuserinfo["password"] = $localStorage["User"]["Password"];
                vm.guestuserinfo["clickMode"] = clickMode;

                var modalInstance = $uibModal.open({
                    templateUrl: "/assets/templates/SignUpForm.html",
                    controller: userUpdateCtrl,
                    size: "lg",
                    backdrop: 'static',
                    resolve: {
                        'userInfo': function () {
                            return $localStorage["User"]
                        }
                    }
                });
            }

        }
        vm.guestuserinfo = {email: "", password: "", clickMode: ""};

        $scope.openSignUp = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/signUpPop.html",
                controller: initialUserLogin,
                size: "sm",
                backdrop: 'static',
                resolve: {
                    clickButton: function () {
                        return "";
                    }
                }
            });

        }

        function initialUserLogin($scope, $uibModalInstance, toaster, $http, clickButton ,$rootScope) {

            $scope.showSignUp = true;
            $scope.changeForm = function () {
                if ($scope.showSignUp) {
                    $scope.showSignUp = false;
                } else {
                    $scope.showSignUp = true;
                }
            }
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.newuser = {
                "Name": "guestUser",
                "Email": "",
                "Contact": "",
                "Password": "",
                "Score": 0
                , "Salary": "Annual Salary (INR Lakhs)"
                , "Role": undefined,
                "Education": "",
                "Company": undefined,
                "Experience": "Years Of Experience",
                "Designation": "",
                "Industry": undefined,
                "Institute": "",
                "Level": 0,
                "CompanyDetails": [],
                "UserChoices": [],
                "Preference": [],
                ClickMode: ""
            };

            $scope.sign_up_user = function () {
                var user = $scope.newuser;
                if (user.Email != "" && user.Password != "") {
                    if (user.Email == undefined || user.Email == "") {
                        toaster.pop('alert', "Please enter a valid Email-ID");
                        return;
                    }

                    if (user.Password == undefined || user.Password == "") {
                        toaster.pop('alert', "Please enter a valid Password");
                        return;
                    }
                    user["isLogin"] = true;
                    var params = {data: user}
                    $http({
                        url: '/users/sign_up_initial',
                        method: 'post',
                        data: params
                    }).then(function success(response) {
                        var data = response["data"];
                        if (data["status"] == 200) {
                            if (data["msg"] == "Successfully Signed Up!") {


                                // alert(data["msg"]);
                                $scope.username = $localStorage["User"] = data["username"];
                                vm.userinfo['email'] = $localStorage["User"]["Email"];
                                vm.isLogin = true;
                                vm.guestuserinfo["Email"] = user["Email"];
                                vm.guestuserinfo["Password"] = user["Password"];
                                vm.guestuserinfo["clickMode"] = clickButton;
                                $localStorage["User"]["ClickMode"] = clickButton;
                                $uibModalInstance.close();
                                $rootScope.showPopup('AM')
                                if (clickButton == "") {

                                    // toaster.pop('success', '', data["msg"] + " Please Choose an option below.");
                                }
                                else {
                                    toaster.pop('success', '', data["msg"]);
                                    var modalInstance = $uibModal.open({
                                        templateUrl: "/assets/templates/SignUpForm.html",
                                        controller: userUpdateCtrl,
                                        size: "lg",
                                        backdrop: 'static',
                                        resolve: {
                                            'userInfo': function () {
                                                return vm.guestuserinfo
                                            }
                                        }
                                    });

                                }

                                // $state.go('app.getStarted')
                            }
                            else {
                                toaster.pop('info', '', data["msg"]);
                                $uibModalInstance.close();
                                return;
                            }
                        }
                        else {
                            toaster.pop('error', '', data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
                    }, function error(response) {

                    })
                }
                else {
                    for (var basic = 0; basic < $scope.basicInfo.length; basic++) {
                        user.Education = user.Education + $scope.basicInfo[basic]["Education"] + ","
                        user.Institute = user.Institute + $scope.basicInfo[basic]["Company"] + ","
                    }
                    $localStorage["guestUser"] = user;
                    $localStorage["guestUser"]["isNew"] = true;
                    $uibModalInstance.close();
                    vm.gotoGetstart();
                }

            }
            $scope.login = function () {
                var user = $scope.newuser;
                if (user.Email != "" && user.Password != "") {
                    if (user.Email == undefined || user.Email == "") {
                        toaster.pop('alert', "Please enter a valid Email-ID");
                        return;
                    }

                    if (user.Password == undefined || user.Password == "") {
                        toaster.pop('alert', "Please enter a valid Password");
                        return;
                    }
                    vm.userinfo["email"] = user.Email;
                    vm.userinfo["password"] = user.Password;
                    vm.userLogin();
                    $uibModalInstance.close();
                }

            }
            $scope.linkedinLogin = function () {
                $uibModalInstance.close();
                vm.guestuserinfo["email"] = $scope.newuser["Email"];
                vm.linkedinLogin();

            }
        }

        initialUserLogin.$inject = ["$scope", "$uibModalInstance", "toaster", '$http', 'clickButton','$rootScope'];
        $rootScope.forgetPassword = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/forgetPassword.html",
                controller: getEmailPassword,
                size: "sm",
                backdrop: 'static'
            });

        }
        $rootScope.hide='hide';
        function getEmailPassword($scope, $uibModalInstance, toaster, $http) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.loginuser = {
                "Email": ""
            }
            $scope.get_email = function () {
                $rootScope.hide='show';
                $uibModalInstance.close();
                var user = $scope.loginuser;
                if (user.Email == undefined || user.Email == "") {
                    toaster.pop('alert', "Please enter a valid Email-ID");
                    $rootScope.hide='hide';
                    return;
                }
                var params = {data: user}
                $http({
                    url: '/users/user_forgot_password',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    var data = response["data"];
                    if (data["status"] == 200) {
                        $rootScope.hide='hide';
                        toaster.pop('info', '', data["msg"]);
                        $uibModalInstance.close();
                    }


                }, function error(response) {
                    $rootScope.hide='hide';
                })
            }
        }

        getEmailPassword.$inject = ["$scope", "$uibModalInstance", "toaster", '$http'];


        vm.openForm = function () {
            if (angular.isUndefined($localStorage["User"])) {
                $localStorage["User"] = '',
                    vm.isLogin = false;
            }
            else if ($localStorage["User"] == '') {
                vm.isLogin = false;

            }
            guestUserLogin("", "Mylestones");

        };

        function guestUserLogin(email, from) {
            if (from == 'Mylestones') {
                if (vm.guestuserinfo.email == undefined || vm.guestuserinfo.email == "") {
                    toaster.pop('alert', "Please enter a valid Email-ID");
                    return;
                }

                if (vm.guestuserinfo.password == undefined || vm.guestuserinfo.password == "") {
                    toaster.pop('alert', "Please enter a valid Password");
                    return;
                }

                var modalInstance = $uibModal.open({
                    templateUrl: "/assets/templates/SignUpForm.html",
                    controller: userSignUpCtrl,
                    size: "lg",
                    backdrop: 'static',
                    resolve: {
                        'userInfo': function () {
                            return vm.guestuserinfo
                        }
                    }
                });

            }
            else if (from == 'linkedIn') {
                vm.guestuserinfo["email"] = email;
                vm.guestuserinfo["password"] = email;
                var params = {data: {Email: email, Password: email, checkUserExist: true}};
                $http({
                    url: '/users/sign_up_initial',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    var data = response["data"];
                    if (data["status"] == 200) {
                        if (data["msg"] == "Successfully Signed Up!") {
                            vm.isLogin = true;
                            var modalInstance = $uibModal.open({
                                templateUrl: "/assets/templates/SignUpForm.html",
                                controller: userUpdateCtrl,
                                size: "lg",
                                backdrop: 'static',
                                resolve: {
                                    'userInfo': function () {
                                        return vm.guestuserinfo
                                    }
                                }
                            });
                        }
                        else {
                            toaster.pop('info', '', data["msg"]);
                            vm.guestuserinfo["email"] = "";
                            vm.guestuserinfo["password"] = "";
                            // alert(data["msg"]);
                            return;
                        }

                    }
                    else {
                        toaster.pop('error', '', data["msg"]);
                        // alert(data["msg"]);
                        return;
                    }
                }, function error(response) {

                })

            }

        }

        vm.getLinkedInData = function () {
            alert("get data from lined in");
        }
        vm.linkedinLogin = function () {
            var userAuthorize = false;
            var promise = $linkedIn.isAuthorized();
            promise.then(function (response) {

                userAuthorize = response;
                if (userAuthorize) {

                    var promise = $linkedIn.profile('me', 'firstName,lastName,emailAddress', {});
                    promise.then(function (response) {
                        guestUserLogin(response["values"][0]["emailAddress"], "linkedIn");
                    }, function (reason) {
                        alert('Failed: ' + reason);
                    });

                }
                else {
                    var promise = $linkedIn.authorize();
                    promise.then(function (response) {
                        var promise = $linkedIn.profile('me', 'firstName,lastName,emailAddress', {});
                        promise.then(function (response) {
                            guestUserLogin(response["values"][0]["emailAddress"], "linkedIn");
                        }, function (reason) {
                            alert('Failed: ' + reason);
                        });
                    }, function (reason) {
                        alert('Failed: ' + reason);
                    });


                }

            }, function (reason) {
                alert('Failed: ' + reason);
            });


            // var i=0;

        }
        vm.gotoGetstart = function () {
            // $state.go('app.getStarted', {});
            $state.go('page.questions', {});


        }

        function userSignUpCtrl($scope, $uibModalInstance, toaster, $http, userInfo, $state, $rootScope) {

            $scope.industries = [];
            $scope.Companies = vm.Companies;
            $scope.institutes = vm.Institute;
            $scope.degree = vm.degree;
            $scope.functions = [];


            for (var i = 0; i <= vm.allFunction.length - 1; i++) {
                var allIndustry = {};
                allIndustry["Name"] = vm.allFunction[i];
                $scope.functions.push(allIndustry);
            }
            for (var i = 0; i <= vm.Industries.length - 1; i++) {
                var allIndustry = {};
                allIndustry["Name"] = vm.Industries[i];
                $scope.industries.push(allIndustry);
            }
            // for(var i=0;i<vm.Companies.length-1;i++)
            // {
            //     var allIndustry={};
            //     allIndustry["Name"]=vm.Companies[i];
            //     $scope.institutes.push(allIndustry);
            // }

            // vm.isLogin=true;
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.changeview = function () {
                if (vm.isLogin) {
                    vm.isLogin = false;
                }
                else {
                    vm.isLogin = true;
                }

            }
            $scope.basicInfo = [{Education: "", Company: "", id: 0}];

            $scope.deleteBasicInfo = function (index) {
                if ($scope.basicInfo.length > 1) {
                    $scope.basicInfo.splice(index, 1);
                } else {
                    toaster.pop("can't delete last row of information");
                }
            }
            $scope.addBasicinfo = function (index) {
                if ($scope.basicInfo.length < 3) {
                    $scope.basicInfo.push({Education: "", Company: "", id: index + 1});
                }
                else {
                    toaster.pop('info', "", "Maximum value reached.")
                }

            }
            $scope.userInfo = {
                "Name": "guestUser",
                "Email": userInfo["email"],
                "Contact": "",
                "Password": userInfo["password"],
                "Score": 0
                , "Salary": "Annual Salary (INR Lakhs)"
                , "Role": undefined,
                "Education": "",
                "Company": undefined,
                "Experience": "Years Of Experience",
                "Designation": "",
                "Industry": undefined,
                "Institute": "",
                "CompanyDetails": [],
                "UserChoices": [],
                "Preference": []
                , ClickMode: userInfo["clickMode"]
            };
            $scope.sign_up_user = function () {

                // var user=$scope.userInfo;

                var user = $scope.userInfo;
                if (user.Email != "" && user.Password != "") {
                    if (user.Email == undefined || user.Email == "") {
                        toaster.pop('alert', "Please enter a valid Email-ID");
                        return;
                    }

                    if (user.Password == undefined || user.Password == "") {
                        toaster.pop('alert', "Please enter a valid Password");
                        return;
                    }

                    user.Education = "";
                    user.Institute = "";
                    for (var basic = 0; basic < $scope.basicInfo.length; basic++) {
                        if ($scope.basicInfo[basic]["Education"] != "") {
                            user.Education = user.Education + $scope.basicInfo[basic]["Education"] + ","
                        }
                        if ($scope.basicInfo[basic]["Company"] != "") {
                            user.Institute = user.Institute + $scope.basicInfo[basic]["Company"] + ","
                        }
                    }
                    if (user.Education == "") {
                        toaster.pop('alert', "Please select your Highest education");
                        return;
                    }
                    if (user.Institute == "") {
                        toaster.pop('alert', "Please select your Institute of education");
                        return;
                    }
                    if (user.Experience == null) {
                        toaster.pop('alert', "Please Select your total working experience");
                        return;
                    }

                    if (angular.isDefined($scope.userInfo["Industry"])) {
                        $scope.userInfo["Industry"] = $scope.userInfo["Industry"]["Name"];
                    } else {
                        toaster.pop('alert', "Please select Industry");
                        return;
                    }
                    if (angular.isDefined($scope.userInfo["Role"])) {
                        $scope.userInfo["Role"] = $scope.userInfo["Role"]["Name"];
                    } else {
                        toaster.pop('alert', "Please select Function/Role");
                        return;
                    }
                    if (angular.isDefined($scope.userInfo["Company"])) {
                        $scope.userInfo["Company"] = $scope.userInfo["Company"].toString();
                    } else {
                        toaster.pop('alert', "Please select Company");
                        return;
                    }

                    if (user.Designation == "") {
                        toaster.pop('alert', "Select your Designation");
                        return;
                    }
                    if (user.Salary == "Annual Salary (INR Lakhs)") {
                        toaster.pop('alert', "Enter your Salary");
                        return;
                    }
                    user["isLogin"] = true;

                    var params = {data: user}
                    $http({
                        url: '/users/sign_up_user',
                        method: 'post',
                        data: params
                    }).then(function success(response) {
                        var data = response["data"];
                        if (data["status"] == 200) {


                            if (data["msg"] == "Successfully Signed Up!") {
                                toaster.pop('success', '', data["msg"]);
                                // alert(data["msg"]);
                                $scope.username = $localStorage["User"] = data["username"];
                                $localStorage["User"]["isNew"] = true;
                                $localStorage["User"]["ClickMode"] = user["clickMode"];
                                //vm.isLogin=false;
                                $uibModalInstance.close();
                                // $state.go('app.getStarted')
                                $state.go('page.questions')
                            }
                            else {
                                toaster.pop('info', '', data["msg"]);
                                $uibModalInstance.close();
                                return;
                            }
                        }
                        else {
                            toaster.pop('error', '', data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
                    }, function error(response) {

                    })
                }
                else {
                    user.Education = "";
                    user.Institute = "";
                    for (var basic = 0; basic < $scope.basicInfo.length; basic++) {
                        if ($scope.basicInfo[basic]["Education"] != "") {
                            user.Education = user.Education + $scope.basicInfo[basic]["Education"] + ","
                        }
                        if ($scope.basicInfo[basic]["Company"] != "") {
                            user.Institute = user.Institute + $scope.basicInfo[basic]["Company"] + ","
                        }
                    }
                    if (user.Education == "") {
                        toaster.pop('alert', "Please select your Highest education");
                        return;
                    }
                    if (user.Institute == "") {
                        toaster.pop('alert', "Please select your Institute of education");
                        return;
                    }
                    if (user.Experience == null) {
                        toaster.pop('alert', "Please Select your total working experience");
                        return;
                    }

                    if (angular.isDefined($scope.userInfo["Industry"])) {
                        $scope.userInfo["Industry"] = $scope.userInfo["Industry"]["Name"];
                    } else {
                        toaster.pop('alert', "Please select Industry");
                        return;
                    }
                    if (angular.isDefined($scope.userInfo["Role"])) {
                        $scope.userInfo["Role"] = $scope.userInfo["Role"]["Name"];
                    } else {
                        toaster.pop('alert', "Please select Function/Role");
                        return;
                    }
                    if (angular.isDefined($scope.userInfo["Company"])) {
                        $scope.userInfo["Company"] = $scope.userInfo["Company"].toString();
                    } else {
                        toaster.pop('alert', "Please select Company");
                        return;
                    }

                    if (user.Designation == "") {
                        toaster.pop('alert', "Select your Designation");
                        return;
                    }
                    if (user.Salary == "Annual Salary (INR Lakhs)" || angular.isUndefined(parseFloat(user.Salary))) {
                        toaster.pop('alert', "Please Enter your Salary");
                        return;
                    }

                    $localStorage["guestUser"] = user;
                    $localStorage["guestUser"]["isNew"] = true;
                    $localStorage["guestUser"]["ClickMode"] = userInfo["clickMode"];
                    $uibModalInstance.close();
                    vm.gotoGetstart();
                }

            }
        }

        userSignUpCtrl.$inject = ["$scope", "$uibModalInstance", "toaster", '$http', 'userInfo', '$state', '$rootScope'];

        function userUpdateCtrl($scope, $uibModalInstance, toaster, $http, userInfo, $state, $rootScope) {

            $scope.industries = [];
            $scope.Companies = vm.Companies;
            $scope.institutes = vm.Institute;
            $scope.degree = vm.degree;
            $scope.functions = [];


            for (var i = 0; i <= vm.allFunction.length - 1; i++) {
                var allIndustry = {};
                allIndustry["Name"] = vm.allFunction[i];
                $scope.functions.push(allIndustry);
            }
            for (var i = 0; i <= vm.Industries.length - 1; i++) {
                var allIndustry = {};
                allIndustry["Name"] = vm.Industries[i];
                $scope.industries.push(allIndustry);
            }
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.changeview = function () {
                if (vm.isLogin) {
                    vm.isLogin = false;
                }
                else {
                    vm.isLogin = true;
                }

            }
            $scope.basicInfo = [{Education: userInfo["Education"], Company: userInfo["Institute"], id: 0}];

            $scope.deleteBasicInfo = function (index) {
                if ($scope.basicInfo.length > 1) {
                    $scope.basicInfo.splice(index, 1);
                } else {
                    toaster.pop("can't delete last row of information");
                }
            }
            $scope.addBasicinfo = function (index) {
                if ($scope.basicInfo.length < 3) {
                    $scope.basicInfo.push({Education: "", Company: "", id: index + 1});
                }
                else {
                    toaster.pop('info', "", "Maximum value reached.")
                }

            }
            $scope.userInfo = {
                "Name": "guestUser",
                "Email": userInfo["Email"],
                "Contact": "",
                "Password": userInfo["Password"],
                "Score": 0
                , "Salary": userInfo["Salary"] == 0 ? "Annual Salary (INR Lakhs)" : userInfo["Salary"]
                , "Role": userInfo["Role"],
                "Education": userInfo["Education"],
                "Company": userInfo["Company"],
                "Experience": userInfo["Experience"] == 0 ? "Years Of Experience" : userInfo["Experience"],
                "Designation": userInfo["Designation"],
                "Industry": userInfo["Industry"],
                "Institute": userInfo["Institute"],
                "CompanyDetails": userInfo["CompanyDetails"],
                "UserChoices": userInfo["UserChoices"],
                "Level": userInfo["Level"],
                "EffectiveLevel": userInfo["EffectiveLevel"],
                "Preference": [],
                ClickMode: userInfo["clickMode"]
            };
            $scope.sign_up_user = function () {
                var user = $scope.userInfo;
                if (user.Email != "" && user.Password != "") {
                    if (user.Email == undefined || user.Email == "") {
                        toaster.pop('alert', "Please enter a valid Email-ID");
                        return;
                    }

                    if (user.Password == undefined || user.Password == "") {
                        toaster.pop('alert', "Please enter a valid Password");
                        return;
                    }

                    user.Education = "";
                    user.Institute = "";
                    for (var basic = 0; basic < $scope.basicInfo.length; basic++) {
                        if ($scope.basicInfo[basic]["Education"] != "") {
                            user.Education = user.Education + $scope.basicInfo[basic]["Education"] + ","
                        }
                        if ($scope.basicInfo[basic]["Company"] != "") {
                            user.Institute = user.Institute + $scope.basicInfo[basic]["Company"] + ","
                        }
                    }
                    if (user.Education == "") {
                        toaster.pop('alert', "Please select your Highest education");
                        return;
                    }
                    if (user.Institute == "") {
                        toaster.pop('alert', "Please select your Institute of education");
                        return;
                    }
                    if (user.Experience == null) {
                        toaster.pop('alert', "Please Select your total working experience");
                        return;
                    }

                    if (angular.isDefined($scope.userInfo["Industry"])) {
                        $scope.userInfo["Industry"] = $scope.userInfo["Industry"]["Name"];
                    } else {
                        toaster.pop('alert', "Please select Industry");
                        return;
                    }
                    if (angular.isDefined($scope.userInfo["Role"])) {
                        $scope.userInfo["Role"] = $scope.userInfo["Role"]["Name"];
                    } else {
                        toaster.pop('alert', "Please select Function/Role");
                        return;
                    }
                    if (angular.isDefined($scope.userInfo["Company"])) {
                        $scope.userInfo["Company"] = $scope.userInfo["Company"].toString();
                    } else {
                        toaster.pop('alert', "Please select Company");
                        return;
                    }

                    if (user.Designation == "") {
                        toaster.pop('alert', "Select your Designation");
                        return;
                    }
                    if (user.Salary == "Annual Salary (INR Lakhs)" || angular.isUndefined(parseFloat(user.Salary))) {
                        toaster.pop('alert', "Enter your Salary");
                        return;
                    }
                    var params = {data: user}
                    $http({
                        url: '/users/updateUserInfo',
                        method: 'post',
                        data: params
                    }).then(function success(response) {
                        var data = response["data"];
                        if (data["status"] == 200) {
                            if (data["msg"] == "Successfully Updated") {
                                toaster.pop('success', '', data["msg"]);
                                // alert(data["msg"]);
                                $scope.username = $localStorage["User"] = data["user"];
                                $localStorage["User"]["isNew"] = true;
                                $localStorage["User"]["ClickMode"] = userInfo["clickMode"];
                                //vm.isLogin=false;
                                $uibModalInstance.close();
                                // $state.go('app.getStarted')
                                $state.go('page.questions')
                            }
                            else {
                                toaster.pop('info', '', data["msg"]);
                                $uibModalInstance.close();
                                return;
                            }
                        }
                        else {
                            toaster.pop('error', '', data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
                    }, function error(response) {

                    })
                }
                else {
                    for (var basic = 0; basic < $scope.basicInfo.length; basic++) {
                        user.Education = user.Education + $scope.basicInfo[basic]["Education"] + ","
                        user.Institute = user.Institute + $scope.basicInfo[basic]["Company"] + ","
                    }
                    $localStorage["guestUser"] = user;
                    $localStorage["guestUser"]["isNew"] = true;
                    $uibModalInstance.close();
                    vm.gotoGetstart();
                }

            }
        }

        userUpdateCtrl.$inject = ["$scope", "$uibModalInstance", "toaster", '$http', 'userInfo', '$state', '$rootScope'];


        function userloginCtrl($scope, $uibModalInstance, toaster, $http, login) {
            // vm.isLogin=login;
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.guestuserinfo = {email: "", password: ""};
            $scope.loginuserinfo = {email: "", password: ""};

            $scope.openForm = function () {

                vm.guestuserinfo = $scope.guestuserinfo;
                var params = {data: {email: $scope.guestuserinfo["email"]}}
                $http({
                    url: '/users/checkUser',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    var data = response["data"];
                    if (data["status"] == 200) {
                        if (data["isNew"] == true) {
                            // vm.isLogin=true;
                            $uibModalInstance.close();
                            vm.openForm();
                            //vm.isLogin=true;
                            vm.userinfo["email"] = vm.guestuserinfo["email"];

                        }
                        else {
                            toaster.pop('info', '', data["msg"]);
                            return;
                        }
                    }
                    else {
                        toaster.pop('error', '', data["msg"]);
                        // alert(data["msg"]);
                        return;
                    }
                }, function error(response) {

                })


            };
            $scope.Login = function () {
                $uibModalInstance.close();
                vm.userinfo["email"] = $scope.loginuserinfo["email"];
                vm.userinfo["password"] = $scope.loginuserinfo["password"];
                vm.userLogin();
            };
            $scope.linkedinLogin = function () {
                $uibModalInstance.close();
                vm.guestuserinfo = $scope.guestuserinfo;
                vm.linkedinLogin();

            }

        }

        userloginCtrl.$inject = ["$scope", "$uibModalInstance", "toaster", '$http', 'login'];

        function ChangePersonalInfoCtrl($scope, $uibModalInstance, toaster, $http) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.getUserInfo = function () {
                var params = {Email: $localStorage["UserEmail"]}
                $http({
                    url: '/users/getUserInfo',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    vm.userinfo = response.data.user
                })
            }
            $scope.updateUserInfo = function () {

                if ($scope.userInfo.Name == undefined || $scope.userInfo.Name == "") {
                    toaster.pop('alert', "Please enter a valid name");
                    return false;
                }
                else if ($scope.userInfo.Contact == undefined || $scope.userInfo.Contact == "") {
                    toaster.pop('alert', "Please enter a valid Contact No");
                    return false;
                }
                else if ($scope.userInfo.Salary == undefined || $scope.userInfo.Salary == "") {
                    toaster.pop('alert', "Please enter a valid Salary");
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
                    var params = {data: $scope.userInfo}
                    $http({
                        url: '/users/updateUserInfo',
                        method: 'post',
                        data: params
                    }).then(function success(response) {
                        if (response.data.msg == "sucessfully updated") {
                            toaster.pop('success', 'Successfully Personal Information updated')
                            $uibModalInstance.close();
                        }
                    })
                }
            }
        }

        ChangePersonalInfoCtrl.$inject = ["$scope", "$uibModalInstance", "toaster", '$http'];


    }

})();
