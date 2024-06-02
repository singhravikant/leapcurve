(function () {
    angular.module('naut').controller('CLReportController', CLReportController);
    CLReportController.$inject = ['$scope', '$http', '$localStorage', '$state', '$uibModal', '$linkedIn', 'toaster'];

    function CLReportController($scope, $http, $localStorage, $state, $uibModal, $linkedIn, toaster) {
        var vm = this;
        if ($localStorage['User'] != "") {
            reportValues = $localStorage['User']['reportValues']['reportData'];
        } else {
            reportValues = $localStorage['guestUser']['reportValues']['reportData'];
        }

        vm.allIndGrp = [];
        vm.allFunGrp = [];
        vm.isGuest = false;
        vm.userinfo = {};
        vm.guestuserinfo = {};
        vm.isGuest = reportValues["isGuest"];
        if ($localStorage["User"] != "") {
            $scope.newtext = $localStorage["User"]['newtext'];
        } else {
            $scope.newtext = $localStorage["guestUser"]['newtext'];
        }
        $scope.UserInfo = {};
        $scope.allResultData = {};
        $scope.initalBar = {};
        $scope.availableData = {};
        $scope.highestFilter = "";
        $scope.btnComany = false;
        $scope.btnFunInd = false;
        $scope.btnFun = false;
        $scope.ShowEmail = $localStorage["User"]["Email"];
        $scope.btnFunGrp = false;
        $scope.btnIndGrp = false;
        $scope.btnInd = false;
        $scope.btnComanyPromotion = false;
        $scope.btnFunIndPromotion = false;
        $scope.btnFunPromotion = false;
        $scope.btnFunGrpPromotion = false;
        $scope.btnIndGrpPromotion = false;
        $scope.btnIndPromotion = false;
        $scope.CompensatioXaxisTitle = "Career Level";
        $scope.graphType = 0;
        $scope.xAxisVal = [];
        $scope.showChart = false;

        if ($localStorage["User"] != "") {
            $scope.changefunction = $localStorage["User"]["changefunction"];
            $scope.changeindustry = $localStorage["User"]["changeindustry"];
        }
        else {
            $scope.changefunction = $localStorage["guestUser"]["changefunction"];
            $scope.changeindustry = $localStorage["guestUser"]["changeindustry"];
            ;
        }

        $scope.chartConfig_bar =
            {
                options: {
                    title: {
                        text: ''
                    }, tooltip: {shared: true, useHTML: true},
                    chart: {
                        type: "bar",
                        chart: {}

                    },
                    plotOptions: {
                        bar: {
                            shadow: false,
                            grouping: false,
                        },
                        series: {
                            states: {
                                hover: {
                                    brightness: 0 // darken
                                }
                            }
                        }


                    }
                },
                xAxis: {
                    visible: false,
                    categories: ['Career Level']

                },
                yAxis: [{
                    min: 0,
                    max: 100,
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
                tooltip: {

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
                    shared: true,
                    crosshairs: true
                },
                credits: {
                    enabled: false
                },
                tooltip: {enabled: true},
                series: [{
                    name: 'Percent',
                    data: [],
                    // tooltip: {
                    //     enabled: true,
                    //     pointFormatter:function(){
                    //         return '<tspan style="fill:#222222" x="8" dy="15">?</tspan><tspan dx="0"> Percent: </tspan>'+$scope.value1;
                    //     }
                    // },
                    showInLegend: false,
                    enableMouseTracking: false,
                    groupPadding: 0,
                    color: '#222222'

                }, {
                    name: 'Percent',
                    data: [],
                    groupPadding: 0.2,
                    showInLegend: false,
                    color: '#25ad9f',
                    // color:'#66b6bf'

                }]
            };
        $scope.chartConfig_barSalary =
            {
                options: {
                    title: {
                        text: ''
                    }, tooltip: {shared: true, useHTML: true},
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
                        bar: {
                            shadow: false,
                            grouping: false,
                        },
                        series: {
                            states: {
                                hover: {
                                    brightness: 0 // darken
                                }
                            }
                        }


                    }
                },
                xAxis: {
                    visible: false,
                    categories: ['Career Level', 'Salary']

                },
                yAxis: [{
                    min: 0,
                    max: 100,
                    title: {
                        text: ''
                    },
                    visible: false
                    ,
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                        }
                    }


                }],
                credits: {
                    enabled: false
                },
                tooltip: {enabled: true},
                series: [{
                    name: 'Percent',
                    data: [],
                    groupPadding: 0,
                    enableMouseTracking: false,
                    // tooltip: {
                    //     enabled: true,
                    //     pointFormatter:function(){
                    //         return '<tspan style="fill:#222222" x="8" dy="15">?</tspan><tspan dx="0"> Percent: </tspan>'+$scope.value2;
                    //     }
                    // },
                    showInLegend: false,
                    color: '#222222'

                }, {
                    name: 'Percent',
                    data: [],
                    groupPadding: 0.2,
                    showInLegend: false,
                    color: '#25ad9f',
                    // color:'#66b6bf'

                }]
            };
        $scope.chartConfig_CLGrowth =
            {
                options: {
                    title: {
                        text: ''
                    }, tooltip: {shared: true, useHTML: true},
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
                            //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
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
                    enableMouseTracking: false,
                    showInLegend: false,
                    color: '#222222'

                }, {
                    name: '',
                    data: [],
                    showInLegend: false,
                    color: '#25ad9f',
                    // color:'#66b6bf'

                }]
            };
        $scope.chartConfig_barSalaryGrowth =
            {
                options: {
                    title: {
                        text: ''
                    }, tooltip: {shared: true, useHTML: true},
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
                            //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                        }
                    }


                }],
                credits: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [],
                    enableMouseTracking: false,
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



        $scope.chartConfig_barCom = {
            options: {
                title: {
                    text: ''
                }, tooltip: {shared: true, useHTML: true},
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
                    bar: {
                        shadow: false,
                        grouping: false,
                    },
                    series: {
                        states: {
                            hover: {
                                brightness: 0 // darken
                            }
                        }
                    }


                }
            },
            xAxis: {
                visible: false,
                categories: []
            },
            yAxis: [{
                min: 0,
                max: 100,
                title: {
                    text: ''
                },
                visible: false
                ,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            tooltip: {
                enable: true,
                shared: true,
            },
            series: [{
                name: 'Salary Percentile ',
                data: [],
                groupPadding: 0,
                tooltip: {
                    pointFormatter: function () {
                        return;
                    }
                },
                showInLegend: false,
                enableMouseTracking: false,
                color: '#222222'
            }, {
                name: 'Salary Percentile  ',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };


        $scope.chartConfig_barInFn = {
            options: {
                title: {
                    text: ''
                }, tooltip: {shared: true, useHTML: true},
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
                    bar: {
                        shadow: false,
                        grouping: false,
                    },
                    series: {
                        states: {
                            hover: {
                                brightness: 0 // darken
                            }
                        }
                    }


                }
            },
            xAxis: {
                visible: false,
                categories: []
            },
            yAxis: [{
                min: 0,
                max: 100,
                title: {
                    text: ''
                },
                visible: false
                ,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            tooltip: {
                enable: true,
                shared: true,
            },
            series: [{
                name: 'Salary Percentile ',
                data: [],
                groupPadding: 0,
                tooltip: {
                    pointFormatter: function () {
                        return;
                    }
                },
                showInLegend: false,
                enableMouseTracking: false,
                color: '#222222'
            }, {
                name: 'Salary Percentile  ',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };
        $scope.chartConfig_barInGrp = {
            options: {
                title: {
                    text: ''
                }, tooltip: {shared: true, useHTML: true},
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
                    bar: {
                        shadow: false,
                        grouping: false,
                    },
                    series: {
                        states: {
                            hover: {
                                brightness: 0 // darken
                            }
                        }
                    }


                }
            },
            xAxis: {
                visible: false,
                categories: []
            },
            yAxis: [{
                min: 0,
                max: 100,
                title: {
                    text: ''
                },
                visible: false
                ,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            tooltip: {
                enable: true,
                shared: true,
            },
            series: [{
                name: 'Salary Percentile ',
                data: [],
                groupPadding: 0,
                tooltip: {
                    pointFormatter: function () {
                        return;
                    }
                },
                showInLegend: false,
                enableMouseTracking: false,
                color: '#222222'
            }, {
                name: 'Salary Percentile  ',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };
        $scope.chartConfig_barFnGrp = {
            options: {
                title: {
                    text: ''
                }, tooltip: {shared: true, useHTML: true},
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
                    bar: {
                        shadow: false,
                        grouping: false,
                    },
                    series: {
                        states: {
                            hover: {
                                brightness: 0 // darken
                            }
                        }
                    }


                }
            },
            xAxis: {
                visible: false,
                categories: []
            },
            yAxis: [{
                min: 0,
                max: 100,
                title: {
                    text: ''
                },
                visible: false
                ,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            tooltip: {
                enable: true,
                shared: true,
            },
            series: [{
                name: 'Salary Percentile ',
                data: [],
                groupPadding: 0,
                tooltip: {
                    pointFormatter: function () {
                        return;
                    }
                },
                showInLegend: false,
                enableMouseTracking: false,
                color: '#222222'
            }, {
                name: 'Salary Percentile  ',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };
        $scope.chartConfig_barIn = {
            options: {
                title: {
                    text: ''
                }, tooltip: {shared: true, useHTML: true},
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
                    bar: {
                        shadow: false,
                        grouping: false,
                    },
                    series: {
                        states: {
                            hover: {
                                brightness: 0 // darken
                            }
                        }
                    }


                }
            },
            xAxis: {
                visible: false,
                categories: []
            },
            yAxis: [{
                min: 0,
                max: 100,
                title: {
                    text: ''
                },
                visible: false
                ,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            tooltip: {
                enable: true,
                shared: true,
            },
            series: [{
                name: 'Salary Percentile ',
                data: [],
                groupPadding: 0,
                tooltip: {
                    pointFormatter: function () {
                        return;
                    }
                },
                showInLegend: false,
                enableMouseTracking: false,
                color: '#222222'
            }, {
                name: 'Salary Percentile  ',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };
        $scope.chartConfig_barFn = {
            options: {
                title: {
                    text: ''
                }, tooltip: {shared: true, useHTML: true},
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
                    bar: {
                        shadow: false,
                        grouping: false,
                    },
                    series: {
                        states: {
                            hover: {
                                brightness: 0 // darken
                            }
                        }
                    }


                }
            },
            xAxis: {
                visible: false,
                categories: []
            },
            yAxis: [{
                min: 0,
                max: 100,
                title: {
                    text: ''
                },
                visible: false
                ,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            tooltip: {
                enable: true,
                shared: true,
            },
            series: [{
                name: 'Salary Percentile ',
                data: [],
                groupPadding: 0,
                tooltip: {
                    pointFormatter: function () {
                        return;
                    }
                },
                showInLegend: false,
                enableMouseTracking: false,
                color: '#222222'
            }, {
                name: 'Salary Percentile  ',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
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
        $scope.changecl_graph = function (mod) {
            if ($scope.all == 'active') {
                $scope.chartConfig_barUserPercent.xAxis.categories = [];
                $scope.chartConfig_barUserPercent_mob.xAxis.categories = [];

            }
            if (mod == "Your Company") {
                $scope.comp1 = 'active';
                $scope.indfun1 = 'deactive';
                $scope.fun1 = 'deactive';
                $scope.ind1 = 'deactive';
                $scope.fungrp1 = 'deactive';
                $scope.indgrp1 = 'deactive';
                $scope.all = 'deactive';

            } else if (mod == "Your Industry and Function") {
                $scope.comp1 = 'deactive';
                $scope.indfun1 = 'active';
                $scope.fun1 = 'deactive';
                $scope.ind1 = 'deactive';
                $scope.fungrp1 = 'deactive';
                $scope.indgrp1 = 'deactive';
                $scope.all = 'deactive';
            } else if (mod == "Your Function") {
                $scope.comp1 = 'deactive';
                $scope.indfun1 = 'deactive';
                $scope.fun1 = 'active';
                $scope.ind1 = 'deactive';
                $scope.fungrp1 = 'deactive';
                $scope.indgrp1 = 'deactive';
                $scope.all = 'deactive';
            } else if (mod == "Your Industry") {
                $scope.comp1 = 'deactive';
                $scope.indfun1 = 'deactive';
                $scope.fun1 = 'deactive';
                $scope.ind1 = 'active';
                $scope.fungrp1 = 'deactive';
                $scope.indgrp1 = 'deactive';
                $scope.all = 'deactive';
            } else if (mod == "Your Function Group") {
                $scope.comp1 = 'deactive';
                $scope.indfun1 = 'deactive';
                $scope.fun1 = 'deactive';
                $scope.ind1 = 'deactive';
                $scope.fungrp1 = 'active';
                $scope.indgrp1 = 'deactive'
                $scope.all = 'deactive';
            } else if (mod == "Your Industry Group") {
                $scope.comp1 = 'deactive';
                $scope.indfun1 = 'deactive';
                $scope.fun1 = 'deactive';
                $scope.ind1 = 'deactive';
                $scope.fungrp1 = 'deactive';
                $scope.indgrp1 = 'active'
                $scope.all = 'deactive';
            } else if (mod == "All_Questions") {
                $scope.comp1 = 'deactive';
                $scope.indfun1 = 'deactive';
                $scope.fun1 = 'deactive';
                $scope.ind1 = 'deactive';
                $scope.fungrp1 = 'deactive';
                $scope.indgrp1 = 'deactive';
                $scope.all = 'active';
            }
            $scope.chartConfig_barUserPercent =
                {
                    options: {
                        legend: {
                            y: '-30',
                            align: 'center',
                            verticalAlign: 'top',

                            floating: false,
                            borderWidth: 2,
                            borderColor: '#000000',
                            backgroundColor: '#FFFFFF',
                            shadow: true
                        },
                        title: {
                            text: ''
                        },
                        chart: {
                            type: "bar",
                            chart: {}

                        },
                        plotOptions: {
                            series: {
                                stacking: 'normal'
                            }, bar: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    //color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
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
                                fontSize: '12px',
                                whiteSpace: 'nowrap',
                                border: 0,
                                fontFamily: 'Montserrat-Regular'
                            }
                        }
                        // categories: ['Your Function Group', 'Your Function','Your Industry','Your Industry Group','Your Industry and Function','Your Company']

                    },

                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },

                    yAxis: [{
                        // min: 0,
                        // max: 100,
                        title: {
                            text: ''
                        },
                        visible: false,
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                            }
                        }


                    }],
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Below Your Career Level',
                        data: [],
                        tooltip: {enabled: false},
                        index: 2,
                        legendIndex: 0,
                        // showInLegend: false,
                        //color:'#3c763d',
                        color: '#25ad9f',
                        // color:'#66b6bf',
                    },
                        {
                            name: ' Your Career Level',
                            data: [],
                            index: 1,
                            tooltip: {enabled: false},
                            // showInLegend: false,
                            // color:'#337ab7',
                            color: '#222222',
                            legendIndex: 1
//
                        }, {
                            name: 'Above Your Career Level',
                            data: [],
                            tooltip: {enabled: false},
                            // showInLegend: false2
                            index: 0,
                            color: '#124c92 ',
                            legendIndex: 2
                            //color:'#f34235',
                        }]
                };
            $scope.chartConfig_barUserPercent_mob =
                {
                    options: {
                        legend: {
                            y: '-30',
                            align: 'center',
                            verticalAlign: 'top',

                            floating: false,
                            borderWidth: 2,
                            borderColor: '#000000',
                            backgroundColor: '#FFFFFF',
                            shadow: true
                        },
                        title: {
                            text: ''
                        },
                        chart: {
                            type: "bar",
                            chart: {}

                        },
                        plotOptions: {
                            series: {
                                stacking: 'normal'
                            }, bar: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    //color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                                }
                            }


                        }
                    },
                    xAxis: {
                        visible: true,
                        categories: [],
                        labels: {
                            align: 'left',
                            x: 10,
                            y: -20,
                            style: {
                                fontWeight: 'bold',
                                fontSize: '13px',
                                whiteSpace: 'nowrap',
                                border: 0,
                                fontFamily: 'Montserrat-Regular'
                            }
                        }
                        // categories: ['Your Function Group', 'Your Function','Your Industry','Your Industry Group','Your Industry and Function','Your Company']

                    },

                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },

                    yAxis: [{
                        min: 0,
                        max: 100,
                        title: {
                            text: ''
                        },
                        visible: false
                        ,
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                //color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                            }
                        }


                    }],
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Below Your Career Level',
                        data: [],
                        tooltip: {enabled: false},
                        index: 2,
                        legendIndex: 0,
                        // showInLegend: false,
                        //color:'#3c763d',
                        color: '#25ad9f',
                        // color:'#66b6bf',
                    },
                        {
                            name: ' Your Career Level',
                            data: [],
                            index: 1,
                            tooltip: {enabled: false},
                            // showInLegend: false,
                            // color:'#337ab7',
                            color: '#222222',
                            legendIndex: 1
//
                        }, {
                            name: 'Above Your Career Level',
                            data: [],
                            tooltip: {enabled: false},
                            // showInLegend: false2
                            index: 0,
                            color: '#124c92 ',
                            legendIndex: 2
                            //color:'#f34235',
                        }]
                };
            if (mod != 'All_Questions') {
                if (reportValues[mod].hasOwnProperty('belowRank') && reportValues[mod].hasOwnProperty('aboveRank') && reportValues[mod].hasOwnProperty('sameRank')) {
                    $scope.chartConfig_barUserPercent.series[0]["data"] = [];
                    $scope.chartConfig_barUserPercent_mob.series[0]["data"] = [];
                    $scope.chartConfig_barUserPercent.series[1]["data"] = [];
                    $scope.chartConfig_barUserPercent_mob.series[1]["data"] = [];
                    $scope.chartConfig_barUserPercent.series[2]["data"] = [];
                    $scope.chartConfig_barUserPercent_mob.series[2]["data"] = [];
                    $scope.chartConfig_barUserPercent.xAxis.categories = [];
                    $scope.chartConfig_barUserPercent_mob.xAxis.categories = [];
                    $scope.chartConfig_barUserPercent.series[0]["data"].push(reportValues[mod]['belowRank']);
                    $scope.chartConfig_barUserPercent_mob.series[0]["data"].push(reportValues[mod]['belowRank']);
                    $scope.chartConfig_barUserPercent.series[1]["data"].push(reportValues[mod]['sameRank']);
                    $scope.chartConfig_barUserPercent_mob.series[1]["data"].push(reportValues[mod]['sameRank']);
                    $scope.chartConfig_barUserPercent.series[2]["data"].push(reportValues[mod]['aboveRank']);
                    $scope.chartConfig_barUserPercent_mob.series[2]["data"].push(reportValues[mod]['aboveRank']);
                    $scope.chartConfig_barUserPercent.xAxis.categories.push(mod);
                    $scope.chartConfig_barUserPercent_mob.xAxis.categories.push(mod);

                }
            } else {
                $scope.chartConfig_barUserPercent.series[0]["data"] = [];
                $scope.chartConfig_barUserPercent_mob.series[0]["data"] = [];
                $scope.chartConfig_barUserPercent.series[1]["data"] = [];
                $scope.chartConfig_barUserPercent_mob.series[1]["data"] = [];
                $scope.chartConfig_barUserPercent.series[2]["data"] = [];
                $scope.chartConfig_barUserPercent_mob.series[2]["data"] = [];
                $scope.chartConfig_barUserPercent.xAxis.categories = [];
                $scope.chartConfig_barUserPercent_mob.xAxis.categories = [];
                angular.forEach(reportValues, function (v, k) {
                        if (v.hasOwnProperty('belowRank') && v.hasOwnProperty('aboveRank') && v.hasOwnProperty('sameRank')) {
                            if (($scope.changeindustry == false && k == "Your Industry Group") || ($scope.changefunction == false && k == "Your Function Group")) {
                            }
                            else {
                                $scope.chartConfig_barUserPercent.series[0]["data"].push(v['belowRank']);
                                $scope.chartConfig_barUserPercent_mob.series[0]["data"].push(v['belowRank']);
                                $scope.chartConfig_barUserPercent.series[1]["data"].push(v['sameRank']);
                                $scope.chartConfig_barUserPercent_mob.series[1]["data"].push(v['sameRank']);
                                $scope.chartConfig_barUserPercent.series[2]["data"].push(v['aboveRank']);
                                $scope.chartConfig_barUserPercent_mob.series[2]["data"].push(v['aboveRank']);
                                $scope.chartConfig_barUserPercent.xAxis.categories.push(k);
                                $scope.chartConfig_barUserPercent_mob.xAxis.categories.push(k);

                            }


                        }
                    }
                );
                // setTimeout(function () {
                //     $scope.chartConfig_barUserPercent.xAxis.categories = [];
                // }, 10);
            }


        }
        getAllIntialData(reportValues);

        function getAllIntialData(reportValues) {
            var level = $scope.UserInfo["Level"];
            var industry = $scope.UserInfo["Industry"];
            var role = $scope.UserInfo["Role"];
            $scope.CL_Text = reportValues['CL_text'];
            var company = $scope.UserInfo["Company"];

            //$scope.allResultData=reportValues;
            var resolvData1 = reportValues;
            var resolvData2 = {};
            if (angular.isDefined(resolvData1["Your Company"])) {
                resolvData2["Your Company"] = resolvData1["Your Company"];

            }
            if (angular.isDefined(resolvData1["Your Industry and Function"])) {
                resolvData2["Your Industry and Function"] = resolvData1["Your Industry and Function"];

            }
            if (angular.isDefined(resolvData1["Your Function"])) {
                resolvData2["Your Function"] = resolvData1["Your Function"];

            }
            if (angular.isDefined(resolvData1["Your Industry"])) {
                resolvData2["Your Industry"] = resolvData1["Your Industry"];

            }

            if (angular.isDefined(resolvData1["Your Function Group"])) {
                resolvData2["Your Function Group"] = resolvData1["Your Function Group"];

            }
            if (angular.isDefined(resolvData1["Your Industry Group"])) {
                resolvData2["Your Industry Group"] = resolvData1["Your Industry Group"];

            }
            if (angular.isDefined(resolvData1["CL_text"])) {
                resolvData2["CL_text"] = resolvData1["CL_text"];

            }
            if (angular.isDefined(resolvData1["indGrp"])) {
                resolvData2["indGrp"] = resolvData1["indGrp"];

            }
            if (angular.isDefined(resolvData1["funGrp"])) {
                resolvData2["funGrp"] = resolvData1["funGrp"];

            }
            if (angular.isDefined(resolvData1["highestFilter"])) {
                resolvData2["highestFilter"] = resolvData1["highestFilter"];

            }
            if (angular.isDefined(resolvData1["isGuest"])) {
                resolvData2["isGuest"] = resolvData1["isGuest"];

            }

            angular.forEach(resolvData2, function (v, k) {


                if (k == "indGrp") {
                    vm.allIndGrp = v;
                }

                var innerData = k

                if (k == "indGrp") {
                    vm.allIndGrp = v;
                }
                if (k == "funGrp") {
                    vm.allFunGrp = v;
                }

                if (v.hasOwnProperty("compensation")) {
                    $scope.showChart = true;
                    $scope.allResultData = v["compensation"];
                    $scope.highestFilter = k;
                    if (v.hasOwnProperty('belowRank')) {
                        $scope.initalBar['levelVal'] = v['belowRank'];
                        $scope.chartConfig_bar.series[1]["data"].push(v['belowRank'])
                        // $scope.chartConfig_bar.series[0]["data"].push(Math.round((100-v['belowRank']),2));
                        $scope.chartConfig_bar.series[0]["data"].push(Math.round((100), 2));
                        $scope.value1 = v['belowRank'];
                    }
                    if (v.hasOwnProperty('belowSalary')) {
                        $scope.initalBar['SalaryVal'] = v['belowSalary'];
                        $scope.chartConfig_barSalary.series[1]["data"].push(v['belowSalary']);
                        // $scope.chartConfig_barSalary.series[0]["data"].push(Math.round((100-v['belowSalary']),2));
                        $scope.chartConfig_barSalary.series[0]["data"].push(Math.round((100), 2));
                    }
                    $scope.value2 = v['belowSalary'];
                    var resolvData = v;
                    $scope.availableData = v["compensation"]['btnStatus'];
                    $scope.btnStatus = Object.keys(v["compensation"]['btnStatus']);
                    // $scope.title=resolvData["title"]
                    //if(v.hasOwnProperty('belowRank')){$scope.initalBar['levelVal']=;

                    //$scope.chartConfig_CLGrowth.series[1]["data"].push($scope.GrowthFactor["nxtlevl"])
                    //$scope.chartConfig_CLGrowth.series[0]["data"].push(100-$scope.GrowthFactor["nxtlevl"]);
                    //}
                    $scope.index = v["compensation"]["index"];
                    $scope.mylevel = v["compensation"]["mylevel"];
                    $scope.xAxis = v["compensation"]["xAxis"];
                    $scope.xAxis8 = v["compensation"]["xAxis8"];
                    $scope.xAxis9 = v["compensation"]["xAxis9"];
                    $scope.yaxis = v["compensation"]["yaxis"];
                    $scope.graphType = v["compensation"]["graphType"];
                    $scope.xAxisVal = v["compensation"]["actualXVal"];
                    var salary = $scope.UserInfo["Salary"];
                    // if (salary>100)
                    // {
                    //     salary=salary/100000
                    //     $scope.UserInfo["Salary"]=salary
                    // }

                    // var salary=$scope.UserInfo["Salary"];
                    if ($scope.xAxis8.length == 1) {

                        // var userPoints= getPoint(salary,$scope.xAxis8[0],v["compensation"]["xAxis50"][0],$scope.xAxis9[0])
                        $scope.CompensatioXaxisTitle = "Percentile"
                        var xaxis = [];
                        for (var i = 1; i < 101; i++) {
                            xaxis.push(i);
                        }

                        var yaxis = [];
                        var substr1
                        angular.forEach(v["compensation"]["allPercentile"],function (value,key) {
                             substr1 = key
                        })
                        var tempYaxis = v["compensation"]["allPercentile"][substr1]
                        for (var y = 0; y < tempYaxis.length - 1; y++) {
                            yaxis.push(parseFloat((tempYaxis[y] / 100000).toFixed(2)));
                        }
                        var yaxis1 = [];
                        if ($scope.initalBar['SalaryVal'] > 0) {
                            var max = 0
                            for (var i = 1; i < 101; i++) {
                                if (max < yaxis[i]) {
                                    max = yaxis[i];
                                }
                                yaxis1.push(0)

                            }
                            yaxis1[$scope.initalBar['SalaryVal'] - 1] = max;
                        }
                        var a = [];
                        for (var i = 0; i < yaxis1.length; i++) {
                            if (yaxis1[i] == 0) {
                                a[i] = null;

                            }
                            else {
                                a[i] = $scope.UserInfo['Salary'];
                            }
                        }
                        console.log(a);
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
                                    tooltip: {
                                        pointFormatter: function () {

                                            return 'Salary : ' + this.y + '<br>' + 'Percentile : ' + (this.x + 1);
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
                                    labels: {
                                        style: {
                                            fontFamily: 'Montserrat-Regular'
                                        }
                                    },
                                    categories: xaxis
                                },

                                yAxis: {
                                    title: {
                                        text: 'Compensation (INR Lakhs)'
                                    }, labels: {
                                        style: {
                                            fontFamily: 'Montserrat-Regular'
                                        }
                                    }
                                },
                                credits: {
                                    enabled: false
                                },

                                series: [
                                    {
                                        showInLegend: false,
                                        name: 'Your Percentile',
                                        data: a,
                                        type: 'scatter',
                                        dataLabels: {
                                            className: 'highlight',
                                            enabled: true,
                                            formatter: function () {
                                                return 'You are here'
                                            },
                                            borderColor: 'rgb(18, 76, 146)',
                                            borderWidth: 1,
                                            padding: 5,
                                            shadow: true,
                                            borderRadius: 2,
                                            y: -10,
                                            shape: 'callout'
                                        },
                                        pointWidth: 28,
                                        //color:'#ccc',
                                        // color: '#EBEBEB',
                                        color: 'rgb(169, 47, 37)',

                                    },

                                    {
                                        showInLegend: true,
                                        name: 'Salary',
                                        data: yaxis,
                                        type: 'line',
                                        pointWidth: 28,
                                        color: '#25ad9f',
                                        //color:'#f34235',
                                    },
                                ]
                            };
                    }
                    else {

                        var tmpmax = $scope.yaxis
                        if (tmpmax[$scope.index] < salary) {
                            $scope.yaxis[$scope.index] = salary;
                        }

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
                                    labels: {
                                        style: {
                                            fontFamily: 'Montserrat-Regular'
                                        }
                                    },
                                    categories: $scope.xAxis
                                },

                                yAxis: {
                                    title: {
                                        text: 'Compensation (INR Lakhs)'
                                    }, labels: {
                                        style: {
                                            fontFamily: 'Montserrat-Regular'
                                        }
                                    },
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
                                        color: '#EBEBEB',
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
                                        color: '#a92f25 '
                                    },
                                    {
                                        name: '33th Percentile Salary',
                                        data: $scope.xAxis8,
                                        color: '#25ad9f',
                                        // color:'#66b6bf',
                                        allowPointSelect: true,

                                    },
                                    {
                                        name: '50th Percentile Salary',
                                        data: v["compensation"]["xAxis50"],
                                        color: '#222222'


                                    },
                                    {
                                        name: '90th Percentile Salary',
                                        data: $scope.xAxis9,
                                        color: '#124c92',

                                    }
                                ]
                            };
                    }


                    if ($scope.btnStatus.length > 0) {
                        for (var x = 0; x < $scope.btnStatus.length; x++) {
                            if ($scope.btnStatus[x] == "Company") {
                                $scope.btnComany = true;
                                $scope.btnComanyPromotion = true;

                            }
                            else if ($scope.btnStatus[x] == "Industry and Function") {
                                $scope.btnFunInd = true;
                                $scope.btnFunIndPromotion = true;

                            }
                            else if ($scope.btnStatus[x] == "Function") {
                                $scope.btnFun = true;
                                $scope.btnFunPromotion = true;

                            }
                            else if ($scope.btnStatus[x] == "Industry") {
                                $scope.btnInd = true;
                                $scope.btnIndPromotion = true;
                            }
                            else if ($scope.btnStatus[x] == "Function Group") {
                                $scope.btnFunGrp = true;
                                $scope.btnFunGrpPromotion = true;
                            }
                            else if ($scope.btnStatus[x] == "Industry Group") {
                                $scope.btnIndGrp = true;
                                $scope.btnIndGrpPromotion = true;
                            }
                        }
                    }
                }

                // if(v.hasOwnProperty('belowRank')&&v.hasOwnProperty('aboveRank')&&v.hasOwnProperty('sameRank'))
                // {
                //     // var data=[v['belowRank'],v['sameRank'],v['aboveRank']];
                //     $scope.chartConfig_barUserPercent.series[0]["data"].push(v['belowRank']);
                //     $scope.chartConfig_barUserPercent.series[1]["data"].push(v['sameRank']);
                //     $scope.chartConfig_barUserPercent.series[2]["data"].push(v['aboveRank']);
                //     $scope.chartConfig_barUserPercent.xAxis.categories.push(k);
                // }


                if (k == 'Your Company' && v['belowSalary'] >= 0) {
                    $scope.chartConfig_barCom.series[1]["data"].push(v['belowSalary']);
                    // $scope.chartConfig_barCom.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barCom.series[0]["data"].push(100);
                    $scope.chartConfig_barCom.xAxis.categories.push(k);
                    $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                }
                if (k == 'Your Industry and Function' && v['belowSalary'] >= 0) {
                    $scope.chartConfig_barInFn.series[1]["data"].push(v['belowSalary']);
                    // $scope.chartConfig_barInFn.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barInFn.series[0]["data"].push(100);
                    $scope.chartConfig_barInFn.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barInFn.xAxis.categories.push('Salary');
                    // $scope.chartConfig_barInFn.series[0]["tooltip"]["pointFormatter"] = function(){
                    //     return "<tspan style='fill:#66b6bf;'>?</tspan> Salary Percentile : <b>" + v['belowSalary'] + "</b>";
                    //     };

                }
                if (k == 'Your Industry Group' && v['belowSalary'] >= 0) {
                    $scope.chartConfig_barInGrp.series[1]["data"].push(v['belowSalary']);
                    // $scope.chartConfig_barInGrp.series[0]["data"].push(100-v['belowSalary']);
                    $scope.chartConfig_barInGrp.series[0]["data"].push(100);
                    $scope.chartConfig_barInGrp.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barInGrp.xAxis.categories.push('Salary');
                    // $scope.chartConfig_barInGrp.series[0]["tooltip"]["pointFormatter"] = function(){
                    //     return "<tspan style='fill:#66b6bf;'>?</tspan> Salary Percentile : <b>" + v['belowSalary'] + "</b>";
                    // };
                }
                if (k == 'Your Function Group' && v['belowSalary'] >= 0) {
                    $scope.chartConfig_barFnGrp.series[1]["data"].push(v['belowSalary']);
                    // $scope.chartConfig_barFnGrp.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barFnGrp.series[0]["data"].push(100);
                    $scope.chartConfig_barFnGrp.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barFnGrp.xAxis.categories.push('Salary');
                    // $scope.chartConfig_barFnGrp.series[0]["tooltip"]["pointFormatter"] = function(){
                    //     return "<tspan style='fill:#66b6bf;'>?</tspan> Salary Percentile : <b>" + v['belowSalary'] + "</b>";
                    // };

                }
                if (k == 'Your Industry' && v['belowSalary'] >= 0) {
                    $scope.chartConfig_barIn.series[1]["data"].push(v['belowSalary']);
                    // $scope.chartConfig_barIn.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barIn.series[0]["data"].push(100);
                    $scope.chartConfig_barIn.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barIn.xAxis.categories.push('Salary');
                    // $scope.chartConfig_barIn.series[0]["tooltip"]["pointFormatter"] = function(){
                    //     return "<tspan style='fill:#66b6bf;'>?</tspan> Salary Percentile : <b>" + v['belowSalary'] + "</b>";
                    // };

                }
                if (k == 'Your Function' && v['belowSalary'] >= 0) {
                    $scope.chartConfig_barFn.series[1]["data"].push(v['belowSalary']);
                    // $scope.chartConfig_barFn.series[0]["data"].push(100 - v['belowSalary']);
                    $scope.chartConfig_barFn.series[0]["data"].push(100);
                    $scope.chartConfig_barFn.xAxis.categories.push("In " + k);
                    $scope.chartConfig_barFn.xAxis.categories.push('Salary');
                    // $scope.chartConfig_barFn.series[0]["tooltip"]["pointFormatter"] = function(){
                    //     return "<tspan style='fill:#66b6bf;'>?</tspan> Salary Percentile : <b>" + v['belowSalary'] + "</b>";
                    // };

                }

            });
            if (!$scope.showChart) {
                var tempData = resolvData1["highestFilter"];
                if (tempData.hasOwnProperty('belowRank')) {
                    $scope.initalBar['levelVal'] = tempData['belowRank'];
                    $scope.chartConfig_bar.series[1]["data"].push(tempData['belowRank'])
                    // $scope.chartConfig_bar.series[0]["data"].push(Math.round((100-tempData['belowRank']),2));
                    $scope.chartConfig_bar.series[0]["data"].push(Math.round((100), 2));
                    $scope.value1 = tempData['belowRank'];

                }

            }


        }

        angular.forEach(reportValues, function (v, k) {
            if (v.hasOwnProperty('belowRank') && v.hasOwnProperty('aboveRank') && v.hasOwnProperty('sameRank')) {
                if (k == 'Your Function') {
                    $scope.btnFunPromotion2=true;
                }
                if (k == 'Your Industry') {
                    $scope.btnIndPromotion2=true;
                }
                if (k == 'Your Industry Group') {
                    $scope.btnIndGrpPromotion2=true;
                }
                if (k == 'Your Function Group') {
                    $scope.btnFunGrpPromotion2=true;
                }
                if (k == 'Your Company') {
                    $scope.btnCmpPromotion2=true;
                }
                if (k == 'Your Industry and Function') {
                    $scope.btnIndFunPromotion2=true;
                }
            }
        });
        if ($scope.btnIndPromotion2) {
            $scope.ind1 = 'active';
            $scope.changecl_graph('Your Industry');
        } else if ($scope.btnFunPromotion2) {
            $scope.fun1 = 'active';
            $scope.changecl_graph('Your Function');
        } else if ($scope.btnIndGrpPromotion2) {
            $scope.indgrp1 = 'active';
            $scope.changecl_graph('Your Industry Group');
        } else if ($scope.btnFunGrpPromotion2) {
            $scope.fungrp1 = 'active';
            $scope.changecl_graph('Your Function Group');
        }
        else if ($scope.btnIndGrpPromotion2) {
            $scope.indgrp1 = 'active';
            $scope.changecl_graph('Your Company');
        } else if ($scope.btnIndGrpPromotion2) {
            $scope.indgrp1 = 'active';
            $scope.changecl_graph('Your Industry and Function');
        }
        $scope.openIndustry = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/industryGroup.html",
                controller: industryGroupCtrl,
                size: "md",
                backdrop: 'static'
            });

        }

        function industryGroupCtrl($scope, $uibModalInstance) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.allindustries = vm.allIndGrp;
        }

        industryGroupCtrl.$inject = ['$scope', '$uibModalInstance'];
        $scope.openFunction = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/functionGroup.html",
                controller: functionGroupCtrl,
                size: "md",
                backdrop: 'static'
            });
        }

        function functionGroupCtrl($scope, $uibModalInstance) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.allindustries = vm.allFunGrp;
        }

        functionGroupCtrl.$inject = ['$scope', '$uibModalInstance'];
        $scope.getChartCompensation = function (mod) {

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


            var filterData = $scope.allResultData["actualYVal"][mod];

            if ($scope.allResultData["graphType"] <= 3) {

                $scope.index = $scope.allResultData["index"];
                $scope.mylevel = $scope.allResultData["mylevel"];
                $scope.xAxis = $scope.allResultData["xAxis"];
                $scope.xAxis8 = [];
                $scope.xAxis50 = [];
                $scope.xAxis9 = [];
                $scope.yaxis = [];
                var maxSalary = 0
                for (var xx = 0; xx < $scope.allResultData["xAxis"].length; xx++) {
                    var val = "";
                    var v = "";
                    if (typeof $scope.allResultData["xAxis"][xx] === 'string') {
                        var str = $scope.allResultData["xAxis"][xx].replace('-', ', ').split(',');
                        val = "["
                        var diff = parseInt(str[1]) - parseInt(str[0])
                        if (diff > 1) {
                            var start = parseInt(str[0])
                            str = []
                            for (d = 0; d <= diff; d++) {
                                str.push((start + d).toString());
                            }

                            for (var s = 0; s < str.length; s++) {
                                if (s < str.length - 1) {
                                    val = val + str[s] + ", "
                                } else {
                                    val = val + str[s] + "]"
                                }

                            }

                            v = filterData[[val]];
                        } else {
                            val = "[" + $scope.allResultData["xAxis"][xx].replace('-', ', ') + "]";
                            v = filterData[[val]];
                        }

                    } else {
                        val = $scope.allResultData["xAxis"][xx];
                        v = filterData[[val]];

                    }
                    //angular.forEach(filterData,function(v,k){alert(val);alert(k);});
                    $scope.xAxis8.push((parseFloat((v[0] / 100000).toFixed(2))));
                    $scope.xAxis50.push((parseFloat((v[1] / 100000).toFixed(2))));
                    $scope.xAxis9.push((parseFloat((v[2] / 100000).toFixed(2))));
                    {
                        maxSalary = Math.max.apply(null, $scope.xAxis8);
                    }
                    if (maxSalary < Math.max.apply(null, $scope.xAxis50)) {
                        maxSalary = Math.max.apply(null, $scope.xAxis50);
                    }
                    if (maxSalary < Math.max.apply(null, $scope.xAxis9)) {
                        maxSalary = Math.max.apply(null, $scope.xAxis9);
                    }

                }

                //angular.forEach(filterData,function(v,k)
                //{
                //    $scope.xAxis8.push ((parseFloat((v[0]/100000).toFixed(2))));
                //    $scope.xAxis50.push ((parseFloat((v[1]/100000).toFixed(2))));
                //    $scope.xAxis9.push ((parseFloat((v[2]/100000).toFixed(2))));
                //   {
                //       maxSalary=Math.max.apply(null, $scope.xAxis8);
                //   }
                //    if(maxSalary<Math.max.apply(null, $scope.xAxis50))
                //    {
                //        maxSalary=Math.max.apply(null, $scope.xAxis50);
                //    }
                //    if(maxSalary<Math.max.apply(null, $scope.xAxis9))
                //    {
                //        maxSalary=Math.max.apply(null, $scope.xAxis9);
                //    }
                //});
                for (var y = 0; y < $scope.index; y++) {
                    $scope.yaxis.push(0);
                }
                $scope.yaxis[$scope.index] = maxSalary;
                var salary = $scope.UserInfo["Salary"];
                if (maxSalary < salary) {
                    maxSalary = salary;
                    $scope.yaxis[$scope.index] = maxSalary;
                }
                $scope.CompensatioXaxisTitle = "Career Level";
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
                            }, labels: {
                                style: {
                                    fontFamily: 'Montserrat-Regular'
                                }
                            },
                            categories: $scope.xAxis
                        },

                        yAxis: {
                            title: {
                                text: 'Compensation (INR Lakhs)'
                            }, labels: {
                                style: {
                                    fontFamily: 'Montserrat-Regular'
                                }
                            },
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
                                color: '#EBEBEB',


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
                                color: '#a92f25'
                            },
                            {
                                name: '33th Percentile Salary',
                                data: $scope.xAxis8,
                                color: '#25ad9f',
                                // color:'#66b6bf',
                                allowPointSelect: true,

                            },
                            {
                                name: '50th Percentile Salary',
                                data: $scope.xAxis50,
                                color: '#222222'
                            },
                            {
                                name: '90th Percentile Salary',
                                data: $scope.xAxis9,
                                color: '#124c92',

                            }
                        ]
                    };


            }
            else {
                //if ($scope.xAxis8.length==1)
                {
                    $scope.CompensatioXaxisTitle = "Percentile"
                    var xaxis = [];
                    for (var i = 1; i < 101; i++) {
                        xaxis.push(i);
                    }
                    var yaxis = [];
                    var tempYaxis = $scope.allResultData["allPercentile"][mod];
                    for (var y = 0; y < tempYaxis.length - 1; y++) {
                        yaxis.push(parseFloat((tempYaxis[y] / 100000).toFixed(2)));
                    }
                    // var yaxis=$scope.allResultData["allPercentile"][mod];
                    $scope.userPosition = $scope.allResultData["userPercentile"][mod]
                    var yaxis1 = [];
                    if ($scope.userPosition > 0) {
                        var max = 0
                        for (var i = 1; i < 101; i++) {
                            if (max < yaxis[i]) {
                                max = yaxis[i];
                            }
                            yaxis1.push(0)

                        }
                        yaxis1[$scope.userPosition - 1] = max;
                    }
                    var a = [];
                    for (var i = 0; i < yaxis1.length; i++) {
                        if (yaxis1[i] == 0) {
                            a[i] = null;

                        }
                        else {
                            a[i] = $scope.UserInfo['Salary'];
                        }
                    }
                    console.log(a);
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

                                tooltip: {
                                    pointFormatter: function () {

                                        return 'Salary : ' + this.y + '<br>' + 'Percentile : ' + (this.x + 1);
                                    }
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
                                }, labels: {
                                    style: {
                                        fontFamily: 'Montserrat-Regular'
                                    }
                                },
                                categories: xaxis
                            },

                            yAxis: {
                                title: {
                                    text: 'Compensation (INR Lakhs)'
                                }, labels: {
                                    style: {
                                        fontFamily: 'Montserrat-Regular'
                                    }
                                },
                            },
                            credits: {
                                enabled: false
                            },

                            series: [
                                {
                                    showInLegend: false,
                                    name: 'Your Percentile',
                                    data: a,
                                    type: 'scatter',
                                    dataLabels: {
                                        className: 'highlight',
                                        enabled: true,
                                        formatter: function () {
                                            return 'You are here'
                                        },
                                        borderColor: 'rgb(18, 76, 146)',
                                        borderWidth: 1,
                                        padding: 5,
                                        shadow: true,
                                        borderRadius: 2,
                                        y: -10,
                                        shape: 'callout'
                                    },
                                    pointWidth: 28,
                                    // color: '#EBEBEB',
                                    color: 'rgb(169, 47, 37)',

                                },

                                {
                                    showInLegend: true,
                                    name: 'Salary',
                                    data: yaxis,
                                    type: 'line',
                                    pointWidth: 28,
                                    color: '#124c92',
                                },
                            ]
                        };
                }

            }
            // var params = {"Role":$scope.UserInfo["Role"],"Company":$scope.UserInfo["Company"],"Industry":$scope.UserInfo["Industry"],mod:mod,"level":$scope.UserInfo["Level"],"Salary":$scope.UserInfo["Salary"],graphType:$scope.graphType}
            //   var params = {"Role":$scope.UserInfo["Role"],"Company":$scope.UserInfo["Company"],"Industry":$scope.UserInfo["Industry"],mod:mod,"level":$scope.UserInfo["Level"],"Salary":$scope.UserInfo["Salary"],graphType:$scope.graphType,xPoints:$scope.xAxisVal}
            //
            //   $http({
            //       url: '/report/getCompensationChart',
            //       method: 'post',
            //       data: params
            //   }).then(function success(response) {
            //       var data=response["data"];
            //       var v={};
            //       v["compensation"]=data["chartData"]
            //       $scope.index=v["compensation"]["index"];
            //       $scope.mylevel=v["compensation"]["mylevel"];
            //       $scope.xAxis=v["compensation"]["xAxis"];
            //       $scope.xAxis8=v["compensation"]["xAxis8"];
            //       $scope.xAxis9=v["compensation"]["xAxis9"];
            //       $scope.yaxis=v["compensation"]["yaxis"];
            //       $scope.userPosition=v["compensation"]["UserPos"]
            //       var salary=$scope.UserInfo["Salary"];
            //       if (salary>100)
            //       {
            //           salary=salary/100000
            //       }
            //       if ($scope.xAxis8.length==1)
            //       {
            //           $scope.CompensatioXaxisTitle="Percentile"
            //           var xaxis=[];
            //           for(var i=1;i<101;i++)
            //           {
            //               xaxis.push(i);
            //           }
            //           var yaxis=v["compensation"]["allPercentile"]
            //           var yaxis1=[];
            //           if ($scope.userPosition>0)
            //           {
            //               var max=0
            //               for(var i=1;i<101;i++)
            //               {
            //                   if(max < yaxis[i])
            //                   {
            //                       max=yaxis[i];
            //                   }
            //                   yaxis1.push(0)
            //
            //               }
            //               yaxis1[$scope.userPosition-1]=max;
            //           }
            //
            //           $scope.chartConfig_comp =
            //               {
            //                   options:{legend :{
            //                       layout: 'vertical',
            //                       align: 'left',
            //                       verticalAlign: 'top',
            //                       x: 60,
            //                       y: 10,
            //                       floating: true,
            //                       borderWidth: 2,
            //                       borderColor:'#000000',
            //                       backgroundColor:  '#FFFFFF',
            //                       shadow: true
            //                   },
            //                       title: {
            //                           text: '',
            //                           style: {
            //                               display: 'none'
            //                           }
            //                       },
            //                       chart:{spacingBottom: -15,
            //                           spacingTop: 10,
            //                           spacingLeft: -20,
            //                           spacingRight: 10,}
            //                   },
            //                   xAxis: {
            //                       title: {
            //                           text: 'Career Level '
            //                       },
            //                       categories:xaxis
            //                   },
            //
            //                   yAxis: {
            //                       title: {
            //                           text: 'Compensation (INR Lakhs)'
            //                       }
            //                   },
            //                   credits: {
            //                       enabled: false
            //                   },
            //                   series: [
            //                       {
            //                           showInLegend:false,
            //                           name: 'Your Level',
            //                           data: yaxis1,
            //                           type:'column',
            //                           pointWidth: 28,
            //                           color:'#ccc',
            //
            //
            //                       },
            //
            //                       {
            //                           showInLegend:true,
            //                           name: 'Percentile',
            //                           data: yaxis,
            //                           type:'line',
            //                           pointWidth: 28,
            //                           color:'#f34235',
            //
            //
            //                       },
            //                   ]
            //               };
            // }
            //       else
            //       {
            //           $scope.CompensatioXaxisTitle="Career Level";
            //           $scope.chartConfig_comp =
            //           {
            //               options:{legend :{
            //                   layout: 'vertical',
            //                   align: 'left',
            //                   verticalAlign: 'top',
            //                   x: 60,
            //                   y: 10,
            //                   floating: true,
            //                   borderWidth: 2,
            //                   borderColor:'#000000',
            //                   backgroundColor:  '#FFFFFF',
            //                   shadow: true
            //               },
            //                   title: {
            //                       text: '',
            //                       style: {
            //                           display: 'none'
            //                       }
            //                   },
            //                   chart:{spacingBottom: -15,
            //                       spacingTop: 10,
            //                       spacingLeft: -20,
            //                       spacingRight: 10,}
            //               },
            //               xAxis: {
            //                   title: {
            //                       text: 'Career Level '
            //                   },
            //                   categories:$scope.xAxis
            //               },
            //
            //               yAxis: {
            //                   title: {
            //                       text: 'Compensation (INR Lakhs)'
            //                   }
            //               },
            //               credits: {
            //                   enabled: false
            //               },
            //               series: [
            //
            //                   {
            //                       showInLegend:false,
            //                       name: 'Your Level',
            //                       data: $scope.yaxis,
            //                       type:'column',
            //                       pointWidth: 28,
            //                       color:'#ccc',
            //
            //
            //                   },
            //                   {
            //                       // showInLegend:false,
            //                       name: 'Your Salary Level',
            //                       type:'scatter',
            //                       tooltip: {
            //                           headerFormat: '<b>{series.name}</b><br>',
            //                           pointFormat: '{point.y} INR Lakhs'
            //                       },
            //                       data: [[$scope.index,$scope.UserInfo["Salary"]]],
            //                       pointWidth: 28,
            //                       color:'#a94442'},
            //                   {
            //                       name: '33th Percentile Salary',
            //                       data: $scope.xAxis8,
            //                       color:'#337ab7',
            //                       allowPointSelect: true,
            //
            //                   },
            //                   {
            //                       name: '50th Percentile Salary',
            //                       data: v["compensation"]["xAxis50"],
            //                       color:'#3c763d'
            //
            //
            //
            //                   },
            //                   {
            //                       name: '90th Percentile Salary',
            //                       data: $scope.xAxis9,
            //                       color:'#f34235',
            //
            //                   }
            //               ]
            //           };
            //       }
            //
            //
            //   }, function error(response) {
            //   })


        }

        function getPoint(userSalary, perc33, perc50, perc90) {
            if (userSalary < perc33) {
                userPoint = [0.5, userSalary]
            }
            else if (userSalary == perc33) {
                userPoint = [1, userSalary]
            }
            else if (userSalary > perc33 && userSalary < perc50) {
                slope = parseFloat((perc50 - perc33) / (2 - 1))
                userX = 1 + ((userSalary - perc33) / slope)
                alert(slope)
                userPoint = [userX, userSalary]
            }
            else if (userSalary == perc50) {
                userPoint = [2, perc50]
            }
            else if (userSalary > perc50 && userSalary < perc90) {
                slope = parseFloat((perc90 - perc50) / (3 - 2))
                userX = 2 + ((userSalary - perc50) / slope)
                userPoint = [userX, userSalary]
            }
            else if (userSalary == perc90) {
                userPoint = [3, userSalary]
            }
            else {
                userPoint = [3.5, userSalary]
            }
            var tempPoint = userPoint
            userPoint = [parseFloat((tempPoint[0]).toFixed(2)), tempPoint[1]]
            alert(userPoint)
            return userPoint;

        }

        $scope.logout = function () {
            $localStorage["User"] = "";
            $localStorage["guestUser"] = "";

            vm.isLogin = false;
            vm.userinfo = {email: "", password: ""};
            toaster.pop("info", "", "User successfully logged out.");
            $state.go('page.index')
        }
        vm.OpenLogin = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/signUpPop.html",
                controller: initialUserLogin,
                size: "sm",
                backdrop: 'static',
                resolve: {
                    'userInfo': function () {
                        if (vm.isGuest)
                            return $localStorage["guestUser"];
                        else {
                            return $localStorage["User"];
                        }
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
                "EffectiveLevel": userInfo.EffectiveLevel
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
                                vm.isGuest = false;
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
                    vm.userinfo["email"] = user.Email;
                    vm.userinfo["password"] = user.Password;
                    var params = {data: vm.userinfo}
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
                                    vm.isGuest = false;
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


        if ($localStorage["User"] == "") {
            $scope.guesteffectivelevel = $localStorage["guestUser"]["EffectiveLevel"];
        }

        if (($localStorage["User"]["EffectiveLevel"] == 3 || $scope.guesteffectivelevel == 3) && $scope.btnIndPromotion) {
            $scope.head = 'INDUSTRY';
            $scope.ind = 'active';
            $scope.getChartCompensation('Industry');
        } else if (($localStorage["User"]["EffectiveLevel"] == 3 || $scope.guesteffectivelevel == 3) && $scope.btnFunPromotion) {
            $scope.head = 'FUNCTION';
            $scope.fun = 'active';
            $scope.getChartCompensation('Function');
        } else if (($localStorage["User"]["EffectiveLevel"] == 3 || $scope.guesteffectivelevel == 3) && $scope.btnIndGrpPromotion) {
            $scope.head = 'INDUSTRY GROUP';
            $scope.indgrp = 'active';
            $scope.getChartCompensation('Industry Group');
        } else if (($localStorage["User"]["EffectiveLevel"] == 3 || $scope.guesteffectivelevel == 3) && $scope.btnFunGrpPromotion) {
            $scope.head = 'FUNCTION GROUP';
            $scope.fungrp = 'active';
            $scope.getChartCompensation('Function Group');
        }
        else if (($localStorage["User"]["EffectiveLevel"] == 4 || $scope.guesteffectivelevel == 4) && $scope.btnIndGrpPromotion) {
            $scope.head = 'INDUSTRY GROUP';
            $scope.indgrp = 'active';
            $scope.getChartCompensation('Industry Group');
        } else if (($localStorage["User"]["EffectiveLevel"] == 4 || $scope.guesteffectivelevel == 4) && $scope.btnFunGrpPromotion) {
            $scope.head = 'FUNCTION GROUP';
            $scope.fungrp = 'active';
            $scope.getChartCompensation('Function Group');
        }
        else if ($scope.btnComanyPromotion) {
            $scope.head = 'COMPANY';
            $scope.comp = 'active';
        } else if ($scope.btnFunIndPromotion) {
            $scope.head = 'INDUSTRY & FUNCTION';
            $scope.indfun = 'active';
        } else if ($scope.btnFunPromotion) {
            $scope.head = 'FUNCTION';
            $scope.fun = 'active';
        } else if ($scope.btnIndPromotion) {
            $scope.head = 'INDUSTRY';
            $scope.ind = 'active';
        } else if ($scope.btnFunGrpPromotion) {
            $scope.head = 'FUNCTION GROUP';
            $scope.fungrp = 'active';
        } else if ($scope.btnIndGrpPromotion) {
            $scope.head = 'INDUSTRY GROUP';
            $scope.indgrp = 'active';
        }


    }
})()


angular.module('naut').filter("CamelCase", function () {
    return function (str) {
        var i, text = "";
        if(str!=="") {
            text = str[0].toLowerCase();
            for (i = 1; i < str.length; i++) {
                text += str[i];
            }
        }
        return text;
    };
});