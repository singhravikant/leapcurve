(function () {
    'use strict';

    angular
        .module('naut')
        .controller('BriefReportController', BriefReportController);

    BriefReportController.$inject = ['$scope', '$state', 'resolvData', '$localStorage', '$uibModal', '$linkedIn', 'reportValues', '$http', 'toaster', '$rootScope']

    function BriefReportController($scope, $state, resolvData, $localStorage, $uibModal, $linkedIn, reportValues, $http, toaster, $rootScope) {
        var vm = this;
        // var resolvData, reportValues;
        // if($localStorage['User']!=""){
        //     if($localStorage['User'].hasOwnProperty('resolvData')&&$localStorage['User'].hasOwnProperty('reportValues')&&$localStorage['User']['resolvData']!={}){
        //         resolvData = $localStorage['User']["resolvData"] ;
        //         reportValues = $localStorage['User']["reportValues"] ;
        //     }else{
        //         $scope.resolvDataFun();
        //         $scope.reportValuesFun();
        //     }
        // }
        // else{
        //     if($localStorage['guestUser'].hasOwnProperty('resolvData')&&$localStorage['guestUser'].hasOwnProperty('reportValues')){
        //         resolvData = $localStorage['guestUser']["resolvData"] ;
        //         reportValues = $localStorage['guestUser']["reportValues"] ;
        //     }else{
        //         $scope.resolvDataFun();
        //         $scope.reportValuesFun();
        //     }
        //
        // }


        $scope.reportvalue = reportValues['reportData'];
        $scope.salary = resolvData['data'];
        $scope.growth = resolvData['data2'];
        $scope.userInfo = resolvData['userInfo'];
        $scope.ppxstatus = resolvData['ppx'];
        if ($localStorage["User"] != "") {
            $localStorage["User"]['newtext'] = resolvData['newtext'];
        } else {
            $localStorage["guestUser"]['newtext'] = resolvData['newtext'];
        }


        $(document).ready(function () {
            $("#flip").click(function () {
                $("#panel").slideToggle("slow");
            });
        });

        $scope.userDesigs = resolvData["userDesigs"];
        $scope.nextDesigs = resolvData["nextDesigs"];
        $scope.highestDesigs = resolvData["highestDesigs"];
        $scope.currentLevel = $scope.userInfo['level'];
        $scope.percentvalue = $scope.userInfo['percentValue'];
        // $localStorage["User"]["Company"] = $scope.Company;
        $scope.highestFilter = {};
        var highest = '';
        vm.allFunction = resolvData["allFunctions"];
        $scope.ShowEmail = $localStorage["User"]["Email"];
        vm.Industries = resolvData["allIndustry"];
        vm.Companies = resolvData["allCompanies"];
        vm.Institute = resolvData["allInstitute"];
        vm.degree = resolvData["alldgree"];
        vm.guestuserinfo = {};
        $scope.levels = resolvData['level'];
        $scope.Company = "";
        $scope.Role = "";
        $scope.Industry = "";
        $scope.Level = $scope.currentLevel;
        $scope.isLogin = false;
        $scope.btnComanyPromotion = false;
        $scope.btnFunIndPromotion = false;
        $scope.btnFunPromotion = false;
        $scope.btnFunGrpPromotion = false;
        $scope.btnIndGrpPromotion = false;
        $scope.btnIndPromotion = false;
        $scope.changefunction = true;
        $scope.changeindustry = true;

        // function gen_pdf(){
            $scope.gen_pdf = function () {

                const element = document.getElementById('res_table')
            // html2pdf()
            //     .from(element)
            //     .save();
                var option = {
                    // margin: 0,
                    filename: 'result.pdf',
                    // image: {type: 'jpeg', quality: 0.98},
                    // html2canvas: {scale: 2},
                    // jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
                };
                html2pdf().from(element).set(option).save();
        }

        if (($localStorage.guestUser.save_campentency_lavel_info != undefined) && $localStorage.guestUser.save_campentency_lavel_info.length > 0) {
            get_compentency_result();
            $scope.compettency_result = true
        }
        else{
            $scope.compettency_result = false

        }
        function get_compentency_result() {
            var result = $localStorage.guestUser.save_campentency_lavel_info.filter(n => n);
            $scope.position = $localStorage.guestUser.Designation
            $scope.organisation = $localStorage.guestUser.Institute
            $scope.function = $localStorage.guestUser.Role
            // for (var a = 0; a < result.length; a++) {
                var params = {data: result}
                $http({
                    url: '/users/get_compentency_result',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    $scope.showLoader = true;
                    var data = response["data"];
                    $scope.compentency_result = data
                });

            // }
        }
            $scope.delete=function () {
    var isconfirm=confirm("Do you want to delete this account")
    if(isconfirm){
        $http({
            url: '/users/delete_account',
            method: 'post',
            data: $localStorage['User']
        }).then(function success(response) {
            toaster.pop("info", "", response['data']['msg']);
            if(response['data']['status']==200){
                $localStorage['User']="";
                $localStorage['guestUser']="";
                location.href='#!/page/index';
            }

        });
    }

}

        if ($localStorage["User"] != "") {
            $localStorage["User"]["changeindustry"] = true;
            if ($localStorage["User"]["Industry"].trim() == "Accounting" || $localStorage["User"]["Industry"].trim() == "Human Resources" || $localStorage["User"]["Industry"].trim() == "Information Services" || $localStorage["User"]["Industry"].trim() == "Management Consulting" || $localStorage["User"]["Industry"].trim() == "Outsourcing/Offshoring" || $localStorage["User"]["Industry"].trim() == "Professional Services\n") {
                $localStorage["User"]["changeindustry"] = $scope.changeindustry = false;

            }
        }
        else if ($localStorage["User"] == "") {
            $localStorage["guestUser"]["changeindustry"] = true;
            if ($localStorage["guestUser"]["Industry"].trim() == "Accounting" || $localStorage["guestUser"]["Industry"].trim() == "Human Resources" || $localStorage["guestUser"]["Industry"].trim() == "Information Services" || $localStorage["guestUser"]["Industry"].trim() == "Management Consulting" || $localStorage["guestUser"]["Industry"].trim() == "Outsourcing/Offshoring" || $localStorage["guestUser"]["Industry"].trim() == "Professional Services\n") {
                $localStorage["guestUser"]["changeindustry"] = $scope.changeindustry = false;
            }
        }


        if ($localStorage["User"] != "") {
            $localStorage["User"]["changefunction"] = true;
            if ($localStorage["User"]["Role"].trim() == "Category Management" || $localStorage["User"]["Role"].trim() == "Education" || $localStorage["User"]["Role"].trim() == "Exploration" || $localStorage["User"]["Role"].trim() == "Fashion Design" || $localStorage["User"]["Role"].trim() == "Information Technology" || $localStorage["User"]["Role"].trim() == "Marketing" || $localStorage["User"]["Role"].trim() == "Project Management" || $localStorage["User"]["Role"].trim() == "Sales" || $localStorage["User"]["Role"].trim() == "Software Development") {
                $localStorage["User"]["changefunction"] = $scope.changefunction = false;

            }
        }
        else if ($localStorage["User"] == "") {
            $localStorage["guestUser"]["changefunction"] = true;
            if ($localStorage["guestUser"]["Role"].trim() == "Category Management" || $localStorage["guestUser"]["Role"].trim() == "Education" || $localStorage["guestUser"]["Role"].trim() == "Exploration" || $localStorage["guestUser"]["Role"].trim() == "Fashion Design" || $localStorage["guestUser"]["Role"].trim() == "Information Technology" || $localStorage["guestUser"]["Role"].trim() == "Marketing" || $localStorage["guestUser"]["Role"].trim() == "Project Management" || $localStorage["guestUser"]["Role"].trim() == "Sales" || $localStorage["guestUser"]["Role"].trim() == "Software Development") {
                $localStorage["guestUser"]["changefunction"] = $scope.changefunction = false;
            }
        }


        // angular.forEach(reportValues['reportData'], function (v, k) {
        //     if (v.hasOwnProperty('belowRank') && v.hasOwnProperty('aboveRank') && v.hasOwnProperty('sameRank')) {
        //         if (k == 'Your Function') {
        //             $scope.btnFunPromotion=true;
        //         }
        //         if (k == 'Your Industry') {
        //             $scope.btnIndPromotion=true;
        //         }
        //         if (k == 'Your Industry Group') {
        //             $scope.btnIndGrpPromotion=true;
        //         }
        //         if (k == 'Your Function Group') {
        //             $scope.btnFunGrpPromotion=true;
        //         }
        //         if (k == 'Your Company') {
        //             $scope.btnComanyPromotion=true;
        //         }
        //         if (k == 'Your Industry and Function') {
        //             $scope.btnFunIndPromotion=true;
        //         }
        //     }
        // });

        $scope.highestFilter = resolvData["highestFilter"];       //  $scope.highestFilterCL=resolvData["highestFilterCL"];

        if (angular.isUndefined($localStorage["User"])) {

            $localStorage["User"] = '',
                $state.go("page.index");
        }
        else if ($localStorage["User"].hasOwnProperty("Email")) {
            $scope.isLogin = true;
            if (!$scope.userInfo.hasOwnProperty('level')) {
                $scope.currentLevel = $localStorage["User"]["Level"];
                $scope.percentvalue = 0;
            }
            $scope.UserInfo = $localStorage["User"];
            $scope.Company = $localStorage["User"]["Company"];
            $scope.Role = $localStorage["User"]["Role"];
            $scope.Industry = $localStorage["User"]["Industry"];
            $scope.Level = $localStorage["User"]["Level"];
            if ($scope.growth.length > 0) {
                $localStorage["User"]["showGrowthPage"] = true;
            }
            else {
                $localStorage["User"]["showGrowthPage"] = false;
            }

        }
        else if (angular.isDefined($localStorage["guestUser"])) {
            if (!$scope.userInfo.hasOwnProperty('level')) {
                $scope.currentLevel = $localStorage["guestUser"]["Level"];
                $scope.percentvalue = 0;
            }
            $scope.UserInfo = $localStorage["guestUser"];
            $scope.Company = $localStorage["guestUser"]["Company"];
            $scope.Role = $localStorage["guestUser"]["Role"];
            $scope.Industry = $localStorage["guestUser"]["Industry"];
            $scope.Level = $localStorage["guestUser"]["Level"];
            if ($scope.growth.length > 0) {
                $localStorage["guestUser"]["showGrowthPage"] = true;
            }
            else {
                $localStorage["guestUser"]["showGrowthPage"] = false;
            }


        }
        if ($scope.Level > 0) {
            $scope.text = $scope.userInfo['text'];
            $scope.min = $scope.userInfo['min'];
            $scope.max = $scope.userInfo['max'];
            //$scope.chartConfig_bar =
            //    {
            //        options: {
            //            title: {
            //                text: ''
            //            },
            //            chart: {
            //                type: "bar",
            //                spacingBottom: -15,
            //                spacingTop: 5,
            //                spacingLeft: -20,
            //                spacingRight: 10
            //            },
            //            plotOptions: {
            //                series: {
            //                    stacking: 'normal'
            //                }
            //            }
            //        },
            //        xAxis: {
            //            visible: false
            //        },
            //        yAxis: [{
            //            title: {
            //                text: ''
            //            },
            //            visible: false
            //        }],
            //        series: [{
            //            name: 'Your Level',
            //            data:[$scope.Level],
            //            tooltip: { enabled: false },
            //            showInLegend: false,
            //            color:'#e0b978',
            //            index:0
            //        }, {
            //            name: '',
            //            data:  [$scope.max - $scope.Level],
            //            tooltip: { enabled: false },
            //            showInLegend: false,
            //            color:'#ffffff',
            //            index:1
            //        }]
            //    };
            $scope.chartConfig_bar =
                {
                    options: {
                        title: {
                            text: ''
                        },
                        chart: {
                            type: "bar",
                            chart: {}

                        },
                        plotOptions: {
                            bar: {
                                stacking: 'normal'
                            }


                        }
                    },
                    xAxis: {
                        visible: false,
                        categories: ['Career Level']

                    },
                    yAxis: [{
                        title: {
                            text: ''
                        },
                        visible: false
                        ,
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                // color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                            }
                        }


                    }],
                    //tooltip: {

                    //formatter: function () {
                    //    var s = '<b> Career Level ' + this.x + '</b>';
                    //
                    //    $.each(this.points, function () {
                    //        if(this.series.name=="Percent")
                    //        {
                    //            s += '<br/>' + this.series.name + ': ' +
                    //                this.y +' INR Lakh';
                    //        }
                    //        else if(this.series.name=="% of People")
                    //        {
                    //            s += '<br/> % of Total People : ' +
                    //                this.y ;
                    //        }
                    //
                    //
                    //    });
                    //    return s;
                    //},
                    //shared: true,
                    //crosshairs: true},
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '',
                        data: [$scope.max - $scope.Level],
                        tooltip: {enabled: false},
                        showInLegend: false,
                        color: '#f5f5f5'

                    }, {
                        name: 'Your Level',
                        data: [$scope.Level],
                        tooltip: {enabled: false},
                        showInLegend: false,
                        color: '#e0b978'

                    }]
                };

        }


        if (!$scope.isLogin) {
            $scope.guesteffectivelevel = $localStorage["guestUser"]["EffectiveLevel"];
        }

        if (($localStorage["User"]["EffectiveLevel"] == 3 || $scope.guesteffectivelevel == 3) && $scope.btnIndPromotion == true) {
            $scope.highestFilterCL = "Industry";

        }
        else if (($localStorage["User"]["EffectiveLevel"] == 3 || $scope.guesteffectivelevel == 3) && $scope.btnFunPromotion == true) {
            $scope.highestFilterCL = "Function";

        }
        else if (($localStorage["User"]["EffectiveLevel"] == 3 || $scope.guesteffectivelevel == 3) && $scope.btnIndGrpPromotion == true) {
            $scope.highestFilterCL = "Industry Group";

        }
        else if (($localStorage["User"]["EffectiveLevel"] == 3 || $scope.guesteffectivelevel == 3) && $scope.btnFunGrpPromotion == true) {
            $scope.highestFilterCL = "Function Group";

        }
        else if (($localStorage["User"]["EffectiveLevel"] == 4 || $scope.guesteffectivelevel == 4) && $scope.btnIndGrpPromotion == true) {
            $scope.highestFilterCL = "Industry Group";

        }
        else if (($localStorage["User"]["EffectiveLevel"] == 4 || $scope.guesteffectivelevel == 4) && $scope.btnFunGrpPromotion == true) {
            $scope.highestFilterCL = "Function Group";

        }
        else {
            $scope.highestFilterCL = resolvData["highestFilterCL"];

        }

        $scope.MyFilter = resolvData["highestFilter"];

        getAllIntialData(reportValues);

        function getAllIntialData(reportValues) {


            var resolvData1 = reportValues['reportData'];
            angular.forEach(resolvData1, function (v, k) {
                if (v.hasOwnProperty("compensation")) {
                    $scope.btnStatus = Object.keys(v["compensation"]['btnStatus']);

                    if ($scope.btnStatus.length > 0) {
                        for (var x = 0; x < $scope.btnStatus.length; x++) {
                            if ($scope.btnStatus[x] == "Company") {

                                $scope.btnComanyPromotion = true;

                            }
                            else if ($scope.btnStatus[x] == "Industry and Function") {

                                $scope.btnFunIndPromotion = true;

                            }
                            else if ($scope.btnStatus[x] == "Function") {
                                $scope.btnFunPromotion = true;

                            }
                            else if ($scope.btnStatus[x] == "Industry") {
                                $scope.btnIndPromotion = true;
                            }
                            else if ($scope.btnStatus[x] == "Function Group") {
                                $scope.btnFunGrpPromotion = true;
                            }
                            else if ($scope.btnStatus[x] == "Industry Group") {
                                $scope.btnIndGrpPromotion = true;
                            }
                        }
                    }
                }


            });


            if (!($scope.btnIndPromotion || $scope.btnFunPromotion || $scope.btnIndGrpPromotion || $scope.btnFunGrpPromotion || $scope.btnComanyPromotion || $scope.btnFunIndPromotion)) {
                // var mod;
                // if ($scope.MyFilter == 'Company') {
                //     mod = 'Com'
                // }else if ($scope.MyFilter == 'Industry') {
                //     mod = 'Ind'
                // }else if ($scope.MyFilter == 'Industry Group') {
                //     mod = 'IndGroup'
                // }else if ($scope.MyFilter == 'Function Group') {
                //     mod = 'FunGroup'
                // }else if ($scope.MyFilter == 'Function') {
                //     mod = 'Fun'
                // }else  if ($scope.MyFilter == 'Industry and Function') {
                //     mod = 'FunInd'
                // }
                //     var params = {
                //     "Role": $scope.UserInfo["Role"],
                //     "Company": $scope.UserInfo["Company"],
                //     "Industry": $scope.UserInfo["Industry"],
                //     mod: mod,
                //     "level": $scope.UserInfo["Level"],
                //     Salary: $scope.UserInfo["Salary"]
                // }

                // $http({
                //     url: '/report/GrowthReport',
                //     method: 'post',
                //     data: params
                // }).then(function success(response) {
                //     var reportValues = response["data"];
                if ($localStorage["User"] != "") {
                    var resolvData1 = $localStorage['User']['growthValues'];
                } else {
                    var resolvData1 = $localStorage['guestUser']['growthValues'];
                }


                angular.forEach(resolvData1, function (v, k) {
                    if (v.hasOwnProperty("compensation")) {
                        $scope.btnStatus = v["compensation"]['btnStatus'];

                        if ($scope.btnStatus.length > 0) {
                            for (var x = 0; x < $scope.btnStatus.length; x++) {
                                if ($scope.btnStatus[x] == "Company") {

                                    $scope.btnComanyPromotion = true;

                                }
                                else if ($scope.btnStatus[x] == "Industry and Function") {

                                    $scope.btnFunIndPromotion = true;

                                }
                                else if ($scope.btnStatus[x] == "Function") {
                                    $scope.btnFunPromotion = true;

                                }
                                else if ($scope.btnStatus[x] == "Industry") {
                                    $scope.btnIndPromotion = true;
                                }
                                else if ($scope.btnStatus[x] == "Function Group") {
                                    $scope.btnFunGrpPromotion = true;
                                }
                                else if ($scope.btnStatus[x] == "Industry Group") {
                                    $scope.btnIndGrpPromotion = true;
                                }
                            }
                        }
                    }

                    // $scope.getChartPromotion(mod);
                    //     });
                });
            }

        }

        $scope.gotoLink = function (id) {
            if (id == "CL") {
                $state.go('app.CLreport');
            } else {
                $state.go('app.Growthreport');
            }
        }
        $scope.updateInfo = function () {

            if (angular.isUndefined($localStorage["User"])) {

                $localStorage["User"] = '',
                    $state.go("page.index")
            }
            else if ($localStorage["User"].hasOwnProperty("Email")) {
                // $scope.UserInfo=$localStorage["User"];
                if ($scope.Company != "" && $scope.Company != 'Select Company') {
                    $localStorage["User"]["Company"] = $scope.Company;
                }
                if ($scope.Role != "" && $scope.Role != 'Select Role') {
                    $localStorage["User"]["Role"] = $scope.Role;
                }
                if ($scope.Industry != "" && $scope.Industry != 'Select Industry') {
                    $localStorage["User"]["Industry"] = $scope.Industry;
                }
                if ($scope.Level != "" && $scope.Level != 'Select Level') {
                    $localStorage["User"]["Level"] = parseInt($scope.Level);
                }
                $localStorage["User"]["Salary"] = $scope.UserInfo["Salary"]
                $scope.UserInfo = $localStorage["User"];
            }
            else if (angular.isDefined($localStorage["guestUser"])) {
                // $scope.UserInfo=$localStorage["guestUser"];
                if ($scope.Company != "" && $scope.Company != 'Select Company') {
                    $localStorage["guestUser"]["Company"] = $scope.Company;
                }
                if ($scope.Role != "" && $scope.Role != 'Select Role') {
                    $localStorage["guestUser"]["Role"] = $scope.Role;
                }
                if ($scope.Industry != "" && $scope.Industry != 'Select Industry') {
                    $localStorage["guestUser"]["Industry"] = $scope.Industry;
                }
                if ($scope.Level != "" && $scope.Level != 'Select Level') {
                    $localStorage["guestUser"]["Level"] = parseInt($scope.Level);
                }
                $localStorage["guestUser"]["Salary"] = $scope.UserInfo["Salary"]
                $scope.UserInfo = $localStorage["User"];

            }
            alert("Successfully Update Info");
        }

        $scope.logout = function () {
            $localStorage["guestUser"] = "";
            $localStorage["User"] = "";
            vm.isLogin = false;
            vm.userinfo = {email: "", password: ""};
            toaster.pop("info", "", "User successfully logged out.");
            $state.go("page.index");
        }
        $scope.updateDetails = function () {
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

        function userUpdateCtrl($scope, $uibModalInstance, toaster, $http, userInfo, $state) {

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
                , "Salary": userInfo["Salary"]
                , "Role": {Name: userInfo["Role"]},
                "Education": userInfo["Education"],
                "Company": userInfo["Company"],
                "Experience": userInfo["Experience"],
                "Designation": userInfo["Designation"],
                "Industry": {Name: userInfo["Industry"]},
                "Institute": userInfo["Institute"],
                "CompanyDetails": userInfo["CompanyDetails"],
                "UserChoices": userInfo["UserChoices"],
                "Level": userInfo["Level"],
                "EffectiveLevel": userInfo["EffectiveLevel"],
                // "userlevelvalue":userInfo["userlevelvalue"],
                "selectedopt": userInfo["selectedopt"]
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

                    if ($scope.userInfo["Designation"] == "" || angular.isUndefined($scope.userInfo["Designation"]) || $scope.userInfo["Designation"] == null) {
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
                                //vm.isLogin=false;
                                $uibModalInstance.close();
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

            $scope.impact_localStorage = false;
            $scope.imapct_question = function () {
                localStorage.removeItem("Impact_Data");
                var params = {impact_industry : $scope.userInfo["Industry"].replace(/[&]/g,'_'), impact_function : $scope.userInfo["Role"].replace(/[&]/g,'_')}
                $http({
                    url: '/users/impact_qustion',
                    method: 'post',
                    data: params
                }).then(function success(response) {
                    var imp_data = response.data.UserData;
                    if (imp_data != 'Function & Industry are not found') {
                        localStorage.setItem("Impact_Data", JSON.stringify(imp_data));
                        $scope.impact_localStorage  = true;
                    } else {
                        localStorage.removeItem("Impact_Data");
                        $scope.impact_localStorage = false;
                    }
                });
            }
        }

        userUpdateCtrl.$inject = ["$scope", "$uibModalInstance", "toaster", '$http', 'userInfo', '$state'];
        vm.OpenLogin = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/signUpPop.html",
                controller: initialUserLogin,
                size: "sm",
                backdrop: 'static',
                resolve: {
                    'userInfo': function () {
                        return $localStorage["guestUser"];
                    }
                }
            });
        }

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
                "Level": userInfo.Level,
                "CompanyDetails": userInfo.CompanyDetails,
                "UserChoices": userInfo.UserChoices,
                "EffectiveLevel": userInfo.EffectiveLevel,
                "reportValues": userInfo.reportValues,
                "resolvData": userInfo.resolvData,
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
                                $scope.isLogin = true;
                                $localStorage["guestUser"] = ""
                                $uibModalInstance.close();
                                $state.go($state.current, {}, {reload: true});
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
                    //vm.userinfo["email"]=user.Email;
                    //vm.userinfo["password"]=user.Password;
                    var params = {data: {Email: user.Email, password: user.Password}};
                    $http({
                        url: '/users/Login_user',
                        method: 'post',
                        data: params
                    }).then(function success(response) {
                        var data = response["data"];
                        if (data["status"] == 200) {
                            {
                                if (data["msg"] == "Successfully Signed Up!") {
                                    toaster.pop('success', '', data["msg"]);
                                    $scope.username = $localStorage["User"] = data['username'];
                                    $scope.isLogin = true;
                                    $localStorage["guestUser"] = ""
                                    $uibModalInstance.close();
                                    $state.go($state.current, {}, {reload: true});
                                } else if (data["msg"] == "Successfully Logged In!") {
                                    toaster.pop('success', '', data["msg"]);
                                    $scope.username = $localStorage["User"] = data['username'];
                                    $scope.isLogin = true;
                                    $localStorage["guestUser"] = ""
                                    $uibModalInstance.close();
                                    $state.go($state.current, {}, {reload: true});
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

            }
            $scope.linkedinLogin = function () {
                $uibModalInstance.close();
                $localStorage["guestUser"]['Email'] = $scope.newuser["Email"];
                $localStorage["guestUser"]['Password'] = $scope.newuser["Password"];

                vm.linkedinLogin();

            }
        }

        initialUserLogin.$inject = ["$scope", "$uibModalInstance", "toaster", '$http', 'userInfo'];

        $scope.showDesignation = function (id) {
            var desData = [];
            if (id == "YOUR") {
                desData = $scope.userDesig;
            }
            else if (id == "NEXT") {
                desData = $scope.nextDesig;
            }
            else if (id == "HIGHEST") {
                desData = $scope.highestDesig;
            }
            var tempInfo = {id: id, filter: $scope.highestFilter, data: desData};
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/desigsPop.html",
                controller: showDesigsCtrl,
                size: "lg",
                backdrop: 'static',
                resolve: {
                    'tempInfo': function () {
                        return tempInfo
                    }
                }
            });
        }

        function showDesigsCtrl($scope, $uibModalInstance, tempInfo) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.alldesigs = tempInfo["data"];
            $scope.headText = "DESIGNATIONS AT " + tempInfo["id"] + " CAREER LEVEL IN YOUR ";
            $scope.filterText = tempInfo["filter"];
        }


        showDesigsCtrl.$inject = ["$scope", "$uibModalInstance", 'tempInfo'];
        $scope.designationvalues = function (mod) {
            if (resolvData["nextDesigs"] != null) {
                $scope.nextDesig = resolvData["nextDesigs"][mod];
            }
            if (resolvData["userDesigs"] != null) {
                $scope.userDesig = resolvData["userDesigs"][mod];
            }
            if (resolvData["highestDesigs"] != null) {
                $scope.highestDesig = resolvData["highestDesigs"][mod];
            }

        }

        $scope.getChartPromotion = function (mod) {

            if (mod == "Com") {
                $scope.designationvalues('Company');
                $scope.head = 'COMPANY';
                $scope.comp = 'active';
                $scope.indfun = 'deactive';
                $scope.fun = 'deactive';
                $scope.ind = 'deactive';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'deactive';

            } else if (mod == "FunInd") {
                $scope.designationvalues('Industry and Function');
                $scope.head = 'INDUSTRY & FUNCTION';
                $scope.comp = 'deactive';
                $scope.indfun = 'active';
                $scope.fun = 'deactive';
                $scope.ind = 'deactive';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'deactive';
            } else if (mod == "Fun") {
                $scope.designationvalues('Function');
                $scope.head = 'FUNCTION';
                $scope.comp = 'deactive';
                $scope.indfun = 'deactive';
                $scope.fun = 'active';
                $scope.ind = 'deactive';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'deactive';
            } else if (mod == "Ind") {
                $scope.designationvalues('Industry');
                $scope.head = 'INDUSTRY';
                $scope.comp = 'deactive';
                $scope.indfun = 'deactive';
                $scope.fun = 'deactive';
                $scope.ind = 'active';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'deactive';
            } else if (mod == "FunGroup") {
                $scope.designationvalues('Function Group');
                $scope.head = 'FUNCTION GROUP';
                $scope.comp = 'deactive';
                $scope.indfun = 'deactive';
                $scope.fun = 'deactive';
                $scope.ind = 'deactive';
                $scope.fungrp = 'active';
                $scope.indgrp = 'deactive';
            } else if (mod == "IndGroup") {
                $scope.designationvalues('Industry Group');
                $scope.head = 'INDUSTRY GROUP';
                $scope.comp = 'deactive';
                $scope.indfun = 'deactive';
                $scope.fun = 'deactive';
                $scope.ind = 'deactive';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'active';
            }


            // var values=$scope.availableData[mod];

            var params = {
                "Role": $scope.UserInfo["Role"],
                "Company": $scope.UserInfo["Company"],
                "Industry": $scope.UserInfo["Industry"],
                mod: mod,
                "level": $scope.UserInfo["Level"],
                Salary: $scope.UserInfo["Salary"]
            }
            showloader()
            $http({
                url: '/report/GrowthReport',
                method: 'post',
                data: params,

            }).then(function success(response) {
                hideloader()
                var reportValues = response["data"];
                var level = $scope.UserInfo["Level"];
                var industry = $scope.UserInfo["Industry"];
                var role = $scope.UserInfo["Role"];
                $scope.highestFilter = reportValues["reportData"]['highestFilter'];
                $scope.nextDesigs = reportValues["reportData"]['nextDesigs'][$scope.highestFilter];
                $scope.userDesigs = reportValues["reportData"]['userDesigs'][$scope.highestFilter];
                $scope.highestDesigs = reportValues["reportData"]['highestDesigs'][$scope.highestFilter];
                var company = $scope.UserInfo["Company"];
                var Salary = $scope.UserInfo["Salary"];
                if (Salary > 100) {
                    var Salary = $scope.UserInfo["Salary"] / 100000;
                    $scope.UserInfo["Salary"] = Salary;
                }
                var resolvData1 = reportValues["reportData"];
                angular.forEach(resolvData1, function (v, k) {
                    var innerData = k

                    if (v != null && v.hasOwnProperty("promotion")) {
                        $scope.GrowthFactor = v["compensation"]["nxtGrowthfactor"];
                        // $scope.chartConfig_CLGrowth.series[1]["data"].push($scope.GrowthFactor["nxtlevl"])
                        // $scope.chartConfig_CLGrowth.series[0]["data"].push(100 - $scope.GrowthFactor["nxtlevl"]);
                        // $scope.chartConfig_barSalaryGrowth.series[1]["data"].push($scope.GrowthFactor["avGSalaryPer"])
                        // $scope.chartConfig_barSalaryGrowth.series[0]["data"].push(100 - $scope.GrowthFactor["avGSalaryPer"]);
                        //$scope.availableData = v["compensation"]['btnStatus'];
                        //  $scope.btnStatus = ( v["compensation"]['btnStatus']);
                        $scope.xAxis = v["promotion"]["xAxis"];
                        $scope.yaxis = v["promotion"]["yAxis"];
                        $scope.yaxis1 = v["promotion"]["yAxis1"];
                        $scope.yaxis2 = v["promotion"]["yAxis2"];
                        $scope.title = v["promotion"]["title"];
                        $scope.xAxisLine = v["promotion"]["xAxisLine"]
                        $scope.yAxisLine = v["promotion"]["yAxisLine"]


                    }


                });
                $scope.myClindex = 0;
                $scope.highestsalayatmyCl = 0;
                for (var i = 0; i < $scope.yAxisLine.length; i++) {
                    if ($scope.xAxisLine[i] == $scope.currentLevel) {
                        $scope.myClindex = i;

                    }
                    if ($scope.highestsalayatmyCl <= $scope.yAxisLine[i]) {
                        $scope.highestsalayatmyCl = $scope.yAxisLine[i];
                    }

                }
                for (var i = 0; i < $scope.xAxis.length; i++) {
                    if (angular.isString($scope.xAxis[i])) {
                        var strxaxis = $scope.xAxis[i].split("-");
                        if ($scope.currentLevel >= parseInt(strxaxis[0]) && $scope.currentLevel <= parseInt(strxaxis[1])) {
                            $scope.myClindexpeople = i;
                        }
                    } else {
                        if ($scope.xAxis[i] == $scope.currentLevel) {
                            $scope.myClindexpeople = i;

                        }
                    }


                }
                // $scope.peoplehigherCl=0;
                // for (var i = $scope.myClindexpeople-1; i >=0; i--) {
                //     $scope.peoplehigherCl= $scope.peoplehigherCl+$scope.yaxis[i];
                //
                // }
                // $scope.peoplehigherCl=$scope.peoplehigherCl.toFixed(2);
                // if(Math.ceil($scope.peoplehigherCl)<=(parseFloat($scope.peoplehigherCl)+.10)){
                //     $scope.peoplehigherCl=Math.ceil($scope.peoplehigherCl);
                // }
                if ($scope.reportvalue["Your Industry"].hasOwnProperty("compensation")) {
                    highest = "Industry";
                } else if ($scope.reportvalue["Your Function"].hasOwnProperty("compensation")) {
                    highest = "Function";
                } else if ($scope.reportvalue["Your Function Group"].hasOwnProperty("compensation")) {
                    highest = "Function Group";
                } else if ($scope.reportvalue["Your Industry Group"].hasOwnProperty("compensation")) {
                    highest = "Industry Group";
                } else if ($scope.reportvalue["Your Company"].hasOwnProperty("compensation")) {
                    highest = "Company";
                } else if ($scope.reportvalue["Your Industry and Function"].hasOwnProperty("compensation")) {
                    highest = "Industry and Function";
                }
                $scope.medianathighestcl = $scope.GrowthFactor["medianSalHiLvl"];
                $scope.highestclreachable = $scope.GrowthFactor["HiLvlReachable"];
                $scope.peoplehigherCl = $scope.reportvalue["Your " + $scope.highestFilter.toString()]["aboveRank"];
                $scope.medianSalaryMycl = $scope.yaxis2[$scope.myClindexpeople];
                // $scope.peopleinyourCl=$scope.yaxis[$scope.myClindexpeople];
                $scope.peopleinyourCl = $scope.reportvalue["Your " + $scope.highestFilter.toString()]["sameRank"];
                $scope.percentile = $scope.reportvalue["Your " + $scope.highestFilter.toString()]["belowSalary"];
                if (highest != "" && $scope.reportvalue["Your " + highest]["compensation"]["allPercentile"].hasOwnProperty($scope.highestFilter.toString())) {
                    $scope.highestsalary = (($scope.reportvalue["Your " + highest]["compensation"]["allPercentile"][$scope.highestFilter.toString()][99]) / 100000).toFixed(2);
                }


            });

        }

        // $scope.getChartPromotion("Ind");
        $scope.nodata = function (mod) {
            $scope.designationvalues(mod);
            if (mod == "Company") {
                $scope.head = 'COMPANY';
                $scope.comp = 'active';
                $scope.indfun = 'deactive';
                $scope.fun = 'deactive';
                $scope.ind = 'deactive';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'deactive';

            } else if (mod == "Industry and Function") {
                $scope.head = 'INDUSTRY & FUNCTION';
                $scope.comp = 'deactive';
                $scope.indfun = 'active';
                $scope.fun = 'deactive';
                $scope.ind = 'deactive';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'deactive';
            } else if (mod == "Function") {
                $scope.head = 'FUNCTION';
                $scope.comp = 'deactive';
                $scope.indfun = 'deactive';
                $scope.fun = 'active';
                $scope.ind = 'deactive';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'deactive';
            } else if (mod == "Industry") {
                $scope.head = 'INDUSTRY';
                $scope.comp = 'deactive';
                $scope.indfun = 'deactive';
                $scope.fun = 'deactive';
                $scope.ind = 'active';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'deactive';
            } else if (mod == "Function Group") {
                $scope.head = 'FUNCTION GROUP';
                $scope.comp = 'deactive';
                $scope.indfun = 'deactive';
                $scope.fun = 'deactive';
                $scope.ind = 'deactive';
                $scope.fungrp = 'active';
                $scope.indgrp = 'deactive';
            } else if (mod == "Industry Group") {
                $scope.head = 'INDUSTRY GROUP';
                $scope.comp = 'deactive';
                $scope.indfun = 'deactive';
                $scope.fun = 'deactive';
                $scope.ind = 'deactive';
                $scope.fungrp = 'deactive';
                $scope.indgrp = 'active';
            }

            $scope.highestFilter = mod;
            $scope.highestclreachable = resolvData['newdata'][mod][0];
            $scope.medianathighestcl = (resolvData['newdata'][mod][1] / 100000).toFixed(2);
            $scope.showtext = false;
            if ($scope.currentLevel < ($scope.highestclreachable / 2)) {
                $scope.showtext = true;
            }

        }
        $scope.noppx = 'showdata';
        $scope.ppx = 'hidedata';
        $scope.showtext1 = false;
        if (!$scope.ppxstatus || !($scope.btnIndPromotion || $scope.btnFunPromotion || $scope.btnIndGrpPromotion || $scope.btnFunGrpPromotion || $scope.btnComanyPromotion || $scope.btnFunIndPromotion) || resolvData['newdata'] != null) {
            $scope.noppx = 'hidedata';
            $scope.ppx = 'showdata';
            $scope.showtext1 = true;
            if (resolvData['newdata']['Function'].length != 0) {
                $scope.btnFunPromotion1 = true;
            }
            if (resolvData['newdata']['Industry'].length != 0) {
                $scope.btnIndPromotion1 = true;
            }
            if (resolvData['newdata']['Industry Group'].length != 0) {
                $scope.btnIndGrpPromotion1 = true;
            }
            if (resolvData['newdata']['Function Group'].length != 0) {
                $scope.btnFunGrpPromotion1 = true;
            }
            if (resolvData['newdata']['Company'].length != 0) {
                $scope.btnComanyPromotion1 = true;
            }
            if (resolvData['newdata']['Industry and Function'].length != 0) {
                $scope.btnFunIndPromotion1 = true;
            }
            if ($scope.btnIndPromotion1) {
                $scope.head = 'INDUSTRY';
                $scope.ind = 'active';
                $scope.nodata('Industry');
            } else if ($scope.btnFunPromotion1) {
                $scope.head = 'FUNCTION';
                $scope.fun = 'active';
                $scope.nodata('Function');
            } else if ($scope.btnIndGrpPromotion1) {
                $scope.head = 'INDUSTRY GROUP';
                $scope.indgrp = 'active';
                $scope.nodata('Industry Group');
            } else if ($scope.btnFunGrpPromotion1) {
                $scope.head = 'FUNCTION GROUP';
                $scope.fungrp = 'active';
                $scope.nodata('Function Group');
            }
            else if ($scope.btnComanyPromotion1) {
                $scope.head = 'COMPANY';
                $scope.comp = 'active';
                $scope.nodata('Company');
            } else if ($scope.btnFunIndPromotion1) {
                $scope.head = 'INDUSTRY AND FUNCTION';
                $scope.indfun = 'active';
                $scope.nodata('Industry and Function');
            }
        } else {
            if ($scope.btnIndPromotion) {
                $scope.head = 'INDUSTRY';
                $scope.ind = 'active';
                $scope.getChartPromotion('Ind');
            } else if ($scope.btnFunPromotion) {
                $scope.head = 'FUNCTION';
                $scope.fun = 'active';
                $scope.getChartPromotion('Fun');
            } else if ($scope.btnIndGrpPromotion) {
                $scope.head = 'INDUSTRY GROUP';
                $scope.indgrp = 'active';
                $scope.getChartPromotion('IndGroup');
            } else if ($scope.btnFunGrpPromotion) {
                $scope.head = 'FUNCTION GROUP';
                $scope.fungrp = 'active';
                $scope.getChartPromotion('FunGroup');
            }
            else if ($scope.btnComanyPromotion) {
                $scope.head = 'COMPANY';
                $scope.comp = 'active';
                $scope.getChartPromotion('Com');
            } else if ($scope.btnFunIndPromotion) {
                $scope.head = 'INDUSTRY AND FUNCTION';
                $scope.indfun = 'active';
                $scope.getChartPromotion('FunInd');
            }
            else {
                // var params = {data: {Email: user.Email, password: user.Password}};
                // $http({
                //     url: '/report/highest',
                //     method: 'post',
                //     data: params
                // }).then(function success(response) {
                //     var data = response["data"];
                //
                // });

            }
        }


    }
})();