(function () {
    angular.module('naut').controller('FullReportController', FullReportController);
    FullReportController.$inject = ['$scope', '$http', '$localStorage', '$http', 'reportValues'];

    function FullReportController($scope, $http, $localStorage, $http, reportValues) {
        var vm = this;
        $scope.UserInfo = {};
        $scope.initalBar = {};
        $scope.availableData = {};
        $scope.btnComany = false;
        $scope.btnFunInd = false;
        $scope.btnFun = false;
        $scope.btnFunGrp = false;
        $scope.btnIndGrp = false;
        $scope.btnInd = false;
        $scope.btnComanyPromotion = false;
        $scope.btnFunIndPromotion = false;
        $scope.btnFunPromotion = false;
        $scope.btnFunGrpPromotion = false;
        $scope.btnIndGrpPromotion = false;
        $scope.btnIndPromotion = false;
        $scope.chartConfig_bar =
            {
                options: {
                    title: {
                        text: ''
                    },
                    chart: {
                        type: "bar",
                        chart: {
                            spacingBottom: -15,
                            spacingTop: 10,
                            spacingLeft: -20,
                            spacingRight: 10,
                        }

                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }


                    }
                },
                xAxis: {
                    visible: false,
                    categories: ['Career Level', 'Salary']

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
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                        }
                    }


                }],
                credits: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [],
                    tooltip: {enabled: false},
                    showInLegend: false,
                    color: '#DCE6F2'

                }, {
                    name: '',
                    data: [],
                    showInLegend: false,
                    color: '#376092'

                }]
            };
        $scope.chartConfig_barSalary =
            {
                options: {
                    title: {
                        text: ''
                    },
                    chart: {
                        type: "bar",
                        chart: {
                            spacingBottom: -15,
                            spacingTop: 10,
                            spacingLeft: -20,
                            spacingRight: 10,
                        }

                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }


                    }
                },
                xAxis: {
                    visible: false,
                    categories: ['Career Level', 'Salary']

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
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                        }
                    }


                }],
                credits: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [],
                    tooltip: {enabled: false},
                    showInLegend: false,
                    color: '#DCE6F2'

                }, {
                    name: '',
                    data: [],
                    showInLegend: false,
                    color: '#376092'


                }]
            };
        $scope.chartConfig_CLGrowth =
            {
                options: {
                    title: {
                        text: ''
                    },
                    chart: {
                        type: "bar",
                        chart: {
                            spacingBottom: -15,
                            spacingTop: 10,
                            spacingLeft: -20,
                            spacingRight: 10,
                        }

                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }


                    }
                },
                xAxis: {
                    visible: false,
                    categories: ['Career Level', 'Salary']

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
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                        }
                    }


                }],
                credits: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [],
                    tooltip: {enabled: false},
                    showInLegend: false,
                    color: '#DCE6F2'

                }, {
                    name: '',
                    data: [],
                    showInLegend: false,
                    color: '#376092'

                }]
            };
        $scope.chartConfig_barSalaryGrowth =
            {
                options: {
                    title: {
                        text: ''
                    },
                    chart: {
                        type: "bar",
                        chart: {
                            spacingBottom: -15,
                            spacingTop: 10,
                            spacingLeft: -20,
                            spacingRight: 10,
                        }

                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }


                    }
                },
                xAxis: {
                    visible: false,
                    categories: ['Career Level', 'Salary']

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
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                        }
                    }


                }],
                credits: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [],
                    tooltip: {enabled: false},
                    showInLegend: false,
                    color: '#DCE6F2'

                }, {
                    name: '',
                    data: [],
                    showInLegend: false,
                    color: '#376092'


                }]
            };
        $scope.chartConfig_barUserPercent =
            {
                options: {
                    title: {
                        text: ''
                    },
                    chart: {
                        type: "bar",
                        chart: {
                            spacingBottom: -15,
                            spacingTop: 10,
                            spacingLeft: -20,
                            spacingRight: 10,
                        }

                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }, bar: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                            }
                        }


                    }
                },
                xAxis: {
                    visible: true,
                    categories: [],
                    labels: {
                        style: {
                            fontWeight: 'bold',
                            fontSize: '15px',
                            border: 0
                        }
                    }
                    // categories: ['Your Function Group', 'Your Function','Your Industry','Your Industry Group','Your Industry and Function','Your Company']

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
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                        }
                    }


                }],
                credits: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [],
                    tooltip: {enabled: false},
                    showInLegend: false,
                    color: '#f34235',
                }, {
                    name: '',
                    data: [],
                    tooltip: {enabled: false},
                    showInLegend: false,
                    color: '#337ab7',

                }, {
                    name: '',
                    data: [],
                    tooltip: {enabled: false},
                    showInLegend: false,
                    color: '#3c763d',
                }]
            };
        $scope.chartConfig_SalaryGrowthbarCom = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarInFn = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarInGrp = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarFnGrp = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarIn = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarFn = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };

        // Growth Bar ///

        $scope.chartConfig_barCom = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_barInFn = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_barInGrp = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_barFnGrp = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_barIn = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };
        $scope.chartConfig_barFn = {
            options: {
                title: {
                    text: ''
                },
                chart: {
                    type: "bar",
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            },
            xAxis: {
                visible: false,
                categories: []
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: [],
                tooltip: {enabled: false},
                showInLegend: false,
                color: '#DCE6F2'
            }, {
                name: '',
                data: [],
                showInLegend: false,
                color: '#376092'
            }]
        };


        if (angular.isUndefined($localStorage["User"])) {

            $localStorage["User"] = '',
                $state.go("page.index")
        }
        else if ($localStorage["User"].hasOwnProperty("Email")) {
            $scope.UserInfo = $localStorage["User"];

        }
        else if (angular.isDefined($localStorage["guestUser"])) {
            $scope.UserInfo = $localStorage["guestUser"];

        }

        getAllIntialData(reportValues);
        function getAllIntialData(reportValues) {
            var level = $scope.UserInfo["Level"];
            var industry = $scope.UserInfo["Industry"];
            var role = $scope.UserInfo["Role"];
            $scope.CL_Text = reportValues['CL_text'];
            $scope.PP_Text = reportValues['PP_text'];
            var company = $scope.UserInfo["Company"];
            var Salary = $scope.UserInfo["Salary"];
            if (Salary < 1) {
                var Salary = $scope.UserInfo["Salary"] * 100000;
                $scope.UserInfo["Salary"] = Salary;
            }
            var resolvData1 = reportValues;
            angular.forEach(resolvData1, function (v, k) {
                var innerData = k

                if (v.hasOwnProperty("compensation")) {
                    if (v.hasOwnProperty('belowRank')) {
                        $scope.initalBar['levelVal'] = v['belowRank'];
                        $scope.chartConfig_bar.series[1]["data"].push(v['belowRank'])
                        $scope.chartConfig_bar.series[0]["data"].push(100 - v['belowRank']);
                    }
                    if (v.hasOwnProperty('belowSalary')) {
                        $scope.initalBar['SalaryVal'] = v['belowSalary'];
                        $scope.chartConfig_barSalary.series[1]["data"].push(v['belowSalary']);
                        $scope.chartConfig_barSalary.series[0]["data"].push(100 - v['belowSalary']);
                    }


                    var resolvData = v;
                    $scope.availableData = v["compensation"]['btnStatus'];
                    $scope.btnStatus = Object.keys(v["compensation"]['btnStatus']);
                    // $scope.title=resolvData["title"]
                    //if(v.hasOwnProperty('belowRank')){$scope.initalBar['levelVal']=;

                    //}
                    $scope.index = v["compensation"]["index"];
                    $scope.mylevel = v["compensation"]["mylevel"];
                    $scope.xAxis = v["compensation"]["xAxis"];
                    $scope.xAxis8 = v["compensation"]["xAxis8"];
                    $scope.xAxis9 = v["compensation"]["xAxis9"];
                    $scope.yaxis = v["compensation"]["yaxis"];
                    var salary = $scope.UserInfo["Salary"];
                    if ($scope.xAxis8.length == 1) {
                        $scope.CompensatioXaxisTitle = "Percentile"
                        $scope.chartConfig_comp =
                            {
                                options: {
                                    legend: {
                                        layout: 'vertical',
                                        align: 'left',
                                        verticalAlign: 'top',
                                        x: 60,
                                        y: 10,
                                        floating: true,
                                        borderWidth: 2,
                                        borderColor: '#000000',
                                        backgroundColor: '#FFFFFF',
                                        shadow: true
                                    },
                                    title: {
                                        text: '',
                                        style: {
                                            display: 'none'
                                        }
                                    },
                                    chart: {
                                        spacingBottom: -15,
                                        spacingTop: 10,
                                        spacingLeft: -20,
                                        spacingRight: 10,
                                    }
                                },
                                xAxis: {
                                    title: {
                                        text: 'Career Level '
                                    },
                                    categories: ["33", "50", "90"]
                                },

                                yAxis: {
                                    title: {
                                        text: 'Compensation (INR Lakhs)'
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                series: [

                                    {
                                        showInLegend: false,
                                        name: 'Percentaile',
                                        data: [$scope.xAxis8[0], v["compensation"]["xAxis50"][0], $scope.xAxis9[0]],
                                        type: 'column',
                                        pointWidth: 28,
                                        color: '#f34235',


                                    },
                                    {
                                        // showInLegend:false,
                                        name: 'Your Salary Level',
                                        type: 'column',
                                        tooltip: {
                                            headerFormat: '<b>{series.name}</b><br>',
                                            pointFormat: '{point.y} INR Lakhs'
                                        },
                                        data: [[1, salary]],
                                        pointWidth: 28,
                                        color: '#a94442'
                                    },

                                ]
                            };
                    }
                    else {
                        $scope.chartConfig_comp =
                            {
                                options: {
                                    legend: {
                                        layout: 'vertical',
                                        align: 'left',
                                        verticalAlign: 'top',
                                        x: 60,
                                        y: 10,
                                        floating: true,
                                        borderWidth: 2,
                                        borderColor: '#000000',
                                        backgroundColor: '#FFFFFF',
                                        shadow: true
                                    },
                                    title: {
                                        text: '',
                                        style: {
                                            display: 'none'
                                        }
                                    },
                                    chart: {
                                        spacingBottom: -15,
                                        spacingTop: 10,
                                        spacingLeft: -20,
                                        spacingRight: 10,
                                    }
                                },
                                xAxis: {
                                    title: {
                                        text: 'Career Level '
                                    },
                                    categories: $scope.xAxis
                                },

                                yAxis: {
                                    title: {
                                        text: 'Compensation (INR Lakhs)'
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                series: [

                                    {
                                        showInLegend: false,
                                        name: 'Your Level',
                                        data: $scope.yaxis,
                                        type: 'column',
                                        pointWidth: 28,
                                        color: '#ccc',


                                    },
                                    {
                                        // showInLegend:false,
                                        name: 'Your Salary Level',
                                        type: 'scatter',
                                        tooltip: {
                                            headerFormat: '<b>{series.name}</b><br>',
                                            pointFormat: '{point.y} INR Lakhs'
                                        },
                                        data: [[$scope.index, salary]],
                                        pointWidth: 28,
                                        color: '#a94442'
                                    },
                                    {
                                        name: '33th Percentile Salary',
                                        data: $scope.xAxis8,
                                        color: '#337ab7',
                                        allowPointSelect: true,

                                    },
                                    {
                                        name: '50th Percentile Salary',
                                        data: v["compensation"]["xAxis50"],
                                        color: '#3c763d'


                                    },
                                    {
                                        name: '90th Percentile Salary',
                                        data: $scope.xAxis9,
                                        color: '#f34235',

                                    }
                                ]
                            };
                    }

                    if (v.hasOwnProperty("promotion")) {
                        $scope.GrowthFactor = v["compensation"]["nxtGrowthfactor"];
                        $scope.chartConfig_CLGrowth.series[1]["data"].push($scope.GrowthFactor["nxtlevl"])
                        $scope.chartConfig_CLGrowth.series[0]["data"].push(100 - $scope.GrowthFactor["nxtlevl"]);
                        $scope.chartConfig_barSalaryGrowth.series[1]["data"].push($scope.GrowthFactor["avGSalaryPer"])
                        $scope.chartConfig_barSalaryGrowth.series[0]["data"].push(100 - $scope.GrowthFactor["avGSalaryPer"]);
                        $scope.availableData = v["compensation"]['btnStatus'];
                        $scope.btnStatus = Object.keys(v["compensation"]['btnStatus']);
                        $scope.xAxis = v["promotion"]["xAxis"];
                        $scope.yaxis = v["promotion"]["yAxis"];
                        $scope.yaxis1 = v["promotion"]["yAxis1"];
                        $scope.yaxis2 = v["promotion"]["yAxis2"];
                        $scope.title = v["promotion"]["title"];
                        $scope.xAxisLine = v["promotion"]["xAxisLine"]
                        $scope.yAxisLine = v["promotion"]["yAxisLine"]

                        $scope.chartConfig =
                            {
                                options: {
                                    title: {
                                        text: '',
                                        style: {
                                            display: 'none'
                                        }
                                    },
                                    chart: {
                                        type: "bar",
                                        spacingTop: 10,
                                        spacingLeft: -20,
                                        spacingRight: 10
                                    },
                                    tooltip: {

                                        formatter: function () {
                                            var s = '<b> Career Level ' + this.x + '</b>';

                                            $.each(this.points, function () {
                                                if (this.series.name == "Median Compensation") {
                                                    s += '<br/>' + this.series.name + ': ' +
                                                        this.y + ' INR Lakh';
                                                }
                                                else if (this.series.name == "Frequency") {
                                                    s += '<br/> % of Total People : ' +
                                                        this.y;
                                                }
                                                else {
                                                    s += '<br/>' + this.series.name + ': ' +
                                                        this.y;
                                                }

                                            });
                                            return s;
                                        },
                                        shared: true,
                                        crosshairs: true
                                    }

                                },

                                xAxis: {
                                    title: {
                                        text: 'Career Level '
                                    },
                                    categories: $scope.xAxis
                                },
                                yAxis: [{title: {text: ""}}, {
                                    title: {
                                        text: 'Rainfall'
                                    },
                                    labels: {
                                        format: '{value} mm'
                                    },
                                    visible: false,
                                    opposite: true
                                }],
                                credits: {
                                    enabled: false
                                },


                                series: [
                                    {
                                        showInLegend: false,
                                        name: 'Barrier',
                                        data: $scope.yaxis1,
                                        type: 'column',
                                        pointWidth: 2,
                                        pointPlacement: 0.33,
                                        color: 'rgb(255,0,0)',
                                    },
                                    {
                                        grouping: false,
                                        showInLegend: false,
                                        name: 'Frequency',
                                        data: $scope.yaxis,
                                        type: 'column',
                                        pointWidth: 25,
                                        pointPadding: 2,
                                        color: 'rgb(85,142,213)',
                                        dataLabels: {
                                            enabled: true,
                                            //color: '#000000',
                                            //align: 'center',
                                            format: '{point.y}' + ' %', // one decimal
                                            // y: 10, // 10 pixels down from the top
                                            style: {
                                                fontSize: '10px',
                                                fontFamily: 'Verdana, sans-serif',
                                                textOutline: 0

                                            }

                                        }


                                    },
                                    {
                                        showInLegend: false,
                                        type: 'spline',
                                        name: 'Median Compensation',
                                        data: $scope.yaxis2,
                                        yAxis: 1,
                                        color: 'transparent',
                                        borderColor: 'transparent',
                                        // make the line invisible
                                        marker: {
                                            enabled: true,
                                            fillColor: 'transparent',
                                            radius: -1,
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }
                                            }

                                        }


                                    }

                                ]
                            };
                        if ($scope.yaxis.length < 5) {
                            $scope.chartConfig.series[1]["pointWidth"] = 35;
                            $scope.chartConfig.series[1]["pointPadding"] = 0;
                            $scope.chartConfig.series[0]["pointPlacement"] = 0.2;
                        }
                        else if ($scope.yaxis.length >= 5 && $scope.yaxis.length < 7) {
                            $scope.chartConfig.series[1]["pointWidth"] = 27;
                            $scope.chartConfig.series[1]["pointPadding"] = 0;
                            $scope.chartConfig.series[0]["pointPlacement"] = 0.30;
                        }
                        else if ($scope.yaxis.length >= 8 && $scope.yaxis.length < 10) {
                            $scope.chartConfig.series[1]["pointWidth"] = 22;
                            //$scope.chartConfig.series[1]["pointPadding"]=0;
                            // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                        }
                        //$scope.xAxisLine=$scope.xAxis
                        //if($scope.xAxis[0].length>3)
                        //{
                        //    for(var xa=0;xa<$scope.xAxis.length-1;xa++)
                        //    {
                        //        var str=$scope.xAxis[xa].split('-');
                        //        $scope.xAxisLine=str[1]+"-"+str[0]
                        //
                        //    }
                        //}else
                        //{
                        //    $scope.xAxisLine=$scope.xAxis.reverse();
                        //}
                        $scope.chartConfig_Line =
                            {
                                options: {
                                    title: {
                                        text: '',
                                        style: {
                                            display: 'none'
                                        }
                                    },
                                    chart: {
                                        type: "line",
                                        chart: {
                                            type: "bar",
                                            spacingTop: 10,
                                            spacingLeft: -10,
                                            spacingRight: 10
                                        },
                                    },
                                    tooltip: {

                                        formatter: function () {
                                            var s = '<b> Career Level ' + this.x + '</b>';

                                            $.each(this.points, function () {
                                                if (this.series.name == "Median Compensation") {
                                                    s += '<br/>' + this.series.name + ': ' +
                                                        this.y + ' INR Lakh';
                                                }

                                            });
                                            return s;
                                        },
                                        shared: true,
                                        crosshairs: true
                                    }

                                },

                                xAxis: {
                                    title: {
                                        text: ''
                                    },
                                    categories: $scope.xAxisLine
                                },
                                yAxis: [{title: {text: ""}}, {
                                    title: {
                                        text: ''
                                    },
                                    labels: {
                                        format: '{value} '
                                    },
                                    visible: true,
                                }],
                                credits: {
                                    enabled: false
                                },


                                series: [


                                    {
                                        showInLegend: false,
                                        type: 'line',
                                        name: 'Median Compensation',
                                        data: $scope.yAxisLine,
                                        yAxis: 1,
                                        color: 'red',
                                        borderColor: 'transparent',
                                        // make the line invisible
                                        marker: {
                                            enabled: true,
                                            fillColor: 'transparent',
                                            radius: -1,
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }
                                            }

                                        }


                                    }

                                ]
                            };
                        if ($scope.btnStatus.length > 0) {
                            for (var x = 0; x < $scope.btnStatus.length; x++) {
                                if ($scope.btnStatus[x] == "Company") {
                                    $scope.btnComany = true;
                                    $scope.btnComanyPromotion = true;
                                }
                                else if ($scope.btnStatus[x] == "FunInd") {
                                    $scope.btnFunInd = true;
                                    $scope.btnFunIndPromotion = true;
                                }
                                else if ($scope.btnStatus[x] == "Fun") {
                                    $scope.btnFun = true;
                                    $scope.btnFunPromotion = true;

                                }
                                else if ($scope.btnStatus[x] == "Ind") {
                                    $scope.btnInd = true;
                                    $scope.btnIndPromotion = true;
                                }
                                else if ($scope.btnStatus[x] == "FunGroup") {
                                    $scope.btnFunGrp = true;
                                    $scope.btnFunGrpPromotion = true;
                                }
                                else if ($scope.btnStatus[x] == "IndGroup") {
                                    $scope.btnIndGrp = true;
                                    $scope.btnIndGrpPromotion = true;
                                }
                            }
                        }
                    }
                }
                if (v.hasOwnProperty('belowRank') && v.hasOwnProperty('aboveRank') && v.hasOwnProperty('sameRank')) {
                    // var data=[v['belowRank'],v['sameRank'],v['aboveRank']];
                    $scope.chartConfig_barUserPercent.series[2]["data"].push(v['belowRank']);
                    $scope.chartConfig_barUserPercent.series[1]["data"].push(v['sameRank']);
                    $scope.chartConfig_barUserPercent.series[0]["data"].push(v['aboveRank']);
                    $scope.chartConfig_barUserPercent.xAxis.categories.push(k);
                }
                if (k == 'Your Company' && v['belowSalary'] > 0) {
                    $scope.chartConfig_barCom.series[1]["data"].push(v['belowSalary']);
                    $scope.chartConfig_barCom.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barCom.xAxis.categories.push(k);
                    $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarCom.series[1]["data"].push(v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarCom.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarCom.xAxis.categories.push(k);
                       // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                    }
                }
                if (k == 'Your Industry and Function' && v['belowSalary'] > 0) {
                    $scope.chartConfig_barInFn.series[1]["data"].push(v['belowSalary']);
                    $scope.chartConfig_barInFn.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barInFn.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barInFn.xAxis.categories.push('Salary');
                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarInFn.series[1]["data"].push(v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarInFn.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarInFn.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                    }
                }
                if (k == 'Your Industry Group' && v['belowSalary'] > 0) {
                    $scope.chartConfig_barInGrp.series[1]["data"].push(v['belowSalary']);
                    $scope.chartConfig_barInGrp.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barInGrp.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barInGrp.xAxis.categories.push('Salary');
                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarInGrp.series[1]["data"].push(v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarInGrp.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarInGrp.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                    }
                }
                if (k == 'Your Function Group' && v['belowSalary'] > 0) {
                    $scope.chartConfig_barFnGrp.series[1]["data"].push(v['belowSalary']);
                    $scope.chartConfig_barFnGrp.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barFnGrp.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barFnGrp.xAxis.categories.push('Salary');
                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarFnGrp.series[1]["data"].push(v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarFnGrp.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarFnGrp.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                    }
                }
                if (k == 'Your Industry' && v['belowSalary'] > 0) {
                    $scope.chartConfig_barIn.series[1]["data"].push(v['belowSalary']);
                    $scope.chartConfig_barIn.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barIn.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barIn.xAxis.categories.push('Salary');
                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarIn.series[1]["data"].push(v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarIn.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarIn.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                    }
                }
                if (k == 'Your Function' && v['belowSalary'] > 0) {
                    $scope.chartConfig_barFn.series[1]["data"].push(v['belowSalary']);
                    $scope.chartConfig_barFn.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barFn.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barFn.xAxis.categories.push('Salary');
                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarFn.series[1]["data"].push(v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarFn.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarFn.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                    }
                }

            });


        }

        $scope.getChartCompensation = function (mod) {
            var values = $scope.availableData[mod];
            if (mod == "FunGroup" || mod == "IndGroup") {
                var params = {
                    "Role": $scope.UserInfo["Role"],
                    "Company": $scope.UserInfo["Company"],
                    "Industry": $scope.UserInfo["Industry"],
                    "keys": values["data"],
                    mod: mod,
                    "level": $scope.UserInfo["Level"],
                    "type": values["type"],
                    "group": values["group"]
                }
            }
            else {
                var params = {
                    "Role": $scope.UserInfo["Role"],
                    "Company": $scope.UserInfo["Company"],
                    "Industry": $scope.UserInfo["Industry"],
                    "keys": values["data"],
                    mod: mod,
                    "level": $scope.UserInfo["Level"],
                    "type": values["type"]
                }
            }


            $http({
                url: '/report/getCompensationChart',
                method: 'post',
                data: params
            }).then(function success(response) {
                var data = response["data"];
                var v = {};
                v["compensation"] = data["chartData"]
                $scope.index = v["compensation"]["index"];
                $scope.mylevel = v["compensation"]["mylevel"];
                $scope.xAxis = v["compensation"]["xAxis"];
                $scope.xAxis8 = v["compensation"]["xAxis8"];
                $scope.xAxis9 = v["compensation"]["xAxis9"];
                $scope.yaxis = v["compensation"]["yaxis"];
                var salary = $scope.UserInfo["Salary"];
                if ($scope.xAxis8.length == 1) {
                    $scope.CompensatioXaxisTitle = "Percentile"
                    $scope.chartConfig_comp =
                        {
                            options: {
                                legend: {
                                    layout: 'vertical',
                                    align: 'left',
                                    verticalAlign: 'top',
                                    x: 60,
                                    y: 10,
                                    floating: true,
                                    borderWidth: 2,
                                    borderColor: '#000000',
                                    backgroundColor: '#FFFFFF',
                                    shadow: true
                                },
                                title: {
                                    text: '',
                                    style: {
                                        display: 'none'
                                    }
                                },
                                chart: {
                                    spacingBottom: -15,
                                    spacingTop: 10,
                                    spacingLeft: -20,
                                    spacingRight: 10,
                                }
                            },
                            xAxis: {
                                title: {
                                    text: 'Career Level '
                                },
                                categories: ["33", "50", "90"]
                            },

                            yAxis: {
                                title: {
                                    text: 'Compensation (INR Lakhs)'
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            series: [

                                {
                                    showInLegend: false,
                                    name: 'Percentaile',
                                    data: [$scope.xAxis8[0], v["compensation"]["xAxis50"][0], $scope.xAxis9[0]],
                                    type: 'column',
                                    pointWidth: 28,
                                    color: '#f34235',


                                },
                                {
                                    // showInLegend:false,
                                    name: 'Your Salary Level',
                                    type: 'column',
                                    tooltip: {
                                        headerFormat: '<b>{series.name}</b><br>',
                                        pointFormat: '{point.y} INR Lakhs'
                                    },
                                    data: [[1, $scope.UserInfo["Salary"]]],
                                    pointWidth: 28,
                                    color: '#a94442'
                                },

                            ]
                        };
                }
                else {
                    $scope.chartConfig_comp =
                        {
                            options: {
                                legend: {
                                    layout: 'vertical',
                                    align: 'left',
                                    verticalAlign: 'top',
                                    x: 60,
                                    y: 10,
                                    floating: true,
                                    borderWidth: 2,
                                    borderColor: '#000000',
                                    backgroundColor: '#FFFFFF',
                                    shadow: true
                                },
                                title: {
                                    text: '',
                                    style: {
                                        display: 'none'
                                    }
                                },
                                chart: {
                                    spacingBottom: -15,
                                    spacingTop: 10,
                                    spacingLeft: -20,
                                    spacingRight: 10,
                                }
                            },
                            xAxis: {
                                title: {
                                    text: 'Career Level '
                                },
                                categories: $scope.xAxis
                            },

                            yAxis: {
                                title: {
                                    text: 'Compensation (INR Lakhs)'
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            series: [

                                {
                                    showInLegend: false,
                                    name: 'Your Level',
                                    data: $scope.yaxis,
                                    type: 'column',
                                    pointWidth: 28,
                                    color: '#ccc',


                                },
                                {
                                    // showInLegend:false,
                                    name: 'Your Salary Level',
                                    type: 'scatter',
                                    tooltip: {
                                        headerFormat: '<b>{series.name}</b><br>',
                                        pointFormat: '{point.y} INR Lakhs'
                                    },
                                    data: [[$scope.index, $scope.UserInfo["Salary"]]],
                                    pointWidth: 28,
                                    color: '#a94442'
                                },
                                {
                                    name: '33th Percentile Salary',
                                    data: $scope.xAxis8,
                                    color: '#337ab7',
                                    allowPointSelect: true,

                                },
                                {
                                    name: '50th Percentile Salary',
                                    data: v["compensation"]["xAxis50"],
                                    color: '#3c763d'


                                },
                                {
                                    name: '90th Percentile Salary',
                                    data: $scope.xAxis9,
                                    color: '#f34235',

                                }
                            ]
                        };
                }


            }, function error(response) {
            })


        }
        $scope.getChartPromotion = function (mod) {
            var values = $scope.availableData[mod];
            if (mod == "FunGroup" || mod == "IndGroup") {
                var params = {
                    "Role": $scope.UserInfo["Role"],
                    "Company": $scope.UserInfo["Company"],
                    "Industry": $scope.UserInfo["Industry"],
                    mod: mod,
                    "level": $scope.UserInfo["Level"],
                    "group": values["group"]
                }
            }
            else {
                var params = {
                    "Role": $scope.UserInfo["Role"],
                    "Company": $scope.UserInfo["Company"],
                    "Industry": $scope.UserInfo["Industry"],
                    mod: mod,
                    "level": $scope.UserInfo["Level"]
                }
            }


            $http({
                url: '/report/getPromotionChart',
                method: 'post',
                data: params
            }).then(function success(response) {
                var data = response["data"];
                var v = {};
                v["promotion"] = data["chartData"];
                $scope.xAxis = v["promotion"]["xAxis"];
                $scope.xAxisLine = v["promotion"]["xAxisLine"];
                $scope.yaxis = v["promotion"]["yAxis"];
                $scope.yaxisLine = v["promotion"]["yAxisLine"];
                $scope.yaxis1 = v["promotion"]["yAxis1"];
                $scope.yaxis2 = v["promotion"]["yAxis2"];
                $scope.title = v["promotion"]["title"];
                $scope.chartConfig =
                    {
                        options: {
                            title: {
                                text: '',
                                style: {
                                    display: 'none'
                                }
                            },
                            chart: {
                                type: "bar",
                                spacingTop: 10,
                                spacingLeft: -20,
                                spacingRight: 10
                            },
                            tooltip: {

                                formatter: function () {
                                    var s = '<b> Career Level ' + this.x + '</b>';

                                    $.each(this.points, function () {
                                        if (this.series.name == "Median Compensation") {
                                            s += '<br/>' + this.series.name + ': ' +
                                                this.y + ' INR Lakh';
                                        }
                                        else if (this.series.name == "Frequency") {
                                            s += '<br/> % of Total People : ' +
                                                this.y;
                                        }
                                        else {
                                            s += '<br/>' + this.series.name + ': ' +
                                                this.y;
                                        }

                                    });
                                    return s;
                                },
                                shared: true,
                                crosshairs: true
                            }

                        },

                        xAxis: {
                            title: {
                                text: 'Career Level '
                            },
                            categories: $scope.xAxis
                        },
                        yAxis: [{title: {text: ""}}, {
                            title: {
                                text: 'Rainfall'
                            },
                            labels: {
                                format: '{value} mm'
                            },
                            visible: false,
                            opposite: true
                        }],
                        credits: {
                            enabled: false
                        },


                        series: [
                            {
                                showInLegend: false,
                                name: 'Barrier',
                                data: $scope.yaxis1,
                                type: 'column',
                                pointWidth: 2,
                                pointPlacement: 0.33,
                                color: 'rgb(255,0,0)',
                            },
                            {
                                grouping: false,
                                showInLegend: false,
                                name: 'Frequency',
                                data: $scope.yaxis,
                                type: 'column',
                                pointWidth: 25,
                                pointPadding: 2,
                                color: 'rgb(85,142,213)',
                                dataLabels: {
                                    enabled: true,
                                    //color: '#000000',
                                    //align: 'center',
                                    format: '{point.y}' + ' %', // one decimal
                                    // y: 10, // 10 pixels down from the top
                                    style: {
                                        fontSize: '10px',
                                        fontFamily: 'Verdana, sans-serif',
                                        textOutline: 0

                                    }

                                }


                            },
                            {
                                showInLegend: false,
                                type: 'spline',
                                name: 'Median Compensation',
                                data: $scope.yaxis2,
                                yAxis: 1,
                                color: 'transparent',
                                borderColor: 'transparent',
                                // make the line invisible
                                marker: {
                                    enabled: true,
                                    fillColor: 'transparent',
                                    radius: -1,
                                    states: {
                                        hover: {
                                            enabled: false
                                        }
                                    }

                                }


                            }

                        ]
                    };
                if ($scope.yaxis.length < 5) {
                    $scope.chartConfig.series[1]["pointWidth"] = 35;
                    $scope.chartConfig.series[1]["pointPadding"] = 0;
                    $scope.chartConfig.series[0]["pointPlacement"] = 0.2;
                }
                else if ($scope.yaxis.length >= 5 && $scope.yaxis.length < 7) {
                    $scope.chartConfig.series[1]["pointWidth"] = 27;
                    $scope.chartConfig.series[1]["pointPadding"] = 0;
                    $scope.chartConfig.series[0]["pointPlacement"] = 0.30;
                }
                else if ($scope.yaxis.length >= 8 && $scope.yaxis.length < 10) {
                    $scope.chartConfig.series[1]["pointWidth"] = 22;
                    //$scope.chartConfig.series[1]["pointPadding"]=0;
                    // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                }
                $scope.chartConfig_Line =
                    {
                        options: {
                            title: {
                                text: '',
                                style: {
                                    display: 'none'
                                }
                            },
                            chart: {
                                type: "line",
                                chart: {
                                    type: "bar",
                                    spacingTop: 10,
                                    spacingLeft: -10,
                                    spacingRight: 10
                                },
                            },
                            tooltip: {

                                formatter: function () {
                                    var s = '<b> Career Level ' + this.x + '</b>';

                                    $.each(this.points, function () {
                                        if (this.series.name == "Median Compensation") {
                                            s += '<br/>' + this.series.name + ': ' +
                                                this.y + ' INR Lakh';
                                        }

                                    });
                                    return s;
                                },
                                shared: true,
                                crosshairs: true
                            }

                        },

                        xAxis: {
                            title: {
                                text: ''
                            },
                            categories: $scope.xAxisLine
                        },
                        yAxis: [{title: {text: ""}}, {
                            title: {
                                text: ''
                            },
                            labels: {
                                format: '{value} '
                            },
                            visible: true,
                        }],
                        credits: {
                            enabled: false
                        },


                        series: [


                            {
                                showInLegend: false,
                                type: 'line',
                                name: 'Median Compensation',
                                data: $scope.yaxisLine,
                                yAxis: 1,
                                color: 'red',
                                borderColor: 'transparent',
                                // make the line invisible
                                marker: {
                                    enabled: true,
                                    fillColor: 'transparent',
                                    radius: -1,
                                    states: {
                                        hover: {
                                            enabled: false
                                        }
                                    }

                                }


                            }

                        ]
                    }

            }, function error(response) {
            })


        }

    }
})()