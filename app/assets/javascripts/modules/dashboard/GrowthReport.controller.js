(function()
{
    angular.module('naut').controller('GrowthReportController',GrowthReportController);
    GrowthReportController.$inject=['$scope','$http','$localStorage','$state','growthValues','$uibModal','$linkedIn','toaster'];
    function GrowthReportController($scope,$http,$localStorage,$state,growthValues,$uibModal,$linkedIn,toaster)
    {
       var reportValues=growthValues;
        var vm=this;
        vm.allIndGrp=[];
        vm.allFunGrp=[];
        vm.isGuest=false;
        vm.isGuest=reportValues["isGuest"];
        $scope.nextDesigs=[];
        $scope.highestDesigs=[];
        $scope.showChangeView=0
        $scope.diffNxtLvl="";
        $scope.diffHiLvl="";
        $scope.diffPerLvl="";
        $scope.salGrthNxtLvl="";
        $scope.salGrthHiLvl="";
        $scope.salGrthPerLvl="";
        $scope.UserInfo={};
        $scope.initalBar={};vm.userinfo={};
        vm.guestuserinfo={};
        $scope.availableData={};
        $scope.btnComanyPromotion=false;
        $scope.btnFunIndPromotion=false;
        $scope.btnFunPromotion=false;
        $scope.btnFunGrpPromotion=false;
        $scope.btnIndGrpPromotion=false;
        $scope.btnIndPromotion=false;
        $scope.ShowEmail = $localStorage["User"]["Email"];
        $scope.highestFilter="";

        if($localStorage["User"] !=""){
            $scope.changefunction = $localStorage["User"]["changefunction"];
            $scope.changeindustry = $localStorage["User"]["changeindustry"];
        }
else{
            $scope.changefunction = $localStorage["guestUser"]["changefunction"];
            $scope.changeindustry = $localStorage["guestUser"]["changeindustry"];;
        }
        $scope.chartConfig_CLGrowth =
            {
                options: {
                    title: {
                        text: ''
                    },tooltip: { shared: true,  useHTML: true},
                    chart: {
                        type: "bar",
                        chart:{spacingBottom: -15,
                            spacingTop: 10,
                            spacingLeft: -20,
                            spacingRight: 10,}

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
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                        }
                    }


                }],
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderColor: '#222222'
                    }
                },
                tooltip:{enable:true},
                series: [{
                    name: 'Score',
                    data: [],
                    // tooltip: { enabled: true,
                    //    shared: true,
                    //     pointFormatter:function(){
                    //         return '<tspan style="fill:#222222" x="8" dy="15">●</tspan><tspan dx="0"> Score: </tspan><b>'+$scope.GrowthFactor["nxtlevl"]+'</b>';
                    //     }
                    // },
                    enableMouseTracking:false,
                    groupPadding: 0,
                    showInLegend: false,
                    color:'#222222'

                }, {
                    name: 'Score',
                    data: [],
                    groupPadding: 0.2,
                    showInLegend: false,
                    color:'#25ad9f',
                    // color:'#66b6bf'






                }]
            };
        $scope.chartConfig_barSalaryGrowth =
            {
                options: {
                    title: {
                        text: ''
                    },tooltip: { shared: true,  useHTML: true},
                    chart: {
                        type: "bar",
                        chart:{spacingBottom: -15,
                            spacingTop: 10,
                            spacingLeft: -20,
                            spacingRight: 10,}

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
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                        }
                    }


                }],
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderColor: '#222222'
                    }
                },
                tooltip:{enable:true},
                series: [{
                    name: 'Score',
                    data: [],
                    // tooltip: { enabled: true,shared: true,
                    //     pointFormatter:function(){
                    //         return '<tspan style="fill:#222222" x="8" dy="15">●</tspan><tspan dx="0"> Score: </tspan><b>'+$scope.GrowthFactor["avGSalaryPer"]+'</b>';
                    //     }
                    // },
                    enableMouseTracking:false,
                    groupPadding: 0,
                    showInLegend: false,
                    color:'#222222'

                }, {
                    name: 'Score',
                    data: [],
                    groupPadding: 0.2,
                    showInLegend: false,
                    color:'#25ad9f',
                    // color:'#66b6bf'


                }]
            };
        $scope.chartConfig_SalaryGrowthbarCom = {
            options: {
                title: {
                    text: ''
                },tooltip: { shared: true,  useHTML: true},
                chart: {
                    type: "bar",
                    // chart: {
                    //     spacingBottom: -15,
                    //     spacingTop: 10,
                    //     spacingLeft: -20,
                    //     spacingRight: 10
                    // }

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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderColor: '#222222'
                }
            },
            tooltip:{enable:true},
            series: [{
                name: 'Score',
                data: [],
                // tooltip: { enabled: true,shared: true,
                //     pointFormatter:function(){
                //         return '<tspan style="fill:#222222" x="8" dy="15">●</tspan><tspan dx="0"> Score: </tspan><b>'+$scope.value11+'</b>';
                //     }
                // },
                enableMouseTracking:false,
                groupPadding: 0,
                showInLegend: false,
                color: '#222222'
            }, {
                name: 'Score',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarInFn = {
            options: {
                title: {
                    text: ''
                },tooltip: { shared: true,  useHTML: true},
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderColor: '#222222'
                }
            },
            tooltip:{enable:true},
            series: [{
                name: 'Score',
                data: [],
                // tooltip: { enabled: true,shared: true,
                //     pointFormatter:function(){
                //         return '<tspan style="fill:#222222" x="8" dy="15">●</tspan><tspan dx="0"> Score: </tspan><b>'+$scope.value12+'</b>';
                //     }
                // },
                enableMouseTracking:false,
                groupPadding: 0,
                showInLegend: false,
                color: '#222222'
            }, {
                name: 'Score',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarInGrp = {
            options: {
                title: {
                    text: ''
                },tooltip: { shared: true,  useHTML: true},
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderColor: '#222222'
                }
            },
            tooltip:{enable:true},
            series: [{
                name: 'Score',
                data: [],
                // tooltip: { enabled: true,shared: true,
                //     pointFormatter:function(){
                //         return '<tspan style="fill:#222222" x="8" dy="15">●</tspan><tspan dx="0"> Score: </tspan><b>'+$scope.value13+'</b>';
                //     }
                // },
                enableMouseTracking:false,
                groupPadding: 0,
                showInLegend: false,
                color: '#222222'
            }, {
                name: 'Score',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarFnGrp = {
            options: {
                title: {
                    text: ''
                },tooltip: { shared: true,  useHTML: true},
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderColor: '#222222'
                }
            },
            tooltip:{enable:true},
            series: [{
                name: 'Score',
                data: [],
                // tooltip: { enabled: true,shared: true,
                //     pointFormatter:function(){
                //         return '<tspan style="fill:#222222" x="8" dy="15">●</tspan><tspan dx="0"> Score: </tspan><b>'+$scope.value14+'</b>';
                //     }
                // },
                enableMouseTracking:false,
                groupPadding: 0,
                showInLegend: false,
                color: '#222222'
            }, {
                name: 'Score',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarIn = {
            options: {
                title: {
                    text: ''
                },tooltip: { shared: true,  useHTML: true},
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderColor: '#222222'
                }
            },
            tooltip:{enable:true},
            series: [{
                name: 'Score',
                data: [],
                // tooltip: { enabled: true,
                //     pointFormatter:function(){
                //         return '<tspan style="fill:#222222" x="8" dy="15">●</tspan><tspan dx="0"> Score: </tspan><b>'+$scope.value15+'</b>';
                //     }
                // },
                enableMouseTracking:false,
                groupPadding: 0,
                showInLegend: false,
                color: '#222222'
            }, {
                name: 'Score',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };
        $scope.chartConfig_SalaryGrowthbarFn = {
            options: {
                title: {
                    text: ''
                },tooltip: { shared: true,  useHTML: true},
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
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'Black'
                    }
                }
            }],
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderColor: '#222222'
                }
            },
            tooltip:{enable:true},
            series: [{
                name: 'Score',
                data: [],
                // tooltip: { enabled: true,
                //     pointFormatter:function(){
                //         return '<tspan style="fill:#222222" x="8" dy="15">●</tspan><tspan dx="0"> Score: </tspan><b>'+$scope.value16+'</b>';
                //     }
                // },
                enableMouseTracking:false,
                groupPadding: 0,
                showInLegend: false,
                color: '#222222'
            }, {
                name: 'Score',
                data: [],
                groupPadding: 0.2,
                showInLegend: false,
                color: '#25ad9f',
                // color:'#66b6bf'
            }]
        };

        if(angular.isUndefined($localStorage["User"])){

            $localStorage["User"]='',
                $state.go("page.index")
        }
        else if($localStorage["User"].hasOwnProperty("Email"))
        {
            $scope.UserInfo=$localStorage["User"];

        }
        else if(angular.isDefined($localStorage["guestUser"]))
        {
            $scope.UserInfo=$localStorage["guestUser"];

        }
        $scope.getStyle=function (index)
        {
            if (index=='Easy' || index=='High')
            {

                return{"color":'#82c08c '};
            }
            else if(index=='Moderate'|| index=='Medium')
            {
                return{"color":'#E7A41D'};
            }
            else if(index=='Difficult'|| index=='Low')
            {
                return{"color":'#a92f25'};
            }
        }
        $scope.showDesignation=function(id)
        {
            var desData=[];
            if(id=="NEXT"){ desData=$scope.nextDesigs;}
            else if(id=="HIGHEST"){ desData=$scope.highestDesigs;}
            var tempInfo={id:id,filter:$scope.highestFilter,data:desData,dataUser:$scope.userDesigs};
            var modalInstance=$uibModal.open({
                templateUrl: "/assets/templates/desigsPopGrowth.html",
                controller: showDesigsCtrl,
                size: "lg",
                backdrop: 'static',
                resolve:{'tempInfo':function(){return tempInfo} }
            });
        }
        function showDesigsCtrl($scope,$uibModalInstance,tempInfo)
        {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.alldesigs=tempInfo["data"];
            $scope.headText="DESIGNATIONS AT "+tempInfo["id"]+" CAREER LEVEL IN YOUR ";
            $scope.alldesigsUser=tempInfo["dataUser"];
            $scope.headTextUser="DESIGNATIONS AT YOUR CAREER LEVEL IN YOUR ";
            $scope.filterText=tempInfo["filter"];
        }
        showDesigsCtrl.$inject = ["$scope", "$uibModalInstance",'tempInfo'];

        $scope.openIndustry=function () {
            var modalInstance=$uibModal.open({
                templateUrl: "/assets/templates/industryGroup.html",
                controller: industryGroupCtrl,
                size: "md",
                backdrop: 'static'
            });

        }
        function industryGroupCtrl($scope,$uibModalInstance) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.allindustries=vm.allIndGrp;
        }
        industryGroupCtrl.$inject=['$scope','$uibModalInstance'];
        $scope.openFunction=function () {
            var modalInstance=$uibModal.open({
                templateUrl: "/assets/templates/functionGroup.html",
                controller: functionGroupCtrl,
                size: "md",
                backdrop: 'static'
            });

        }
        function functionGroupCtrl($scope,$uibModalInstance) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.allindustries=vm.allFunGrp;
        }
        functionGroupCtrl.$inject=['$scope','$uibModalInstance'];

        getAllIntialData(reportValues);
        function getAllIntialData (reportValues)
        {
            var level=$scope.UserInfo["Level"];
            var industry=$scope.UserInfo["Industry"];
            var role=$scope.UserInfo["Role"];
            $scope.PP_Text = reportValues['PP_Text'];
            $scope.highestFilter = reportValues['highestFilter'];
            $scope.nextDesigs = reportValues['nextDesigs'][$scope.highestFilter];
            $scope.userDesigs = reportValues['userDesigs'][$scope.highestFilter];
            $scope.highestDesigs = reportValues['highestDesigs'][$scope.highestFilter];
            var company=$scope.UserInfo["Company"];
            var Salary=$scope.UserInfo["Salary"];
            if(Salary>100)
            {
                var Salary=$scope.UserInfo["Salary"]/100000;
                $scope.UserInfo["Salary"]=Salary;
            }
            var resolvData1 = reportValues;
            angular.forEach(resolvData1,function (v,k) {
                var innerData=k
                if (k=="indGrp")
                {
                    vm.allIndGrp=v;
                }
                if (k=="funGrp")
                {
                    vm.allFunGrp=v;
                }
                if (v!=null &&v.hasOwnProperty("promotion"))
                {

                    $scope.GrowthFactor=v["compensation"]["nxtGrowthfactor"];
                    $scope.chartConfig_CLGrowth.series[1]["data"].push($scope.GrowthFactor["nxtlevl"])
                    // $scope.chartConfig_CLGrowth.series[0]["data"].push(100-$scope.GrowthFactor["nxtlevl"]);
                    $scope.chartConfig_CLGrowth.series[0]["data"].push(100);
                    $scope.chartConfig_barSalaryGrowth.series[1]["data"].push($scope.GrowthFactor["avGSalaryPer"])
                    // $scope.chartConfig_barSalaryGrowth.series[0]["data"].push(100-$scope.GrowthFactor["avGSalaryPer"]);
                    $scope.chartConfig_barSalaryGrowth.series[0]["data"].push(100);
                    $scope.availableData=v["compensation"]['btnStatus'];
                    $scope.btnStatus=( v["compensation"]['btnStatus']);
                    $scope.xAxis=v["promotion"]["xAxis"];
                    $scope.yaxis=v["promotion"]["yAxis"];
                    $scope.yaxis1=v["promotion"]["yAxis1"];
                    $scope.yaxis2=v["promotion"]["yAxis2"];
                    $scope.title=v["promotion"]["title"];
                    $scope.xAxisLine=v["promotion"]["xAxisLine"]
                    $scope.yAxisLine=v["promotion"]["yAxisLine"]

                    $scope.chartConfig =
                        {
                            options:{
                                title: {
                                    text: '',
                                    style: {
                                        display: 'none'
                                    }
                                },
                                chart:{type:"bar"
                                },
                                tooltip: {

                                    formatter: function () {
                                        var s = '<b> Career Level ' + this.x + '</b>';

                                        $.each(this.points, function () {
                                            if(this.series.name=="Median Compensation")
                                            {
                                                s += '<br/>' + this.series.name + ': ' +
                                                    this.y +' INR Lakh';
                                            }
                                            else if(this.series.name=="% of People")
                                            {
                                                s += '<br/> % of Total People : ' +
                                                    this.y ;
                                            }


                                        });
                                        return s;
                                    },
                                    shared: true,
                                    crosshairs: true}

                            },

                            xAxis: {
                                title: {
                                    text: 'Career Level '
                                },
                                categories:$scope.xAxis
                            },
                            yAxis:[{title:{text:"% of People"}},{ title: {
                                text: ''
                            },

                                visible:false,
                                opposite: true}],
                            credits: {
                                enabled: false
                            },


                            series: [
                                {
                                    showInLegend:false,
                                    name: 'Barrier',
                                    data:$scope.yaxis1,
                                    type:'column',
                                    pointWidth: 2,
                                    pointPlacement:0.33,
                                    color:'#a92f25 ',
                                    //color:'rgb(255,0,0)',
                                },
                                {
                                    grouping: false,
                                    showInLegend:false,
                                    name: 'Frequency',
                                    data:$scope.yaxis,
                                    type:'column',
                                    pointWidth: 25,
                                    pointPadding: 2,
                                    color:'#25ad9f  ',
                                    //color:'rgb(85,142,213)',
                                    dataLabels: {
                                        enabled: true,
                                        //color: '#000000',
                                        //align: 'center',
                                        format: '{point.y}'+' %', // one decimal
                                        // y: 10, // 10 pixels down from the top
                                        style: {
                                            fontSize: '10px',
                                            fontFamily: 'Verdana, sans-serif',
                                            textOutline: 0

                                        }

                                    }


                                },
                                {
                                    showInLegend:false,
                                    type:'spline',
                                    name: 'Median Compensation',
                                    data:$scope.yaxis2,
                                    yAxis:1,
                                    color: 'transparent',
                                    borderColor: 'transparent',
                                    // make the line invisible
                                    marker: {
                                        enabled: true,
                                        fillColor: 'transparent',
                                        radius:-1,
                                        states: {
                                            hover: {
                                                enabled: false
                                            }}

                                    }


                                }

                            ]
                        };
                    if ($scope.yaxis.length<5)
                    {
                        $scope.chartConfig.series[1]["pointWidth"]=35;
                        $scope.chartConfig.series[1]["pointPadding"]=0;
                        $scope.chartConfig.series[0]["pointPlacement"]=0.2;
                    }
                    else if($scope.yaxis.length>=5&&$scope.yaxis.length<7)
                    {
                        $scope.chartConfig.series[1]["pointWidth"]=27;
                        $scope.chartConfig.series[1]["pointPadding"]=0;
                        $scope.chartConfig.series[0]["pointPlacement"]=0.30;
                    }
                    else if($scope.yaxis.length>=8&&$scope.yaxis.length<10)
                    {
                        $scope.chartConfig.series[1]["pointWidth"]=22;
                        //$scope.chartConfig.series[1]["pointPadding"]=0;
                        // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                    }
                    else if($scope.yaxis.length>=10&&$scope.yaxis.length<15)
                    {
                        $scope.chartConfig.series[1]["pointWidth"]=16;
                        //$scope.chartConfig.series[1]["pointPadding"]=0;
                        // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                    }
                    else if($scope.yaxis.length>=15&&$scope.yaxis.length<20)
                    {
                        $scope.chartConfig.series[1]["pointWidth"]=11;
                        //$scope.chartConfig.series[1]["pointPadding"]=0;
                        // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                    }
                    else if($scope.yaxis.length>=20&&$scope.yaxis.length<25)
                    {
                        $scope.chartConfig.series[1]["pointWidth"]=8;
                        //$scope.chartConfig.series[1]["pointPadding"]=0;
                        // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                    }
                    else if($scope.yaxis.length>=25&&$scope.yaxis.length<35)
                    {
                        $scope.chartConfig.series[1]["pointWidth"]=4;
                        //$scope.chartConfig.series[1]["pointPadding"]=0;
                        // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                    }
                    $scope.chartConfig_Line =
                        {
                            options:{
                                title: {
                                    text: '',
                                    style: {
                                        display: 'none'
                                    }
                                },
                                chart:{type:"line",

                                },
                                tooltip: {

                                    formatter: function () {
                                        var s = '<b> Career Level ' + this.x + '</b>';

                                        $.each(this.points, function () {
                                            if(this.series.name=="Median Compensation")
                                            {
                                                s += '<br/>' + this.series.name + ': ' +
                                                    this.y +' INR Lakh';
                                            }

                                        });
                                        return s;
                                    },
                                    shared: true,
                                    crosshairs: true}

                            },

                            xAxis: {
                                title: {
                                    text: 'Career Level'
                                },
                                categories:$scope.xAxisLine,
                                endOnTick:true
                            },
                            yAxis:[{title:{text:""}},{ title: {
                                text: 'Median Compensation (INR Lakhs)'
                            },
                                labels: {
                                    format: '{value} '
                                },
                                visible:true,
                            }],
                            credits: {
                                enabled: false
                            },


                            series: [


                                {
                                    showInLegend:false,
                                    type:'line',
                                    name: 'Median Compensation',
                                    data:$scope.yAxisLine,
                                    yAxis:1,
                                    //color: 'red',
                                    color: '#25ad9f ',
                                    borderColor: 'transparent',
                                    // make the line invisible
                                    marker: {
                                        enabled: true,
                                        fillColor: 'transparent',
                                        radius:-1,
                                        states: {
                                            hover: {
                                                enabled: false
                                            }}

                                    }


                                }

                            ]
                        };

                    if ($scope.btnStatus.length>0)
                    {
                        for(var x=0;x<$scope.btnStatus.length;x++)
                        {
                            if($scope.btnStatus[x]=="Company")
                            {
                                $scope.btnComany=true;
                                $scope.btnComanyPromotion=true;
                            }
                            else if($scope.btnStatus[x]=="Industry and Function")
                            {
                                $scope.btnFunInd=true;
                                $scope.btnFunIndPromotion=true;
                            }
                            else if($scope.btnStatus[x]=="Function")
                            { $scope.btnFun=true;
                                $scope.btnFunPromotion=true;

                            }
                            else if($scope.btnStatus[x]=="Industry"){$scope.btnInd=true;$scope.btnIndPromotion=true;}
                            else if($scope.btnStatus[x]=="Function Group"){$scope.btnFunGrp=true;$scope.btnFunGrpPromotion=true;}
                            else if($scope.btnStatus[x]=="Industry Group"){$scope.btnIndGrp=true;$scope.btnIndGrpPromotion=true;}
                        }
                    }


                }
                if (k == 'Your Company' && v['salaryGrowth'] > 0) {

                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarCom.series[1]["data"].push(v['salaryGrowth']);
                        // $scope.chartConfig_SalaryGrowthbarCom.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarCom.series[0]["data"].push(100);
                        $scope.chartConfig_SalaryGrowthbarCom.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                        $scope.value11=v['salaryGrowth'];
                    }
                }
                if (k == 'Your Industry and Function' && v['salaryGrowth'] > 0) {

                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarInFn.series[1]["data"].push(v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarInFn.series[0]["data"].push(100);
                        // $scope.chartConfig_SalaryGrowthbarInFn.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarInFn.xAxis.categories.push(k);
                        $scope.value12=v['salaryGrowth'];
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                    }
                }
                if (k == 'Your Industry Group' && v['salaryGrowth'] > 0) {

                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarInGrp.series[1]["data"].push(v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarInGrp.series[0]["data"].push(100);
                        // $scope.chartConfig_SalaryGrowthbarInGrp.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarInGrp.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                        $scope.value13=v['salaryGrowth'];
                    }
                }
                if (k == 'Your Function Group' && v['salaryGrowth'] > 0) {

                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarFnGrp.series[1]["data"].push(v['salaryGrowth']);
                        // $scope.chartConfig_SalaryGrowthbarFnGrp.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarFnGrp.series[0]["data"].push(100);
                        $scope.chartConfig_SalaryGrowthbarFnGrp.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                        $scope.value14= v['salaryGrowth'];
                    }
                }
                if (k == 'Your Industry' && v['salaryGrowth'] > 0) {

                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarIn.series[1]["data"].push(v['salaryGrowth']);
                        // $scope.chartConfig_SalaryGrowthbarIn.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarIn.series[0]["data"].push(100);
                        $scope.chartConfig_SalaryGrowthbarIn.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                        $scope.value15= v['salaryGrowth'];
                    }
                }
                if (k == 'Your Function' && v['salaryGrowth'] > 0) {

                    if (v.hasOwnProperty('salaryGrowth'))
                    {
                        $scope.chartConfig_SalaryGrowthbarFn.series[1]["data"].push(v['salaryGrowth']);
                        // $scope.chartConfig_SalaryGrowthbarFn.series[0]["data"].push(100 - v['salaryGrowth']);
                        $scope.chartConfig_SalaryGrowthbarFn.series[0]["data"].push(100);
                        $scope.chartConfig_SalaryGrowthbarFn.xAxis.categories.push(k);
                        // $scope.chartConfig_barCom.xAxis.categories.push('Salary');
                        $scope.value16= v['salaryGrowth'];
                    }
                }



            });
            if($scope.GrowthFactor["nxtlevlCL"]>50)
            {
                $scope.diffNxtLvl="Easy";
                $scope.diffNxtLvlTxt="More  than 50% of the people in your level manage to reach  the next career level";
            }else if($scope.GrowthFactor["nxtlevlCL"]<50&&$scope.GrowthFactor["nxtlevlCL"]>10)
            {
                $scope.diffNxtLvl="Moderate";
                $scope.diffNxtLvlTxt="About 10-50% of the people in your level manage to reach  the next career level";
            }else
            {
                $scope.diffNxtLvl="Difficult";
                $scope.diffNxtLvlTxt="Less than 10% of the people in your level manage to reach  the next career level";
            }
            if($scope.GrowthFactor["HiLevelDiff"]>50)
            {
                $scope.diffHiLvl="Easy";
                $scope.diffHiLvlTxt="More  than 50% of the people in your level manage to reach the highest career level";
            }else if($scope.GrowthFactor["HiLevelDiff"]<50&&$scope.GrowthFactor["HiLevelDiff"]>10)
            {
                $scope.diffHiLvl="Moderate";
                $scope.diffHiLvlTxt="About 10-50% of the people in your level manage to reach the highest career level";
            }else
            {
                $scope.diffHiLvl="Difficult";
                $scope.diffHiLvlTxt="Less than 10% of the people in your level manage to reach the highest career level";
            }
            if($scope.GrowthFactor["avGLevelPer"]>50)
            {
                $scope.diffPerLvl="Easy";
                $scope.diffPerLvlTxt="More  than 50% of the people manage to jump from one level to the next";
            }else if($scope.GrowthFactor["avGLevelPer"]<50&&$scope.GrowthFactor["avGLevelPer"]>10)
            {
                $scope.diffPerLvl="Moderate";
                $scope.diffPerLvlTxt="About 10-50% of the people manage to jump from one level to the next";
            }else
            {
                $scope.diffPerLvl="Difficult";
                $scope.diffPerLvlTxt="Less than 10% of the people manage to jump from one level to the next";
            }
            // high for >75%, medium for 25-75% and low for <25% (right box).
            if($scope.GrowthFactor["medianPer"]>75)
            {
                $scope.salGrthNxtLvl="High";
            }else if($scope.GrowthFactor["medianPer"]>25&&$scope.GrowthFactor["medianPer"]<75)
            {
                $scope.salGrthNxtLvl="Medium";
            }else
            {
                $scope.salGrthNxtLvl="Low";
            }
            if($scope.GrowthFactor["HiLevelGrowth"]>75)
            {
                $scope.salGrthHiLvl="High";
            }else if($scope.GrowthFactor["HiLevelGrowth"]>25&&$scope.GrowthFactor["HiLevelGrowth"]<75)
            {
                $scope.salGrthHiLvl="Medium";
            }else
            {
                $scope.salGrthHiLvl="Low";
            }

            if($scope.GrowthFactor["avGSalaryPer"]>50)
            {
                $scope.salGrthPerLvl="Easy";
            }else if($scope.GrowthFactor["avGSalaryPer"]<50&&$scope.GrowthFactor["avGSalaryPer"]>10)
            {
                $scope.salGrthPerLvl="Moderate";
            }else
            {
                $scope.salGrthPerLvl="Hard";
            }

        }
        $scope.logout=function(){$localStorage["User"]=""; $localStorage["guestUser"]="";
            vm.isLogin=false;
            vm.userinfo={email:"",password:""};
            toaster.pop("info","","User successfully logged out.");
        $state.go('page.index')
}
        $scope.getChartPromotion= function (mod)
        {

            if(mod=="Com"){
                $scope.head='COMPANY';
                $scope.comp='active';
                $scope.indfun='deactive';
                $scope.fun='deactive';
                $scope.ind='deactive';
                $scope.fungrp='deactive';
                $scope.indgrp='deactive';

            }else
            if(mod=="FunInd"){$scope.head='INDUSTRY & FUNCTION';
                $scope.comp='deactive';
                $scope.indfun='active';
                $scope.fun='deactive';
                $scope.ind='deactive';
                $scope.fungrp='deactive';
                $scope.indgrp='deactive';
            }else
            if(mod=="Fun"){$scope.head='FUNCTION';
                $scope.comp='deactive';
                $scope.indfun='deactive';
                $scope.fun='active';
                $scope.ind='deactive';
                $scope.fungrp='deactive';
                $scope.indgrp='deactive';}else
            if(mod=="Ind"){$scope.head='INDUSTRY';
                $scope.comp='deactive';
                $scope.indfun='deactive';
                $scope.fun='deactive';
                $scope.ind='active';
                $scope.fungrp='deactive';
                $scope.indgrp='deactive';}else
            if(mod=="FunGroup"){$scope.head='FUNCTION GROUP';
                $scope.comp='deactive';
                $scope.indfun='deactive';
                $scope.fun='deactive';
                $scope.ind='deactive';
                $scope.fungrp='active';
                $scope.indgrp='deactive';}else
            if(mod=="IndGroup"){$scope.head='INDUSTRY GROUP';
                $scope.comp='deactive';
                $scope.indfun='deactive';
                $scope.fun='deactive';
                $scope.ind='deactive';
                $scope.fungrp='deactive';
                $scope.indgrp='active';}






            var values=$scope.availableData[mod];

            var params = {"Role":$scope.UserInfo["Role"],"Company":$scope.UserInfo["Company"],"Industry":$scope.UserInfo["Industry"],mod:mod,"level":  $scope.UserInfo["Level"],Salary: $scope.UserInfo["Salary"]}

            $http({
                url: '/report/GrowthReport',
                method: 'post',
                data: params
            }).then(function success(response) {
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

                        $scope.chartConfig =
                            {
                                options:{
                                    title: {
                                        text: '',
                                        style: {
                                            display: 'none'
                                        }
                                    },
                                    chart:{type:"bar"
                                    },
                                    tooltip: {

                                        formatter: function () {
                                            var s = '<b> Career Level ' + this.x + '</b>';

                                            $.each(this.points, function () {
                                                if(this.series.name=="Median Compensation")
                                                {
                                                    s += '<br/>' + this.series.name + ': ' +
                                                        this.y +' INR Lakh';
                                                }
                                                else if(this.series.name=="Frequency")
                                                {
                                                    s += '<br/> % of Total People : ' +
                                                        this.y ;
                                                }


                                            });
                                            return s;
                                        },
                                        shared: true,
                                        crosshairs: true}

                                },

                                xAxis: {
                                    title: {
                                        text: 'Career Level '
                                    },
                                    categories:$scope.xAxis
                                },
                                yAxis:[{title:{text:"% of People"}},{ title: {
                                    text: ''
                                },

                                    visible:false,
                                    opposite: true}],
                                credits: {
                                    enabled: false
                                },


                                series: [
                                    {
                                        showInLegend:false,
                                        name: 'Barrier',
                                        data:$scope.yaxis1,
                                        type:'column',
                                        pointWidth: 2,
                                        pointPlacement:0.33,
                                        color:'#a92f25 ',
                                        //color:'rgb(255,0,0)',
                                    },
                                    {
                                        grouping: false,
                                        showInLegend:false,
                                        name: 'Frequency',
                                        data:$scope.yaxis,
                                        type:'column',
                                        pointWidth: 25,
                                        pointPadding: 2,
                                        color:'#25ad9f  ',
                                        //color:'rgb(85,142,213)',
                                        dataLabels: {
                                            enabled: true,
                                            //color: '#000000',
                                            //align: 'center',
                                            format: '{point.y}'+' %', // one decimal
                                            // y: 10, // 10 pixels down from the top
                                            style: {
                                                fontSize: '10px',
                                                fontFamily: 'Verdana, sans-serif',
                                                textOutline: 0

                                            }

                                        }


                                    },
                                    {
                                        showInLegend:false,
                                        type:'spline',
                                        name: 'Median Compensation',
                                        data:$scope.yaxis2,
                                        yAxis:1,
                                        color: 'transparent',
                                        borderColor: 'transparent',
                                        // make the line invisible
                                        marker: {
                                            enabled: true,
                                            fillColor: 'transparent',
                                            radius:-1,
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }}

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
                        else if($scope.yaxis.length>=10&&$scope.yaxis.length<15)
                        {
                            $scope.chartConfig.series[1]["pointWidth"]=16;
                            //$scope.chartConfig.series[1]["pointPadding"]=0;
                            // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                        }
                        else if($scope.yaxis.length>=15&&$scope.yaxis.length<20)
                        {
                            $scope.chartConfig.series[1]["pointWidth"]=11;
                            //$scope.chartConfig.series[1]["pointPadding"]=0;
                            // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                        }
                        else if($scope.yaxis.length>=20&&$scope.yaxis.length<25)
                        {
                            $scope.chartConfig.series[1]["pointWidth"]=8;
                            //$scope.chartConfig.series[1]["pointPadding"]=0;
                            // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                        }
                        else if($scope.yaxis.length>=25&&$scope.yaxis.length<35)
                        {
                            $scope.chartConfig.series[1]["pointWidth"]=4;
                            //$scope.chartConfig.series[1]["pointPadding"]=0;
                            // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                        }
                        $scope.chartConfig_Line =
                            {
                                options:{
                                    title: {
                                        text: '',
                                        style: {
                                            display: 'none'
                                        }
                                    },
                                    chart:{type:"line",

                                    },
                                    tooltip: {

                                        formatter: function () {
                                            var s = '<b> Career Level ' + this.x + '</b>';

                                            $.each(this.points, function () {
                                                if(this.series.name=="Median Compensation")
                                                {
                                                    s += '<br/>' + this.series.name + ': ' +
                                                        this.y +' INR Lakh';
                                                }

                                            });
                                            return s;
                                        },
                                        shared: true,
                                        crosshairs: true}

                                },

                                xAxis: {
                                    title: {
                                        text: 'Career Level'
                                    },
                                    categories:$scope.xAxisLine,
                                    endOnTick:true
                                },
                                yAxis:[{title:{text:""}},{ title: {
                                    text: 'Median Compensation (INR Lakhs)'
                                },
                                    labels: {
                                        format: '{value} '
                                    },
                                    visible:true,
                                }],
                                credits: {
                                    enabled: false
                                },


                                series: [


                                    {
                                        showInLegend:false,
                                        type:'line',
                                        name: 'Median Compensation',
                                        data:$scope.yAxisLine,
                                        yAxis:1,
                                        //color: 'red',
                                        color: '#25ad9f ',
                                        borderColor: 'transparent',
                                        // make the line invisible
                                        marker: {
                                            enabled: true,
                                            fillColor: 'transparent',
                                            radius:-1,
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }}

                                        }


                                    }

                                ]
                            };


                    }


                });
                if($scope.GrowthFactor["nxtlevlCL"]>50)
                {
                    $scope.diffNxtLvl="Easy";
                    $scope.diffNxtLvlTxt="More  than 50% of the people in your level manage to reach  the next career level";
                }else if($scope.GrowthFactor["nxtlevlCL"]<50&&$scope.GrowthFactor["nxtlevlCL"]>10)
                {
                    $scope.diffNxtLvl="Moderate";
                    $scope.diffNxtLvlTxt="About 10-50% of the people in your level manage to reach  the next career level";
                }else
                {
                    $scope.diffNxtLvl="Difficult";
                    $scope.diffNxtLvlTxt="Less than 10% of the people in your level manage to reach  the next career level";
                }
                if($scope.GrowthFactor["HiLevelDiff"]>50)
                {
                    $scope.diffHiLvl="Easy";
                    $scope.diffHiLvlTxt="More  than 50% of the people in your level manage to reach the highest career level";
                }else if($scope.GrowthFactor["HiLevelDiff"]<50&&$scope.GrowthFactor["HiLevelDiff"]>10)
                {
                    $scope.diffHiLvl="Moderate";
                    $scope.diffHiLvlTxt="About 10-50% of the people in your level manage to reach the highest career level";
                }else
                {
                    $scope.diffHiLvl="Difficult";
                    $scope.diffHiLvlTxt="Less than 10% of the people in your level manage to reach the highest career level";
                }
                if($scope.GrowthFactor["avGLevelPer"]>50)
                {
                    $scope.diffPerLvl="Easy";
                    $scope.diffPerLvlTxt="More  than 50% of the people manage to jump from one level to the next";
                }else if($scope.GrowthFactor["avGLevelPer"]<50&&$scope.GrowthFactor["avGLevelPer"]>10)
                {
                    $scope.diffPerLvl="Moderate";
                    $scope.diffPerLvlTxt="About 10-50% of the people manage to jump from one level to the next";
                }else
                {
                    $scope.diffPerLvl="Difficult";
                    $scope.diffPerLvlTxt="Less than 10% of the people manage to jump from one level to the next";
                }
                // high for >75%, medium for 25-75% and low for <25% (right box).
                if($scope.GrowthFactor["medianPer"]>75)
                {
                    $scope.salGrthNxtLvl="High";
                }else if($scope.GrowthFactor["medianPer"]>25&&$scope.GrowthFactor["medianPer"]<75)
                {
                    $scope.salGrthNxtLvl="Medium";
                }else
                {
                    $scope.salGrthNxtLvl="Low";
                }
                if($scope.GrowthFactor["HiLevelGrowth"]>75)
                {
                    $scope.salGrthHiLvl="High";
                }else if($scope.GrowthFactor["HiLevelGrowth"]>25&&$scope.GrowthFactor["HiLevelGrowth"]<75)
                {
                    $scope.salGrthHiLvl="Medium";
                }else
                {
                    $scope.salGrthHiLvl="Low";
                }

                if($scope.GrowthFactor["avGSalaryPer"]>50)
                {
                    $scope.salGrthPerLvl="Easy";
                }else if($scope.GrowthFactor["avGSalaryPer"]<50&&$scope.GrowthFactor["avGSalaryPer"]>10)
                {
                    $scope.salGrthPerLvl="Moderate";
                }else
                {
                    $scope.salGrthPerLvl="Hard";
                }

            });

        }
        vm.OpenLogin=function ()
        {
            var modalInstance = $uibModal.open({
                templateUrl: "/assets/templates/signUpPop.html",
                controller: initialUserLogin,
                size: "sm",
                backdrop: 'static',
                resolve: {
                    'userInfo': function ()
                    {
                        if(vm.isGuest)
                            return $localStorage["guestUser"];
                        else{return $localStorage["User"];}
                    }
                }
            });
        }
        function guestUserLogin(email,from)
        {
            if(from=='Mylestones')
            {
                if (vm.guestuserinfo.email==undefined||vm.guestuserinfo.email=="")
                {
                    toaster.pop('alert',"Please enter a valid Email-ID");
                    return;
                }

                if (vm.guestuserinfo.password==undefined||vm.guestuserinfo.password=="")
                {
                    toaster.pop('alert',"Please enter a valid Password");
                    return;
                }

                var modalInstance=$uibModal.open({
                    templateUrl: "/assets/templates/SignUpForm.html",
                    controller: userSignUpCtrl,
                    size: "lg",
                    backdrop: 'static',
                    resolve:{'userInfo':function(){return vm.guestuserinfo} }
                });

            }
            else if(from=='linkedIn')
            {
                vm.guestuserinfo["email"]=email;
                vm.guestuserinfo["password"]=email;
                var params={data:{Email:email,Password:email,checkUserExist:true}};
                $http({
                    url: '/users/sign_up_initial',
                    method: 'post',
                    data: params
                }).then(function success(response)
                {
                    var data = response["data"];
                    if(data["status"]==200)
                    {
                        if(data["msg"]=="Successfully Signed Up!")
                        {
                            vm.isLogin=true;
                            var modalInstance=$uibModal.open({
                                templateUrl: "/assets/templates/SignUpForm.html",
                                controller: userUpdateCtrl,
                                size: "lg",
                                backdrop: 'static',
                                resolve:{'userInfo':function(){return vm.guestuserinfo} }
                            });
                        }
                        else
                        {
                            toaster.pop('info','',data["msg"]);
                            vm.guestuserinfo["email"]="";
                            vm.guestuserinfo["password"]="";
                            // alert(data["msg"]);
                            return;
                        }

                    }
                    else
                    {
                        toaster.pop('error','',data["msg"]);
                        // alert(data["msg"]);
                        return;
                    }
                }, function error(response) {

                })

            }

        }
        vm.getLinkedInData=function () {
            alert("get data from lined in");
        }
        vm.linkedinLogin=function ()
        {
            var userAuthorize=false;
            var promise = $linkedIn.isAuthorized();
            promise.then(function(response) {

                userAuthorize=response;
                if(userAuthorize)
                {

                    var promise = $linkedIn.profile('me','firstName,lastName,emailAddress',{});
                    promise.then(function(response) {
                        guestUserLogin(response["values"][0]["emailAddress"],"linkedIn");
                    }, function(reason) {
                        alert('Failed: ' + reason);
                    });

                }
                else {
                    var promise = $linkedIn.authorize();
                    promise.then(function(response) {
                        var promise = $linkedIn.profile('me','firstName,lastName,emailAddress',{});
                        promise.then(function(response) {
                            guestUserLogin(response["values"][0]["emailAddress"],"linkedIn");
                        }, function(reason) {
                            alert('Failed: ' + reason);
                        });
                    }, function(reason) {
                        alert('Failed: ' + reason);
                    });


                }

            }, function(reason) {
                alert('Failed: ' + reason);
            });



            // var i=0;

        }
        function initialUserLogin($scope,$uibModalInstance,toaster,$http,userInfo) {

            $scope.showSignUp=true;
            $scope.changeForm=function()
            {
                if($scope.showSignUp)
                {
                    $scope.showSignUp=false;
                }else{$scope.showSignUp=true;}
            }
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.newuser={"Name":"guestUser",
                "Email":"",
                "Contact":"",
                "Password":"",
                "Score":0
                ,"Salary":userInfo.Salary
                ,"Role":userInfo.Role,
                "Education":userInfo.Education,
                "Company":userInfo.Company,
                "Experience":userInfo.Experience,
                "Designation":userInfo.Designation,
                "Industry":userInfo.Industry,
                "Institute":userInfo.Institute,
                "Level":userInfo.Level,
                "CompanyDetails":userInfo.CompanyDetails,
                "UserChoices":userInfo.UserChoices,
                "EffectiveLevel":userInfo.EffectiveLevel
            };
            $scope.sign_up_user=function()
            {
                var user=$scope.newuser;
                if (user.Email!= "" && user.Password!="")
                {
                    if (user.Email==undefined||user.Email=="")
                    {
                        toaster.pop('alert',"Please enter a valid Email-ID");
                        return;
                    }

                    if (user.Password==undefined||user.Password=="")
                    {
                        toaster.pop('alert',"Please enter a valid Password");
                        return;
                    }
                    user["isLogin"]=true;
                    var params={data:user}
                    $http({
                        url: '/users/sign_up_user',
                        method: 'post',
                        data: params
                    }).then(function success(response) {
                        var data = response["data"];
                        if(data["status"]==200)
                        {
                            if(data["msg"]=="Successfully Signed Up!")
                            {
                                toaster.pop('success','',data["msg"]);
                                // alert(data["msg"]);
                                $scope.username= $localStorage["User"]=data["username"];
                                vm.isGuest=false;
                                $localStorage["guestUser"]=""
                                $uibModalInstance.close();
                                $state.go($state.current, {}, {reload: true});
                            }
                            else
                            {
                                toaster.pop('info','',data["msg"]);
                                $uibModalInstance.close();
                                return;
                            }
                        }
                        else
                        {
                            toaster.pop('error','',data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
                    }, function error(response) {

                    })
                }

            }
            $scope.login=function()
            {
                var user=$scope.newuser;
                if (user.Email!= "" && user.Password!="")
                {
                    if (user.Email==undefined||user.Email=="")
                    {
                        toaster.pop('alert',"Please enter a valid Email-ID");
                        return;
                    }

                    if (user.Password==undefined||user.Password=="")
                    {
                        toaster.pop('alert',"Please enter a valid Password");
                        return;
                    }
                    vm.userinfo["email"]=user.Email;
                    vm.userinfo["password"]=user.Password;
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
                                    $localStorage["guestUser"]=""
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
                    }, function error(){});
                }

            }
            $scope.linkedinLogin=function () {
                $uibModalInstance.close();
                $localStorage["guestUser"]['Email']=$scope.newuser["Email"];
                $localStorage["guestUser"]['Password']=$scope.newuser["Password"];

                vm.linkedinLogin();

            }
        }
        initialUserLogin.$inject = ["$scope", "$uibModalInstance","toaster",'$http','userInfo'];
        $scope.openInfoPop=function (id) {
            var modalInstance=$uibModal.open({
                templateUrl: "/assets/templates/growthInfo.html",
                controller: infoPopCtrl,
                size: "sm",
                backdrop: 'static',
                resolve:{idTxt:function(){return id; }}
            });

        }
        function infoPopCtrl($scope,$uibModalInstance,idTxt) {
            $scope.close = function () {
                $uibModalInstance.close();
            }
            $scope.infoTxt=idTxt;
        }
        infoPopCtrl.$inject=['$scope','$uibModalInstance','idTxt'];




        if ($localStorage["User"]=="") {
            $scope.guesteffectivelevel=$localStorage["guestUser"]["EffectiveLevel"];
        }

        if(($localStorage["User"]["EffectiveLevel"]==3 || $scope.guesteffectivelevel==3)&&$scope.btnIndPromotion)
        {$scope.head='INDUSTRY';
            $scope.ind='active';
            $scope.getChartPromotion('Ind');}else
        if(($localStorage["User"]["EffectiveLevel"]==3 || $scope.guesteffectivelevel==3)&&$scope.btnFunPromotion)
        {$scope.head='FUNCTION';
            $scope.fun='active';
            $scope.getChartPromotion('Fun');}else
        if(($localStorage["User"]["EffectiveLevel"]==3 || $scope.guesteffectivelevel==3)&&$scope.btnIndGrpPromotion)
        {$scope.head='INDUSTRY GROUP';
            $scope.indgrp='active';
            $scope.getChartPromotion('IndGroup');
        }else
        if(($localStorage["User"]["EffectiveLevel"]==3 || $scope.guesteffectivelevel==3)&&$scope.btnFunGrpPromotion)
        {$scope.head='FUNCTION GROUP';
            $scope.fungrp='active';
            $scope.getChartPromotion('FunGroup');}
        else
        if(($localStorage["User"]["EffectiveLevel"]==4 || $scope.guesteffectivelevel==4)&&$scope.btnIndGrpPromotion)
        {$scope.head='INDUSTRY GROUP';
            $scope.indgrp='active';
            $scope.getChartPromotion('IndGroup');
        }else
        if(($localStorage["User"]["EffectiveLevel"]==4 || $scope.guesteffectivelevel==4)&&$scope.btnFunGrpPromotion)
        {$scope.head='FUNCTION GROUP';
            $scope.fungrp='active';
            $scope.getChartPromotion('FunGroup');}
        else
        if($scope.btnComanyPromotion)
        {$scope.head='COMPANY';
            $scope.comp='active';
        }else
        if($scope.btnFunIndPromotion)
        {$scope.head='INDUSTRY & FUNCTION';
            $scope.indfun='active';}else
        if($scope.btnFunPromotion)
        {$scope.head='FUNCTION';
            $scope.fun='active';}else
        if($scope.btnIndPromotion)
        {$scope.head='INDUSTRY';
            $scope.ind='active';}else
        if($scope.btnFunGrpPromotion)
        {$scope.head='FUNCTION GROUP';
            $scope.fungrp='active';}else
        if($scope.btnIndGrpPromotion)
        {$scope.head='INDUSTRY GROUP';
            $scope.indgrp='active';}

    }
})()