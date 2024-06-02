(function () {
    'use strict';

    angular
        .module('naut')
        .controller('ComparisonController', ComparisonController);

    ComparisonController.$inject = ['$scope', 'resolvData', '$http', '$localStorage', '$uibModal', '$state']

    function ComparisonController($scope, resolvData, $http, $localStorage, $uibModal, $state) {
        var vm = this;
        vm.allIndGrp = [];
        vm.allIndGrp = resolvData["IndGrp"];
        $scope.showmaxcl=false;
        vm.allFunGrp = [];
        vm.allFunGrp = resolvData["FunGrp"];
        $scope.company = {"Company": "Names"};
        $scope.allFillterValues = resolvData["resultToShow"];
        if ($localStorage["User"] != "") {
            $scope.changefunction = $localStorage["User"]["changefunction"];
            $scope.changeindustry = $localStorage["User"]["changeindustry"];
        }
        else {
            $scope.changefunction = $localStorage["guestUser"]["changefunction"];
            $scope.changeindustry = $localStorage["guestUser"]["changeindustry"];

        }
       // $scope.buttonToDisplay = resolvData["displayButtons"];
        $scope.showUser = resolvData["showUser"];
        $scope.btnComany = false;
        $scope.btnFunInd = false;
        $scope.btnFun = false;
        $scope.btnCompanyFun = false;
        $scope.btnCompanyInd = false;
        $scope.btnCompanyFunGrp = false;
        $scope.btnCompanyIndGrp = false;
        $scope.btnCompanyIndFun = false;
        $scope.showData = false;
        $scope.showLoader = false;
        $scope.ShowEmail = $localStorage["User"]["Email"];
        $scope.SelectedData = false;
        $scope.persons = [];
        $scope.isLogin = false;
        $scope.ChartStyle={"height":"350px"};
        $scope.viewMore=false;
        //$scope.scoreChartStyle={"margin-top":"10px"};
        $scope.chartConfig = "";
        $scope.chartConfigPU = "";
        $scope.UserInfo = {};
        $scope.showchart=true;
        $scope.chartConfigGrowth =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }

            },
            xAxis: {
                title: {
                    text: ' '
                },
                categories: [],
                labels: {
                    formatter: function () {
                        return this.value.toString();

                    }
                }
            },
            yAxis: [{title: {text: "Maximum Career Level"}}, {title: {text:"Median Salary<br/>(INR Lakhs) at Max Level"}, opposite: true}],

            credits: {
                enabled: false
            },
            series: []
        };
        $scope.chartConfigRole =
        {
            options: {
                //    legend :{
                //    layout: 'vertical',
                //    align: 'left',
                //    verticalAlign: 'top',
                //    x: 60,
                //    y: 10,
                //    floating: true,
                //    borderWidth: 2,
                //    borderColor:'#000000',
                //    backgroundColor:  '#FFFFFF',
                //    shadow: true
                //},
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                //chart:{spacingBottom: -15,
                //    spacingTop: 10,
                //    spacingLeft: -20,
                //    spacingRight: 10,

                //},
                tooltip: {
                    formatter: function () {
                        return 'Median Salary: <b>' + this.y + '</b> INR Lakh';
                    }
                }
            },
            xAxis: {
                title: {
                    text: 'Career Level '
                }, labels: {
                    overflow: 'justify'
                },

                categories: []
            },
            yAxis: {
                title: {
                    text: 'Median Compensation (INR Lakhs)'
                }
            },
            credits: {
                enabled: false
            },

            series: []
        };
        $scope.chartTop_1 =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]




             
        };
        $scope.chartTop_2 =
        {
            options: {

                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]




             
        };
        $scope.chartTop_3 =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]




             
        };
        $scope.chartTop_4 =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]
        };
        $scope.chartTop_5 =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]




             
        };
        $scope.chartTop_6 =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]




             
        };
        $scope.chartTop_7 =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]




             
        };
        $scope.chartTop_8 =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]




             
        };
        $scope.chartTop_9 =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]




             
        };
        $scope.chartTop_10 =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {shared: true},
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: '#66b6bf'
            }]




             
        };

        $scope.chartConfig_1Score =
        {
            options:
            {
                legend :{
                    //layout: 'horizantol',
                    align: 'left',
                    verticalAlign: 'top',
                    x: -15,
                    y: -15,
                    floating: true,
                    borderWidth: 0,
                    //borderColor:'#000000',
                    //backgroundColor:  '#FFFFFF',
                    //shadow: true
                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                chart:{type:'bar',margin: [0, 0, 0, 0]
                },
                tooltip: {
                    formatter: function () {
                        return 'Score: <b>' +  this.y + '</b> /100' ;
                    },shared: true
                }

            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },
            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [100,100],
                pointPadding: 0,
                pointWidth:15,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement:0.3,
                pointWidth:7,
                stack: 'User',
                //  color: '#66b6bf',

            }]



             
        };
        $scope.chartConfig_1User =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {
                    formatter: function () {
                        return 'Score: <b>' + this.y + '</b> /100';
                    }, shared: true
                },
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: 'rgb(192,102,102)'
            }]




             
        };
        $scope.chartConfig_2Score =
        {
            options:
            {
                legend :{
                    //layout: 'horizantol',
                    align: 'left',
                    verticalAlign: 'top',
                    x: -15,
                    y: -15,
                    floating: true,
                    borderWidth: 0,
                    //borderColor:'#000000',
                    //backgroundColor:  '#FFFFFF',
                    //shadow: true
                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                chart:{type:'bar',margin: [0, 0, 0, 0]
                },
                tooltip: {
                    formatter: function () {
                        return 'Score: <b>' +  this.y + '</b> /100' ;
                    },shared: true
                }

            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },
            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [100,100],
                pointPadding: 0,
                pointWidth:15,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement:0.3,
                pointWidth:7,
                stack: 'User',
                //  color: '#66b6bf',

            }]



             
        };
        $scope.chartConfig_2User =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {
                    formatter: function () {
                        return 'Score: <b>' + this.y + '</b> /100';
                    }, shared: true
                },
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: 'rgb(192,102,102)'
            }]




             
        };
        $scope.chartConfig_3Score =
        {
            options:
            {
                legend :{
                    //layout: 'horizantol',
                    align: 'left',
                    verticalAlign: 'top',
                    x: -15,
                    y: -15,
                    floating: true,
                    borderWidth: 0,
                    //borderColor:'#000000',
                    //backgroundColor:  '#FFFFFF',
                    //shadow: true
                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                chart:{type:'bar',margin: [0, 0, 0, 0]
                },
                tooltip: {
                    formatter: function () {
                        return 'Score: <b>' +  this.y + '</b> /100' ;
                    },shared: true
                }

            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },
            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [100,100],
                pointPadding: 0,
                pointWidth:15,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement:0.3,
                pointWidth:7,
                stack: 'User',
                //  color: '#66b6bf',

            }]



             
        };
        $scope.chartConfig_3User =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {
                    formatter: function () {
                        return 'Score: <b>' + this.y + '</b> /100';
                    }, shared: true
                },
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: 'rgb(192,102,102)'
            }]




             
        };
        $scope.chartConfig_4Score =
        {
            options:
            {
                legend :{
                    //layout: 'horizantol',
                    align: 'left',
                    verticalAlign: 'top',
                    x: -15,
                    y: -15,
                    floating: true,
                    borderWidth: 0,
                    //borderColor:'#000000',
                    //backgroundColor:  '#FFFFFF',
                    //shadow: true
                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                chart:{type:'bar',margin: [0, 0, 0, 0]
                },
                tooltip: {
                    formatter: function () {
                        return 'Score: <b>' +  this.y.toFixed(2) + '</b> /100' ;
                    },shared: true
                }

            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },
            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [100,100],
                pointPadding: 0,
                pointWidth:15,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement:0.3,
                pointWidth:7,
                stack: 'User',
                //  color: '#66b6bf',

            }]



             
        };
        $scope.chartConfig_4User =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {
                    formatter: function () {
                        return 'Score: <b>' + this.y + '</b> /100';
                    }, shared: true
                },
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: 'rgb(192,102,102)'
            }]




             
        };
        $scope.chartConfig_5Score =
        {
            options:
            {
                legend :{
                    //layout: 'horizantol',
                    align: 'left',
                    verticalAlign: 'top',
                    x: -15,
                    y: -15,
                    floating: true,
                    borderWidth: 0,
                    //borderColor:'#000000',
                    //backgroundColor:  '#FFFFFF',
                    //shadow: true
                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                chart:{type:'bar',margin: [0, 0, 0, 0]
                },
                tooltip: {
                    formatter: function () {
                        return 'Score: <b>' +  this.y + '</b> /100' ;
                    },shared: true
                }

            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },
            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [100,100],
                pointPadding: 0,
                pointWidth:15,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement:0.3,
                pointWidth:7,
                stack: 'User',
                //  color: '#66b6bf',

            }]



             
        };
        $scope.chartConfig_5User =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {
                    formatter: function () {
                        return 'Score: <b>' + this.y + '</b> /100';
                    }, shared: true
                },
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: 'rgb(192,102,102)'
            }]




             
        };
        $scope.chartConfig_6Score =
        {
            options:
            {
                legend :{
                    //layout: 'horizantol',
                    align: 'left',
                    verticalAlign: 'top',
                    x: -15,
                    y: -15,
                    floating: true,
                    borderWidth: 0,
                    //borderColor:'#000000',
                    //backgroundColor:  '#FFFFFF',
                    //shadow: true
                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                chart:{type:'bar',margin: [0, 0, 0, 0]
                },
                tooltip: {
                    formatter: function () {
                        return 'Score: <b>' +  this.y + '</b> /100' ;
                    },shared: true
                }

            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },
            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [100,100],
                pointPadding: 0,
                pointWidth:15,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement:0.3,
                pointWidth:7,
                stack: 'User',
                //  color: '#66b6bf',

            }]



             
        };
        $scope.chartConfig_6User =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {
                    formatter: function () {
                        return 'Score: <b>' + this.y + '</b> /100';
                    }, shared: true
                },
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: 'rgb(192,102,102)'
            }]




             
        };
        $scope.chartConfig_7Score =
        {
            options:
            {
                legend :{
                    //layout: 'horizantol',
                    align: 'left',
                    verticalAlign: 'top',
                    x: -15,
                    y: -15,
                    floating: true,
                    borderWidth: 0,
                    //borderColor:'#000000',
                    //backgroundColor:  '#FFFFFF',
                    //shadow: true
                },
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                chart:{type:'bar',margin: [0, 0, 0, 0]
                },
                tooltip: {
                    formatter: function () {
                        return 'Score: <b>' +  this.y + '</b> /100' ;
                    },shared: true
                }

            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },
            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [100,100],
                pointPadding: 0,
                pointWidth:15,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement:0.3,
                pointWidth:7,
                stack: 'User',
                //  color: '#66b6bf',

            }]



             
        };
        $scope.chartConfig_7User =
        {
            options: {
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                }, tooltip: {
                    formatter: function () {
                        return 'Score: <b>' + this.y + '</b> /100';
                    }, shared: true
                },
                chart: {
                    type: 'bar',
                    chart: {
                        spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10
                    }

                },


            },
            xAxis: {
                categories: ['Company'], visible: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                visible: false
            },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {grouping: false, shadow: false}
            },

            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false,
                name: 'Total',
                data: [],
                pointPadding: 0,
                stack: 'Total',
                color: '#222222',
                enableMouseTracking: false
            }, {
                showInLegend: false,
                name: 'Score',
                data: [],
                pointPadding: 0.2,
                pointPlacement: 0.3,
                stack: 'User',
                color: 'rgb(192,102,102)'
            }]




             
        };
        $scope.mode = "";
        $scope.id = "select";
        $scope.allFilltersHash = {
            1: "Industry and Function", 2: "Function", 3: "Industry", 4: "Function Group",
            5: "Industry Group", 6: "Function Group", 7: "Industry", 8: "Function", 9: "Industry Group", 11: "Industry"
            , 10: "Function"
        }
        $scope.showRole = false;
        $scope.showGrowth = false;
        $scope.showPP = false;
        $scope.level = 0;
        $scope.industry = ""
        $scope.role = "";
        $scope.company = "";
        $scope.preferences = [];
        $scope.showAllFillter=true;
        if ($localStorage["User"].hasOwnProperty("Email") && $localStorage["User"]["Email"] != "") {
            $scope.level = $localStorage["User"]["Level"];
            $scope.industry = $localStorage["User"]["Industry"];
            $scope.role = $localStorage["User"]["Role"];
            $scope.company = $localStorage["User"]["Company"];
            $scope.preferences = $localStorage["User"]["Preference"];
            $scope.isLogin = true;
            $scope.UserInfo = $localStorage["User"];
        }
        else {
            $scope.level = $localStorage["guestUser"]["Level"];
            $scope.industry = $localStorage["guestUser"]["Industry"];
            $scope.role = $localStorage["guestUser"]["Role"];
            $scope.company = $localStorage["guestUser"]["Company"];
            $scope.preferences = $localStorage["guestUser"]["Preference"];
            $scope.UserInfo = $localStorage["guestUser"];
        }


        function ShowModeButtons()
        {
            if(isEmpty($scope.allFillterValues))
            {
                $scope.showAllFillter=false;
                return;}
            // for (var c = 1; c <= 5; c++) {
            //     if ($scope.allFillterValues.hasOwnProperty(c)) {
            //         $scope.btnComany = true;
            //         $scope.showData = false;
            //         $scope.SelectedData = false;
            //
            //         $scope.mode="Companies";
            //         $scope.showFillter($scope.mode);
            //         $scope.id=c;
            //         getTopN(c);
            //         getCompanyInfo(0);
            //         break;
            //     }
            // }
            for (var c = 6; c <= 8; c++) {
                if ($scope.allFillterValues.hasOwnProperty(c)) {
                    $scope.btnInd = true;
                    $scope.showData = false;
                    $scope.SelectedData = false;
                   if($scope.id=="select")
                   {
                       $scope.id=c;



                       $scope.mode="Functions";
                       $scope.showFillter($scope.mode);
                       getTopN(c);
                       getCompanyInfo(0);
                   }

                    break;
                }
            }
            for (var c = 9; c <= 11; c++) {
                if ($scope.allFillterValues.hasOwnProperty(c)) {
                    $scope.btnFun = true;
                    if($scope.id=="select")
                    {
                        $scope.id=c;
                        $scope.mode="Industries";
                        getTopN(c);
                        getCompanyInfo(0);
                    }
                    break;
                }
            }


        }

        function resetPage() {
            $scope.chartConfig_1User.series[0].data = [];
            $scope.chartConfig_1Score.series[0].data = [];
            $scope.chartConfig_2User.series[0].data = [];
            $scope.chartConfig_2Score.series[0].data = [];
            $scope.chartConfig_3User.series[0].data = [];
            $scope.chartConfig_3Score.series[0].data = [];
            $scope.chartConfig_4User.series[0].data = [];
            $scope.chartConfig_4Score.series[0].data = [];
            $scope.chartConfig_5User.series[0].data = [];
            $scope.chartConfig_5Score.series[0].data = [];
            $scope.chartConfig_6User.series[0].data = [];
            $scope.chartConfig_6Score.series[0].data = [];
            $scope.chartConfig_7User.series[0].data = [];
            $scope.chartConfig_7Score.series[0].data = [];

            $scope.chartConfig_1User.series[1].data = [];
           $scope.chartConfig_1Score.series[1].data = [];
            $scope.chartConfig_2User.series[1].data = [];
            $scope.chartConfig_2Score.series[1].data = [];
            $scope.chartConfig_3User.series[1].data = [];
            $scope.chartConfig_3Score.series[1].data = [];
            $scope.chartConfig_4User.series[1].data = [];
            $scope.chartConfig_4Score.series[1].data = [];
            $scope.chartConfig_5User.series[1].data = [];
            $scope.chartConfig_5Score.series[1].data = [];
            $scope.chartConfig_6User.series[1].data = [];
            $scope.chartConfig_6Score.series[1].data = [];
            $scope.chartConfig_7User.series[1].data = [];
            $scope.chartConfig_7Score.series[1].data = [];
            $scope.showRole = false;
            $scope.showUser = false;
            $scope.showGrowth = false;
            $scope.showPP = false;
            $scope.chartConfig = "";
            $scope.chartConfigPU = "";
        }
        $scope.showFillter = function (mode) {
            $scope.mode=mode;
            $scope.btnCompanyIndFun = false;
            $scope.btnCompanyFun = false;
            $scope.btnCompanyInd = false;
            $scope.btnCompanyFunGrp = false;
            $scope.btnCompanyIndGrp = false;
            $scope.persons = [];
            $scope.SelectedData = false;
            $('#' + mode).addClass('active');
            if ($scope.mode != "") {
                $('#' + $scope.mode).removeClass('active');
            }
            if (mode == "Companies") {

                $scope.mode = "Companies";
                $scope.id = "select";
                if ($scope.allFillterValues.hasOwnProperty(1)) {
                    $scope.btnCompanyIndFun = true;
                }
                if ($scope.allFillterValues.hasOwnProperty(2)) {
                    $scope.btnCompanyFun = true;
                }
                if ($scope.allFillterValues.hasOwnProperty(3)) {
                    $scope.btnCompanyInd = true;
                }
                if ($scope.allFillterValues.hasOwnProperty(4)) {
                    $scope.btnCompanyFunGrp = true;
                }
                if ($scope.allFillterValues.hasOwnProperty(5)) {
                    $scope.btnCompanyIndGrp = true;
                }
                //$('#Function').addClass('active');
            }
            else if (mode == "Functions") {

                $scope.id = "select";
                $scope.mode = "Functions";
                if ($scope.allFillterValues.hasOwnProperty(6)) {
                    $scope.btnCompanyIndFun = true;
                }
                if ($scope.allFillterValues.hasOwnProperty(7)) {
                    $scope.btnCompanyInd = true;
                }
                if ($scope.allFillterValues.hasOwnProperty(8)) {
                    $scope.btnCompanyFun = true;
                }
            }
            else {

                $scope.mode = "Industries";
                $scope.id = "select";
                if ($scope.allFillterValues.hasOwnProperty(9)) {
                    $scope.btnCompanyIndFun = true;
                }
                if ($scope.allFillterValues.hasOwnProperty(10)) {
                    $scope.btnCompanyInd = true;
                }
                if ($scope.allFillterValues.hasOwnProperty(11)) {
                    $scope.btnCompanyFun = true;
                }
            }
        }
        $scope.viewMoreFn=function()
        {
    if($scope.viewMore==false)
    {
        $scope.viewMore=true;
        var sumOFPreference = $scope.preferences.reduce(function (a, b) {
            return a + b;
        }, 0);
        var data = $scope.allFillterValues[$scope.id];
        if (data["topN"].length>5&&data["topN"].length<11) {
            $scope.chartTop_6.series[0].data = [sumOFPreference];
            $scope.chartTop_6.series[1].data = [data["topN"][5][1]];}
        if (data["topN"].length>6&&data["topN"].length<11) {
            $scope.chartTop_7.series[0].data = [sumOFPreference];
            $scope.chartTop_7.series[1].data = [data["topN"][6][1]];}
        if (data["topN"].length>7&&data["topN"].length<11) {
            $scope.chartTop_8.series[0].data = [sumOFPreference];
            $scope.chartTop_8.series[1].data = [data["topN"][7][1]];}
        if (data["topN"].length>8&&data["topN"].length<11) {
            $scope.chartTop_9.series[0].data = [sumOFPreference];
            $scope.chartTop_9.series[1].data = [data["topN"][8][1]];}
        if (data["topN"].length>9&&data["topN"].length<11){
            $scope.chartTop_10.series[0].data = [sumOFPreference];
            $scope.chartTop_10.series[1].data = [data["topN"][9][1]];
        }

    }else{$scope.viewMore=false}

}
        function getTopN(id)
        {
          var id = id;
          $scope.SelectedData = false;
          $scope.viewMore=false;
         // var id = parseInt($scope.id);
          var sumOFPreference = $scope.preferences.reduce(function (a, b) {
              return a + b;
          }, 0);

          $scope.showData = true;
          var data = $scope.allFillterValues[id];
          $scope.persons = [];
          if (id == "3" || id == "4" || id == "5") {
              for (var p = 0; p < data["topN"].length; p++) {
                  var splitStr = data["topN"][p][0].split(',')
                  $scope.persons.push({
                      name: splitStr[0] + " (function: " + splitStr[2] + ")",
                      actualName: data["topN"][p][0],
                      value: data["topN"][p][1].toFixed(2) + "/" + sumOFPreference.toString()
                  })
                  if (p == 0) {
                      $scope.chartTop_1.series[0].data = [sumOFPreference];
                      $scope.chartTop_1.series[1].data = [data["topN"][p][1]];
                  }
                  else if (p == 1) {
                      $scope.chartTop_2.series[0].data = [sumOFPreference];
                      $scope.chartTop_2.series[1].data = [data["topN"][p][1]];
                  }
                  else if (p == 2) {
                      $scope.chartTop_3.series[0].data = [sumOFPreference];
                      $scope.chartTop_3.series[1].data = [data["topN"][p][1]];
                  }
                  else if (p == 3) {
                      $scope.chartTop_4.series[0].data = [sumOFPreference];
                      $scope.chartTop_4.series[1].data = [data["topN"][p][1]];
                  }
                  else if (p == 4) {
                      $scope.chartTop_5.series[0].data = [sumOFPreference];
                      $scope.chartTop_5.series[1].data = [data["topN"][p][1]];
                  }

              }
          } else {
              for (var p = 0; p < data["topN"].length; p++) {
                  $scope.persons.push({
                      name: data["topN"][p][0].split(',')[0],
                      actualName: data["topN"][p][0],
                      value: data["topN"][p][1].toFixed(2) + "/" + sumOFPreference.toString()
                  })
                  if (p == 0) {
                      $scope.chartTop_1.series[0].data = [sumOFPreference];
                      $scope.chartTop_1.series[1].data = [data["topN"][p][1]];
                  }
                  else if (p == 1) {
                      $scope.chartTop_2.series[0].data = [sumOFPreference];
                      $scope.chartTop_2.series[1].data = [data["topN"][p][1]];
                  }
                  else if (p == 2) {
                      $scope.chartTop_3.series[0].data = [sumOFPreference];
                      $scope.chartTop_3.series[1].data = [data["topN"][p][1]];
                  }
                  else if (p == 3) {
                      $scope.chartTop_4.series[0].data = [sumOFPreference];
                      $scope.chartTop_4.series[1].data = [data["topN"][p][1]];
                  }
                  else if (p == 4) {
                      $scope.chartTop_5.series[0].data = [sumOFPreference];
                      $scope.chartTop_5.series[1].data = [data["topN"][p][1]];
                  }

              }
          }

          $('#' + id).addClass('active');
          if ($scope.id != "select") {
              $('#' + $scope.id).removeClass('active');
          }
          $scope.id = id.toString();

      }


        $scope.getPageInfo = function (id)
        {
            $scope.showmaxcl=false;
            getTopN(id);
        }

        function getCompanyInfo(index)
        {
            resetPage();
            $scope.SelectedData = false;
            var data = $scope.allFillterValues[$scope.id];
            $scope.selectedCompany = $scope.persons[index]["name"]
            //if ($scope.mode == "Company") {
            //    $scope.selectedCompany = data["topN"][index][0].split(',')[0];
            //}
            //else {
            //    $scope.selectedCompany = data["topN"][index][0];
            //}
            var actMode = ""
            if ($scope.mode == "Companies") {
                actMode = "Company"
            }
            else if ($scope.mode == "Functions") {
                actMode = "Function"
            }
            else if ($scope.mode == "Industries") {
                actMode = "Industry"
            }
            $http({
                url: '/find_company/getAllCharts',
                method: 'post',
                data: {
                    Level: $scope.level,
                    Industry: $scope.industry,
                    Role: $scope.role,
                    Company: $scope.company,
                    Mode: actMode,
                    Id: parseInt($scope.id),
                    selectedCompany: index,
                    Preferences: $scope.preferences
                }
            }).then(function success(response)
            {
                var data = response['data']['resultToShow'];
                $scope.showchart=true;
                if(data.hasOwnProperty('hiderp')&&data['hiderp']==true){
                    $scope.hiderp=true
                }else{
                    $scope.hiderp=false
                }

                if(data.hasOwnProperty("medianUser")&&data.hasOwnProperty("medianScore")) {

                    var maxlen;
                if(data["medianScore"].length>data["medianUser"].length){
                    maxlen=data["medianScore"].length;
                }else {
                    maxlen=data["medianUser"].length;
                }
                var ms=new Array();
                var mu=new Array();
                var cat=new Array();
                for(var i=0;i<maxlen;i++){
                    if(parseFloat(data["medianScore"][i])>0||parseFloat(data["medianUser"][i])>0){
                        ms.push(data["medianScore"][i]);
                        mu.push(data["medianUser"][i]);
                        cat.push(data["xAxis"][i]);
                    }
                }
                }else {
                    $scope.showchart=false;
                }

                 var mode=$scope.mode;
                if (data.hasOwnProperty("xAxis") && (data.hasOwnProperty("medianScore") || data.hasOwnProperty("medianUser"))) {
                   // $scope.xAxisPoints=data["xAxis"].length;
                    $scope.showRole = true;
                    $scope.chartConfigRole.xAxis.categories = [];
                    $scope.chartConfigRole.series = [];
                    // $scope.chartConfigRole.xAxis.categories = data["xAxis"];
                    $scope.chartConfigRole.xAxis.categories = cat;
                    if (data.hasOwnProperty("medianScore"))
                    {
                        $scope.chartConfigRole.series.push({
                            name: $scope.selectedCompany,
                            // data: data["medianScore"],
                            data:ms,
                            type: 'column',
                            //pointWidth: 20,
                            color: 'rgb(102,183,191)',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                //align: 'center',
                                format: '{point.y}', // one decimal
                                y: -20, // 10 pixels down from the top
                                style: {
                                    fontSize: '10px',
                                    fontFamily: 'Montserrat-Regular',
                                    textOutline: 0

                                }

                            }
                        });
                    }
                    if (data.hasOwnProperty("medianUser"))
                    {
                        var name="";
                        if(mode=="Companies")
                        {
                            name=$scope.UserInfo["Company"]+" (function: "+$scope.UserInfo["Role"]+")";
                        }else if(mode=="Functions")
                        {
                            name=$scope.UserInfo["Role"];
                        }else
                        {
                            name=$scope.UserInfo["Industry"];
                        }
                        $scope.chartConfigRole.series.push({
                            name: name,
                            // data: data["medianUser"],
                            data: mu,
                            type: 'column',
                          //  pointWidth: 20,
                            color: 'rgb(34,34,34)',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                //align: 'center',
                                format: '{point.y}', // one decimal
                                y: -20, // 10 pixels down from the top
                                style: {
                                    fontSize: '10px',
                                    fontFamily: 'Montserrat-Regular',
                                    textOutline: 0

                                }

                            }

                        });

                    }
                    if (data.hasOwnProperty("medianScore")&&!data.hasOwnProperty("medianUser"))
                    {
                        if (data["medianScore"].length == 5) {
                            // $scope.chartConfigRole.series[1]["pointWidth"] = 60;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 60;

                        }
                        else if (data["medianScore"].length >= 5 && data["medianScore"].length <= 7) {
                            //$scope.chartConfigRole.series[1]["pointWidth"] = 45;

                            $scope.chartConfigRole.series[0]["pointWidth"] = 45;

                        }
                        else if (data["medianScore"].length >= 8 && data["medianScore"].length < 10) {
                            //$scope.chartConfigRole.series[1]["pointWidth"] = 35;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 35;

                        }
                        else if (data["medianScore"].length >= 10 && data["medianScore"].length < 15) {
                            // $scope.chartConfigRole.series[1]["pointWidth"] = 18;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 18;

                        }
                        else if (data["medianScore"].length >= 15 && data["medianScore"].length < 20) {
                            // $scope.chartConfigRole.series[1]["pointWidth"] = 20;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 20;

                        }
                        else if (data["medianScore"].length >= 20 && data["medianScore"].length < 25) {
                            // $scope.chartConfigRole.series[1]["pointWidth"] = 16;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 16;
                        }

                        else if (data["medianScore"].length >= 25 && data["medianScore"].length < 35) {
                            //$scope.chartConfigRole.series[1]["pointWidth"] = 12;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 12;

                        }
                    }
                    else if (data.hasOwnProperty("medianUser")&&!data.hasOwnProperty("medianScore"))
                    {
                        if (data["medianUser"].length < 5) {
                            // $scope.chartConfigRole.series[1]["pointWidth"]=60;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 60;

                        }
                        else if (data["medianUser"].length >= 5 && data["medianUser"].length <= 7) {
                            // $scope.chartConfigRole.series[1]["pointWidth"]=45;

                            $scope.chartConfigRole.series[0]["pointWidth"] = 45;

                        }
                        else if (data["medianUser"].length >= 8 && data["medianUser"].length < 10) {
                            //$scope.chartConfigRole.series[1]["pointWidth"]=35;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 35;

                        }
                        else if (data["medianUser"].length >= 10 && data["medianUser"].length < 15) {
                            //$scope.chartConfigRole.series[1]["pointWidth"]=18;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 18;

                        }
                        else if (data["medianUser"].length >= 15 && data["medianUser"].length < 20) {
                            //$scope.chartConfigRole.series[1]["pointWidth"]=20;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 20;

                        }
                        else if (data["medianUser"].length >= 20 && data["medianUser"].length < 25) {
                            //$scope.chartConfigRole.series[1]["pointWidth"]=16;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 16;
                        }

                        else if (data["medianUser"].length >= 25 && data["medianUser"].length < 35) {
                            // $scope.chartConfigRole.series[1]["pointWidth"]=12;
                            $scope.chartConfigRole.series[0]["pointWidth"] = 12;

                        }
                    }
                    if(data.hasOwnProperty("medianScore")&&data.hasOwnProperty("medianUser"))
                    {
                        if(data["medianScore"].length>data["medianUser"].length)
                        {
                            if (data["medianScore"].length < 5) {
                                 $scope.chartConfigRole.series[1]["pointWidth"]=60;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 60;

                            }
                            else if (data["medianScore"].length >= 5 && data["medianScore"].length <= 7) {
                                 $scope.chartConfigRole.series[1]["pointWidth"]=45;

                                $scope.chartConfigRole.series[0]["pointWidth"] = 45;

                            }
                            else if (data["medianScore"].length >= 8 && data["medianScore"].length < 10) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=35;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 35;

                            }
                            else if (data["medianScore"].length >= 10 && data["medianScore"].length < 15) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=18;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 18;

                            }
                            else if (data["medianScore"].length >= 15 && data["medianScore"].length < 20) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=15;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 15;

                            }
                            else if (data["medianScore"].length >= 20 && data["medianScore"].length < 25) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=16;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 16;
                            }

                            else if (data["medianScore"].length >= 25 && data["medianScore"].length < 35) {
                                 $scope.chartConfigRole.series[1]["pointWidth"]=12;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 12;

                            }
                        }else{
                            if (data["medianUser"].length < 5) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=60;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 60;

                            }
                            else if (data["medianUser"].length >= 5 && data["medianUser"].length <= 7) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=45;

                                $scope.chartConfigRole.series[0]["pointWidth"] = 45;

                            }
                            else if (data["medianUser"].length >= 8 && data["medianUser"].length < 10) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=35;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 35;

                            }
                            else if (data["medianUser"].length >= 10 && data["medianUser"].length < 15) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=22;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 22;

                            }
                            else if (data["medianUser"].length >= 15 && data["medianUser"].length < 20) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=20;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 20;

                            }
                            else if (data["medianUser"].length >= 20 && data["medianUser"].length < 25) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=16;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 16;
                            }

                            else if (data["medianUser"].length >= 25 && data["medianUser"].length < 35) {
                                $scope.chartConfigRole.series[1]["pointWidth"]=12;
                                $scope.chartConfigRole.series[0]["pointWidth"] = 12;

                            }

                        }
                    }

                }
                if (data.hasOwnProperty("growthGraph")&&data["growthGraph"].length>0) {
                    $scope.showGrowth = true;
                    var userCL=$scope.level;
                   $scope.maxcl=Math.max(...data['growthGraph'][1]);
                    if(userCL > $scope.maxcl){
                        $scope.showmaxcl=true;
                        var allLinks=document.getElementsByClassName('unclickable');
                        for(var i=0;i<allLinks.length;i++){
                            allLinks[i].style.pointerEvents='none';
                        }
                    }else {
                        $scope.showmaxcl=false;
                        var allLinks=document.getElementsByClassName('unclickable');
                        for(var i=0;i<allLinks.length;i++){
                            allLinks[i].style.pointerEvents='visible';
                        }
                    }
                    $scope.chartConfigGrowth.xAxis.categories = [];
                    $scope.chartConfigGrowth.series = [];
                    $scope.chartConfigGrowth.xAxis.categories = data["growthGraph"][0];
                    $scope.chartConfigGrowth.series.push(
                        {
                            //showInLegend:false,
                            name: 'Max Career Level',
                            data: data["growthGraph"][1],
                            type: 'column',
                            pointWidth: 28,
                            pointPadding: 2,
                            color: 'rgb(102,183,191)',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                //align: 'center',
                                format: '{point.y}', // one decimal
                                y: -20, // 10 pixels down from the top
                                style: {
                                    fontSize: '10px',
                                    fontFamily: 'Montserrat-Regular',
                                    textOutline: 0

                                }

                            }


                        },
                        {
                            //showInLegend:false,
                            type: 'spline',
                            name: 'Median Compensation',
                            data: data["growthGraph"][2],
                            yAxis: 1,
                            pointWidth: 28,
                            pointPadding: 2,
                            color: 'rgb(169,47,37)',
                            dataLabels: {
                                enabled: false,
                                color: '#000000',
                                //align: 'center',
                                format: '{point.y:,.2f}', // one decimal
                                y: -20, // 10 pixels down from the top
                                style: {
                                    fontSize: '10px',
                                    fontFamily: 'Montserrat-Regular',
                                    textOutline: 0

                                }

                            }


                        }
                    )
                }
                if (data.hasOwnProperty("Scores") && data["Scores"].hasOwnProperty("Immediate Salary Improvement") && data["Scores"]["Immediate Salary Improvement"]>0 ) {
                    //$scope.chartConfig_1Score.series[0].data[0]={};
                    //$scope.chartConfig_1Score.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["Scores"]["Immediate Salary Improvement"]) };
                    $scope.chartConfig_1Score.series[0].data = [];
                    $scope.chartConfig_1Score.series[1].data = [];
                   // $scope.chartConfig_1Score.series[1].data = [(data["Scores"]["Immediate Salary Improvement"] * 100),(data["UserScore"]["Immediate Salary Improvement"] * 100)];
                    //{ y: 30, color: 'rgb(108,102,192)' },{ y: 20, color: '#C06666' }
                    $scope.chartConfig_1Score.series[1].data.push(
                        { y: (data["Scores"]["Immediate Salary Improvement"] * 100), color:'rgb(108,102,192)' });
                    $scope.chartConfig_1Score.series[0].data.push(100);
                }

                if (data.hasOwnProperty("Scores") && data["Scores"].hasOwnProperty("Short Term Career Level Growth") && data["Scores"]["Short Term Career Level Growth"] >0 ) {
                    //$scope.chartConfig_2Score.series[0].data[0]={};
                    //$scope.chartConfig_2Score.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["Scores"]["Short Term Career Level Growth"]) };

                    $scope.chartConfig_2Score.series[1].data = [];
                    $scope.chartConfig_2Score.series[0].data = [];
                    $scope.chartConfig_2Score.series[1].data.push(
                        { y: (data["Scores"]["Short Term Career Level Growth"] * 100), color:'rgb(108,102,192)' });
                    $scope.chartConfig_2Score.series[0].data.push(100);
                    //$scope.chartConfig_2Score.series[1].data = [data["Scores"]["Short Term Career Level Growth"] * 100];
                    //$scope.chartConfig_2Score.series[0].data = [100];
                }

                if (data.hasOwnProperty("Scores") && data["Scores"].hasOwnProperty("Short Term Salary Growth")&& data["Scores"]["Short Term Salary Growth"] >0 ) {
                    // $scope.chartConfig_3Score.series[0].data[0]={};
                    //$scope.chartConfig_3Score.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["Scores"]["Short Term Salary Growth"]) };

                    $scope.chartConfig_3Score.series[1].data = [];
                    $scope.chartConfig_3Score.series[0].data = [];
                    $scope.chartConfig_3Score.series[1].data.push(
                        { y: (data["Scores"]["Short Term Salary Growth"] * 100), color:'rgb(108,102,192)' });
                    $scope.chartConfig_3Score.series[0].data.push(100);

                    //$scope.chartConfig_3Score.series[1].data = [data["Scores"]["Short Term Salary Growth"] * 100];
                    //$scope.chartConfig_3Score.series[0].data = [100];
                }

                if (data.hasOwnProperty("Scores") && data["Scores"].hasOwnProperty("Average Salary Growth")&& data["Scores"]["Average Salary Growth"] >0 ) {
                    //$scope.chartConfig_4Score.series[0].data[0]={};
                    //$scope.chartConfig_4Score.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["Scores"]["Average Salary Growth"]) };

                    $scope.chartConfig_4Score.series[1].data = [];
                    $scope.chartConfig_4Score.series[0].data = [];
                    $scope.chartConfig_4Score.series[1].data.push(
                        { y: (data["Scores"]["Average Salary Growth"] * 100), color:'rgb(108,102,192)' });
                    $scope.chartConfig_4Score.series[0].data.push(100);

                    //$scope.chartConfig_4Score.series[1].data = [data["Scores"]["Average Salary Growth"] * 100];
                    //$scope.chartConfig_4Score.series[0].data = [100];
                }

                if (data.hasOwnProperty("Scores") && data["Scores"].hasOwnProperty("Average Career Level Growth")&& data["Scores"]["Average Career Level Growth"] >0 ) {
                    // $scope.chartConfig_5Score.series[0].data[0]={};
                    // $scope.chartConfig_5Score.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["Scores"]["Average Career Level Growth"]) };

                    $scope.chartConfig_5Score.series[1].data = [];
                    $scope.chartConfig_5Score.series[0].data = [];
                    //$scope.chartConfig_5Score.series[1].data = [data["Scores"]["Average Career Level Growth"] * 100];
                    //$scope.chartConfig_5Score.series[0].data = [100];
                    $scope.chartConfig_5Score.series[1].data.push(
                        { y: (data["Scores"]["Average Career Level Growth"] * 100), color:'rgb(108,102,192)' });
                    $scope.chartConfig_5Score.series[0].data.push(100);

                }

                if (data.hasOwnProperty("Scores") && data["Scores"].hasOwnProperty("Long Term Career Level Growth")&& data["Scores"]["Long Term Career Level Growth"] >0 ) {
                    //$scope.chartConfig_6Score.series[0].data[0]={};
                    //$scope.chartConfig_6Score.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["Scores"]["Long Term Career Level Growth"]) };

                    $scope.chartConfig_6Score.series[1].data = [];
                    $scope.chartConfig_6Score.series[0].data = [];
                    //$scope.chartConfig_6Score.series[1].data = [data["Scores"]["Long Term Career Level Growth"] * 100];
                    //$scope.chartConfig_6Score.series[0].data = [100];
                    $scope.chartConfig_6Score.series[1].data.push(
                        { y: (data["Scores"]["Long Term Career Level Growth"] * 100), color:'rgb(108,102,192)' });
                    $scope.chartConfig_6Score.series[0].data.push(100);

                }
                if (data.hasOwnProperty("Scores") && data["Scores"].hasOwnProperty("Long Term Salary Growth")&& data["Scores"]["Long Term Salary Growth"] >0 ) {
                    //$scope.chartConfig_7Score.series[0].data[0]={};
                    //$scope.chartConfig_7Score.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["Scores"]["Long Term Salary Growth"]) };

                    $scope.chartConfig_7Score.series[1].data = [];
                    $scope.chartConfig_7Score.series[0].data = [];
                    //$scope.chartConfig_7Score.series[1].data = [data["Scores"]["Long Term Salary Growth"] * 100];
                    //$scope.chartConfig_7Score.series[0].data = [100];
                    $scope.chartConfig_7Score.series[1].data.push(
                        { y: (data["Scores"]["Long Term Salary Growth"] * 100), color:'rgb(108,102,192)' });
                    $scope.chartConfig_7Score.series[0].data.push(100);

                }

                if(data["showUser"] && isEmpty(data["UserScore"])==false){
                    $scope.showUser=data["showUser"];
                if (data.hasOwnProperty("UserScore") && data["UserScore"].hasOwnProperty("Immediate Salary Improvement")&& data["UserScore"]["Immediate Salary Improvement"]>0) {
                    //$scope.chartConfig_1User.series[0].data[0]={};
                    //$scope.chartConfig_1User.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["UserScore"]["Immediate Salary Improvement"]) };
                    //$scope.chartConfig_1Score.series[0].data = [];
                    //$scope.chartConfig_1User.series[1].data = [];

                    $scope.chartConfig_1Score.series[1].data.push(
                        { y: (data["UserScore"]["Immediate Salary Improvement"] * 100), color:'rgb(192,102,102)' });
                    $scope.chartConfig_1Score.series[0].data.push(100);
                }
                if (data.hasOwnProperty("UserScore") && data["UserScore"].hasOwnProperty("Short Term Career Level Growth")&& data["UserScore"]["Short Term Career Level Growth"]>0) {
                    //$scope.chartConfig_2User.series[0].data[0]={};
                    //$scope.chartConfig_2User.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["UserScore"]["Short Term Career Level Growth"]) };
                    //$scope.chartConfig_2User.series[1].data = [];
                    //$scope.chartConfig_2User.series[0].data = [];
                    //$scope.chartConfig_2User.series[1].data = [data["UserScore"]["Short Term Career Level Growth"] * 100];
                    //$scope.chartConfig_2User.series[0].data = [100];
                    $scope.chartConfig_2Score.series[1].data.push(
                        { y: (data["UserScore"]["Short Term Career Level Growth"] * 100), color:'rgb(192,102,102)' });
                    $scope.chartConfig_2Score.series[0].data.push(100);
                }
                if (data.hasOwnProperty("UserScore") && data["UserScore"].hasOwnProperty("Short Term Salary Growth")&& data["UserScore"]["Short Term Salary Growth"]>0) {
                    //$scope.chartConfig_3User.series[0].data[0]={};
                    //$scope.chartConfig_3User.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["UserScore"]["Short Term Salary Growth"]) };

                    //$scope.chartConfig_3User.series[1].data = [];
                    //$scope.chartConfig_3User.series[0].data = [];
                    //$scope.chartConfig_3User.series[1].data = [data["UserScore"]["Short Term Salary Growth"] * 100];
                    //$scope.chartConfig_3User.series[0].data = [100];
                    $scope.chartConfig_3Score.series[1].data.push(
                        { y: (data["UserScore"]["Short Term Salary Growth"] * 100), color:'rgb(192,102,102)' });
                    $scope.chartConfig_3Score.series[0].data.push(100);
                }

                if (data.hasOwnProperty("UserScore") && data["UserScore"].hasOwnProperty("Average Salary Growth")&& data["UserScore"]["Average Salary Growth"]>0) {
                    // $scope.chartConfig_4User.series[0].data[0]={};
                    //$scope.chartConfig_4User.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["UserScore"]["Average Salary Growth"]) };

                    //$scope.chartConfig_4User.series[1].data = [];
                    //$scope.chartConfig_4User.series[0].data = [];
                    //$scope.chartConfig_4User.series[1].data = [data["UserScore"]["Average Salary Growth"] * 100];
                    //$scope.chartConfig_4User.series[0].data = [100];
                    $scope.chartConfig_4Score.series[1].data.push(
                        { y: (data["UserScore"]["Average Salary Growth"] * 100), color:'rgb(192,102,102)' });
                    $scope.chartConfig_4Score.series[0].data.push(100);
                }

                if (data.hasOwnProperty("UserScore") && data["UserScore"].hasOwnProperty("Average Career Level Growth")&& data["UserScore"]["Average Career Level Growth"]>0) {
                    //$scope.chartConfig_5User.series[0].data[0]={};
                    //$scope.chartConfig_5User.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["UserScore"]["Average Career Level Growth"]) };

                    //$scope.chartConfig_5User.series[1].data = [];
                    //$scope.chartConfig_5User.series[0].data = [];
                    //$scope.chartConfig_5User.series[1].data = [data["UserScore"]["Average Career Level Growth"] * 100];
                    //$scope.chartConfig_5User.series[0].data = [100];
                    $scope.chartConfig_5Score.series[1].data.push(
                        { y: (data["UserScore"]["Average Career Level Growth"] * 100), color:'rgb(192,102,102)' });
                    $scope.chartConfig_5Score.series[0].data.push(100);
                }

                if (data.hasOwnProperty("UserScore") && data["UserScore"].hasOwnProperty("Long Term Career Level Growth")&& data["UserScore"]["Long Term Career Level Growth"]>0) {
                    //$scope.chartConfig_6User.series[0].data[0]={};
                    //$scope.chartConfig_6User.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["UserScore"]["Long Term Career Level Growth"]) };

                    //$scope.chartConfig_6User.series[1].data = [];
                    //$scope.chartConfig_6User.series[0].data = [];
                    //$scope.chartConfig_6User.series[1].data = [data["UserScore"]["Long Term Career Level Growth"] * 100];
                    //$scope.chartConfig_6User.series[0].data = [100];
                    $scope.chartConfig_6Score.series[1].data.push(
                        { y: (data["UserScore"]["Long Term Career Level Growth"] * 100), color:'rgb(192,102,102)' });
                    $scope.chartConfig_6Score.series[0].data.push(100);
                }

                if (data.hasOwnProperty("UserScore") && data["UserScore"].hasOwnProperty("Long Term Salary Growth")&& data["UserScore"]["Long Term Salary Growth"]>0) {
                    // $scope.chartConfig_7User.series[0].data[0]={};
                    //$scope.chartConfig_7User.series[0].data[0]={x: 1, x2: 100, y: 0, partialFill:(data["UserScore"]["Long Term Salary Growth"]) };

                    //$scope.chartConfig_7User.series[1].data = [];
                    //$scope.chartConfig_7User.series[0].data = [];
                    //$scope.chartConfig_7User.series[1].data = [data["UserScore"]["Long Term Salary Growth"] * 100];
                    //$scope.chartConfig_7User.series[0].data = [100];
                    $scope.chartConfig_7Score.series[1].data.push(
                        { y: (data["UserScore"]["Long Term Salary Growth"] * 100), color:'rgb(192,102,102)' });
                    $scope.chartConfig_7Score.series[0].data.push(100);
                }
                }
                if (data.hasOwnProperty('ppyScores') && data.hasOwnProperty('ppyUser')) {
                    var name=""
                    if(mode=="Companies")
                    {
                        name=$scope.UserInfo["Company"]+" (function: "+$scope.UserInfo["Role"]+")";
                    }else if(mode=="Functions")
                    {
                        name=$scope.UserInfo["Role"];
                    }else
                    {
                        name=$scope.UserInfo["Industry"];
                    }
                    if (data.hasOwnProperty('ppyUserB') && data.hasOwnProperty('ppyUser')) {

                        var maxlen1;
                        if(data["ppyUserB"].length>data["ppyUser"].length){
                            maxlen1=data["ppyUserB"].length;
                        }else {
                            maxlen1=data["ppyUser"].length;
                        }
                        var ppyUserB=new Array();
                        var ppyUser=new Array();
                        var category=new Array();
                        for(var i=0;i<maxlen1;i++){
                            if(parseFloat(data["ppyUser"][i])<-0||parseFloat(data["ppyUserB"][i])<-0){
                                ppyUserB.push(data["ppyUserB"][i]);
                                ppyUser.push(data["ppyUser"][i]);
                                category.push(data["xAxis"][i]);
                            }
                        }

                    }

                    if (data.hasOwnProperty('ppyScoresB') && data.hasOwnProperty('ppyScores')) {

                        var maxlen2;
                        if(data["ppyScoresB"].length>data["ppyScores"].length){
                            maxlen2=data["ppyScoresB"].length;
                        }else {
                            maxlen2=data["ppyScores"].length;
                        }
                        var ppyScoresB=new Array();
                        var ppyScores=new Array();
                        var category1=new Array();
                        for(var i=0;i<maxlen2;i++){
                            if(parseFloat(data["ppyScores"][i])>0||parseFloat(data["ppyScoresB"][i])>0){
                                ppyScoresB.push(data["ppyScoresB"][i]);
                                ppyScores.push(data["ppyScores"][i]);
                                category1.push(data["xAxis"][i]);
                            }
                        }

                    }
                    $scope.chartConfig =
                    {
                        options: {
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: ''
                            },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + 'Career Level ' + this.point.category + '</b><br/>' +
                                        '% of People: ' + Math.abs(this.point.y);
                                }
                            },
                        },
                        xAxis: [{
                            // categories: data["xAxis"],
                            categories:category>category1?category:category1,
                            reversed: false,title: {
                                text: "Career Level"
                            },
                        }, { // mirror axis on right side
                            opposite: true,
                            reversed: false,
                            // categories: data["xAxis"],
                            categories:category>category1?category:category1,
                            linkedTo: 0,title: {
                                text: "Career Level"
                            },
                        }],
                        yAxis: {
                            title: {
                                text: "% of People"
                            },
                            labels: {
                                formatter: function () {
                                    return (Math.abs(this.value));
                                }
                            },

                        },

                        plotOptions: {
                            series: {
                                dataLabels: {
                                    enabled: true,
                                    formatter: function () {
                                        return Math.abs(this.y) + '%';
                                    }
                                }
                            }
                        },

                        series: [{
                            showInLegend: false,
                            name: 'Barrier',
                            // data: data["ppyUserB"],
                            data: ppyUserB,
                            type: 'column',
                            pointWidth: 2,
                            pointPlacement: 0.1,
                            color: '#a92f25 ',

                        }, {
                            grouping: false,
                            //showInLegend: false,
                            name: name,
                            // data: data["ppyUser"],
                            data: ppyUser,
                            type: 'column',
                            pointWidth: 25,
                            pointPadding: 2,
                            color: 'rgb(34,34,34)',
                            //color:'rgb(85,142,213)',
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    return Math.abs(this.y) + '%';
                                },
                                align: 'center',
                                //format: '{point.y}'+' %', // one decimal
                               // y: 10, // 10 pixels down from the top
                                x: -15,
                                verticalAlign: 'middle',
                                style: {
                                    fontSize: '10px',
                                    fontFamily: 'Montserrat-Regular',
                                    textOutline: 0

                                }

                            }


                        },
                            {
                                showInLegend: false,
                                name: 'Barrier',
                                // data: data["ppyScoresB"],
                                data:ppyScoresB,
                                type: 'column',
                                pointWidth: 2,
                                pointPlacement: 0.33,
                                color: '#a92f25 ',

                            }, {
                                grouping: false,
                               // showInLegend: false,
                                name:$scope.selectedCompany,
                                // data: data["ppyScores"],
                                data: ppyScores,
                                type: 'column',
                                pointWidth: 25,
                                pointPadding: 2,
                                color: 'rgb(102,183,191)',
                                //color:'rgb(85,142,213)',
                                dataLabels: {
                                    enabled: true,
                                    formatter: function () {
                                        return Math.abs(this.y) + '%';
                                    },
                                    //color: '#000000',
                                    align: 'center',
                                    //format: '{point.y}'+' %', // one decimal
                                    // y: 10, // 10 pixels down from the top
                                    x: 15,
                                    verticalAlign: 'middle',
                                    style: {
                                        fontSize: '10px',
                                        fontFamily: 'Montserrat-Regular',
                                        textOutline: 0

                                    }

                                }


                            }]
                    };


                    if (data["ppyScores"].length < 5) {
                        $scope.chartConfig.series[1]["pointWidth"] = 40;
                        //$scope.chartConfig.series[1]["pointPadding"]=0;
                        // $scope.chartConfig.series[0]["pointPlacement"]=0.2;
                        $scope.chartConfig.series[3]["pointWidth"] = 40;
                        //$scope.chartConfig.series[3]["pointPadding"]=0;
                        $scope.chartConfig.series[0]["pointPlacement"] = 0.4;
                        $scope.chartConfig.series[2]["pointPlacement"] = 0.1;
                    }
                    else if (data["ppyScores"].length >= 5 && data["ppyScores"].length <= 7) {
                        $scope.chartConfig.series[1]["pointWidth"] = 35;
                        // $scope.chartConfig.series[1]["pointPadding"]=0;
                        //$scope.chartConfig.series[0]["pointPlacement"]=0.30;
                        $scope.chartConfig.series[3]["pointWidth"] = 35;
                        //$scope.chartConfig.series[3]["pointPadding"]=0;
                        $scope.chartConfig.series[0]["pointPlacement"] = 0.6;
                        $scope.chartConfig.series[2]["pointPlacement"] = 0.3;
                    }
                    else if (data["ppyScores"].length >= 8 && data["ppyScores"].length < 10) {
                        $scope.chartConfig.series[1]["pointWidth"] = 27;
                        $scope.chartConfig.series[3]["pointWidth"] = 27;
                        $scope.chartConfig.series[0]["pointPlacement"] = 0.5;
                        $scope.chartConfig.series[2]["pointPlacement"] = 0.2;
                    }
                    else if (data["ppyScores"].length >= 10 && data["ppyScores"].length < 15) {
                        $scope.ChartStyle={"height":"400px"};
                        $scope.chartConfig.series[1]["pointWidth"] = 22;
                        $scope.chartConfig.series[3]["pointWidth"] = 22;
                        $scope.chartConfig.series[0]["pointPlacement"] = 0.7;
                        $scope.chartConfig.series[2]["pointPlacement"] = 0.4;
                    }
                    else if (data["ppyScores"].length >= 15 && data["ppyScores"].length < 20) {
                       $scope.ChartStyle={"height":"420px"};
                        $scope.chartConfig.series[1]["pointWidth"] = 16;
                        $scope.chartConfig.series[3]["pointWidth"] = 16;
                        //$scope.chartConfig.series[1]["pointPadding"]=0;
                        $scope.chartConfig.series[0]["pointPlacement"] = 0.6;
                        $scope.chartConfig.series[2]["pointPlacement"] = 0.3;
                    }
                    else if (data["ppyScores"].length >= 20 && data["ppyScores"].length < 25) {
                        $scope.ChartStyle={"height":"450px"};
                        $scope.chartConfig.series[1]["pointWidth"] = 13;
                        $scope.chartConfig.series[3]["pointWidth"] = 13;
                        $scope.chartConfig.series[0]["pointPlacement"] = 0.6;
                        $scope.chartConfig.series[2]["pointPlacement"] = 0.3;
                    }
                    else if (data["ppyScores"].length >= 25 && data["ppyScores"].length < 35) {
                        $scope.ChartStyle={"height":"500px"};
                        $scope.chartConfig.series[1]["pointWidth"] = 11;
                        $scope.chartConfig.series[3]["pointWidth"] = 11;
                        $scope.chartConfig.series[0]["pointPlacement"] = 0.6;
                        $scope.chartConfig.series[2]["pointPlacement"] = 0.3;
                    }
                }
                if ($scope.chartConfig == "" && (data.hasOwnProperty('ppyUser') || data.hasOwnProperty('ppyScores'))) {
                    var data1 = [];
                    var dataB = [];
                    var barColor=""
                    if (data.hasOwnProperty('ppyUser')) {
                        data1 = ppyUser;
                        dataB = ppyUserB;
                        barColor="rgb(34,34,34)";
                    }
                    else {
                        data1 = ppyScores;
                        dataB = ppyScoresB;
                        barColor="rgb(102,183,191)";
                    }
                    $scope.chartConfigPU =
                    {
                        options: {
                            title: {
                                text: '',
                                style: {
                                    display: 'none'
                                }
                            },
                            chart: {
                                type: "bar"
                            },
                            tooltip: {

                                formatter: function () {
                                    var s = '<b> Career Level ' + this.x + '</b>';

                                    $.each(this.points, function () {
                                        if (this.series.name == "Median Compensation") {
                                            s += '<br/>' + this.series.name + ': ' +
                                                this.y + ' INR Lakh';
                                        }
                                        else if (this.series.name == "% of People") {
                                            s += '<br/> % of Total People : ' +
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
                            categories: category1,
                        },
                        yAxis: [{title: {text: "% of People"}}, {
                            title: {
                                text: ''
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
                                data: dataB,
                                type: 'column',
                                pointWidth: 2,
                                pointPlacement: 0.33,
                                color: '#a92f25 ',
                                //color:'rgb(255,0,0)',
                            },
                            {
                                grouping: false,
                                showInLegend: false,
                                name: 'Frequency',
                                data: data1,
                                type: 'column',
                                pointWidth: 25,
                                pointPadding: 2,
                                color: barColor,
                                //color:'rgb(85,142,213)',
                                dataLabels: {
                                    enabled: true,
                                    //color: '#000000',
                                    //align: 'center',
                                    format: '{point.y}' + ' %', // one decimal
                                    // y: 10, // 10 pixels down from the top
                                    style: {
                                        fontSize: '10px',
                                        fontFamily: 'Montserrat-Regular',
                                        textOutline: 0

                                    }

                                }


                            }

                        ]
                    };
                    if (data["xAxis"].length >= 5 && data["xAxis"].length < 7) {
                        $scope.chartConfigPU.series[1]["pointWidth"] = 27;
                        $scope.chartConfigPU.series[1]["pointPadding"] = 0;
                        $scope.chartConfigPU.series[0]["pointPlacement"] = 0.30;
                    }
                    else if (data["xAxis"].length >= 8 && data["xAxis"].length < 10) {
                        $scope.chartConfigPU.series[1]["pointWidth"] = 22;
                        //$scope.chartConfigPU.series[1]["pointPadding"]=0;
                        // $scope.chartConfigPU.series[0]["pointPlacement"]=0.1;
                    }
                    else if (data["xAxis"].length >= 10 && data["xAxis"].length < 15) {
                        $scope.chartConfigPU.series[1]["pointWidth"] = 16;
                        //$scope.chartConfigPU.series[1]["pointPadding"]=0;
                        // $scope.chartConfigPU.series[0]["pointPlacement"]=0.1;
                    }
                    else if (data["xAxis"].length >= 15 && data["xAxis"].length < 20) {
                        $scope.chartConfigPU.series[1]["pointWidth"] = 11;
                        //$scope.chartConfigPU.series[1]["pointPadding"]=0;
                        // $scope.chartConfigPU.series[0]["pointPlacement"]=0.1;
                    }
                    else if (data["xAxis"].length >= 20 && data["xAxis"].length < 25) {
                        $scope.chartConfigPU.series[1]["pointWidth"] = 8;
                        //$scope.chartConfigPU.series[1]["pointPadding"]=0;
                        // $scope.chartConfigPU.series[0]["pointPlacement"]=0.1;
                    }
                    else if (data["xAxis"].length >= 25 && data["xAxis"].length < 35) {
                        $scope.chartConfigPU.series[1]["pointWidth"] = 4;
                        //$scope.chartConfigPU.series[1]["pointPadding"]=0;
                        // $scope.chartConfigPU.series[0]["pointPlacement"]=0.1;
                    }
                }
                $scope.SelectedData = true;
                $scope.showLoader = false;
            });

            $scope.showLoader = true;
            //var Specific=data["Specific"][selectedCompany];
            //var Overall=data["Specific"][selectedCompany];

            $("#comp_list li").removeClass('active');
            $("#comp_list li." + index).addClass('active');
        }
        $scope.listclick = function (index) {
            // $scope.showchart=true;
            getCompanyInfo(index)

        }
        ShowModeButtons();
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
        $scope.logout = function () {
            $localStorage["User"] = "";
            $localStorage["guestUser"] = "";
            $state.go('page.index')
        }
        $scope.ChangeWeigth = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/rankingPop.html",
                controller: rakingCtrl,
                size: "lg",
                backdrop: 'static'
            });

        }
        function rakingCtrl($scope, $uibModalInstance) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.ISI = 0; //Immediate Salary improvement
            $scope.STCL = 0;//Short term Career Level growth
            $scope.STSG = 0;//Short term Salary growth
            $scope.AVGSG = 0;//Average term Salary growth
            $scope.AVGCLG = 0;//Average term CL growth
            $scope.LTCL = 0;//Long term Career Level growth
            $scope.LTSG = 0;//Long term Salary growth
           // getPreference();
            function hideDots(id,val)
            {
                if(id=="STSG")
                {
                    $('#'+id+$scope.STSG.toString()).addClass('show');
                    $('#'+id+$scope.STSG.toString()).removeClass('hide');
                    $scope.STSG=val;
                    $('#'+id+val.toString()).addClass('hide');
                    $('#'+id+val.toString()).removeClass('show');

                }else if(id=="STCL")
                {
                    $('#'+id+$scope.STCL.toString()).addClass('show');
                    $('#'+id+$scope.STCL.toString()).removeClass('hide');
                    $scope.STCL=val;
                    $('#'+id+val.toString()).addClass('hide');
                    $('#'+id+val.toString()).removeClass('show');
                }
                else if(id=="ISI")
                {
                    $('#'+id+$scope.ISI.toString()).addClass('show');
                    $('#'+id+$scope.ISI.toString()).removeClass('hide');
                    $scope.ISI=val;
                    $('#'+id+val.toString()).addClass('hide');
                    $('#'+id+val.toString()).removeClass('show');
                }
                else if(id=="AVGSG")
                {
                    $('#'+id+$scope.AVGSG.toString()).addClass('show');
                    $('#'+id+$scope.AVGSG.toString()).removeClass('hide');
                    $scope.AVGSG=val;
                    $('#'+id+val.toString()).addClass('hide');
                    $('#'+id+val.toString()).removeClass('show');
                }
                else if(id=="AVGCLG")
                {
                    $('#'+id+$scope.AVGCLG.toString()).addClass('show');
                    $('#'+id+$scope.AVGCLG.toString()).removeClass('hide');
                    $scope.AVGCLG=val;
                    $('#'+id+val.toString()).addClass('hide');
                    $('#'+id+val.toString()).removeClass('show');
                }
                else if(id=="LTCL")
                {
                    $('#'+id+$scope.LTCL.toString()).addClass('show');
                    $('#'+id+$scope.LTCL.toString()).removeClass('hide');
                    $scope.LTCL=val;
                    $('#'+id+val.toString()).addClass('hide');
                    $('#'+id+val.toString()).removeClass('show');
                }
                else if(id=="LTSG")
                {
                    $('#'+id+$scope.LTSG.toString()).addClass('show');
                    $('#'+id+$scope.LTSG.toString()).removeClass('hide');
                    $scope.LTSG=val;
                    $('#'+id+val.toString()).addClass('hide');
                    $('#'+id+val.toString()).removeClass('show');
                }
            }
            $scope.hideDot=function(id,val)
            {
                hideDots(id,val);

            }
            $scope.setPreference=function ()
            {
                var allPreference=[];
                allPreference.push($scope.ISI);
                allPreference.push($scope.STCL);
                allPreference.push($scope.STSG);
                allPreference.push($scope.AVGSG);
                allPreference.push($scope.AVGCLG);
                allPreference.push($scope.LTCL);
                allPreference.push($scope.LTSG);



                if(angular.isUndefined($localStorage["User"])){

                    $localStorage["User"]='',
                        $state.go("page.index")
                }
                else if($localStorage["User"].hasOwnProperty("Email"))
                {
                    $localStorage["User"]["Preference"]=allPreference
                    var params={data:$localStorage["User"]}
                    $http({
                        url: '/users/updateUserInfo',
                        method: 'post',
                        data: params
                    }).then(function success(response)
                    {
                        var data = response["data"];
                        if(data["status"]==200)
                        {
                            if(data["msg"]=="Successfully Updated")
                            {
                                $scope.username= $localStorage["User"]=data["user"];
                                $uibModalInstance.close();
                                $state.go($state.current, {}, {reload: true});
                            }
                            else
                            {
                                toaster.pop('info','',data["msg"]);
                                return;
                            }
                        }
                        else
                        {
                            toaster.pop('error','',data["msg"]);
                            return;
                        }

                    });


                }
                else if(angular.isDefined($localStorage["guestUser"]))
                {
                    $localStorage["guestUser"]["Preference"]=allPreference
                    $uibModalInstance.close();
                    $state.go($state.current, {}, {reload: true});

                }
                //alert(allPreference.toString());


            }
            $scope.getPreference=function()
            {
                if(angular.isUndefined($localStorage["User"])){

                    $localStorage["User"]='',
                        $state.go("page.index")
                }
                else if($localStorage["User"].hasOwnProperty("Email"))
                {

                    if($localStorage["User"].hasOwnProperty("Preference")&&$localStorage["User"]["Preference"].length>0)
                    {
                        $scope.ISI=$localStorage["User"]["Preference"][0]; //Immediate Salary improvement

                        $scope.STCL=$localStorage["User"]["Preference"][1];//Short term Career Level growth

                        $scope.STSG=$localStorage["User"]["Preference"][2];//Short term Salary growth

                        $scope.AVGSG=$localStorage["User"]["Preference"][3];//Average term Salary growth

                        $scope.AVGCLG=$localStorage["User"]["Preference"][4];//Average term CL growth

                        $scope.LTCL=$localStorage["User"]["Preference"][5];//Long term Career Level growth

                        $scope.LTSG=$localStorage["User"]["Preference"][6];//Long term Salary growth

                    }

                }
                else if(angular.isDefined($localStorage["guestUser"]))
                {
                    if($localStorage["guestUser"].hasOwnProperty("Preference")&&$localStorage["guestUser"]["Preference"].length>0)
                    {
                        $scope.ISI=$localStorage["guestUser"]["Preference"][0]; //Immediate Salary improvement
                        hideDots("ISI",$scope.ISI);
                        $scope.STCL=$localStorage["guestUser"]["Preference"][1];//Short term Career Level growth
                        $scope.STSG=$localStorage["guestUser"]["Preference"][2];//Short term Salary growth
                        $scope.AVGSG=$localStorage["guestUser"]["Preference"][3];//Average term Salary growth
                        $scope.AVGCLG=$localStorage["guestUser"]["Preference"][4];//Average term CL growth
                        $scope.LTCL=$localStorage["guestUser"]["Preference"][5];//Long term Career Level growth
                        $scope.LTSG=$localStorage["guestUser"]["Preference"][6];//Long term Salary growth

                    }

                }
                hideDots("ISI",$scope.ISI);
                hideDots("STCL",$scope.STCL);
                hideDots("STSG",$scope.STSG);
                hideDots("AVGSG",$scope.AVGSG);
                hideDots("AVGCLG",$scope.AVGCLG);
                hideDots("LTCL",$scope.LTCL);
                hideDots("LTSG",$scope.LTSG);



            }

        }

        rakingCtrl.$inject = ['$scope', '$uibModalInstance'];
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        $scope.openInfoPop=function (id) {
            if(id=='PP'){
                var modalInstance=$uibModal.open({
                    templateUrl: "/assets/templates/growthInfo.html",
                    controller: infoPopCtrl,
                    size: "sm",
                    backdrop: 'static',
                    resolve:{idTxt:function(){return id; }}
                });
            }else if(id=='GP'){
                var modalInstance=$uibModal.open({
                    templateUrl: "/assets/templates/growthInfo.html",
                    controller: infoPopCtrl,
                    size: "sm",
                    backdrop: 'static',
                    resolve:{idTxt:function(){return id; }}
                });
            }


        }
        function infoPopCtrl($scope,$uibModalInstance,idTxt) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.infoTxt=idTxt;
        }
        infoPopCtrl.$inject=['$scope','$uibModalInstance','idTxt'];

    }
})();