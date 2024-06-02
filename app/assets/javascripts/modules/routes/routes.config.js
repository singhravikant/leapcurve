/**=========================================================
 * Module: RoutesConfig.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('naut')
        .config(routesConfig);

    routesConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', 'RouteProvider'];

    function routesConfig($locationProvider, $stateProvider, $urlRouterProvider, Route) {

        // use the HTML5 History API
        $locationProvider.html5Mode(false);

        // Default route
        $urlRouterProvider.otherwise('/page/index');

        // Application Routes States
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: Route.base('app.html'),
                data: {requireLogin: true},

                resolve: {

                    _assets: Route.require('icons', 'animate')

                }
            })
            .state('page', {
                url: '/page',
                abstract: true,
                templateUrl: Route.base('page.html'),
                data: {requireLogin: false,},
                onEnter: function ($state, $localStorage) {
                    if (angular.isUndefined($localStorage["User"])) {
                        $localStorage["User"] = '';

                    }
                    else if ($state.current["url"] != '/briefreport' && $localStorage["User"].hasOwnProperty("Level") && $localStorage["User"]["Level"] > 0) {
                        $state.go('app.briefreport');
                    }
                },
                resolve: {
                    _assets: Route.require( 'animate', 'oitozero.ngSweetAlert')
                }
            })
            .state('app.report', {
                url: '/report',
                templateUrl: Route.base('reports.html'),
                controller: "ReportController",
                controllerAs: "report",
                resolve: {
                    'resolvData': function ($http, $stateParams, $localStorage) {
                        return $http({
                            url: '/qustioner/report',
                            method: 'post',
                            data: {
                                Level: $localStorage["User"]["Level"],
                                Industry: $localStorage["User"]["Industry"],
                                Role: $localStorage["User"]["Role"]
                            }
                        }).then(function success(response) {
                            var data = response['data'];
                            return data;
                        });
                    }
                }


            })
            .state('app.dashboard', {
                url: '/dashboard',
                controller: 'homeController',
                templateUrl: Route.base('Home.html')
            })
            .state('page.index', {
                url: '/index',
                controller: "DashboardController",
                controllerAs: "dash",
                templateUrl: Route.base('dashboard.html'),
                resolve: {
                    'data': function ($http, $stateParams, $localStorage) {
                        return $http({
                            url: '/admin/getDistnicValues',
                            method: 'get',
                            data: {}
                        }).then(function success(response) {
                            var data = response['data'];
                            return data;
                        });
                    }
                }
            })
            .state('page.questions', {
                url: '/questions',
                controller: "questionController",
                controllerAs: "ques",
                templateUrl: Route.base('questions.html'),
                resolve: {
                    'data': function ($http, $stateParams, $localStorage) {
                        return $http({
                            url: '/qustioner/getAllQuestions',
                            method: 'post',
                            data: {},
                            controllerAs: 'ques',
                        }).then(function success(response) {
                            var data = response['data'];
                            return data;
                        });
                    }
                }
            })
            .state('app.status', {
                url: '/status',
                controller: "statusController",
                controllerAs: "stat",
                templateUrl: Route.base('page22.html'),
                resolve: {
                    'data': function ($http, $stateParams, $localStorage) {

                        return $http({
                            url: '/qustioner/getRoleChart',
                            method: 'post',
                            data: {Industry: $localStorage["User"]["Industry"], Role: $localStorage["User"]["Role"]},
                        }).then(function success(response) {
                            var data = response['data'];
                            return data;
                        });
                    }
                }
            })
            .state('app.Charts', {
                url: '/Charts',
                templateUrl: Route.base('charts.html'),
                controller: "ChartController",
                controllerAs: "chart",
                resolve: {
                    'resolvData': function ($http, $stateParams, $localStorage) {
                        return $http({
                            url: '/qustioner/getAllIndustries',
                            method: 'post',
                            data: {
                                Level: $localStorage["User"]["Level"],
                                Industry: $localStorage["User"]["Industry"],
                                Role: $localStorage["User"]["Role"]
                            }
                        }).then(function success(response) {
                            var data = response['data'];
                            return data;
                        });
                    }
                }

            })
            .state('app.getStarted', {
                url: '/getStarted',
                controller: "getStartedController",
                controllerAs: "get",
                templateUrl: Route.base('getStarted.html'),
                resolve: {
                    'data': function ($http, $stateParams, $localStorage) {
                        var industry = ""
                        var role = "";
                        var company = "";
                        var salary = "";
                        if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {

                            industry = $localStorage["User"]["Industry"];
                            role = $localStorage["User"]["Role"];
                            company = $localStorage["User"]["Company"];
                            salary = $localStorage["User"]["Salary"];
                        }
                        else {

                            industry = $localStorage["guestUser"]["Industry"];
                            role = $localStorage["guestUser"]["Role"];
                            company = $localStorage["guestUser"]["Company"];
                            salary = $localStorage["guestUser"]["Salary"];
                        }

                        return $http({
                            url: '/report/getInitialChart',
                            method: 'post',
                            data: {Industry: industry, Role: role, Company: company, Salary: salary}
                        }).then(function success(response) {
                            var data = response['data']["reportData"];
                            return data;
                        });
                    }
                }
            })
            .state('app.about', {
                url: '/about',

                templateUrl: Route.base('about.html')
            })
            .state('page.assessor_usercl', {
                url: '/assessor_usercl',
                controller: "DashboardControllerGoogle",
                controllerAs: "dash",
                templateUrl: Route.base('assessor_usercl.html'),
                resolve: {
                    'data': function ($http, $stateParams, $localStorage) {
                        return $http({
                            url: '/admin/getDistnicValues',
                            method: 'get',
                            data: {}
                        }).then(function success(response) {
                            var data = response['data'];
                            return data;
                        });
                    }
                }
            })
            .state('app.askabout', {
                url: '/askabout',
                controller: '',
                templateUrl: Route.base('askabout.html')
            })
            .state('app.insights', {
                url: '/insights',

                templateUrl: Route.base('insight.html')
            })
            .state('app.progress', {
                url: '/progress',
                templateUrl: Route.base('progress.html')
            })
            .state('app.briefreport', {
                url: '/briefreport',
                controller: 'BriefReportController',
                controllerAs: 'brief',
                templateUrl: Route.base('briefreport.html'),
                resolve: {
                    'resolvData': function ($http, $stateParams, $localStorage) {
                        var level = 0;
                        var industry = ""
                        var role = "";
                        var company = "";
                        var salary = "";
                        var Email;
                        var EffectiveLevel = "";
                        if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                            level = $localStorage["User"]["Level"];
                            industry = $localStorage["User"]["Industry"];
                            role = $localStorage["User"]["Role"];
                            company = $localStorage["User"]["Company"];
                            salary = $localStorage["User"]["Salary"];
                            EffectiveLevel = $localStorage["User"]["EffectiveLevel"];
                            Email = $localStorage["User"]["Email"];
                        }
                        else {
                            level = $localStorage["guestUser"]["Level"];
                            industry = $localStorage["guestUser"]["Industry"];
                            role = $localStorage["guestUser"]["Role"];
                            company = $localStorage["guestUser"]["Company"];
                            salary = $localStorage["guestUser"]["Salary"];
                            EffectiveLevel = $localStorage["User"]["EffectiveLevel"];
                            Email = $localStorage["guestUser"]["Email"];
                        }
                        if ($localStorage['User'] != "") {
                            if ($localStorage['User'].hasOwnProperty('resolvData') && !($localStorage['User']['resolvData'].hasOwnProperty('status'))) {
                                return $http({
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
                                    $localStorage['User']["resolvData"] = data;
                                    return data;
                                });
                            } else {
                                return $localStorage['User']['resolvData'];
                            }
                        } else {
                            if ($localStorage['guestUser'].hasOwnProperty('resolvData') && $localStorage['guestUser']['resolvData'] != null && $localStorage['guestUser']['resolvData'].hasOwnProperty('status')) {
                                return $localStorage['guestUser']['resolvData']
                            } else {
                                return $http({
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
                                    $localStorage['guestUser']["resolvData"] = data;
                                    return data;
                                });
                            }
                        }


                    },
                    'reportValues': function ($http, $stateParams, $localStorage) {
                        var level = 0;
                        var industry = ""
                        var role = "";
                        var company = "";
                        var Salary = 0;
                        var Email;
                        var isGuest = false;
                        if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                            level = $localStorage["User"]["Level"];
                            industry = $localStorage["User"]["Industry"];
                            role = $localStorage["User"]["Role"];
                            company = $localStorage["User"]["Company"];
                            Salary = $localStorage["User"]["Salary"];
                            Email = $localStorage["User"]["Email"];
                            isGuest = false;
                        }
                        else {
                            level = $localStorage["guestUser"]["Level"];
                            industry = $localStorage["guestUser"]["Industry"];
                            role = $localStorage["guestUser"]["Role"];
                            company = $localStorage["guestUser"]["Company"];
                            Salary = $localStorage["guestUser"]["Salary"];
                            Email = $localStorage["guestUser"]["Email"];
                            isGuest = true
                        }
                        var params = {
                            Level: level,
                            Industry: industry,
                            Role: role,
                            Company: company,
                            Salary: Salary,
                            Email: Email
                        }
                        if ($localStorage['User'] != "") {
                            if ($localStorage['User'].hasOwnProperty('reportValues') && !($localStorage['User']['reportValues'].hasOwnProperty('status'))) {
                                return $http({
                                    url: '/report/CLReport',
                                    method: 'post',
                                    data: params
                                }).then(function success(response) {

                                    if (response["data"]["status"] == 200) {
                                        response["data"]['reportData']["isGuest"] = isGuest;
                                        $localStorage['User']["reportValues"] = response["data"];
                                        return response["data"];

                                    }
                                    else {

                                        toaster.pop('error', '', data["msg"]);
                                        // alert(data["msg"]);
                                        return;
                                    }
                                }, function error(response) {

                                })
                            } else {
                                return $localStorage['User']['reportValues'];
                            }
                        } else {
                            if ($localStorage['guestUser'].hasOwnProperty('reportValues') && $localStorage['guestUser']['reportValues'] != null && $localStorage['guestUser']['reportValues'].hasOwnProperty('status')) {
                                return $localStorage['guestUser']['reportValues'];
                            } else {
                                return $http({
                                    url: '/report/CLReport',
                                    method: 'post',
                                    data: params
                                }).then(function success(response) {

                                    if (response["data"]["status"] == 200) {
                                        response["data"]['reportData']["isGuest"] = isGuest;
                                        $localStorage['guestUser']["reportValues"] = response["data"];
                                        return response["data"];

                                    }
                                    // else {
                                    //
                                    //     toaster.pop('error', '', data["msg"]);
                                    //     // alert(data["msg"]);
                                    //     return;
                                    // }
                                });
                            }
                        }


                    },
                    'growthValues': function ($http, $stateParams, $localStorage) {
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
                        } else if ($localStorage['guestUser']['resolvData'] != null) {
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
                        }
                        else {
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
                            if ($localStorage['User'] != "") {
                                if ($localStorage['User'].hasOwnProperty('growthValues') && !($localStorage['User']['growthValues'] != null && $localStorage['User']['growthValues'].hasOwnProperty('funGrp'))) {

                                    return $http({
                                        url: '/report/GrowthReport',
                                        method: 'post',
                                        data: params
                                    }).then(function success(response) {

                                        if (response["data"]["status"] == 200) {
                                            response["data"]['reportData']["isGuest"] = isGuest;
                                            $localStorage['User']['growthValues'] = response["data"]['reportData'];
                                            return response["data"]['reportData'];


                                        }
                                        else {
                                            toaster.pop('error', '', data["msg"]);
                                            // alert(data["msg"]);
                                            return;
                                        }
                                    }, function error(response) {

                                    })

                                } else {

                                    return $localStorage['User']['growthValues'];
                                }
                            }
                            else {
                                if (!($localStorage["guestUser"].hasOwnProperty('growthValues') && $localStorage["guestUser"]['growthValues'] == null)) {
                                    $localStorage["guestUser"]['growthValues'] = {};
                                }
                                if ($localStorage['guestUser'].hasOwnProperty('growthValues') && !($localStorage['User']['growthValues'] != null && $localStorage['User']['growthValues'].hasOwnProperty('funGrp'))) {

                                    return $http({
                                        url: '/report/GrowthReport',
                                        method: 'post',
                                        data: params
                                    }).then(function success(response) {

                                        if (response["data"]["status"] == 200) {
                                            response["data"]['reportData']["isGuest"] = isGuest;
                                            $localStorage['guestUser']['growthValues'] = response["data"]['reportData'];
                                            return response["data"]['reportData'];


                                        }
                                        else {
                                            toaster.pop('error', '', data["msg"]);
                                            // alert(data["msg"]);
                                            return;
                                        }
                                    }, function error(response) {

                                    })

                                } else {

                                    return $localStorage['guestUser']['growthValues'];
                                }
                            }
                        }

                    }
                }
            })
            .state('app.my-jobs', {
                url: '/my-jobs',
                controller: 'jobscontroller',
                templateUrl: Route.base('my-jobs.html'),
                resolve: {
                    'job_data': function ($http, $stateParams, $localStorage) {
                        var cl;
                        var email;
                        if($localStorage['User']!=""){
                          cl=$localStorage['User']['Level']
                          email=$localStorage['User']['Email']
                        }else{
                            cl=$localStorage['guestUser']['Level']
                            email=$localStorage['guestUser']['Email']
                        }

                        var params = {'cl':cl,'email':email}
                        return $http({
                            url: '/corporate/get_jobs',
                            method: 'post',
                            data: params
                        }).then(function success(response) {

                            if (response["data"]["status"] == 200) {
                                return response["data"];
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
            })
                .state('app.allreport', {
                    url: '/allreport',
                    templateUrl: Route.base('page.report.html'),
                    controller: "FullReportController",
                    controllerAs: "report",
                    resolve: {
                        'reportValues': function ($http, $stateParams, $localStorage) {
                            var level = 0;
                            var industry = ""
                            var role = "";
                            var company = "";
                            var Salary = 0;
                            if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                                level = $localStorage["User"]["Level"];
                                industry = $localStorage["User"]["Industry"];
                                role = $localStorage["User"]["Role"];
                                company = $localStorage["User"]["Company"];
                                Salary = $localStorage["User"]["Salary"];
                            }
                            else {
                                level = $localStorage["guestUser"]["Level"];
                                industry = $localStorage["guestUser"]["Industry"];
                                role = $localStorage["guestUser"]["Role"];
                                company = $localStorage["guestUser"]["Company"];
                                Salary = $localStorage["guestUser"]["Salary"];
                            }
                            var params = {
                                Level: level,
                                Industry: industry,
                                Role: role,
                                Company: company,
                                Salary: Salary
                            }
                            return $http({
                                url: '/report/calculateIntalBar',
                                method: 'post',
                                data: params
                            }).then(function success(response) {

                                if (response["data"]["status"] == 200) {
                                    return response["data"]['reportData'];
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


                })
                .state('app.CLreport', {
                    url: '/CLreport ',
                    templateUrl: Route.base('page.CLReport.html'),
                    controller: "CLReportController",
                    controllerAs: "clreport",
                    resolve: {
                        'reportValues': function ($http, $stateParams, $localStorage) {
                            var level = 0;
                            var industry = ""
                            var role = "";
                            var company = "";
                            var Salary = 0;
                            var Email;
                            var isGuest = false;
                            if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                                level = $localStorage["User"]["Level"];
                                industry = $localStorage["User"]["Industry"];
                                role = $localStorage["User"]["Role"];
                                company = $localStorage["User"]["Company"];
                                Salary = $localStorage["User"]["Salary"];
                                Email = $localStorage["User"]["Email"];
                                isGuest = false;
                            }
                            else {
                                level = $localStorage["guestUser"]["Level"];
                                industry = $localStorage["guestUser"]["Industry"];
                                role = $localStorage["guestUser"]["Role"];
                                company = $localStorage["guestUser"]["Company"];
                                Salary = $localStorage["guestUser"]["Salary"];
                                Email = $localStorage["guestUser"]["Email"];
                                isGuest = true
                            }
                            var params = {
                                Level: level,
                                Industry: industry,
                                Role: role,
                                Company: company,
                                Salary: Salary,
                                Email: Email
                            }
                            if ($localStorage['User'] != "") {
                                if ($localStorage['User'].hasOwnProperty('reportValues') && !($localStorage['User']['reportValues'].hasOwnProperty('status'))) {
                                    return $http({
                                        url: '/report/CLReport',
                                        method: 'post',
                                        data: params
                                    }).then(function success(response) {

                                        if (response["data"]["status"] == 200) {
                                            response["data"]['reportData']["isGuest"] = isGuest;
                                            $localStorage['User']["reportValues"] = response["data"];
                                            return response["data"];

                                        }
                                        else {

                                            toaster.pop('error', '', data["msg"]);
                                            // alert(data["msg"]);
                                            return;
                                        }
                                    }, function error(response) {

                                    })
                                } else {
                                    return $localStorage['User']['reportValues'];
                                }
                            } else {
                                if ($localStorage['guestUser'].hasOwnProperty('reportValues')) {
                                    return $localStorage['guestUser']['reportValues'];
                                } else {
                                    return $http({
                                        url: '/report/CLReport',
                                        method: 'post',
                                        data: params
                                    }).then(function success(response) {

                                        if (response["data"]["status"] == 200) {
                                            response["data"]['reportData']["isGuest"] = isGuest;
                                            $localStorage['guestUser']["reportValues"] = response["data"];
                                            return response["data"];

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


                        }
                    }


                })
                .state('app.Growthreport', {
                    url: '/Growthreport',
                    templateUrl: Route.base('page.GrowthReport.html'),
                    controller: "GrowthReportController",
                    controllerAs: "report",
                    resolve: {
                        'growthValues': function ($http, $stateParams, $localStorage) {
                            var level = 0;
                            var industry = ""
                            var role = "";
                            var company = "";
                            var Email = "";
                            var Salary = 0;
                            var isGuest = false;
                            if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                                level = $localStorage["User"]["Level"];
                                Email = $localStorage["User"]["Email"];
                                industry = $localStorage["User"]["Industry"];
                                role = $localStorage["User"]["Role"];
                                company = $localStorage["User"]["Company"];
                                Salary = $localStorage["User"]["Salary"];
                                var isGuest = false;
                            }
                            else {
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

                            if ($localStorage['User'] != "") {
                                if ($localStorage['User'].hasOwnProperty('growthValues') && !($localStorage['User']['growthValues'] != null && $localStorage['User']['growthValues'].hasOwnProperty('funGrp'))) {

                                    return $http({
                                        url: '/report/GrowthReport',
                                        method: 'post',
                                        data: params
                                    }).then(function success(response) {

                                        if (response["data"]["status"] == 200) {
                                            response["data"]['reportData']["isGuest"] = isGuest;
                                            $localStorage['User']['growthValues'] = response["data"]['reportData'];
                                            return response["data"]['reportData'];


                                        }
                                        else {
                                            toaster.pop('error', '', data["msg"]);
                                            // alert(data["msg"]);
                                            return;
                                        }
                                    }, function error(response) {

                                    })

                                } else {

                                    return $localStorage['User']['growthValues'];
                                }
                            } else {
                                if (!($localStorage["guestUser"].hasOwnProperty('growthValues'))) {
                                    $localStorage["guestUser"]['growthValues'] = {};
                                }
                                if ($localStorage['guestUser'].hasOwnProperty('growthValues') && !($localStorage['User']['growthValues'] != null && $localStorage['User']['growthValues'].hasOwnProperty('funGrp'))) {

                                    return $http({
                                        url: '/report/GrowthReport',
                                        method: 'post',
                                        data: params
                                    }).then(function success(response) {

                                        if (response["data"]["status"] == 200) {
                                            response["data"]['reportData']["isGuest"] = isGuest;
                                            $localStorage['guestUser']['growthValues'] = response["data"]['reportData'];
                                            return response["data"]['reportData'];


                                        }
                                        else {
                                            toaster.pop('error', '', data["msg"]);
                                            // alert(data["msg"]);
                                            return;
                                        }
                                    }, function error(response) {

                                    })

                                } else {

                                    return $localStorage['guestUser']['growthValues'];
                                }
                            }

                        }
                    }


                })
                .state('app.rankingpref', {
                    url: '/rankingpref',
                    templateUrl: Route.base('rankingpref.html')
                })
                .state('app.ranking', {
                    url: '/ranking',
                    controller: "getUserPreferenceController",
                    templateUrl: Route.base('ranking.html')
                })
                .state('app.comparison',
                    {
                        url: '/comparison',
                        controller: "ComparisonController",
                        templateUrl: Route.base('comparison.html'),
                        resolve: {
                            'resolvData': function ($http, $stateParams, $localStorage) {
                                var level = 0;
                                var industry = ""
                                var role = "";
                                var company = "";
                                var preferences = [];
                                if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
                                    level = $localStorage["User"]["Level"];
                                    industry = $localStorage["User"]["Industry"];
                                    role = $localStorage["User"]["Role"];
                                    company = $localStorage["User"]["Company"];
                                    preferences = $localStorage["User"]["Preference"];
                                }
                                else {
                                    level = $localStorage["guestUser"]["Level"];
                                    industry = $localStorage["guestUser"]["Industry"];
                                    role = $localStorage["guestUser"]["Role"];
                                    company = $localStorage["guestUser"]["Company"];
                                    preferences = $localStorage["guestUser"]["Preference"];
                                }

                                return $http({
                                    url: '/find_company/index',
                                    method: 'post',
                                    data: {
                                        Level: level,
                                        Industry: industry,
                                        Role: role,
                                        Company: company,
                                        Preferences: preferences
                                    }
                                }).then(function success(response) {
                                    var data = response['data'];
                                    return data;
                                });
                            }
                        }
                    })
                .state('app.resetPassword', {
                    url: '/reset-password/?:token',
                    controller: 'resetPasswordCtrl',
                    templateUrl: Route.base('resetPassword.html')
                })


    }

})();

