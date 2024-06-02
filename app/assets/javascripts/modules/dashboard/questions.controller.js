(function () {

    angular.module('naut').directive('loading', ['$http', function ($http) {
        return {
            restrict: 'A',
            template: '<div class="loading-spiner"><img src="/assets/ajax-loader.gif" /> </div>',
            link: function (scope, elm, attrs) {
                scope.isLoading = function () {

                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v) {
                    if (v) {
                        elm.show();
                    } else {
                        elm.hide();
                    }
                });
            }
        };
    }])

        .controller('questionController', questionController);
    questionController.$inject = ['$scope', '$http', '$localStorage', 'data', '$state', 'toaster', '$uibModal', '$linkedIn', '$interval', '$rootScope'];

    function questionController($scope, $http, $localStorage, data, $state, toaster, $uibModal, $linkedIn, $interval, $rootScope) {

        var vm = this;
        $scope.arr = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        $scope.quehead = [];
        $localStorage["guestUser"]['total_cl_compentency_per'] = [];
        for (var i = 0; i < $scope.arr.length; i++) {
            $scope.quehead[i] = parseInt(($scope.arr[i] * 100) / 23);
        }
        vm.headerStyle = {"color": "#7fcd94"};
        vm.mainStlye = {"background": "#7fcd94"};
        vm.saveStlye = {"color": "#82c08c"};
        vm.allQues = data['allQues'];
        vm.allRoleEffects = data["allRoleEffects"];
        vm.userinfo = {};
        vm.guestuserinfo = {};
        $scope.interectionPoint = [];
        $scope.ques5selectIndex = 0;
        vm.showQues = false;
        vm.btn1Selected = false;
        vm.btn2Selected = false;
        vm.btn3Selected = false;
        vm.btn4Selected = false;
        $scope.queind = 2;
        $scope.isInitialques = true;
        $scope.go_back_2_step = true;
        vm.Employee = undefined;
        vm.Revanu = undefined;
        // vm.userLevel1 = false;
        // vm.userLevel2 = false;
        // vm.userLevel3 = false;
        // vm.userLevel4 = false;
        vm.userLevel = 0;
        vm.designation = "";
        vm.salary = 0;
        vm.isGuest = false;
        $scope.showLoader = false;
        var userHasRole = false;
        $scope.LastQue = false;
        $scope.is_cl_calc = false;
        $scope.ShowEmail = $localStorage["User"]["Email"];
        if (angular.isUndefined($localStorage["guestUser"])) {
            $localStorage["guestUser"] = []
        }
        $scope.show = true;
        $scope.is_show_next = false;
        vm.empTxtno = 1001;
        vm.isFirst = false;
        $scope.selectedopt = [false, false, false, false, false, false];
        $scope.hiddenQue_value = {};
        $scope.selectedQue_opt = {};
        $scope.hiddenQue = function (que_no_value, opt_no_value) {
            $scope.arr = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            var que_no = que_no_value + 4;
            var opt_no = opt_no_value + 1;
            $scope.selectedQue_opt[que_no] = opt_no;
            if (que_no == 10) {
                setTimeout(function () {
                    var campetrncy_info = $localStorage["guestUser"]['campetrncy_info']
                    var campetrncy_text_info = $localStorage["guestUser"]['campetrncy_text_info']
                    if (campetrncy_text_info != "") {
                        document.getElementById('other_competency').checked = true
                        document.getElementById('other_competency_text').style = "display:block"
                        document.getElementById('other_competency_text').value = campetrncy_text_info;
                    }
                    if(campetrncy_info.length > 0){
                        for (var i = 0; i <= campetrncy_info.length; i++) {
                            document.getElementById(campetrncy_info[i]).checked = true
                        }}
                }, 500);

            }
            if (que_no == 4) {
                $scope.hiddenQue_value = {};
                if (opt_no == 8 && vm.allQues[1]["queOption"][0]["optSelect"] != true) {
                    if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                        $scope.hiddenQue_value['9'] = '4';

                    } else {
                        $scope.hiddenQue_value['9'] = '4';

                    }
                } else if (opt_no == 9 && vm.allQues[1]["queOption"][0]["optSelect"] != true) {
                    if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                        $scope.hiddenQue_value['9'] = '4';

                    } else {
                        $scope.hiddenQue_value['9'] = '4';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                        $scope.hiddenQue_value['22'] = '5';

                    } else {
                        $scope.hiddenQue_value['22'] = '5';

                    }
                } else if (opt_no == 10 && vm.allQues[1]["queOption"][0]["optSelect"] != true) {
                    if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                        $scope.hiddenQue_value['9'] = '4';

                    } else {
                        $scope.hiddenQue_value['9'] = '4';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                        $scope.hiddenQue_value['22'] = '6';

                    } else {
                        $scope.hiddenQue_value['22'] = '6';

                    }
                } else if (opt_no == 11 && vm.allQues[1]["queOption"][0]["optSelect"] != true) {
                    if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                        $scope.hiddenQue_value['9'] = '4';

                    } else {
                        $scope.hiddenQue_value['9'] = '4';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                        $scope.hiddenQue_value['22'] = '6';

                    } else {
                        $scope.hiddenQue_value['22'] = '6';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('6')) {
                        $scope.hiddenQue_value['6'] = '6';

                    } else {
                        $scope.hiddenQue_value['6'] = '6';

                    }
                } else {
                    $scope.hiddenQue_value = {};
                    if (opt_no == 8 && vm.allQues[1]["queOption"][0]["optSelect"] == true) {
                        if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                            $scope.hiddenQue_value['9'] = '4';

                        } else {
                            $scope.hiddenQue_value['9'] = '4';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('6')) {
                            $scope.hiddenQue_value['6'] = '1';

                        } else {
                            $scope.hiddenQue_value['6'] = '1';

                        }
                    } else if (opt_no == 8 && vm.allQues[1]["queOption"][0]["optSelect"] != true) {
                        if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                            $scope.hiddenQue_value['9'] = '4';

                        } else {
                            $scope.hiddenQue_value['9'] = '4';

                        }
                    }
                    if (opt_no == 9 && vm.allQues[1]["queOption"][0]["optSelect"] == true) {
                        if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                            $scope.hiddenQue_value['9'] = '4';

                        } else {
                            $scope.hiddenQue_value['9'] = '4';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                            $scope.hiddenQue_value['22'] = '5';

                        } else {
                            $scope.hiddenQue_value['22'] = '5';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('6')) {
                            $scope.hiddenQue_value['6'] = '1';

                        } else {
                            $scope.hiddenQue_value['6'] = '1';

                        }

                    } else if (opt_no == 9 && vm.allQues[1]["queOption"][0]["optSelect"] != true) {
                        if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                            $scope.hiddenQue_value['9'] = '4';

                        } else {
                            $scope.hiddenQue_value['9'] = '4';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                            $scope.hiddenQue_value['22'] = '5';

                        } else {
                            $scope.hiddenQue_value['22'] = '5';

                        }
                    }
                    if (opt_no == 10 && vm.allQues[1]["queOption"][0]["optSelect"] == true) {
                        if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                            $scope.hiddenQue_value['9'] = '4';

                        } else {
                            $scope.hiddenQue_value['9'] = '4';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                            $scope.hiddenQue_value['22'] = '6';

                        } else {
                            $scope.hiddenQue_value['22'] = '6';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('6')) {
                            $scope.hiddenQue_value['6'] = '1';

                        } else {
                            $scope.hiddenQue_value['6'] = '1';

                        }
                    } else if (opt_no == 10 && vm.allQues[1]["queOption"][0]["optSelect"] != true) {
                        if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                            $scope.hiddenQue_value['9'] = '4';

                        } else {
                            $scope.hiddenQue_value['9'] = '4';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                            $scope.hiddenQue_value['22'] = '6';

                        } else {
                            $scope.hiddenQue_value['22'] = '6';

                        }
                    }
                    if (opt_no == 11 && vm.allQues[1]["queOption"][0]["optSelect"] == true) {
                        if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                            $scope.hiddenQue_value['9'] = '4';

                        } else {
                            $scope.hiddenQue_value['9'] = '4';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                            $scope.hiddenQue_value['22'] = '6';

                        } else {
                            $scope.hiddenQue_value['22'] = '6';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('6')) {
                            $scope.hiddenQue_value['6'] = '1';

                        } else {
                            $scope.hiddenQue_value['6'] = '1';

                        }
                    } else if (opt_no == 11 && vm.allQues[1]["queOption"][0]["optSelect"] != true) {
                        if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                            $scope.hiddenQue_value['9'] = '4';

                        } else {
                            $scope.hiddenQue_value['9'] = '4';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                            $scope.hiddenQue_value['22'] = '6';

                        } else {
                            $scope.hiddenQue_value['22'] = '6';

                        }
                        if ($scope.hiddenQue_value.hasOwnProperty('6')) {
                            $scope.hiddenQue_value['6'] = '6';

                        } else {
                            $scope.hiddenQue_value['6'] = '6';

                        }
                    }
                    if (Object.keys($scope.hiddenQue_value).length == 0 && vm.allQues[1]["queOption"][0]["optSelect"] == true) {
                        $scope.hiddenQue_value['6'] = '1';
                    }
                }
            }
            if (que_no == 5) {
                if (opt_no == 1) {
                    if ($scope.hiddenQue_value.hasOwnProperty('6')) {
                        $scope.hiddenQue_value['6'] = '1';

                    } else {
                        $scope.hiddenQue_value['6'] = '1';

                    }
                    if ($scope.ques_details == undefined) {
                        if ($scope.hiddenQue_value.hasOwnProperty('11')) {
                            $scope.hiddenQue_value['11'] = '1';

                        } else {
                            $scope.hiddenQue_value['11'] = '1';

                        }
                    }
                }
                if (opt_no != 1) {
                    if (vm.allQues[0]["queOption"][10]["optSelect"] == true) {
                        $scope.hiddenQue_value['6'] = '6';
                        $scope.hiddenQue_value['9'] = '4';
                        $scope.hiddenQue_value['22'] = '6';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('6') && Object.keys($scope.hiddenQue_value).length == 1) {
                        $scope.hiddenQue_value = {};

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('6') && vm.allQues[0]["queOption"][10]["optSelect"] != true) {
                        delete $scope.hiddenQue_value['6'];

                    }
                    if ($scope.ques_details == undefined) {
                        if ($scope.hiddenQue_value.hasOwnProperty('11')) {
                            $scope.hiddenQue_value['11'] = '1';

                        } else {
                            $scope.hiddenQue_value['11'] = '1';

                        }
                    }

                }
            }
            if (que_no == 8) {
                if (opt_no == 1) {
                    if ($scope.hiddenQue_value.hasOwnProperty('15')) {
                        $scope.hiddenQue_value['15'] = '1';

                    } else {
                        $scope.hiddenQue_value['15'] = '1';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('16')) {
                        $scope.hiddenQue_value['16'] = '1';

                    } else {
                        $scope.hiddenQue_value['16'] = '1';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('20')) {
                        $scope.hiddenQue_value['20'] = '1';

                    } else {
                        $scope.hiddenQue_value['20'] = '1';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('17')) {
                        $scope.hiddenQue_value['17'] = '1';

                    } else {
                        $scope.hiddenQue_value['17'] = '1';

                    }
                } else if (opt_no == 2) {
                    if ($scope.hiddenQue_value.hasOwnProperty('15')) {
                        $scope.hiddenQue_value['15'] = '2';

                    } else {
                        $scope.hiddenQue_value['15'] = '2';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('16')) {
                        delete $scope.hiddenQue_value['16'];

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('17')) {
                        delete $scope.hiddenQue_value['17'];

                    }
                } else if (opt_no == 7 || opt_no == 8) {

                    if ($scope.hiddenQue_value.hasOwnProperty('9')) {
                        $scope.hiddenQue_value['9'] = '4';

                    } else {
                        $scope.hiddenQue_value['9'] = '4';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('22')) {
                        $scope.hiddenQue_value['22'] = '6';

                    } else {
                        $scope.hiddenQue_value['22'] = '6';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('15')) {
                        delete $scope.hiddenQue_value['15'];

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('16')) {
                        delete $scope.hiddenQue_value['16'];

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('17')) {
                        delete $scope.hiddenQue_value['17'];

                    }
                }


                if ((opt_no != 7 && opt_no != 8) && !(vm.allQues[0]["queOption"][7]["optSelect"] == true || vm.allQues[0]["queOption"][8]["optSelect"] == true || vm.allQues[0]["queOption"][9]["optSelect"] == true || vm.allQues[0]["queOption"][10]["optSelect"] == true)) {
                    delete $scope.hiddenQue_value['22'];
                    delete $scope.hiddenQue_value['9'];
                }
                if ((opt_no != 7 && opt_no != 8) && vm.allQues[0]["queOption"][7]["optSelect"] == true) {
                    delete $scope.hiddenQue_value['22'];

                }


                if (opt_no != 1) {

                    if ($scope.hiddenQue_value.hasOwnProperty('16')) {
                        delete $scope.hiddenQue_value['16'];

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('17')) {
                        delete $scope.hiddenQue_value['17'];

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('20')) {
                        delete $scope.hiddenQue_value['20'];

                    }
                }
                if (opt_no != 2 && opt_no != 1) {
                    if ($scope.hiddenQue_value.hasOwnProperty('15')) {
                        delete $scope.hiddenQue_value['20'];

                    }

                }


            }
            if (que_no == 14) {
                if (opt_no == 1) {
                    if ($scope.hiddenQue_value.hasOwnProperty('21')) {
                        $scope.hiddenQue_value['21'] = '1';

                    } else {
                        $scope.hiddenQue_value['21'] = '1';

                    }
                }
                if (opt_no == 10) {
                    if ($scope.hiddenQue_value.hasOwnProperty('15')) {
                        $scope.hiddenQue_value['15'] = '10';

                    } else {
                        $scope.hiddenQue_value['15'] = '10';

                    }
                }

                if (opt_no != 10 && (vm.allQues[4]["queOption"][0]["optSelect"] == true || vm.allQues[4]["queOption"][1]["optSelect"] == true)) {
                    if ($scope.selectedQue_opt.hasOwnProperty('8')) {
                        if ($scope.selectedQue_opt['8'] == '1') {
                            $scope.hiddenQue_value['15'] = '1';

                        }
                        if ($scope.selectedQue_opt['8'] == '2') {
                            $scope.hiddenQue_value['15'] = '2';

                        }

                    }
                } else if (opt_no != 10 && !(vm.allQues[4]["queOption"][0]["optSelect"] == true || vm.allQues[4]["queOption"][1]["optSelect"] == true)) {
                    delete $scope.hiddenQue_value["15"];
                }
                // if (opt_no != 1 && (vm.allQues[0]["queOption"][8]["optSelect"] == true || vm.allQues[0]["queOption"][9]["optSelect"] == true || vm.allQues[0]["queOption"][10]["optSelect"] == true || vm.allQues[4]["queOption"][6]["optSelect"] == true || vm.allQues[4]["queOption"][7]["optSelect"] == true)) {
                //     if ($scope.selectedQue_opt.hasOwnProperty('4')) {
                //         if ($scope.selectedQue_opt['4'] == '9') {
                //             $scope.hiddenQue_value['21'] = '5';
                //
                //         }
                //         if ($scope.selectedQue_opt['4'] == '10' || $scope.selectedQue_opt['4'] == '11') {
                //             $scope.hiddenQue_value['21'] = '6';
                //
                //         }
                //     }
                //     if ($scope.selectedQue_opt.hasOwnProperty('8')) {
                //         if ($scope.selectedQue_opt['4'] == '7' || $scope.selectedQue_opt['4'] == '8') {
                //             $scope.hiddenQue_value['21'] = '6';
                //
                //         }
                //     }
                // }
                // else if (opt_no != 1 && !(vm.allQues[0]["queOption"][8]["optSelect"] == true || vm.allQues[0]["queOption"][9]["optSelect"] == true || vm.allQues[0]["queOption"][10]["optSelect"] == true || vm.allQues[4]["queOption"][6]["optSelect"] == true || vm.allQues[4]["queOption"][7]["optSelect"] == true)) {
                //     delete  $scope.hiddenQue_value["21"];
                // }
                if (opt_no != 1) {
                    delete $scope.hiddenQue_value["21"];
                }

            }
            if (que_no == 15) {
                if (opt_no == 1 && vm.allQues[10]["queOption"][0]["optSelect"] == true) {
                    if ($scope.hiddenQue_value.hasOwnProperty('16')) {
                        $scope.hiddenQue_value['16'] = '1';

                    } else {
                        $scope.hiddenQue_value['16'] = '1';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('17')) {
                        $scope.hiddenQue_value['17'] = '1';

                    } else {
                        $scope.hiddenQue_value['17'] = '1';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('20')) {
                        $scope.hiddenQue_value['20'] = '1';

                    } else {
                        $scope.hiddenQue_value['20'] = '1';

                    }
                } else {
                    if ($scope.hiddenQue_value.hasOwnProperty('16')) {
                        delete $scope.hiddenQue_value['16'];

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('17')) {
                        delete $scope.hiddenQue_value['17'];

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('20') && vm.allQues[4]["queOption"][1]["optSelect"] == true) {
                        delete $scope.hiddenQue_value['20'];

                    }
                }
                // if (opt_no != 1) {
                //     if ($scope.selectedQue_opt.hasOwnProperty('8')) {
                //         if ($scope.selectedQue_opt['8'] == '1') {
                //             $scope.hiddenQue_value['16'] = '1';
                //
                //         }
                //         if ($scope.selectedQue_opt['8'] == '1') {
                //             $scope.hiddenQue_value['15'] = '1';
                //
                //         }
                //     }
                //
                // }

            }
            if (que_no == 16) {
                if (opt_no == 1) {
                    if ($scope.hiddenQue_value.hasOwnProperty('17')) {
                        $scope.hiddenQue_value['17'] = '1';

                    } else {
                        $scope.hiddenQue_value['17'] = '1';

                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('20')) {
                        $scope.hiddenQue_value['20'] = '1';

                    } else {
                        $scope.hiddenQue_value['20'] = '1';

                    }
                }
                if (opt_no != 1) {
                    if ($scope.selectedQue_opt.hasOwnProperty(8)) {
                        if ($scope.selectedQue_opt['8'] == '1' || $scope.selectedQue_opt['14'] == '1') {
                            $scope.hiddenQue_value['17'] = '1';

                        }
                    }
                    if (vm.allQues[10]["queOption"][0]["optSelect"] == false && vm.allQues[4]["queOption"][0]["optSelect"] == false) {
                        delete $scope.hiddenQue_value['17'];
                    }
                    if ($scope.hiddenQue_value.hasOwnProperty('20') && vm.allQues[4]["queOption"][1]["optSelect"] == true && vm.allQues[12]["queOption"][1]["optSelect"] == true) {
                        delete $scope.hiddenQue_value['20'];

                    }
                }


            }
            if (que_no == 7) {
                if (vm.allQues[0]["queOption"][7]["optSelect"] == true) {
                    $scope.hiddenQue_value['9'] = '4';
                } else if (vm.allQues[0]["queOption"][8]["optSelect"] == true) {
                    $scope.hiddenQue_value['9'] = '4';
                    $scope.hiddenQue_value['22'] = '5';
                } else if (vm.allQues[0]["queOption"][9]["optSelect"] == true) {
                    $scope.hiddenQue_value['9'] = '4';
                    $scope.hiddenQue_value['22'] = '6';
                } else if (vm.allQues[0]["queOption"][10]["optSelect"] == true) {
                    if (vm.allQues[1]["queOption"][0]["optSelect"] != true) {
                        $scope.hiddenQue_value['9'] = '4';
                        $scope.hiddenQue_value['22'] = '6';
                        $scope.hiddenQue_value['6'] = '6';
                    } else if (vm.allQues[1]["queOption"][0]["optSelect"] == true) {
                        $scope.hiddenQue_value['9'] = '4';
                        $scope.hiddenQue_value['22'] = '6';
                        $scope.hiddenQue_value['6'] = '1';
                    }


                }
            }
            angular.forEach($scope.hiddenQue_value, function (value, key) {
                if ($localStorage["User"] != "") {
                    for (var l = 0; l < vm.allQues[key - 4]["queOption"].length; l++) {
                        vm.allQues[key - 4]["queOption"][l]["optSelect"] = false;
                    }

                }
                vm.allQues[key - 4]["isVisible"] = false;
                vm.allQues[key - 4]["queOption"][value - 1]["optSelect"] = true;
                if ($localStorage["User"] != "") {
                    $localStorage["User"]['UserChoices'][key - 4] = vm.allQues[key - 4]["userChoice"] = parseInt(value);
                } else {
                    $localStorage["guestUser"]['UserChoices'][key - 4] = vm.allQues[key - 4]["userChoice"] = parseInt(value);
                }
            });
            if (!$scope.hiddenQue_value.hasOwnProperty('6') && que_no < 6) {
                vm.allQues[2]["isVisible"] = true;
            }
            for (var showindex = que_no - 3; showindex < vm.allQues.length; showindex++) {
                if ($scope.hiddenQue_value.hasOwnProperty(showindex + 4)) {

                } else if ((showindex) <= 3) {
                    $scope.LastQue = false;

                    break;
                } else {

                    vm.allQues[showindex]["isVisible"] = true;
                    if (showindex == 19) {
                        $scope.LastQue = true;
                    } else {
                        $scope.LastQue = false;

                    }

                    break;
                }

            }
            if ($scope.hiddenQue_value['6'] == '1') {
                vm.allQues[2]['queOption'][0]["optSelect"] = $scope.selectedopt[0] = true;
                vm.allQues[2]['queOption'][1]["optSelect"] = $scope.selectedopt[1] = false;
                vm.allQues[2]['queOption'][2]["optSelect"] = $scope.selectedopt[2] = false;
                vm.allQues[2]['queOption'][3]["optSelect"] = $scope.selectedopt[3] = false;
                vm.allQues[2]['queOption'][4]["optSelect"] = $scope.selectedopt[4] = false;
                vm.allQues[2]['queOption'][5]["optSelect"] = $scope.selectedopt[5] = false;
            } else if ($scope.hiddenQue_value['6'] == '6') {
                vm.allQues[2]['queOption'][0]["optSelect"] = $scope.selectedopt[0] = false;
                vm.allQues[2]['queOption'][1]["optSelect"] = $scope.selectedopt[1] = false;
                vm.allQues[2]['queOption'][2]["optSelect"] = $scope.selectedopt[2] = false;
                vm.allQues[2]['queOption'][3]["optSelect"] = $scope.selectedopt[3] = false;
                vm.allQues[2]['queOption'][4]["optSelect"] = $scope.selectedopt[4] = false;
                vm.allQues[2]['queOption'][5]["optSelect"] = $scope.selectedopt[5] = true;
            }

            if ($scope.hiddenQue_value['6'] != '1' && $scope.hiddenQue_value['6'] != '6' && que_no_value < 2) {
                vm.allQues[2]["isVisible"] = true;
            }
            angular.forEach($scope.hiddenQue_value, function (value, key) {
                for (var i = key - 3; i < $scope.arr.length; i++) {
                    $scope.arr[i] = $scope.arr[i] - 1;
                    // $scope.quehead[i]=parseInt(((que_no+1)*100)/22);
                }
                // if(key-4>=5){
                //     if(key-4<=12){
                //         for(var j=5;j<=12;j++){
                //
                //             var queheader=$scope.quehead[j].split("/");
                //             if(j>key-4){
                //                 queheader[0]=queheader[0]-1
                //             }
                //             $scope.quehead[j]=(queheader[0]).toString()+"/"+(queheader[1]-1).toString();
                //         }
                //     }else{
                //         for(var j=13;j<=18;j++){
                //
                //             var queheader=$scope.quehead[j].split("/");
                //             if(j>key-4){
                //                 queheader[0]=queheader[0]-1
                //             }
                //             $scope.quehead[j]=(queheader[0]).toString()+"/"+(queheader[1]-1).toString();
                //         }
                //     }
                //
                //
                // }
            });
            for (var i = 0; i <= 19; i++) {
                if (i > 2 && vm.allQues[i]["isVisible"] == true) {
                    $scope.queind = i;
                } else if (i == 0 || i == 1 || i == 2) {
                    $scope.queind = 2;
                }
            }


            if ("Impact_Data" in localStorage) {

                var impact = JSON.parse(localStorage.getItem("Impact_Data"));
                var imp = document.getElementsByClassName('imp_option_' + que_no).value;
                $scope.impectText = [];

                if (que_no == 4) {
                    $scope.option_new1 = vm.allQues[14]["queOption"];

                    for (var i = 0; i < $scope.option_new1.length; i++) {
                        if (i <= impact.environment_perspective - 1) {
                            $scope.impectText.push(this.option_new1[i]);
                        }
                    }
                    vm.allQues[14]["queOption"] = $scope.impectText;
                    $scope.impectText = [];
                    // }
                    //
                    // if (que_no == 17) {
                    $scope.option_new2 = vm.allQues[15]["queOption"];

                    for (var i = 0; i < $scope.option_new2.length; i++) {
                        if (i <= impact.employee_perspective - 1) {
                            $scope.impectText.push(this.option_new2[i]);
                        }
                    }
                    vm.allQues[15]["queOption"] = $scope.impectText;
                    $scope.impectText = [];

                    // }
                    //
                    //
                    //
                    // if (que_no == 18 || que_no == 19) {
                    //     $scope.impectText =[]
                    $scope.option_new3 = vm.allQues[16]["queOption"];

                    for (var i = 0; i < $scope.option_new3.length; i++) {
                        if (i <= impact.internal_business_processes_perspective - 1) {
                            $scope.impectText.push(this.option_new3[i]);
                        }
                    }
                    vm.allQues[16]["queOption"] = $scope.impectText;
                    $scope.impectText = []
                    // }
                    //
                    //
                    //
                    // if (que_no == 19 ) {

                    $scope.option_new4 = vm.allQues[17]["queOption"];

                    for (var i = 0; i < $scope.option_new4.length; i++) {
                        if (i <= impact.customer_perspective - 1) {
                            $scope.impectText.push(this.option_new4[i]);
                        }
                    }
                    vm.allQues[17]["queOption"] = $scope.impectText;
                    $scope.impectText = []
                    // }
                    //
                    // if (que_no == 20 || que_no == 21) {

                    $scope.option_new5 = vm.allQues[19]["queOption"];

                    for (var i = 0; i < $scope.option_new5.length; i++) {
                        if (i <= impact.suppliers__partners_perspective - 1) {
                            $scope.impectText.push(this.option_new5[i]);
                        }
                    }
                    vm.allQues[19]["queOption"] = $scope.impectText;
                    $scope.impectText = []

                }
            }


        }
        $scope.resolvDataFun = function () {
            var level = 0;
            var industry = ""
            var role = "";
            var company = "";
            var salary = "";
            var EffectiveLevel = "";
            var Email = "";
            if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                level = $localStorage["User"]["Level"];
                industry = $localStorage["User"]["Industry"];
                role = $localStorage["User"]["Role"];
                company = $localStorage["User"]["Company"];
                salary = $localStorage["User"]["Salary"];
                EffectiveLevel = $localStorage["User"]["EffectiveLevel"];
                Email = $localStorage["User"]["Email"];
            } else {
                level = $localStorage["guestUser"]["Level"];
                industry = $localStorage["guestUser"]["Industry"];
                role = $localStorage["guestUser"]["Role"];
                company = $localStorage["guestUser"]["Company"];
                salary = $localStorage["guestUser"]["Salary"];
                EffectiveLevel = $localStorage["guestUser"]["EffectiveLevel"];
                Email = $localStorage["guestUser"]["Email"];

            }

            var data2 = $http({
                url: '/report/CalculateIntialValues',
                method: 'post',
                data: {
                    Level: level,
                    Industry: industry,
                    Role: role,
                    Company: company,
                    Salary: salary,
                    EffectiveLevel: EffectiveLevel,
                    Email: Email
                }
            }).then(function success(response) {
                var data = response['data'];
                $scope.reportValuesFun();
                if ($localStorage['User'] != "") {
                    $localStorage['User']["resolvData"] = data;
                } else {
                    $localStorage['guestUser']["resolvData"] = data;
                }
                return data;
            });
        };
        $scope.reportValuesFun = function () {
            var level = 0;
            var industry = ""
            var role = "";
            var company = "";
            var Salary = 0;
            var Email = "";
            var isGuest = false;
            if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                level = $localStorage["User"]["Level"];
                industry = $localStorage["User"]["Industry"];
                role = $localStorage["User"]["Role"];
                company = $localStorage["User"]["Company"];
                Salary = $localStorage["User"]["Salary"];
                Email = $localStorage["User"]["Email"];
                isGuest = false;
            } else {
                level = $localStorage["guestUser"]["Level"];
                industry = $localStorage["guestUser"]["Industry"];
                role = $localStorage["guestUser"]["Role"];
                company = $localStorage["guestUser"]["Company"];
                Salary = $localStorage["guestUser"]["Salary"];
                Email = $localStorage["guestUser"]["Email"];
                isGuest = true

            }
            var params = {Level: level, Industry: industry, Role: role, Company: company, Salary: Salary, Email: Email}
            var data1 = $http({
                url: '/report/CLReport',
                method: 'post',
                data: params
            }).then(function success(response) {

                if (response["data"]["status"] == 200) {
                    response["data"]['reportData']["isGuest"] = isGuest;
                    if ($localStorage['User'] != "") {
                        $localStorage['User']["reportValues"] = response["data"];
                    } else {
                        $localStorage['guestUser']["reportValues"] = response["data"];
                    }
                    $scope.growthValuesFun();
                    return response["data"]['reportData'];
                } else {

                    toaster.pop('error', '', data["msg"]);
                    // alert(data["msg"]);
                    return;
                }
            }, function error(response) {

            })

        };
        $scope.growthValuesFun = function () {
            var level = 0;
            var industry = ""
            var role = "";
            var company = "";
            var Email = "";
            var Salary = 0;
            var isGuest = false;
            var growth = false;
            if ($localStorage['User'] != "") {
                growth = $localStorage['User']['resolvData']['ppx']
            } else {
                growth = $localStorage['guestUser']['resolvData']['ppx']
            }
            if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                level = $localStorage["User"]["Level"];
                Email = $localStorage["User"]["Email"];
                industry = $localStorage["User"]["Industry"];
                role = $localStorage["User"]["Role"];
                company = $localStorage["User"]["Company"];
                Salary = $localStorage["User"]["Salary"];
                var isGuest = false;
            } else {
                level = $localStorage["guestUser"]["Level"];
                industry = $localStorage["guestUser"]["Industry"];
                role = $localStorage["guestUser"]["Role"];
                company = $localStorage["guestUser"]["Company"];
                Salary = $localStorage["guestUser"]["Salary"];
                var isGuest = true;
            }

            var params = {
                Level: level,
                Industry: industry,
                Role: role,
                Company: company,
                Salary: Salary,
                Email: Email
            }
            if (growth) {
                return $http({
                    url: '/report/GrowthReport',
                    method: 'post',
                    data: params
                }).then(function success(response) {

                    if (response["data"]["status"] == 200) {
                        response["data"]['reportData']["isGuest"] = isGuest;
                        if ($localStorage['User'] != "") {
                            $localStorage['User']['growthValues'] = response["data"]['reportData'];
                        } else {
                            $localStorage['guestUser']['growthValues'] = response["data"]['reportData'];
                        }
                        $state.go('app.briefreport');
                        return response["data"]['reportData'];


                    } else {
                        toaster.pop('error', '', data["msg"]);
                        // alert(data["msg"]);
                        return;
                    }
                }, function error(response) {

                })


            }
            $state.go('app.briefreport');
        }


        $scope.UserInfo = {};
        // if ($localStorage["User"] != "") {
        //     if ($localStorage["User"]["userlevelvalue"] != []) {
        //         vm.userLevel1 = $localStorage["User"]["userlevelvalue"][0];
        //         vm.userLevel2 = $localStorage["User"]["userlevelvalue"][1];
        //         vm.userLevel3 = $localStorage["User"]["userlevelvalue"][2];
        //         vm.userLevel4 = $localStorage["User"]["userlevelvalue"][3];
        //     }
        // }
        if ($localStorage["User"] != "") {
            if ($localStorage["User"]["selectedopt"] != null && $localStorage["User"]["selectedopt"].length != 0) {
                vm.allQues[2]['queOption'][0]["optSelect"] = $scope.selectedopt[0] = $localStorage["User"]["selectedopt"][0];
                vm.allQues[2]['queOption'][1]["optSelect"] = $scope.selectedopt[1] = $localStorage["User"]["selectedopt"][1];
                vm.allQues[2]['queOption'][2]["optSelect"] = $scope.selectedopt[2] = $localStorage["User"]["selectedopt"][2];
                vm.allQues[2]['queOption'][3]["optSelect"] = $scope.selectedopt[3] = $localStorage["User"]["selectedopt"][3];
                vm.allQues[2]['queOption'][4]["optSelect"] = $scope.selectedopt[4] = $localStorage["User"]["selectedopt"][4];
                vm.allQues[2]['queOption'][5]["optSelect"] = $scope.selectedopt[5] = $localStorage["User"]["selectedopt"][5];

            }
        }
        $scope.values = [
            {"text": "Junior Management", "value": 0},
            {"text": "Middle Management", "value": 1},
            {"text": "Senior Management", "value": 2},
            {"text": "Top Management", "value": 3},
            // {"text":"4","value":4},
            // {"text":"5","value":5},
            // {"text":"6","value":6},
            // {"text":"7","value":7},
            // {"text":"8","value":8},
            // {"text":"9 or more","value":9},

        ];
        $scope.resetEmpTxtno = function () {
            vm.empTxtno = 1001;
            $scope.show = true;
        }

        vm.guestuserinfo = {};
        vm.level = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        var recentShowOptions = [];
        $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES (1/3)";
        if (angular.isUndefined($localStorage["User"])) {

            $localStorage["User"] = '',
                $state.go("page.index")
        } else if ($localStorage["User"].hasOwnProperty("Email")) {
            $scope.UserInfo = $localStorage["User"];
            vm.salary = $scope.UserInfo["Salary"];
            vm.userLevel = $scope.UserInfo["EffectiveLevel"] - 1;
            vm.designation = $localStorage["User"]["Designation"];
            $scope.userHasRole = false;//vm.allRoleEffects.includes($scope.UserInfo["Designation"])
            if (!$localStorage["User"].hasOwnProperty('UserChoices') || $localStorage["User"]['UserChoices'] == null) {
                $localStorage["User"]['UserChoices'] = [];
            }
            if (!$localStorage["User"].hasOwnProperty('CompanyDetails')) {
                $localStorage["User"]['CompanyDetails'] = [];
                $scope.UserInfo['CompanyDetails'] = [];
            } else if ($localStorage["User"]['CompanyDetails'].length > 0) {
                var haveAll3ans = true;

                if ($localStorage["User"]['CompanyDetails'][1] > 0) {
                    vm.Employee = $localStorage["User"]['CompanyDetails'][1];
                } else {
                    haveAll3ans = false;
                }
                if ($localStorage["User"]['CompanyDetails'][2] > 0) {
                    vm.Revanu = $localStorage["User"]['CompanyDetails'][2];
                } else {
                    haveAll3ans = false;
                }
                if ($localStorage["User"]['CompanyDetails'][0] == 4) {
                    vm.btn1Selected = true;
                } else if ($localStorage["User"]['CompanyDetails'][0] == 3) {
                    vm.btn2Selected = true;
                } else if ($localStorage["User"]['CompanyDetails'][0] == 2) {
                    vm.btn3Selected = true;
                } else if ($localStorage["User"]['CompanyDetails'][0] == 1) {
                    vm.btn4Selected = true;
                } else {
                    haveAll3ans = false;
                }
                if (haveAll3ans) {
                    modifyQuestions();
                }
            }
        } else if (angular.isDefined($localStorage["guestUser"])) {
            $scope.UserInfo = $localStorage["guestUser"];
            vm.salary = $scope.UserInfo["Salary"];
            vm.userLevel = $scope.UserInfo["EffectiveLevel"] - 1;
            vm.designation = $localStorage["User"]["Designation"];
            $scope.userHasRole = false;//vm.allRoleEffects.includes($scope.UserInfo["Designation"])
            vm.isGuest = true;
            if (!$localStorage["guestUser"].hasOwnProperty('UserChoices') || $localStorage["User"]['UserChoices'] == null) {
                $localStorage["guestUser"]['UserChoices'] = [];
            }
            if (!$localStorage["guestUser"].hasOwnProperty('CompanyDetails')) {
                $localStorage["guestUser"]['CompanyDetails'] = [];
                $scope.UserInfo['CompanyDetails'] = [];
            } else if ($localStorage["guestUser"]['CompanyDetails'].length > 0) {
                var haveAll3ans = true;

                if ($localStorage["guestUser"]['CompanyDetails'][1] > 0) {
                    vm.Employee = $localStorage["guestUser"]['CompanyDetails'][1];
                } else {
                    haveAll3ans = false;
                }
                if ($localStorage["guestUser"]['CompanyDetails'][2] > 0) {
                    vm.Revanu = $localStorage["guestUser"]['CompanyDetails'][2];
                } else {
                    haveAll3ans = false;
                }
                if ($localStorage["guestUser"]['CompanyDetails'][0] == 4) {
                    vm.btn1Selected = true;
                } else if ($localStorage["guestUser"]['CompanyDetails'][0] == 3) {
                    vm.btn2Selected = true;
                } else if ($localStorage["guestUser"]['CompanyDetails'][0] == 2) {
                    vm.btn3Selected = true;
                } else if ($localStorage["guestUser"]['CompanyDetails'][0] == 1) {
                    vm.btn4Selected = true;
                } else {
                    haveAll3ans = false;
                }
                if (haveAll3ans) {
                    modifyQuestions();
                }
            }

        }
        vm.getStyle = function (index) {

            {
                var width = ((index + 1) * 40).toString() + "px";
                var marginLeft = (36 - (index + 1) * 4.5).toString() + "%";
                return {"width": width, "margin-left": marginLeft}

            }


        }


        function modifyQuestions() {
            var countns = 0;
            for (var que = 0; que < vm.allQues.length; que++) {

                vm.allQues[que]["isVisible"] = false;
                vm.allQues[que]["userChoice"] = [];
                vm.allQues[que]["showMore"] = false;
                var isAllvisible = true;
                if (que == 2 && ($localStorage["User"] == "" || $localStorage["User"]["selectedopt"] != null)) {
                    $scope.selectedopt[vm.allQues[2]['userChoice'] - 1] = true;

                    for (var opt = 0; opt < vm.allQues[que]['queOption'].length; opt++) {
                        if ($scope.UserInfo['EffectiveLevel'] >= vm.allQues[que]['queOption'][opt]['minLvl'] && $scope.UserInfo['EffectiveLevel'] <= vm.allQues[que]['queOption'][opt]['maxLvl']) {
                            // vm.allQues[que]['queOption'][opt]["optSelect"] = false;
                            vm.allQues[que]['queOption'][opt]["visible"] = true;
                        } else {
                            isAllvisible = false;
                            // vm.allQues[que]['queOption'][opt]["optSelect"] = false;
                            vm.allQues[que]['queOption'][opt]["visible"] = true;
                        }
                    }
                } else {
                    for (var opt = 0; opt < vm.allQues[que]['queOption'].length; opt++) {
                        if ($scope.UserInfo['EffectiveLevel'] >= vm.allQues[que]['queOption'][opt]['minLvl'] && $scope.UserInfo['EffectiveLevel'] <= vm.allQues[que]['queOption'][opt]['maxLvl']) {
                            vm.allQues[que]['queOption'][opt]["optSelect"] = false;
                            vm.allQues[que]['queOption'][opt]["visible"] = true;
                        } else {
                            isAllvisible = false;
                            vm.allQues[que]['queOption'][opt]["optSelect"] = false;
                            vm.allQues[que]['queOption'][opt]["visible"] = true;
                        }


                    }
                }
                if ((vm.btn1Selected == true || vm.btn2Selected == true) && (que == 9 || que == 10 || que == 13)) {
                    for (var opt = 0; opt < vm.allQues[que]['queOption'].length; opt++) {

                        if (opt == vm.allQues[que]['queOption'].length - 1 || (que == 12 && opt == vm.allQues[que]['queOption'].length - 2)) {
                            isAllvisible = false;
                            vm.allQues[que]['queOption'][opt]["optSelect"] = false;
                            vm.allQues[que]['queOption'][opt]["visible"] = false;
                        }


                    }

                }

                if (isAllvisible) {
                    vm.allQues[que]["showMore"] = false;
                } else {
                    vm.allQues[que]["showMore"] = true;
                }
                //if (vm.allQues[que]["queNo"]<=16)
                //{
                //
                //    for(var opt=0;opt<vm.allQues[que]['queOption'].length;opt++)
                //    {
                //        vm.allQues[que]['queOption'][opt]["optSelect"]=false;
                //        vm.allQues[que]['queOption'][opt]["visible"]=true;
                //
                //    }
                //}
                //else
                //{
                //    for(var opt=0;opt<vm.allQues[que]['queOption'].length;opt++)
                //    {
                //        vm.allQues[que]["showMore"]=true;
                //        vm.allQues[que]['queOption'][opt]["visible"]=false;
                //    }
                //
                //
                //}
                //
                if ($scope.UserInfo.hasOwnProperty('UserChoices') && $scope.UserInfo["UserChoices"] != null) {

                    if (que <= $scope.UserInfo["UserChoices"].length - 1) {
                        if (que == 1) {
                            if ($scope.UserInfo["UserChoices"][que][0] <= 4) {
                                vm.allQues[que]['userChoice'] = [parseInt($scope.UserInfo["UserChoices"][que][0]), 0];
                                //$scope.showNext=true;
                                vm.allQues[que]["isVisible"] = false;

                            } else {

                                vm.empTxtno = parseInt($scope.UserInfo["UserChoices"][que][1])
                                $scope.ques5selectIndex = 4;
                                vm.allQues[que]['userChoice'] = [5, vm.empTxtno];
                            }
                            if ($scope.UserInfo["UserChoices"][que] != null) {
                                vm.allQues[que]['queOption'][$scope.UserInfo["UserChoices"][que][0] - 1]["optSelect"] = true;
                            }
                        } else {
                            vm.allQues[que]['userChoice'] = parseInt($scope.UserInfo["UserChoices"][que]);
                            //$scope.showNext=true;
                            vm.allQues[que]["isVisible"] = false;
                            if (que == 2) {
                                vm.allQues[2]['queOption'][vm.allQues[2]['userChoice'] - 1]["optSelect"] = $scope.selectedopt[vm.allQues[2]['userChoice'] - 1] = true;
                            } else {
                                if ($scope.UserInfo["UserChoices"][que] != null) {
                                    vm.allQues[que]['queOption'][$scope.UserInfo["UserChoices"][que] - 1]["optSelect"] = true;
                                }

                            }
                        }

                        countns = countns + 1
                    } else if ($scope.UserInfo["UserChoices"].length == que) {
                        vm.allQues[que]["isVisible"] = true;
                        var queIndex = que;
                        if (queIndex < 4) {
                            $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES (" + (queIndex).toString() + "/3)";
                        } else if (queIndex < 13) {
                            if (queIndex == 4) {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS (1/8)";
                            } else if (queIndex == 5) {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS (2/8)";
                            } else {
                                if (queIndex == 9) {
                                    if (vm.allQues[10]["isVisible"] == false && vm.allQues[12]["isVisible"] == false && vm.allQues[13]["isVisible"] == false) {
                                        $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS 8/8)";
                                    }
                                } else {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS (" + (queIndex - 3).toString() + "/8)";
                                }

                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS (" + (queIndex - 3).toString() + "/8)";
                            }
                            vm.headerStyle = {"color": "#49bbce"};
                            vm.mainStlye = {"background": "#49bbce"};
                            vm.saveStlye = {"color": "#66b6bf"};
                        } else if (queIndex <= 20) {
                            $scope.QuesHeader = "PART 4: YOUR IMPACT (" + (queIndex - 12).toString() + "/6)";
                            vm.headerStyle = {"color": "#d08c5b"};
                            vm.mainStlye = {"background": "#d08c5b"};
                            vm.saveStlye = {"color": "#d08c5b"};
                        }
                    }
                }


            }
            if (countns == vm.allQues.length) {
                $scope.isInitialques = true;
                vm.showQues = false;
                vm.isFirst = false;
            } else {
                if (countns >= 3 && countns < 16) {
                    $scope.isInitialques = false;
                    vm.showQues = true;
                    vm.isFirst = true;
                    // vm.allQues[3]["isVisible"]=true;
                } else if (countns == 0) {
                    vm.allQues[0]["isVisible"] = true;
                    vm.allQues[1]["isVisible"] = true;
                    vm.allQues[2]["isVisible"] = true;

                } else if (countns >= 16) {
                    $scope.isInitialques = false;
                    vm.showQues = true;
                    vm.isFirst = true;
                    var queIndex = countns - 1
                    if ($scope.userHasRole) {
                        var getQue = false;
                        vm.allQues[queIndex]["isVisible"] = false;
                        if (queIndex <= vm.allQues.length - 2) {
                            for (var d = queIndex + 1; d < vm.allQues.length - 1; d++) {
                                if (vm.allQues[d]["roleEffects"].includes($scope.UserInfo["Designation"])) {
                                    vm.allQues[d]["isVisible"] = true;
                                    getQue = true;
                                    break;
                                }

                            }
                            for (var d = queIndex + 1; d < vm.allQues.length; d++) {
                                for (opt = 0; opt < vm.allQues[d]['queOption'].length; opt++) {
                                    if ($scope.interectionPoint.length > 0) {
                                        var text = vm.allQues[d]['queOption'][opt]["optText"].split(" ")[0].trim()

                                        for (var i = 0; i < $scope.interectionPoint.length; i++) {
                                            if (text == $scope.interectionPoint[i]) {
                                                vm.allQues[d]['queOption'][opt]["visible"] = true;
                                            }
                                        }
                                    } else {
                                        vm.allQues[d]['queOption'][opt]["visible"] = true;
                                    }


                                }


                            }


                            if (getQue) {
                                getQue = false;
                                for (var d = queIndex + 2; d < vm.allQues.length - 1; d++) {
                                    if (vm.allQues[d]["roleEffects"].includes($scope.UserInfo["Designation"])) {
                                        //vm.allQues[d]["isVisible"]=true;
                                        getQue = true;
                                        break;
                                    }
                                }
                                if (!getQue) {
                                    $scope.LastQue = true;
                                }
                            } else {
                                vm.allQues[queIndex + 1]["isVisible"] = true;
                                $scope.LastQue = true;

                            }

                        }

                    } else {
                        vm.allQues[queIndex + 1]["isVisible"] = true;
                        vm.allQues[queIndex]["isVisible"] = false;
                        if (vm.allQues[queIndex]["queNo"] > 16) {
                            for (var d = queIndex + 1; d < vm.allQues.length; d++) {
                                for (opt = 0; opt < vm.allQues[d]['queOption'].length; opt++) {
                                    if ($scope.interectionPoint.length > 0) {
                                        var text = vm.allQues[d]['queOption'][opt]["optText"].split(" ")[0].trim()

                                        for (var i = 0; i < $scope.interectionPoint.length; i++) {
                                            if (text == $scope.interectionPoint[i]) {
                                                vm.allQues[d]['queOption'][opt]["visible"] = true;
                                            }
                                        }
                                    } else {
                                        vm.allQues[d]['queOption'][opt]["visible"] = true;
                                    }


                                }


                            }

                        }
                    }
                    if (queIndex + 1 == vm.allQues.length - 1) {
                        $scope.LastQue = true;
                    }

                }
            }

            // vm.allQues[0]["isVisible"]=true;


        }

        $scope.showPreviousButton = function (queIndex) {
            if ($localStorage['User'] != "") {
                $rootScope.record_log("On Leap Curve Loged in with " + $localStorage['User']['Email'] + " on question " + (queIndex + 1) + " by clicking Previous button")
            } else {
                $rootScope.record_log("On Leap Curve as a guestuser is on question " + (queIndex + 1) + " by clicking Previous button")
            }

            $scope.divBgColor = '';
            if (queIndex < 0) {
                var result = vm.allQues.filter(function (obj) {
                    return obj.isVisible == true;
                })[0];
                queIndex = result["queNo"] - 4;

            }

            if (queIndex != 8){
                if (queIndex == 3) {
                    vm.allQues[0]["isVisible"] = true;
                    vm.allQues[1]["isVisible"] = true;
                    if (vm.allQues[1]["userChoice"][0] == 1 || vm.allQues[0]["userChoice"] == 11) {
                        vm.allQues[2]["isVisible"] = false;
                    } else {
                        vm.allQues[2]["isVisible"] = true;
                    }
                    vm.allQues[queIndex]["isVisible"] = false;
                    $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES ";
                    vm.headerStyle = {"color": "#7fcd94"};
                    vm.mainStlye = {"background": "#7fcd94"};
                    vm.saveStlye = {"color": "#82c08c"};
                    $scope.showNext = true;
                    vm.isFirst = false;
                    vm.showQues = true;

                } else if (queIndex > 3) {
                    vm.allQues[queIndex]["isVisible"] = false;
                    if (queIndex == 6) {
                        if (vm.allQues[0]["userChoice"] == 8 || vm.allQues[0]["userChoice"] == 9 || vm.allQues[0]["userChoice"] == 10 || vm.allQues[0]["userChoice"] == 11 || vm.allQues[4]["userChoice"] == 7 || vm.allQues[4]["userChoice"] == 8) {
                            vm.allQues[queIndex - 1]["isVisible"] = false;
                            vm.allQues[queIndex - 2]["isVisible"] = true;
                        } else {
                            vm.allQues[queIndex - 1]["isVisible"] = true;
                        }
                    } else if (queIndex == 12) {
                        if (vm.allQues[4]["userChoice"] == 1 || vm.allQues[4]["userChoice"] == 2 || vm.allQues[9]["userChoice"] == 10) {
                            vm.allQues[queIndex - 1]["isVisible"] = false;
                            vm.allQues[queIndex - 2]["isVisible"] = true;
                        } else {
                            vm.allQues[queIndex - 1]["isVisible"] = true;
                        }
                    } else if (queIndex == 13) {
                        if (vm.allQues[4]["userChoice"] == 1 || vm.allQues[10]["userChoice"] == 1) {
                            vm.allQues[queIndex - 1]["isVisible"] = false;
                            if (vm.allQues[4]["userChoice"] != 1 && vm.allQues[4]["userChoice"] != 2 && vm.allQues[9]["userChoice"] != 10) {
                                vm.allQues[queIndex - 2]["isVisible"] = true;
                            } else {
                                vm.allQues[queIndex - 3]["isVisible"] = true;
                            }
                        } else {
                            vm.allQues[queIndex - 1]["isVisible"] = true;
                        }
                    } else if (queIndex == 14) {
                        if (vm.allQues[4]["userChoice"] == 1 || (vm.allQues[12]["userChoice"] == 1 && $scope.selectedQue_opt['15']) || vm.allQues[10]["userChoice"] == 1) {
                            vm.allQues[queIndex - 1]["isVisible"] = false;
                            if (vm.allQues[4]["userChoice"] != 1 && vm.allQues[10]["userChoice"] != 1) {
                                vm.allQues[queIndex - 2]["isVisible"] = true;
                            } else if (vm.allQues[4]["userChoice"] != 1 && vm.allQues[4]["userChoice"] != 2 && vm.allQues[9]["userChoice"] != 10) {
                                vm.allQues[queIndex - 3]["isVisible"] = true;
                            } else {
                                vm.allQues[queIndex - 4]["isVisible"] = true;
                            }
                        } else {
                            vm.allQues[queIndex - 1]["isVisible"] = true;
                        }
                    } else if (queIndex == 17) {
                        if ((vm.allQues[12]["userChoice"] == 1 && $scope.selectedQue_opt['15']) || vm.allQues[4]["userChoice"] == 1 || vm.allQues[10]["userChoice"] == 1) {
                            vm.allQues[queIndex - 1]["isVisible"] = false;
                            vm.allQues[queIndex - 2]["isVisible"] = true;
                        } else {
                            vm.allQues[queIndex - 1]["isVisible"] = true;
                        }
                    } else if (queIndex == 18) {
                        if (vm.allQues[9]["userChoice"] == 1 && ((vm.allQues[12]["userChoice"] == 1 && $scope.selectedQue_opt['15']) || vm.allQues[4]["userChoice"] == 1 || vm.allQues[10]["userChoice"] == 1)) {
                            vm.allQues[queIndex - 3]["isVisible"] = true;
                        } else if (vm.allQues[9]["userChoice"] == 1) {
                            vm.allQues[queIndex - 1]["isVisible"] = false;
                            vm.allQues[queIndex - 2]["isVisible"] = true;
                        } else {
                            vm.allQues[queIndex - 1]["isVisible"] = true;
                        }

                    } else if (queIndex == 19) {
                        if ((vm.allQues[0]["userChoice"] == 9 || vm.allQues[0]["userChoice"] == 10 || vm.allQues[0]["userChoice"] == 11 || vm.allQues[4]["userChoice"] == 7 || vm.allQues[4]["userChoice"] == 8) && vm.allQues[9]["userChoice"] == 1 && ((vm.allQues[12]["userChoice"] == 1 && $scope.selectedQue_opt['15']) || vm.allQues[4]["userChoice"] == 1 || vm.allQues[10]["userChoice"] == 1)) {
                            vm.allQues[queIndex - 4]["isVisible"] = true;
                        } else if ((vm.allQues[0]["userChoice"] == 9 || vm.allQues[0]["userChoice"] == 10 || vm.allQues[0]["userChoice"] == 11 || vm.allQues[4]["userChoice"] == 7 || vm.allQues[4]["userChoice"] == 8) && vm.allQues[9]["userChoice"] == 1) {
                            vm.allQues[queIndex - 3]["isVisible"] = true;
                        } else if (vm.allQues[0]["userChoice"] == 9 || vm.allQues[0]["userChoice"] == 10 || vm.allQues[0]["userChoice"] == 11 || vm.allQues[4]["userChoice"] == 7 || vm.allQues[4]["userChoice"] == 8) {
                            vm.allQues[queIndex - 1]["isVisible"] = false;
                            vm.allQues[queIndex - 2]["isVisible"] = true;
                        } else {
                            vm.allQues[queIndex - 1]["isVisible"] = true;
                        }
                    } else {
                        if(queIndex == 7){
                            if($scope.is_show_next == true){
                                $scope.is_show_next = false
                                $scope.is_cl_calc = false
                                document.getElementById('main_competency_block').style = "display:block";
                                document.getElementById('competency_ques_header').style = "display:block";
                                document.getElementById('show_selected_ques').style = "display:none";
                                vm.allQues[queIndex]["isVisible"] = true;
                            }
                            else {
                                vm.allQues[queIndex - 1]["isVisible"] = true;
                            }
                        }
                        else{
                            vm.allQues[queIndex - 1]["isVisible"] = true;
                        }
                    }
                    $scope.showNext = true;
                    if ($scope.LastQue == true) {
                        $scope.LastQue = false;
                    }
                } else {
                    vm.showQues = false;
                    $scope.isInitialques = true;


                }
                for (var i = 0; i <= 19; i++) {
                    if (i > 2 && vm.allQues[i]["isVisible"] == true) {
                        $scope.queind = i;
                    } else if (i == 0 || i == 1 || i == 2) {
                        $scope.queind = 2;
                    }
                }
                if (queIndex >= 3) {
                    queIndex = queIndex - 1
                    if (queIndex <= 4) {
                        $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES ";
                        vm.headerStyle = {"color": "#7fcd94"};
                        vm.mainStlye = {"background": "#7fcd94"};
                        vm.saveStlye = {"color": "#82c08c"};
                        $scope.divBgColor = '#7fcd94';
                    } else if (queIndex <= 13) {
                        vm.headerStyle = {"color": "#49bbce"};
                        vm.mainStlye = {"background": "#49bbce"};
                        vm.saveStlye = {"color": "#66b6bf"};
                        if (queIndex == 4) {
                            $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                        } else if (queIndex == 5) {
                            if (vm.allQues[5]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES ";
                                vm.headerStyle = {"color": "#7fcd94"};
                                vm.mainStlye = {"background": "#7fcd94"};
                                vm.saveStlye = {"color": "#82c08c"};
                            } else {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                            }
                        } else {

                            if (queIndex == 13) {
                                if (vm.allQues[10]["isVisible"] == false && vm.allQues[12]["isVisible"] == false && vm.allQues[13]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else if (vm.allQues[12]["isVisible"] == false && vm.allQues[13]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else if (vm.allQues[13]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }

                            } else if (queIndex == 12) {
                                if (vm.allQues[10]["isVisible"] == false && vm.allQues[12]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else if (vm.allQues[12]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }

                            } else if (queIndex == 10) {
                                if (vm.allQues[10]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }
                            } else {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                            }

                        }

                    } else if (queIndex <= 20) {
                        vm.headerStyle = {"color": "#d08c5b"};
                        vm.mainStlye = {"background": "#d08c5b"};
                        vm.saveStlye = {"color": "#d08c5b"};
                        if (queIndex == 18) {
                            if (vm.allQues[18]["isVisible"] == false && vm.allQues[17]["isVisible"] == false && vm.allQues[16]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            } else if (vm.allQues[18]["isVisible"] == false && vm.allQues[17]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            } else if (vm.allQues[18]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            } else {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            }
                        } else if (queIndex == 17) {
                            if (vm.allQues[17]["isVisible"] == false && vm.allQues[16]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            } else if (vm.allQues[17]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            } else {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            }
                        } else if (queIndex == 16 && vm.allQues[16]["isVisible"] == false) {
                            $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                        } else {
                            $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                        }


                    }
                }

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
            else{
    if($scope.go_back_2_step == true){
        // setTimeout(function () {
        vm.allQues[queIndex]["isVisible"] = false;
        vm.allQues[queIndex - 1]["isVisible"] = true;
        $localStorage["guestUser"]['save_campentency_lavel_info'] = []
        setTimeout(function () {
            var campetrncy_info = $localStorage["guestUser"]['campetrncy_info']
            var campetrncy_text_info = $localStorage["guestUser"]['campetrncy_text_info']
            if (campetrncy_text_info != "") {
                document.getElementById('other_competency').checked = true
                document.getElementById('other_competency_text').style = "display:block"
                document.getElementById('other_competency_text').value = campetrncy_text_info;
            }
            if(campetrncy_info.length > 0){
                for (var i = 0; i <= campetrncy_info.length; i++) {
                    document.getElementById(campetrncy_info[i]).checked = true
                }}
        }, 500);

        // vm.allQues[queIndex]["isVisible"] = true;
        // }, 500);
    }
    else {
        if ($scope.ques_details != undefined) {
            vm.allQues[queIndex]["isVisible"] = false;
            vm.allQues[queIndex - 1]["isVisible"] = true;
            // $scope.is_show_next = false
            setTimeout(function () {
                if (queIndex == 8) {
                    var campetrncy_info = $localStorage["guestUser"]['campetrncy_info']
                    var campetrncy_text_info = $localStorage["guestUser"]['campetrncy_text_info']
                    document.getElementById('other_competency').checked = true;
                    document.getElementById('other_competency_text').style = "display:block"
                    document.getElementById('other_competency_text').value = campetrncy_text_info;
                    for (var i = 0; i <= campetrncy_info.length; i++) {
                        document.getElementById(campetrncy_info[i]).checked = true;
                    }
                }
            }, 200);
            var campetrncy_info = $localStorage["guestUser"]['campetrncy_info']
            var campetrncy_text_info = $localStorage["guestUser"]['campetrncy_text_info']

            if (campetrncy_text_info != "" && campetrncy_info.length < 1) {
                setTimeout(function () {
                    document.getElementById('main_competency_block').style = "display:block";
                    document.getElementById('competency_ques_header').style = "display:block";
                    show_saved_competency_ques()
                    document.getElementById('show_selected_ques').style = "display:none";
                }, 300);
            } else {
                setTimeout(function () {
                    document.getElementById('main_competency_block').style = "display:none";
                    document.getElementById('competency_ques_header').style = "display:none";
                    show_saved_competency_ques()
                    document.getElementById('show_selected_ques').style = "display:block";
                }, 300);
            }


        } else {

            vm.allQues[queIndex]["isVisible"] = false;
            vm.allQues[queIndex - 2]["isVisible"] = true;
            setTimeout(function () {

                if (queIndex == 8) {
                    var campetrncy_info = $localStorage["guestUser"]['campetrncy_info']
                    var campetrncy_text_info = $localStorage["guestUser"]['campetrncy_text_info']
                    document.getElementById('other_competency').checked = true
                    document.getElementById('other_competency_text').style = "display:block"
                    document.getElementById('other_competency_text').value = campetrncy_text_info;
                    for (var i = 0; i <= campetrncy_info.length; i++) {
                        document.getElementById(campetrncy_info[i]).checked = true
                    }
                }
            }, 500);
        }
    }
            }

        }

        // $("#show_selected_ques label").hover(function() {
        //     var data = $(this);
        //     $('#show_hover_ques').html(`${data}`).show();
        // });
        // $('#show_selected_ques span').mouseout(function() {
        //     $('#show_hover_ques').hide();
        // });

        function save_data_in_storage(lavel, id) {
            setTimeout(function () {
                var is_checked = document.getElementById(id)
                let sel_name = is_checked.class
                if (sel_name == "1"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][1] = lavel.brief_level_description
                }
                else if (sel_name == "2"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][2] = lavel.brief_level_description
                }
                else if (sel_name == "3"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][3] = lavel.brief_level_description
                }
                else if (sel_name == "4"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][4] = lavel.brief_level_description
                }
                else if (sel_name == "5"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][5] = lavel.brief_level_description
                }
                else if (sel_name == "6"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][6] = lavel.brief_level_description
                }
                else if (sel_name == "7"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][7] = lavel.brief_level_description
                }
                else if (sel_name == "8"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][8] = lavel.brief_level_description
                }
                else if (sel_name == "9"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][9] = lavel.brief_level_description
                }
                else if (sel_name == "10"){
                    $localStorage["guestUser"]['save_campentency_lavel_info'][10] = lavel.brief_level_description
                }
                // var checkboxes = {
                //    1:sel_name
                // };

                if (is_checked.checked) {
                    // $localStorage["guestUser"]['save_campentency_lavel_info'] = checkboxes
                    // $localStorage["guestUser"]['save_campentency_lavel_info'].push(lavel.brief_level_description)
                    var save_campentency_lavel_info = $localStorage["guestUser"]['save_campentency_lavel_info']
                }
            }, 500);

        }

        function show_saved_competency_ques() {
            $scope.selected_details = undefined;
            var  campetrncy_info =  $localStorage["guestUser"]['campetrncy_info']
            var params = {
                campetrncy_info: campetrncy_info,
            }
            $http({
                url: '/users/show_selected_opt_details',
                method: 'post',
                data: params
            }).then(function success(response) {
                var data = response["data"];
                if (data["status"] == 200) {
                    $scope.is_show_next = true
                    var child = document.getElementById("show_selected_ques").innerHTML = "";
                    // if(child.parentNode != undefined){
                    //     child.parentNode.removeChild(child);
                    // }
                    $scope.selected_details = response['data']['selected_details']

                    // for(i=0; i<= $scope.selected_details.length; i++){
                    // var tag = document.createElement("h3");
                    // var text = document.createTextNode(i+1  + '. Select your level for ' + $scope.selected_details[i].competency_name + ":");
                    // tag.appendChild(text);
                    // var element = document.getElementById("show_selected_ques");
                    // element.appendChild(tag);
                    var i =0;
                    for (const [key, value] of Object.entries($scope.selected_details)) {

                        for (const [k, v] of Object.entries(value)) {
                            var tag = document.createElement("h3");
                            if($localStorage["guestUser"]['UserChoices'] != undefined){
                                if ($localStorage["guestUser"]['UserChoices'][1][0] == "1") {
                                    var text = document.createTextNode("10." + (i + 1) + '. Select your level for ' + k + ":");
                                }
                                else{
                                    var text = document.createTextNode("11." + (i + 1) + '. Select your level for ' + k + ":");
                                }
                            } else {
                                if ($localStorage["User"]['UserChoices'][1][0] == "1") {
                                    var text = document.createTextNode("10." + (i + 1) + '. Select your level for ' + k + ":");
                                }
                                else{
                                    var text = document.createTextNode("11." + (i + 1) + '. Select your level for ' + k + ":");
                                }
                            }
                            tag.appendChild(text);
                            var element = document.getElementById("show_selected_ques");
                            element.appendChild(tag);
                            for (const [a, b] of Object.entries(v)) {
                                var br = document.createElement('br');
                                var span = document.createElement('span')
                                span.id = b.competency_description.toLowerCase() + "_" + a
                                span.style = "position:absolute; top:65px; left:4%; float:left; display:none; font-size:15px; background:#ffffff"
                                var checkbox = document.createElement('input');
                                checkbox.type = 'radio';
                                checkbox.id = k.toLowerCase() + "_" + a;
                                checkbox.name = k.toLowerCase();
                                checkbox.class = i+1;
                                if($localStorage["guestUser"]['save_campentency_lavel_info'].includes(b.brief_level_description)){
                                    checkbox.checked = true;
                                }
                                // $("#" + checkbox.id).hover(function() {
                                //     $('#toshow').html(`${countryName}<br>${fruitColour}`).show();
                                // });
                                // $('#menuList a').mouseout(function() {
                                //     $('#toshow').hide();
                                // });
                                // checkbox.name = 'interest';
                                // checkbox.value = 'car';
                                // var text = document.createTextNode( b.brief_level_description + ":");
                                var label = document.createElement('label')
                                label.htmlFor = k.toLowerCase() + "_" + a;
                                // label.onclick = save_data_in_storage(b.level)
                                // label.setAttribute("onclick","valid;")
                                // label.addEventListener('click', save_data_in_storage('lavel'));
                                if ($localStorage["guestUser"]['save_campentency_lavel_info'] == undefined) {
                                    $localStorage["guestUser"]['save_campentency_lavel_info'] = []
                                }
                                label.addEventListener('click', function(){
                                    save_data_in_storage(b,k.toLowerCase() + "_" + a);
                                });
                                label.name = b.competency_description.toLowerCase() + "_" + a
                                label.appendChild(document.createTextNode(b.brief_level_description));

                                span.appendChild(document.createTextNode(b.competency_description));
                                // var br = document.createElement('br');
                                // var text = document.createTextNode( a + ":");
                                tag.appendChild(text);
                                var element = document.getElementById("show_selected_ques");
                                element.appendChild(checkbox);
                                element.appendChild(label);
                                element.appendChild(span);
                                element.appendChild(br);

                                // var container = document.getElementById('container');
                                // container.appendChild(checkbox);
                                // container.appendChild(label);
                                // container.appendChild(br);
                            }}
                        i = i +1;

                    }
                    $scope.is_cl_calc = true
                    // }
                } else {
                    $scope.selected_details = undefined
                    $scope.is_show_next = true
                }
            }, function error(response) {
            });        }
        $scope.showNextQues = function (queIndex) {
            // if (vm.userLevel4 == true) {
            //     vm.userLevel = 3;
            // } else if (vm.userLevel3 == true) {
            //     vm.userLevel = 2;
            // } else if (vm.userLevel2 == true) {
            //     vm.userLevel = 1;
            // } else if (vm.userLevel1 == true) {
            //     vm.userLevel = 0;
            // }
            //
            // if (vm.userLevel4 == null) {
            //     vm.userLevel4 = false;
            // } else if (vm.userLevel3 == null) {
            //     vm.userLevel3 = false;
            // } else if (vm.userLevel2 == null) {
            //     vm.userLevel2 = false;
            // } else if (vm.userLevel1 == null) {
            //     vm.userLevel1 = false;
            // }
            // $scope.userlevelvalue = [vm.userLevel1, vm.userLevel2, vm.userLevel3, vm.userLevel4];
            if (queIndex == 0) {
                if ($scope.ques_details != undefined){
                    vm.allQues[11]["isVisible"] = true;
                }
                else{
                    if ($scope.hiddenQue_value.hasOwnProperty('11')) {
                        $scope.hiddenQue_value['11'] = '1';

                    } else {
                        $scope.hiddenQue_value['11'] = '1';

                    }
                    angular.forEach($scope.hiddenQue_value, function (value, key) {
                        vm.allQues[key - 4]['isVisible'] = false;
                    });
                    //
                }
            }

            if ($localStorage['User'] != "") {
                $rootScope.record_log("On Leap Curve Loged in with " + $localStorage['User']['Email'] + " on question " + (queIndex + 4) + " By clicking on next button")
            } else {
                $rootScope.record_log("On Leap Curve as a guestuser is on question " + (queIndex + 4) + " By clicking on next button")
            }
            if (queIndex < 0) {
                var result = vm.allQues.filter(function (obj) {
                    return obj.isVisible == true;
                })[0];
                queIndex = result["queNo"] - 4;
                if (queIndex == 6) {
                    if ($scope.ques_details == undefined) {
                        vm.allQues[7]["isVisible"] = false;
                    }
                }
                if (queIndex == 7) {
                    if($scope.is_cl_calc == false){
                        var campetrncy_info = $localStorage["guestUser"]['campetrncy_info']
                        if (document.getElementById('other_competency_text').value === ""){
                            if ((campetrncy_info.length < 3) || (campetrncy_info.length > 8)){
                                toaster.pop("info", "", "Please select at least 3 and at most 8. Add your own if not available in list OR Select Other Option. ");
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                                return;
                            }
                            else if ((campetrncy_info.length >= 3) && campetrncy_info.length < 9){
                                show_saved_competency_ques();
                                $localStorage["guestUser"]['save_campentency_lavel_info'] = []
                            }
                            $scope.go_back_2_step = false
                        }

                            // if (document.getElementById('other_competency_text').value == "") {
                            //     toaster.pop("info", "", "Please answer the question.");
                            //     if (!$scope.$$phase) {
                            //         $scope.$apply();
                            //     }
                            //     return;
                        // }
                        else{
                            if ((campetrncy_info.length < 3)){
                                vm.allQues[queIndex + 1]["isVisible"] = true;
                                vm.allQues[queIndex]["isVisible"] = false;
                                var other_competency_text = document.getElementById('other_competency_text').value
                                $localStorage["guestUser"]['campetrncy_text_info'] = other_competency_text
                                $scope.go_back_2_step = true
                                $localStorage["guestUser"]['save_campentency_lavel_info'] = []
                                // toaster.pop("info", "", "Please select at least 3 and at most 8. Add your own if not available in list OR Select Other Option. ");
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                                return;
                            }

                            else{
                            var other_competency_text = document.getElementById('other_competency_text').value
                            $localStorage["guestUser"]['campetrncy_text_info'] = other_competency_text
                            show_saved_competency_ques();
                                $localStorage["guestUser"]['save_campentency_lavel_info'] = []
                            }
                        }
                    }
                    else{
                        setTimeout(function () {
                            var  compentency_cl =  $localStorage["guestUser"]['save_campentency_lavel_info']

                            var params = {
                                compentency_cl: compentency_cl,
                            }
                            $http({
                                url: '/users/conpentency_cl_cal',
                                method: 'post',
                                data: params
                            }).then(function success(response) {
                                var data = response["data"];
                                if (data["status"] == 200) {
                                    $scope.is_show_next = true
                                    $localStorage["guestUser"]['total_cl_compentency_per'] = response["data"]['total_cal_per']

                                } else {
                                    $scope.is_show_next = true
                                }
                            }, function error(response) {
                            });
                        }, 500);
                        var array =  $localStorage["guestUser"]['save_campentency_lavel_info']
                        var filtered = array.filter(function (el) {
                            return el != null;
                        });
                        var is_select_all_cl_ques = filtered.length == $localStorage["guestUser"]['campetrncy_info'].length
                        if(is_select_all_cl_ques != true){
                            toaster.pop("info", "", "Please select Every Questions Option.");
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return;
                        }
                    }
                }
                if (queIndex != 7) {
                    if (isNaN(vm.allQues[queIndex]['userChoice']) || vm.allQues[queIndex]['userChoice'].length == 0) {
                        toaster.pop("info", "", "Please answer the question.");
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return;
                    }
                }
            }
            if (queIndex != 7){
                if (queIndex == 0) {
                    //if(vm.userLevel==0){toaster.pop("info","","Please choose greater then 0 level.");return;}
                    if (isallDataGet(vm.userLevel)) {
                        for (var que = 0; que < vm.allQues.length; que++) {

                            vm.allQues[que]["isVisible"] = false;
                        }
                        vm.allQues[0]["isVisible"] = true;
                        vm.allQues[1]["isVisible"] = true;
                        if (vm.allQues[1]["queOption"][0]["optSelect"] == true || vm.allQues[0]["queOption"][10]["optSelect"] == true) {
                            vm.allQues[2]["isVisible"] = false;
                        } else {
                            vm.allQues[2]["isVisible"] = true;
                        }

                        //$scope.showNext=true;
                        vm.showQues = true;
                        $scope.isInitialques = false;
                        vm.isFirst = false;
                        $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES ";
                        vm.headerStyle = {"color": "#7fcd94"};
                        vm.mainStlye = {"background": "#7fcd94"};
                        vm.saveStlye = {"color": "#82c08c"};
                        $scope.divBgColor = '#7fcd94';
                    } else {
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return;
                    }
                    $scope.hiddenQue_value = {};

                    $scope.hiddenQue(queIndex, (vm.allQues[queIndex]["userChoice"]) - 1);

                } else if (queIndex == 2) {

                    var isallselected = true;
                    if (vm.allQues[0]['userChoice'].length == 0) {
                        toaster.pop("info", "", "Please answer question 4");
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return;
                    }
                    if (vm.allQues[1]['userChoice'].length == 0) {

                        vm.empTxtno = parseInt(vm.empTxtno);
                        if (vm.allQues[1]["queOption"][4]["optSelect"] == false) {
                            toaster.pop("info", "", "Please answer question 5");
                            return;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                        if (vm.empTxtno <= 1000 || angular.isUndefined(vm.empTxtno)) {
                            toaster.pop("info", "", "Number should be greater than 1000 ");
                            return;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        } else {
                            vm.allQues[1]['userChoice'] = [5, vm.empTxtno];
                            if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                                if ($localStorage["User"]['UserChoices'].length >= 2) {
                                    $localStorage["User"]['UserChoices'][1] = [5, vm.empTxtno];
                                } else {
                                    $localStorage["User"]['UserChoices'].push([5, vm.empTxtno]);
                                }

                            } else {
                                if ($localStorage["guestUser"]['UserChoices'].length >= 2) {
                                    $localStorage["guestUser"]['UserChoices'][1] = [5, vm.empTxtno];
                                } else {
                                    $localStorage["guestUser"]['UserChoices'].push([5, vm.empTxtno]);
                                }
                            }
                        }
                    } else if (vm.allQues[1]['userChoice'][0] == 5) {

                        if (vm.allQues[1]['userChoice'][1] <= 1000) {
                            toaster.pop('info', '', 'Number should be greater than 1000.');
                            return;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        } else {
                            vm.empTxtno = vm.allQues[1]['userChoice'][1];
                        }

                    }
                    $scope.hiddenQue(queIndex, (vm.allQues[queIndex]["userChoice"]) - 1);
                    if (vm.allQues[2]['userChoice'].length == 0) {
                        toaster.pop("info", "", "Please answer question 6");
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return;
                    }


                    if (queIndex < 4) {
                        $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES ";
                    } else if (queIndex < 13) {
                        if (queIndex == 4) {
                            $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                        } else if (queIndex == 5) {
                            $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                        } else {

                            $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                        }
                        vm.headerStyle = {"color": "#49bbce"};
                        vm.mainStlye = {"background": "#49bbce"};
                        vm.saveStlye = {"color": "#66b6bf"};
                    } else if (queIndex <= 20) {
                        $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                        vm.headerStyle = {"color": "#d08c5b"};
                        vm.mainStlye = {"background": "#d08c5b"};
                        vm.saveStlye = {"color": "#d08c5b"};
                    }

                    if (isallselected) {


                        vm.allQues[0]["isVisible"] = false;
                        vm.allQues[1]["isVisible"] = false;
                        vm.allQues[2]["isVisible"] = false;
                        vm.allQues[queIndex + 1]["isVisible"] = true;
                        $scope.hiddenQue(queIndex, (vm.allQues[queIndex]["userChoice"]) - 1);
                        $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES ";
                        vm.isFirst = true;
                        $scope.UserInfo["EffectiveLevel"] = parseInt(vm.userLevel) + 1;
                        for (var opt = 0; opt < vm.allQues[queIndex + 1]['queOption'].length; opt++) {
                            if (vm.allQues[queIndex]['queOption'][opt]["optSelect"] == true) {
                                effect = vm.allQues[0]['queOption'][opt]["effect"];
                                if (data["intersection"].length > 0) {
                                    $scope.interectionPoint = intersect_safe(data["intersection"][0]["Effects"], effect);
                                }
                            }
                        }


                    }

                } else if (queIndex > 2 && queIndex < 13) {
                    vm.allQues[queIndex]["isVisible"] = false;
                    vm.allQues[queIndex + 1]["isVisible"] = true;
                    $scope.hiddenQue(queIndex, (vm.allQues[queIndex]["userChoice"]) - 1);
                    if (queIndex < 4) {
                        $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES ";
                    } else if (queIndex < 13) {
                        vm.headerStyle = {"color": "#49bbce"};
                        vm.mainStlye = {"background": "#49bbce"};
                        vm.saveStlye = {"color": "66b6bf"}
                        if (queIndex == 4) {
                            if (vm.allQues[5]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                            } else {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                            }
                        } else if (queIndex == 5) {
                            $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                        } else {


                            if (queIndex == 9) {
                                if (vm.allQues[10]["isVisible"] == false && vm.allQues[12]["isVisible"] == false && vm.allQues[13]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                                    vm.headerStyle = {"color": "#d08c5b"};
                                    vm.mainStlye = {"background": "#d08c5b"};
                                    vm.saveStlye = {"color": "d08c5b"}

                                } else if (vm.allQues[10]["isVisible"] == false && vm.allQues[12]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else if (vm.allQues[10]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }
                            } else if (queIndex == 10) {
                                if (vm.allQues[12]["isVisible"] == false && vm.allQues[13]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                                    vm.headerStyle = {"color": "#d08c5b"};
                                    vm.mainStlye = {"background": "#d08c5b"};
                                    vm.saveStlye = {"color": "d08c5b"}
                                } else if (vm.allQues[12]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }
                            } else if (queIndex == 12) {
                                if (vm.allQues[13]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                                    vm.headerStyle = {"color": "#d08c5b"};
                                    vm.mainStlye = {"background": "#d08c5b"};
                                    vm.saveStlye = {"color": "d08c5b"}
                                } else {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }
                            } else {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                            }


                        }

                    } else if (queIndex <= 20) {
                        $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                        vm.headerStyle = {"color": "#d08c5b"};
                        vm.mainStlye = {"background": "#d08c5b"};
                        vm.saveStlye = {"color": "d08c5b"}

                    }
                } else {
                    if ($scope.userHasRole) {
                        var getQue = false;
                        vm.allQues[queIndex]["isVisible"] = false;
                        if (queIndex <= vm.allQues.length - 2) {
                            for (var d = queIndex + 1; d < vm.allQues.length - 1; d++) {
                                if (vm.allQues[d]["roleEffects"].includes($scope.UserInfo["Designation"])) {
                                    vm.allQues[d]["isVisible"] = true;
                                    getQue = true;
                                    break;
                                }

                            }
                            for (var d = queIndex + 1; d < vm.allQues.length; d++) {
                                for (opt = 0; opt < vm.allQues[d]['queOption'].length; opt++) {
                                    if ($scope.interectionPoint.length > 0) {
                                        var text = vm.allQues[d]['queOption'][opt]["optText"].split(" ")[0].trim()

                                        for (var i = 0; i < $scope.interectionPoint.length; i++) {
                                            if (text == $scope.interectionPoint[i]) {
                                                vm.allQues[d]['queOption'][opt]["visible"] = true;
                                            }
                                        }
                                    } else {
                                        vm.allQues[d]['queOption'][opt]["visible"] = true;
                                    }


                                }


                            }


                            if (getQue) {
                                getQue = false;
                                for (var d = queIndex + 2; d < vm.allQues.length - 1; d++) {
                                    if (vm.allQues[d]["roleEffects"].includes($scope.UserInfo["Designation"])) {
                                        //vm.allQues[d]["isVisible"]=true;
                                        getQue = true;
                                        break;
                                    }
                                }
                                if (!getQue) {
                                    $scope.LastQue = true;
                                }
                            } else {
                                vm.allQues[queIndex + 1]["isVisible"] = true;
                                $scope.LastQue = true;

                            }

                        }

                    } else {
                        vm.allQues[queIndex + 1]["isVisible"] = true;
                        vm.allQues[queIndex]["isVisible"] = false;
                        $scope.hiddenQue(queIndex, (vm.allQues[queIndex]["userChoice"]) - 1);
                        if (vm.allQues[queIndex]["queNo"] > 16) {
                            for (var d = queIndex + 1; d < vm.allQues.length; d++) {
                                for (opt = 0; opt < vm.allQues[d]['queOption'].length; opt++) {
                                    if ($scope.interectionPoint.length > 0) {
                                        var text = vm.allQues[d]['queOption'][opt]["optText"].split(" ")[0].trim()

                                        for (var i = 0; i < $scope.interectionPoint.length; i++) {
                                            if (text == $scope.interectionPoint[i]) {
                                                vm.allQues[d]['queOption'][opt]["visible"] = true;
                                            }
                                        }
                                    } else {
                                        vm.allQues[d]['queOption'][opt]["visible"] = true;
                                    }


                                }


                            }

                        }
                    }

                    if (queIndex + 1 == vm.allQues.length - 1) {
                        $scope.LastQue = true;
                    }
                    if (queIndex < 4) {
                        $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES ";
                    } else if (queIndex < 13) {
                        vm.headerStyle = {"color": "#49bbce"};
                        vm.mainStlye = {"background": "#49bbce"};
                        vm.saveStlye = {"color": "66b6bf"}
                        if (queIndex == 4) {
                            if (vm.allQues[5]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                            } else {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                            }
                        } else if (queIndex == 5) {
                            $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                        } else {


                            if (queIndex == 9) {
                                if (vm.allQues[10]["isVisible"] == false && vm.allQues[12]["isVisible"] == false && vm.allQues[13]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 4: YOUR IMPACT (1/6)" + $scope.quehead[$scope.queind] + "%";
                                    vm.headerStyle = {"color": "#d08c5b"};
                                    vm.mainStlye = {"background": "#d08c5b"};
                                    vm.saveStlye = {"color": "d08c5b"}

                                } else if (vm.allQues[10]["isVisible"] == false && vm.allQues[12]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else if (vm.allQues[10]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }
                            } else if (queIndex == 10) {
                                if (vm.allQues[12]["isVisible"] == false && vm.allQues[13]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                                    vm.headerStyle = {"color": "#d08c5b"};
                                    vm.mainStlye = {"background": "#d08c5b"};
                                    vm.saveStlye = {"color": "d08c5b"}
                                } else if (vm.allQues[12]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }
                            } else if (queIndex == 11) {
                                if (vm.allQues[13]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                                    vm.headerStyle = {"color": "#d08c5b"};
                                    vm.mainStlye = {"background": "#d08c5b"};
                                    vm.saveStlye = {"color": "d08c5b"}
                                }
                            } else {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                            }


                        }

                    } else if (queIndex <= 20) {
                        if (queIndex == 15 && vm.allQues[16]["isVisible"] == false) {
                            $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                        } else if (queIndex == 17 && vm.allQues[18]["isVisible"] == false) {
                            $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                        } else {
                            $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                        }

                        vm.headerStyle = {"color": "#d08c5b"};
                        vm.mainStlye = {"background": "#d08c5b"};
                        vm.saveStlye = {"color": "#d08c5b"};
                    }

                }

                if (!$scope.$$phase) {
                    $scope.$apply();
                }

            }
            else{
                if(queIndex == 7){
                    // setTimeout(function () {
                    var campetrncy_info = $localStorage["guestUser"]['campetrncy_info']
                    if (document.getElementById('other_competency_text').value != "" && campetrncy_info.length < 1){
                        vm.allQues[queIndex]["isVisible"] = false;
                        vm.allQues[queIndex + 1]["isVisible"] = true;
                    }
                    else{
                        if($scope.is_show_next == true){
                            vm.allQues[queIndex]["isVisible"] = false;
                            vm.allQues[queIndex + 1]["isVisible"] = true;
                        }
                        else{
                            document.getElementById('main_competency_block').style = "display:none"
                            document.getElementById('competency_ques_header').style = "display:none"
                            document.getElementById('show_selected_ques').style = "display:block"
                        }}
                    // }, 200);
                }
                else{
                    vm.allQues[queIndex]["isVisible"] = false;
                    vm.allQues[queIndex + 1]["isVisible"] = true;
                }

            }
        }
        $scope.showInformation = function () {
            vm.allQues[7]["isVisible"] = false;

            if ($localStorage["User"] == "") {
                $scope.userinformation = {
                    industry: $localStorage.guestUser.Industry,
                    role: $localStorage.guestUser.Role,
                    lavel: $localStorage.guestUser.EffectiveLevel
                }
                var params = {data: $scope.userinformation}
                $http({
                    url: '/users/getquestioninformation',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    var data = response["data"];
                    if (data["status"] == 200) {
                        $scope.ques_details = response['data']['ques_details']
                        // vm.allQues[7]["isVisible"] = true;
                    } else {
                        setTimeout(function () {
                            $scope.hiddenQue_value['11'] = '1';

                            angular.forEach($scope.hiddenQue_value, function (value, key) {
                                vm.allQues[key - 4]["isVisible"] = false;
                            });
                            $scope.ques_details = undefined
                        }, 500);

                    }
                }, function error(response) {
                });
            }
            else{
                $scope.userinformation = {
                    industry: $localStorage.User.Industry,
                    role: $localStorage.User.Role,
                    lavel: $localStorage.User.EffectiveLevel
                }
                var params = {data: $scope.userinformation}
                $http({
                    url: '/users/getquestioninformation',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    var data = response["data"];
                    if (data["status"] == 200) {
                        $scope.ques_details = response['data']['ques_details']
                        // vm.allQues[7]["isVisible"] = true;
                    } else {
                        setTimeout(function () {
                            $scope.hiddenQue_value['11'] = '1';

                            angular.forEach($scope.hiddenQue_value, function (value, key) {
                                vm.allQues[key - 4]["isVisible"] = false;
                            });
                            $scope.ques_details = undefined
                        }, 500);

                    }
                }, function error(response) {
                });
            }
        }

        var index = 0
        $localStorage["guestUser"]['campetrncy_info'] = []
        $localStorage["guestUser"]['campetrncy_text_info'] = ""
        $scope.save_copetency_info = function (opt_value) {
            if(document.getElementById(opt_value).checked == true){
                if (opt_value == "other_competency"){
                    document.getElementById('other_competency_text').style = "display:block"
                }
                else {
                    $localStorage["guestUser"]['campetrncy_info'].push(opt_value)
                }
            }
            else{
                if (opt_value == "other_competency"){
                    document.getElementById('other_competency_text').style = "display:none"
                    $localStorage["guestUser"]['campetrncy_text_info'] = ""
                    document.getElementById("other_competency_text").value = ""
                }
                else {
                    // var splice_index = parseInt(document.getElementById(opt_value).className)
                    var splice_index = $localStorage["guestUser"]['campetrncy_info'].indexOf(opt_value)
                    // $localStorage["guestUser"]['campetrncy_info'].splice(opt_value, 1)
                    $localStorage["guestUser"]['campetrncy_info'].splice(splice_index,1)
                }
            }
            index = index + 1
        }
        $scope.selectOption = function (Optindex, queIndex) {

            // $scope.selectedopt[vm.allQues[2]['userChoice'] - 1] = vm.allQues[2]['queOption'][vm.allQues[2]['userChoice'] - 1]["optSelect"];
            if (queIndex != 7) {
                if ($localStorage['User'] != "") {
                    $rootScope.record_log("On Leap Curve Loged in with " + $localStorage['User']['Email'] + " on question " + (queIndex + 4) + " selected option " + Optindex)
                } else {
                    $rootScope.record_log("On Leap Curve as a guestuser is on question " + (queIndex + 4) + " selected option " + Optindex)
                }
                if ((queIndex <= vm.allQues.length - 2 && vm.allQues[queIndex + 1]["isVisible"] == true) || queIndex <= 2) {
                    if (queIndex == 1) {
                        vm.empTxtno = parseInt(vm.empTxtno);
                        $scope.ques5selectIndex = Optindex;
                        for (var opt = 0; opt < vm.allQues[queIndex]['queOption'].length; opt++) {
                            vm.allQues[queIndex]['queOption'][opt]["optSelect"] = false;

                        }

                        if (Optindex == 4 && (vm.empTxtno <= 1000 || angular.isUndefined(vm.empTxtno))) {
                            vm.allQues[queIndex]['queOption'][Optindex]["optSelect"] = true;
                            if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                                if ($localStorage["User"]['UserChoices'].length >= 2) {
                                    $localStorage["User"]['UserChoices'][1] = [];
                                } else {
                                    $localStorage["User"]['UserChoices'].push([]);
                                }
                                vm.allQues[queIndex]['userChoice'] = [];
                            } else {
                                if ($localStorage["guestUser"]['UserChoices'].length >= 2) {
                                    $localStorage["guestUser"]['UserChoices'][1] = [];
                                } else {
                                    $localStorage["guestUser"]['UserChoices'].push([]);
                                }
                                vm.allQues[queIndex]['userChoice'] = [];
                            }
                            toaster.pop('info', 'Please enter a number in text box.', '');
                        } else {

                            vm.allQues[queIndex]['queOption'][Optindex]["optSelect"] = true;

                            if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                                if ($localStorage["User"]['UserChoices'].length >= 2) {
                                    $localStorage["User"]['UserChoices'][1] = [Optindex + 1, 0];
                                } else {
                                    $localStorage["User"]['UserChoices'].push([Optindex + 1, 0]);
                                }
                                vm.allQues[queIndex]['userChoice'] = [Optindex + 1, 0];
                            } else {
                                if ($localStorage["guestUser"]['UserChoices'].length >= 2) {
                                    $localStorage["guestUser"]['UserChoices'][1] = [Optindex + 1, 0];
                                } else {
                                    $localStorage["guestUser"]['UserChoices'].push([Optindex + 1, 0]);
                                }
                                vm.allQues[queIndex]['userChoice'] = [Optindex + 1, 0];
                            }

                        }

                    } else {
                        if (queIndex == 2) {
                            if ($scope.selectedopt[Optindex] == false) {
                                $scope.selectedopt[Optindex] = true;
                            } else {
                                $scope.selectedopt[Optindex] = false;
                            }
                            if ($scope.selectedopt[5] == true) {
                                vm.allQues[queIndex]['userChoice'] = 6;
                            } else if ($scope.selectedopt[4] == true) {
                                vm.allQues[queIndex]['userChoice'] = 5;
                            } else if ($scope.selectedopt[3] == true) {
                                vm.allQues[queIndex]['userChoice'] = 4;
                            } else if ($scope.selectedopt[2] == true) {
                                vm.allQues[queIndex]['userChoice'] = 3;
                            } else if ($scope.selectedopt[1] == true) {
                                vm.allQues[queIndex]['userChoice'] = 2;
                            } else if ($scope.selectedopt[0] == true) {
                                vm.allQues[queIndex]['userChoice'] = 1;
                            }
                            // if(vm.allQues[queIndex]['queOption'][Optindex]["optSelect"] == false){
                            //     vm.allQues[queIndex]['queOption'][Optindex]["optSelect"] = false;
                            // }else {
                            //     vm.allQues[queIndex]['queOption'][Optindex]["optSelect"] = true;
                            // }
                            // if(!vm.allQues[queIndex]['userChoice']>1){
                            //     vm.allQues[queIndex]['userChoice']=Optindex+1;
                            // }
                            // else if(vm.allQues[queIndex]['userChoice']>0&&vm.allQues[queIndex]['userChoice']<=Optindex+1){
                            //     vm.allQues[queIndex]['userChoice']=Optindex+1;
                            // }


                        } else {
                            for (var opt = 0; opt < vm.allQues[queIndex]['queOption'].length; opt++) {
                                vm.allQues[queIndex]['queOption'][opt]["optSelect"] = false;
                                vm.allQues[queIndex]['queOption'][Optindex]["optSelect"] = true;
                                vm.allQues[queIndex]['userChoice'] = Optindex + 1;
                            }
                        }


                        if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                            if ($localStorage["User"]['UserChoices'].length >= (queIndex + 1)) {
                                $localStorage["User"]['UserChoices'][queIndex] = vm.allQues[queIndex]['userChoice'];

                            } else {
                                $localStorage["User"]['UserChoices'][queIndex] = vm.allQues[queIndex]['userChoice'];

                            }

                        } else {
                            if ($localStorage["guestUser"]['UserChoices'].length >= (queIndex + 1)) {
                                $localStorage["guestUser"]['UserChoices'][queIndex] = vm.allQues[queIndex]['userChoice'];
                            } else {
                                $localStorage["guestUser"]['UserChoices'][queIndex] = vm.allQues[queIndex]['userChoice'];
                            }

                        }

                    }
                    if (queIndex != 2) {
                        $scope.hiddenQue(queIndex, Optindex);
                    }

                    return;
                } else if (queIndex == vm.allQues.length - 1) {
                    toaster.pop("info", "", "Please click CONTINUE when you are ready");

                    $scope.ques5selectIndex = 0;
                    for (var opt = 0; opt < vm.allQues[queIndex]['queOption'].length; opt++) {
                        vm.allQues[queIndex]['queOption'][opt]["optSelect"] = false;

                    }
                    vm.allQues[queIndex]['queOption'][Optindex]["optSelect"] = true;
                    // if (queIndex != 2) {
                    //     $scope.hiddenQue(queIndex, Optindex);
                    // }
                    if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                        if ($localStorage["User"]['UserChoices'].length >= (queIndex + 1)) {
                            $localStorage["User"]['UserChoices'][queIndex] = Optindex + 1;
                        } else {
                            $localStorage["User"]['UserChoices'].push(Optindex + 1);
                        }
                        vm.allQues[queIndex]['userChoice'] = Optindex + 1;

                    } else {
                        if ($localStorage["guestUser"]['UserChoices'].length >= (queIndex + 1)) {
                            $localStorage["guestUser"]['UserChoices'][queIndex] = Optindex + 1;
                        } else {
                            $localStorage["guestUser"]['UserChoices'].push(Optindex + 1);
                        }
                        vm.allQues[queIndex]['userChoice'] = Optindex + 1;
                    }
                    if (queIndex != 2) {
                        $scope.hiddenQue(queIndex, Optindex);
                    }
                    return;
                } else {
                    $scope.ques5selectIndex = 0;
                    for (var opt = 0; opt < vm.allQues[queIndex]['queOption'].length; opt++) {
                        vm.allQues[queIndex]['queOption'][opt]["optSelect"] = false;

                    }
                    vm.allQues[queIndex]['queOption'][Optindex]["optSelect"] = true;

                    setTimeout(function () {

                        if (vm.allQues[queIndex]["isVisible"] == true && $scope.LastQue == false && queIndex > 2) {

                            for (var x = 0; x < vm.allQues.length; x++) {
                                vm.allQues[x]["isVisible"] = false;
                            }
                            vm.allQues[queIndex + 1]["isVisible"] = true;
                            var preQueNo = queIndex;
                            var isMultiShow = false;
                            // if (queIndex<=vm.allQues.length-2)
                            // {
                            //     for (var x=queIndex+1;x<vm.allQues.length-6;x++)
                            //     {
                            //         if(vm.allQues[x]["queOption"].length<8 && preQueNo==x-1)
                            //         {
                            //             vm.allQues[x]["isVisible"]=true;
                            //             preQueNo=x;
                            //             isMultiShow=true;
                            //
                            //         }
                            //
                            //     }
                            //
                            // }
                            if ($scope.userHasRole) {
                                if (vm.allQues[queIndex]["queNo"] <= 17) {
                                    if (!isMultiShow) {
                                        vm.allQues[queIndex + 1]["isVisible"] = true;
                                        $scope.hiddenQue(queIndex, Optindex);

                                    }
                                } else {

                                    var getQue = false;
                                    if (queIndex <= vm.allQues.length - 2) {
                                        for (var d = queIndex + 1; d < vm.allQues.length - 1; d++) {
                                            if (vm.allQues[d]["roleEffects"].includes($scope.UserInfo["Designation"])) {
                                                vm.allQues[d]["isVisible"] = true;
                                                getQue = true;
                                                break;
                                            }

                                        }
                                        for (var d = queIndex + 1; d < vm.allQues.length; d++) {
                                            for (opt = 0; opt < vm.allQues[d]['queOption'].length; opt++) {
                                                if ($scope.interectionPoint.length > 0) {
                                                    var text = vm.allQues[d]['queOption'][opt]["optText"].split(" ")[0].trim()

                                                    for (var i = 0; i < $scope.interectionPoint.length; i++) {
                                                        if (text == $scope.interectionPoint[i]) {
                                                            vm.allQues[d]['queOption'][opt]["visible"] = true;
                                                        }
                                                    }
                                                } else {
                                                    vm.allQues[d]['queOption'][opt]["visible"] = true;
                                                }


                                            }


                                        }


                                        if (getQue) {
                                            getQue = false;
                                            for (var d = queIndex + 2; d < vm.allQues.length - 1; d++) {
                                                if (vm.allQues[d]["roleEffects"].includes($scope.UserInfo["Designation"])) {
                                                    //vm.allQues[d]["isVisible"]=true;
                                                    getQue = true;
                                                    break;
                                                }
                                            }
                                            if (!getQue) {
                                                $scope.LastQue = true;
                                            }
                                        } else {
                                            vm.allQues[queIndex + 1]["isVisible"] = true;
                                            $scope.LastQue = true;

                                        }

                                    }

                                }
                            } else {
                                if (!isMultiShow) {
                                    vm.allQues[queIndex + 1]["isVisible"] = true;
                                    $scope.hiddenQue(queIndex, Optindex);

                                }
                                if (vm.allQues[queIndex]["queNo"] > 16) {
                                    for (var d = queIndex + 1; d < vm.allQues.length; d++) {
                                        for (opt = 0; opt < vm.allQues[d]['queOption'].length; opt++) {
                                            if ($scope.interectionPoint.length > 0) {
                                                var text = vm.allQues[d]['queOption'][opt]["optText"].split(" ")[0].trim()

                                                for (var i = 0; i < $scope.interectionPoint.length; i++) {
                                                    if (text == $scope.interectionPoint[i]) {
                                                        vm.allQues[d]['queOption'][opt]["visible"] = true;
                                                    }
                                                }
                                            } else {
                                                vm.allQues[d]['queOption'][opt]["visible"] = true;
                                            }


                                        }


                                    }

                                }
                            }
                            if (queIndex + 1 == vm.allQues.length - 1) {
                                $scope.LastQue = true;
                            }
                        }
                        if (queIndex < 4) {

                            $scope.QuesHeader = "PART 2: YOUR RESPONSIBLITIES ";
                        } else if (queIndex < 13) {
                            vm.headerStyle = {"color": "#49bbce"};
                            vm.mainStlye = {"background": "#49bbce"};
                            vm.saveStlye = {"color": "66b6bf"}
                            if (queIndex == 4) {
                                if (vm.allQues[5]["isVisible"] == false) {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                } else {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }
                            } else if (queIndex == 5) {
                                $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                            } else {


                                if (queIndex == 10) {
                                    if (vm.allQues[11]["isVisible"] == false && vm.allQues[12]["isVisible"] == false && vm.allQues[13]["isVisible"] == false) {
                                        $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                                        vm.headerStyle = {"color": "#d08c5b"};
                                        vm.mainStlye = {"background": "#d08c5b"};
                                        vm.saveStlye = {"color": "d08c5b"}

                                    } else if (vm.allQues[11]["isVisible"] == false && vm.allQues[12]["isVisible"] == false) {
                                        $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                    } else if (vm.allQues[11]["isVisible"] == false) {
                                        $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                    } else {
                                        $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                    }
                                } else if (queIndex == 11) {
                                    if (vm.allQues[12]["isVisible"] == false && vm.allQues[13]["isVisible"] == false) {
                                        $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                                        vm.headerStyle = {"color": "#d08c5b"};
                                        vm.mainStlye = {"background": "#d08c5b"};
                                        vm.saveStlye = {"color": "d08c5b"}
                                    } else if (vm.allQues[12]["isVisible"] == false) {
                                        $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                    } else {
                                        $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                    }
                                } else if (queIndex == 12) {
                                    if (vm.allQues[13]["isVisible"] == false) {
                                        $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                                        vm.headerStyle = {"color": "#d08c5b"};
                                        vm.mainStlye = {"background": "#d08c5b"};
                                        vm.saveStlye = {"color": "d08c5b"}
                                    } else {
                                        $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                    }
                                } else {
                                    $scope.QuesHeader = "PART 3: YOUR EFFECTIVENESS ";
                                }


                            }

                        } else if (queIndex <= 20) {
                            if (queIndex == 15 && vm.allQues[16]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            } else if (queIndex == 17 && vm.allQues[18]["isVisible"] == false) {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            } else {
                                $scope.QuesHeader = "PART 4: YOUR IMPACT ";
                            }

                            vm.headerStyle = {"color": "#d08c5b"};
                            vm.mainStlye = {"background": "#d08c5b"};
                            vm.saveStlye = {"color": "#d08c5b"};
                        }

                        vm.isFirst = true;
                        // vm.allQues[queIndex]['queOption'][Optindex]["optSelect"] = true;
                        vm.allQues[queIndex]['userChoice'] = Optindex + 1;
                        if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                            if ($localStorage["User"]['UserChoices'].length >= (queIndex + 1)) {
                                $localStorage["User"]['UserChoices'][queIndex] = Optindex + 1;
                            } else {
                                $localStorage["User"]['UserChoices'].push(Optindex + 1);
                            }
                            vm.allQues[queIndex]['userChoice'] = Optindex + 1;

                        } else {
                            if ($localStorage["guestUser"]['UserChoices'].length >= (queIndex + 1)) {
                                $localStorage["guestUser"]['UserChoices'][queIndex] = Optindex + 1;
                            } else {
                                $localStorage["guestUser"]['UserChoices'].push(Optindex + 1);
                            }
                            vm.allQues[queIndex]['userChoice'] = Optindex + 1;
                        }

                        if (queIndex != 2) {
                            $scope.hiddenQue(queIndex, Optindex);
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }

                    }, 1000);
                }

            }
        }
        vm.getEmpNo = function () {

            if (vm.empTxtno > 1000 && angular.isDefined(vm.empTxtno)) {
                vm.allQues[1]['userChoice'] = [];

                if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                    if ($localStorage["User"]['UserChoices'].length >= 2) {
                        $localStorage["User"]['UserChoices'][1] = [];
                    } else {
                        $localStorage["User"]['UserChoices'].push([]);
                    }

                } else {
                    if ($localStorage["guestUser"]['UserChoices'].length >= 2) {
                        $localStorage["guestUser"]['UserChoices'][1] = [];
                    } else {
                        $localStorage["guestUser"]['UserChoices'].push([]);
                    }
                }
            } else {
                vm.empTxtno = 1001;
            }

            $interval(function () {
                if (vm.empTxtno > 1000) {
                    $scope.show = true;
                } else {
                    $scope.show = false;
                }
            }, (1000));


        };


        $scope.CalculateScore = function () {
            var score = 0;
            // $scope.UserInfo["UserChoices"] = [];
            for (var pt = 0; pt < vm.allQues.length; pt++) {
                if (vm.allQues[pt]["queNo"] != 11) {
                    if (vm.allQues[pt]["userChoice"].length == 0) {
                        toaster.pop("info", "", "Please answer the question no " + vm.allQues[pt]["queNo"]);
                        return;
                    }
                }
            }
            $scope.UserInfo["Score"] = 0;
            // $scope.UserInfo["userlevelvalue"] = $scope.userlevelvalue;
            if ($localStorage["User"] != "") {
                $scope.UserInfo["selectedopt"] = $scope.selectedopt;
            } else {
                $localStorage["guestUser"]["selectedopt"] = $scope.UserInfo["selectedopt"] = $scope.selectedopt;
            }

            if (angular.isDefined($localStorage["User"])) {
                if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                    // $scope.UserInfo["UserChoices"] = $scope.UserInfo["UserChoices"].toString();
                    $scope.UserInfo["UserChoices"] = $localStorage["User"]['UserChoices'];
                    delete $scope.UserInfo["isNew"];
                    var params = {data: $scope.UserInfo}
                    $http({
                        url: '/users/updateUserInfo',
                        method: 'post',
                        data: params
                    }).then(function success(response) {

                        var data = response["data"];
                        if (data["status"] == 200) {


                            if (data["msg"] == "Successfully Updated") {
                                //toaster.pop('success','',data["msg"]+".Please Login. ");
                                // alert(data["msg"]);
                                $scope.username = $scope.UserInfo = data["user"];
                                $localStorage["User"] = $scope.UserInfo;
                                //vm.mainStlye={"background":"#ffffff"};
                                // $scope.showLoader=false;
                                if ($localStorage["User"] == "") {
                                    if ($localStorage["User"]["ClickMode"] == "AM") {
                                        $scope.resolvDataFun($http, $localStorage);
                                        // $scope.reportValuesFun();
                                        //    $state.go('app.briefreport');
                                    } else if ($localStorage["User"]["ClickMode"] == "FRC") {
                                        $state.go('app.ranking');
                                    }
                                } else {
                                    $scope.resolvDataFun($http, $localStorage);
                                    // $scope.reportValuesFun();
                                    // $state.go('app.briefreport');
                                }
                            } else {
                                toaster.pop('error', '', data["msg"]);
                                return;
                            }
                        } else {
                            //toaster.pop('error','',data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
                    }, function error(response) {

                    });
                    $scope.showLoader = true;
                } else {
                    $scope.UserInfo["UserChoices"] = $localStorage["guestUser"]['UserChoices'];
                    var params = {data: $scope.UserInfo}
                    $http({
                        url: '/users/getUserLevel',
                        method: 'post',
                        data: params
                    }).then(function success(response) {
                        $scope.showLoader = true;
                        var data = response["data"];
                        if (data.hasOwnProperty('level')) {
                            $scope.UserInfo["Level"] = parseInt(data["level"]);
                            $localStorage["guestUser"] = $scope.UserInfo;
                            //vm.mainStlye={"background":"#ffffff"};
                            // $scope.showLoader=false;


                            if ($localStorage["guestUser"]["ClickMode"] == "AM") {
                                $scope.resolvDataFun($http, $localStorage);
                                // $scope.reportValuesFun();
                                //    $state.go('app.briefreport');
                            } else if ($localStorage["guestUser"]["ClickMode"] == "FRC") {
                                $state.go('app.ranking');
                            }
                        }
                    }, function error(response) {
                    })
                    $scope.showLoader = true;
                }
            } else if (angular.isDefined($localStorage["guestUser"])) {
                $scope.UserInfo["UserChoices"] = $localStorage["guestUser"]['UserChoices'];
                var params = {data: $scope.UserInfo}
                $http({
                    url: '/users/getUserLevel',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    $scope.showLoader = true;
                    var data = response["data"];

                    if (data.hasOwnProperty('level')) {
                        $scope.UserInfo["Level"] = parseInt(data["level"]);
                        $localStorage["guestUser"] = $scope.UserInfo;
                        //vm.mainStlye={"background":"#ffffff"};
                        // $scope.showLoader=false;
                        if ($localStorage["guestUser"]["ClickMode"] == "AM") {
                            $scope.resolvDataFun($http, $localStorage);
                            // $scope.reportValuesFun();
                            //    $state.go('app.briefreport');
                        } else if ($localStorage["guestUser"]["ClickMode"] == "FRC") {
                            $state.go('app.ranking');
                        }
                    }
                }, function error(response) {
                })

                $scope.showLoader = true;
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        vm.enableButton = function (btnName) {
            vm.btn1Selected = false;
            vm.btn2Selected = false;
            vm.btn3Selected = false;
            vm.btn4Selected = false;

            switch (btnName) {
                case "button1":
                    vm.btn1Selected = true;
                    break;
                    if (vm.btn1Selected) {
                        vm.btn1Selected = false;
                    } else {
                        vm.btn1Selected = true;
                        $scope.btn2Selected = false;
                        $scope.btn3Selected = false;
                        $scope.btn4Selected = false;
                    }

                    //getCompansationChart();
                    break;
                case "button2":
                    vm.btn2Selected = true;
                    break;
                    if ($scope.btn2Selected) {
                        $scope.btn2Selected = false;
                    } else {
                        $scope.btn2Selected = true;
                        $scope.btn1Selected = false;
                        $scope.btn3Selected = false;
                        $scope.btn4Selected = false;
                    }
                    break;
                case "button3":
                    vm.btn3Selected = true;
                    break;
                    if ($scope.btn3Selected) {
                        $scope.btn3Selected = false;
                    } else {
                        $scope.btn3Selected = true;
                        $scope.btn2Selected = false;
                        $scope.btn1Selected = false;
                        $scope.btn4Selected = false;
                    }
                    break;
                case "button4":
                    vm.btn4Selected = true;
                    break;
                    if ($scope.btn4Selected) {
                        $scope.btn4Selected = false;
                    } else {
                        $scope.btn4Selected = true;
                        $scope.btn2Selected = false;
                        $scope.btn3Selected = false;
                        $scope.btn1Selected = false;
                    }
                    break;
                default :
                    return;

            }


        }
        $scope.checkAllData = function (index) {
            //isallDataGet(index);
            var x = document.getElementById(index.toString());
            x.style.border = "2px solid buttonface";
            for (var i = 0; i < 10; i++) {
                var x1 = document.getElementById(i.toString());
                if (i == index) {

                    continue;

                } else {

                    x1.style.border = "none";
                }

            }
            vm.userLevel = index + 1;

        }

        function isallDataGet(index) {
            vm.userLevel = index;

            if (vm.btn1Selected || vm.btn2Selected || vm.btn3Selected || vm.btn4Selected) {
                if (vm.btn1Selected) {
                    if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                        if ($localStorage["User"]['CompanyDetails'].length > 0 && $localStorage["User"]['CompanyDetails'][0] != 4) {
                            $localStorage["User"]['CompanyDetails'][0] = (4);
                            $scope.UserInfo['CompanyDetails'][0] = (4);
                        } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                            $localStorage["User"]['CompanyDetails'].push(4);
                            $scope.UserInfo['CompanyDetails'].push(4);
                        }
                    } else {
                        if ($localStorage["guestUser"]['CompanyDetails'].length > 0 && $localStorage["guestUser"]['CompanyDetails'][0] != 4) {
                            $localStorage["guestUser"]['CompanyDetails'][0] = (4);
                            $scope.UserInfo['CompanyDetails'][0] = (4);
                        } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                            $localStorage["guestUser"]['CompanyDetails'].push(4);
                            $scope.UserInfo['CompanyDetails'].push(4);
                        }
                    }

                } else if (vm.btn2Selected) {
                    if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                        if ($localStorage["User"]['CompanyDetails'].length > 0 && $localStorage["User"]['CompanyDetails'][0] != 3) {
                            $localStorage["User"]['CompanyDetails'][0] = (3);
                            $scope.UserInfo['CompanyDetails'][0] = (3);
                        } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                            $localStorage["User"]['CompanyDetails'].push(3);
                            $scope.UserInfo['CompanyDetails'].push(3);
                        }
                    } else {
                        if ($localStorage["guestUser"]['CompanyDetails'].length > 0
                            && $localStorage["guestUser"]['CompanyDetails'][0] != 3) {
                            $localStorage["guestUser"]['CompanyDetails'][0] = (3);
                            $scope.UserInfo['CompanyDetails'][0] = (3);
                        } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                            $localStorage["guestUser"]['CompanyDetails'].push(3);
                            $scope.UserInfo['CompanyDetails'].push(3);
                        }

                    }
                } else if (vm.btn3Selected) {
                    if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                        if ($localStorage["User"]['CompanyDetails'].length > 0
                            && $localStorage["User"]['CompanyDetails'][0] != 2) {
                            $localStorage["User"]['CompanyDetails'][0] = (2);
                            $scope.UserInfo['CompanyDetails'][0] = (2);
                        } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                            $localStorage["User"]['CompanyDetails'].push(2);
                            $scope.UserInfo['CompanyDetails'].push(2);
                        }
                    } else {
                        if ($localStorage["guestUser"]['CompanyDetails'].length > 0
                            && $localStorage["guestUser"]['CompanyDetails'][0] != 2) {
                            $localStorage["guestUser"]['CompanyDetails'][0] = (2);
                            $scope.UserInfo['CompanyDetails'][0] = (2);
                        } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                            $localStorage["guestUser"]['CompanyDetails'].push(2);
                            $scope.UserInfo['CompanyDetails'].push(2);
                        }
                    }
                } else if (vm.btn4Selected) {
                    if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                        if ($localStorage["User"]['CompanyDetails'].length > 0 && $localStorage["User"]['CompanyDetails'][0] != 1) {
                            $localStorage["User"]['CompanyDetails'][0] = (1);
                            $scope.UserInfo['CompanyDetails'][0] = (1);
                        } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                            $localStorage["User"]['CompanyDetails'].push(1);
                            $scope.UserInfo['CompanyDetails'].push(1);
                        }
                    } else {
                        if ($localStorage["guestUser"]['CompanyDetails'].length > 0
                            && $localStorage["guestUser"]['CompanyDetails'][0] != 1) {
                            $localStorage["guestUser"]['CompanyDetails'][0] = (1);
                            $scope.UserInfo['CompanyDetails'][0] = (1);
                        } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                            $localStorage["guestUser"]['CompanyDetails'].push(1);
                            $scope.UserInfo['CompanyDetails'].push(1);
                        }

                    }
                }
                if (parseInt(vm.Employee) > 0) {
                    if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                        if ($localStorage["User"]['CompanyDetails'].length > 1 && $localStorage["User"]['CompanyDetails'][1] != vm.Employee) {
                            $localStorage["User"]['CompanyDetails'][1] = (vm.Employee);
                            $scope.UserInfo['CompanyDetails'][1] = (vm.Employee);
                        } else if ($localStorage["User"]['CompanyDetails'].length == 1) {
                            $localStorage["User"]['CompanyDetails'].push(vm.Employee);
                            $scope.UserInfo['CompanyDetails'].push(vm.Employee);
                        }
                    } else {
                        if ($localStorage["guestUser"]['CompanyDetails'].length > 1 && $localStorage["guestUser"]['CompanyDetails'][1] != vm.Employee) {
                            $localStorage["guestUser"]['CompanyDetails'][1] = (vm.Employee);
                            $scope.UserInfo['CompanyDetails'][1] = (vm.Employee);
                        } else if ($localStorage["guestUser"]['CompanyDetails'].length == 1) {
                            $localStorage["guestUser"]['CompanyDetails'].push(vm.Employee);
                            $scope.UserInfo['CompanyDetails'].push(vm.Employee);
                        }

                    }
                    if (parseInt(vm.Revanu) > 0) {
                        if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                            if ($localStorage["User"]['CompanyDetails'].length > 2 && $localStorage["User"]['CompanyDetails'][1] != vm.Revanu) {
                                $localStorage["User"]['CompanyDetails'][2] = (vm.Revanu);
                                $scope.UserInfo['CompanyDetails'][2] = (vm.Revanu);
                            } else if ($localStorage["User"]['CompanyDetails'].length == 2) {
                                $localStorage["User"]['CompanyDetails'].push(vm.Revanu);
                                $scope.UserInfo['CompanyDetails'].push(vm.Revanu);
                            }
                        } else {
                            if ($localStorage["guestUser"]['CompanyDetails'].length > 2 && $localStorage["guestUser"]['CompanyDetails'][1] != vm.Revanu) {
                                $localStorage["guestUser"]['CompanyDetails'][2] = (vm.Revanu);
                                $scope.UserInfo['CompanyDetails'][2] = (vm.Revanu);
                            } else if ($localStorage["guestUser"]['CompanyDetails'].length == 2) {
                                $localStorage["guestUser"]['CompanyDetails'].push(vm.Revanu);
                                $scope.UserInfo['CompanyDetails'].push(vm.Revanu);
                            }
                        }
                        if (vm.userLevel >= 0) {
                            if (vm.designation != "") {
                                $scope.UserInfo["EffectiveLevel"] = parseInt(vm.userLevel) + 1;
                                if ($scope.UserInfo["isNew"]) {
                                    //vm.Progress=true;
                                    vm.showQues = true;
                                    $scope.isInitialques = false;

                                } else {
                                    vm.Progress = false;
                                    $scope.isInitialques = false;
                                    vm.showQues = true;
                                }
                                modifyQuestions();
                                return true;
                            } else {
                                toaster.pop('info', "", "Please enter your designation.");
                            }
                        } else {
                            toaster.pop('info', "", "Please answer  question number 3");
                            return false;
                        }
                    } else {
                        toaster.pop('info', "", "Please answer  question number 2");
                        return false;
                    }
                } else {
                    toaster.pop('info', "", "Please answer  question number 2");
                    return false;
                }
            } else {
                toaster.pop('info', "", "Please answer  question number 1");
                return false;
            }
        }

        $scope.greet = function () {
            var allSelect = isAnySelected();
            if (vm.userLevel != "") {
                if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                    $localStorage["User"]["EffectiveLevel"] = parseInt(vm.userLevel) + 1;
                    $scope.UserInfo["EffectiveLevel"] = parseInt(vm.userLevel) + 1;
                    vm.Progress = false;
                    $scope.isInitialques = false;
                    vm.showQues = true;

                } else {
                    $localStorage["guestUser"]["EffectiveLevel"] = parseInt(vm.userLevel) + 1;
                    $scope.UserInfo["EffectiveLevel"] = parseInt(vm.userLevel) + 1;
                    vm.Progress = false;
                    $scope.isInitialques = false;
                    vm.showQues = true;

                }


            }
        };
        vm.saveUserInfo = function () {
            var score = 0;
            $scope.UserInfo["UserChoices"] = [];
            for (var pt = 0; pt < vm.allQues.length; pt++) {
                score = score + (vm.allQues[pt]["userChoice"]);
                $scope.UserInfo["UserChoices"].push(vm.allQues[pt]["userChoice"]);
            }
            $scope.UserInfo["Score"] = score;
            $scope.UserInfo["UserChoices"] = $scope.UserInfo["UserChoices"];
            delete $scope.UserInfo["isNew"];
            var params = {data: $scope.UserInfo}
            $http({
                url: '/users/updateUserInfo',
                method: 'post',
                data: params
            }).then(function success(response) {
                var data = response["data"];
                if (data["status"] == 200) {
                    if (data["msg"] == "Successfully Updated") {
                        //toaster.pop('success','',data["msg"]+".Please Login. ");
                        // alert(data["msg"]);
                        $scope.username = $localStorage["User"] = data["user"];
                        //$scope.isLogin=false;
                        $state.go('page.index');
                    } else {
                        toaster.pop('error', '', data["msg"]);
                        return;
                    }


                } else {
                    //toaster.pop('error','',data["msg"]);
                    // alert(data["msg"]);
                    return;
                }
            }, function error(response) {

            })

        }
        vm.logout = function () {
            var user = {};
            if ($localStorage["User"].hasOwnProperty('UserChoices')) {
                user = $localStorage["User"];
                if (user['UserChoices'] != null && user['UserChoices'].length > 0) {
                    user['UserChoices'] = user['UserChoices'];
                }

            }

            if (user.hasOwnProperty('UserChoices')) {
                var params = {data: user}
                $http({
                    url: '/users/updateUserInfo',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    var data = response["data"];
                    if (data["status"] == 200) {
                        if (data["msg"] == "Successfully Updated") {
                            $localStorage["User"] = '';
                            $localStorage["guestUser"] = '';
                            vm.isLogin = false;
                            vm.userinfo = {email: "", password: ""};
                            toaster.pop("info", "", "User successfully logged out.");
                            $state.go('page.index');
                        } else {
                            toaster.pop('error', '', data["msg"]);
                            return;
                        }


                    } else {
                        return;
                    }
                }, function error(response) {

                })
            } else {
                $localStorage["User"] = '';
                $localStorage["guestUser"] = '';
                vm.isLogin = false;
                vm.userinfo = {email: "", password: ""};
                toaster.pop("info", "", "User successfully logged out.");

                $state.go('page.index');
            }
        }

        function intersect_safe(a, b) {
            var result = [];
            if (a.length == b.length) {
                for (chk = 0; chk < a.length; chk++) {
                    for (chkb = 0; chkb < b.length; chkb++) {
                        if (a[chk].toUpperCase() == b[chkb].toUpperCase()) {
                            result.push(a[chk]);
                            break;
                        }
                    }
                }
            } else if (a.length > b.length) {
                for (chk = 0; chk < a.length; chk++) {
                    for (chkb = 0; chkb < b.length; chkb++) {
                        if (a[chk].toUpperCase() == b[chkb].toUpperCase()) {
                            result.push(a[chk]);
                            break;
                        }
                    }
                }
            } else {
                for (chk = 0; chk < b.length; chk++) {
                    for (chkb = 0; chkb < a.length; chkb++) {
                        if (b[chk].toUpperCase() == a[chkb].toUpperCase()) {
                            result.push(a[chk]);
                            break;
                        }
                    }
                }
            }
            var ai = 0, bi = 0;


            while (ai < a.length && bi < b.length) {
                if (a[ai] < b[bi]) {
                    ai++;
                } else if (a[ai] > b[bi]) {
                    bi++;
                } else /* they're equal */
                {
                    result.push(a[ai]);
                    ai++;
                    bi++;
                }
            }

            return result;
        }

        vm.OpenLogin = function () {
            if (isAnySelected()) {
                $localStorage["guestUser"]["EffectiveLevel"] = parseInt(vm.userLevel) + 1;
                var modalInstance = $uibModal.open({
                    templateUrl: "/assets/templates/signUpPop.html",
                    controller: initialUserLogin,
                    size: "sm",
                    backdrop: 'static',
                    resolve: {
                        'userInfo': function () {
                            return $localStorage["guestUser"]
                        }
                    }
                });
            } else {
                toaster.pop('info', '', 'Please answer at lease one question before save.')
            }
        }

        function isAnySelected() {
            var isanySelected = false;
            if ($localStorage["guestUser"]['CompanyDetails'].length < 3) {
                $localStorage["guestUser"]['CompanyDetails'][0] = 0;
                $localStorage["guestUser"]['CompanyDetails'][1] = 0;
                $localStorage["guestUser"]['CompanyDetails'][2] = 0;
                if (vm.btn1Selected || vm.btn2Selected || vm.btn3Selected || vm.btn4Selected) {
                    isanySelected = true;

                    if (vm.btn1Selected) {

                        if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                            if ($localStorage["User"]['CompanyDetails'].length > 0 && $localStorage["User"]['CompanyDetails'][0] != 1) {
                                $localStorage["User"]['CompanyDetails'][0] = (4);
                                $scope.UserInfo['CompanyDetails'][0] = (4);
                            } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                                $localStorage["User"]['CompanyDetails'].push(4);
                                $scope.UserInfo['CompanyDetails'].push(4);
                            }

                        } else {
                            if ($localStorage["guestUser"]['CompanyDetails'].length > 0 && $localStorage["guestUser"]['CompanyDetails'][0] != 1) {
                                $localStorage["guestUser"]['CompanyDetails'][0] = (4);
                                $scope.UserInfo['CompanyDetails'][0] = (4);
                            } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                                $localStorage["guestUser"]['CompanyDetails'].push(4);
                                $scope.UserInfo['CompanyDetails'].push(4);
                            }
                        }

                    } else if (vm.btn2Selected) {
                        if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                            if ($localStorage["User"]['CompanyDetails'].length > 0 && $localStorage["User"]['CompanyDetails'][0] != 2) {
                                $localStorage["User"]['CompanyDetails'][0] = (3);
                                $scope.UserInfo['CompanyDetails'][0] = (3);
                            } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                                $localStorage["User"]['CompanyDetails'].push(3);
                                $scope.UserInfo['CompanyDetails'].push(3);
                            }
                        } else {
                            if ($localStorage["guestUser"]['CompanyDetails'].length > 0
                                && $localStorage["guestUser"]['CompanyDetails'][0] != 2) {
                                $localStorage["guestUser"]['CompanyDetails'][0] = (3);
                                $scope.UserInfo['CompanyDetails'][0] = (3);
                            } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                                $localStorage["guestUser"]['CompanyDetails'].push(3);
                                $scope.UserInfo['CompanyDetails'].push(3);
                            }

                        }
                    } else if (vm.btn3Selected) {
                        if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                            if ($localStorage["User"]['CompanyDetails'].length > 0
                                && $localStorage["User"]['CompanyDetails'][0] != 3) {
                                $localStorage["User"]['CompanyDetails'][0] = (2);
                                $scope.UserInfo['CompanyDetails'][0] = (2);
                            } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                                $localStorage["User"]['CompanyDetails'].push(2);
                                $scope.UserInfo['CompanyDetails'].push(2);
                            }
                        } else {
                            if ($localStorage["guestUser"]['CompanyDetails'].length > 0
                                && $localStorage["guestUser"]['CompanyDetails'][0] != 3) {
                                $localStorage["guestUser"]['CompanyDetails'][0] = (2);
                                $scope.UserInfo['CompanyDetails'][0] = (2);
                            } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                                $localStorage["guestUser"]['CompanyDetails'].push(2);
                                $scope.UserInfo['CompanyDetails'].push(2);
                            }
                        }
                    } else if (vm.btn4Selected) {
                        if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                            if ($localStorage["User"]['CompanyDetails'].length > 0 && $localStorage["User"]['CompanyDetails'][0] != 4) {
                                $localStorage["User"]['CompanyDetails'][0] = (1);
                                $scope.UserInfo['CompanyDetails'][0] = (1);
                            } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                                $localStorage["User"]['CompanyDetails'].push(1);
                                $scope.UserInfo['CompanyDetails'].push(1);
                            }
                        } else {
                            if ($localStorage["guestUser"]['CompanyDetails'].length > 0
                                && $localStorage["guestUser"]['CompanyDetails'][0] != 4) {
                                $localStorage["guestUser"]['CompanyDetails'][0] = (1);
                                $scope.UserInfo['CompanyDetails'][0] = (1);
                            } else if ($scope.UserInfo['CompanyDetails'].length == 0) {
                                $localStorage["guestUser"]['CompanyDetails'].push(1);
                                $scope.UserInfo['CompanyDetails'].push(1);
                            }

                        }
                    }

                }
                if (parseInt(vm.Employee) > 0) {
                    isanySelected = true;
                    $localStorage["guestUser"]['CompanyDetails'][1] = 0;
                    if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                        if ($localStorage["User"]['CompanyDetails'].length > 1 && $localStorage["User"]['CompanyDetails'][1] != vm.Employee) {
                            $localStorage["User"]['CompanyDetails'][1] = (vm.Employee);
                            $scope.UserInfo['CompanyDetails'][1] = (vm.Employee);
                        } else if ($localStorage["User"]['CompanyDetails'].length == 1) {
                            $localStorage["User"]['CompanyDetails'].push(vm.Employee);
                            $scope.UserInfo['CompanyDetails'].push(vm.Employee);
                        }
                    } else {
                        if ($localStorage["guestUser"]['CompanyDetails'].length > 1 && $localStorage["guestUser"]['CompanyDetails'][1] != vm.Employee) {
                            $localStorage["guestUser"]['CompanyDetails'][1] = (vm.Employee);
                            $scope.UserInfo['CompanyDetails'][1] = (vm.Employee);
                        } else if ($localStorage["guestUser"]['CompanyDetails'].length == 1) {
                            $localStorage["guestUser"]['CompanyDetails'].push(vm.Employee);
                            $scope.UserInfo['CompanyDetails'].push(vm.Employee);
                        }

                    }
                }
                if (parseInt(vm.Revanu) > 0) {
                    isanySelected = true;
                    $localStorage["guestUser"]['CompanyDetails'][2] = 0;
                    if (angular.isDefined("User") && $localStorage["User"].hasOwnProperty("Email")) {
                        if ($localStorage["User"]['CompanyDetails'].length > 2 && $localStorage["User"]['CompanyDetails'][2] != vm.Revanu) {
                            $localStorage["User"]['CompanyDetails'][2] = (vm.Revanu);
                            $scope.UserInfo['CompanyDetails'][2] = (vm.Revanu);
                        } else if ($localStorage["User"]['CompanyDetails'].length == 2) {
                            $localStorage["User"]['CompanyDetails'].push(vm.Revanu);
                            $scope.UserInfo['CompanyDetails'].push(vm.Revanu);
                        }
                    } else {
                        if ($localStorage["guestUser"]['CompanyDetails'].length > 2 && $localStorage["guestUser"]['CompanyDetails'][2] != vm.Revanu) {
                            $localStorage["guestUser"]['CompanyDetails'][2] = (vm.Revanu);
                            $scope.UserInfo['CompanyDetails'][2] = (vm.Revanu);
                        } else if ($localStorage["guestUser"]['CompanyDetails'].length == 2) {
                            $localStorage["guestUser"]['CompanyDetails'].push(vm.Revanu);
                            $scope.UserInfo['CompanyDetails'].push(vm.Revanu);
                        }
                    }


                }
                if (vm.userLevel >= 0) {
                    isanySelected = true;
                    {
                        $scope.UserInfo["EffectiveLevel"] = parseInt(vm.userLevel) + 1;
                        if ($scope.UserInfo["isNew"]) {
                            //vm.Progress=true;
                            vm.showQues = false;
                            $scope.isInitialques = true;

                        } else {
                            vm.Progress = false;
                            $scope.isInitialques = false;
                            vm.showQues = true;
                        }

                        ///return true;
                    }
                }
                return isanySelected;
            } else {
                return true;
            }
        }

        vm.openForm = function () {
            if (isAnySelected()) {
                guestUserLogin("", "Mylestones");
            } else {
                return;
            }

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

            } else if (from == 'linkedIn') {
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
                        } else {
                            toaster.pop('info', '', data["msg"]);
                            vm.guestuserinfo["email"] = "";
                            vm.guestuserinfo["password"] = "";
                            // alert(data["msg"]);
                            return;
                        }

                    } else {
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

                } else {
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
                                } else {
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
                            } else {
                                toaster.pop('info', '', "Please choose an option below.");
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
                        } else {
                            toaster.pop('info', '', data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
                    }

                } else {
                    toaster.pop('error', '', data["msg"]);
                    //*9+alert(data["msg"]);
                    return;
                }
            }, function error() {
            });

        }
        $rootScope.forgetPassword = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/forgetPassword.html",
                controller: getEmailPassword,
                size: "sm",
                backdrop: 'static'
            });

        }

        function getEmailPassword($scope, $uibModalInstance, toaster, $http) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.loginuser = {
                "Email": ""
            }
            $scope.get_email = function () {

                var user = $scope.loginuser;
                if (user.Email == undefined || user.Email == "") {
                    toaster.pop('alert', "Please enter a valid Email-ID");
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
                        toaster.pop('info', '', data["msg"]);
                        $uibModalInstance.close();
                    }


                }, function error(response) {

                })
            }
        }

        getEmailPassword.$inject = ["$scope", "$uibModalInstance", "toaster", '$http'];

        function initialUserLogin($scope, $uibModalInstance, toaster, $http, userInfo) {

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
                , "Salary": userInfo.Salary
                , "Role": userInfo.Role,
                "Education": userInfo.Education,
                "Company": userInfo.Company,
                "Experience": userInfo.Experience,
                "Designation": userInfo.Designation,
                "Industry": userInfo.Industry,
                "Institute": userInfo.Institute,
                "Level": 0,
                "CompanyDetails": userInfo.CompanyDetails,
                "UserChoices": userInfo.UserChoices,
                "EffectiveLevel": vm.userLevel,
                "selectedopt": userInfo["selectedopt"]
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

                                $uibModalInstance.close();
                                $state.go($state.current, {}, {reload: true});


                                // $state.go('app.getStarted')
                            } else {
                                toaster.pop('info', '', data["msg"]);
                                $uibModalInstance.close();
                                return;
                            }
                        } else {
                            toaster.pop('error', '', data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
                    }, function error(response) {

                    })
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

        initialUserLogin.$inject = ["$scope", "$uibModalInstance", "toaster", '$http', 'userInfo'];


    }

})();