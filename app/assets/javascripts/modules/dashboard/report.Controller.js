/**
 * Created by Jyoti Jain on 10/22/2017.
 */
(function()
{
    angular.module('naut').controller('ReportController',ReportController);
    ReportController.$inject=['$scope','$http','$localStorage','resolvData'];
    function ReportController($scope,$http,$localStorage,resolvData)
    {
        var vm=this;
        $scope.index=resolvData["index"];
        $scope.mylevel=resolvData["mylevel"];
        $scope.xAxis=resolvData["xAxis"];
        $scope.xAxis8=resolvData["xAxis8"];
        $scope.xAxis9=resolvData["xAxis9"];
        $scope.yaxis=resolvData["yaxis"];
        $scope.title=resolvData["title"];
        var salary=$localStorage["User"]["Salary"]/100000;
        $scope.UserInfo=$localStorage["User"];
        $scope.chartConfig_promotion="";
        $scope.chartConfig_growth="";
        $scope.chartConfig_comp =
            {
                options:{legend :{
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 60,
                    y: 10,
                    floating: true,
                    borderWidth: 2,
                    borderColor:'#000000',
                    backgroundColor:  '#FFFFFF',
                    shadow: true
                },
                    title: {
                        text: '',
                        style: {
                            display: 'none'
                        }
                    },
                    chart:{spacingBottom: -15,
                        spacingTop: 10,
                        spacingLeft: -20,
                        spacingRight: 10,}
                },

                xAxis: {
                    title: {
                        text: 'Career Level '
                    },
                    categories:$scope.xAxis
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
                        showInLegend:false,
                        name: 'Your Level',
                        data: $scope.yaxis,
                        type:'column',
                        pointWidth: 28,
                        color:'#ccc',


                    },
                    {
                        // showInLegend:false,
                        name: 'Your Salary Level',
                        type:'scatter',
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.y} INR Lakhs'
                        },
                        data: [[2,salary]],
                        pointWidth: 28,
                        color:'#a94442'},
                    {
                        name: '33th Percentile Salary',
                        data: $scope.xAxis8,
                        color:'#337ab7',
                        allowPointSelect: true,

                    },
                    {
                        name: '50th Percentile Salary',
                        data: resolvData["xAxis50"],
                        color:'#3c763d'



                    },
                    {
                        name: '90th Percentile Salary',
                        data: $scope.xAxis9,
                        color:'#f34235',

                    }
                ]
            };

        $scope.isbtn1selected=true;
        $scope.isbtn2selected=false;
        $scope.isbtn3selected=false;
        $scope.isbtn4selected=false;

        if(angular.isUndefined($localStorage["User"])){
            $localStorage["User"]='',
                $state.go("app.index")
        }

        //getCompansationChart();
        $scope.enableButton=function(btnName)
        {
            $scope.isbtn1selected=false;
            $scope.isbtn2selected=false;
            $scope.isbtn3selected=false;
            $scope.isbtn4selected=false;
            switch(btnName){
                case "button1":
                    $scope.isbtn1selected=true;
                    // getCompansationChart();
                    break;
                case "button2":
                    $scope.isbtn2selected=true;
                    if($scope.chartConfig_promotion=="")
                    {
                        getPromationChart($localStorage["User"]["Industry"],$localStorage["User"]["Role"]);
                    }
                    //getRoleChartMulti($localStorage["User"]["Industry"],$localStorage["User"]["Role"]);
                    break;
                case "button3":
                    $scope.isbtn3selected=true;
                    if($scope.chartConfig_growth=="")
                    {
                        getGrowthChart($localStorage["User"]["Role"],"");
                    }
                    break;
                case "button4":
                    $scope.isbtn4selected=true;


                    break;
                default :
                    return;

            }
        }


        function getPromationChart(industry,role)
        {
           // $scope.chartConfig="";
            $scope.title="";
            var params={Industry:industry,Role:role};
            $http(
                {
                    url: '/qustioner/getPromationChart',
                    method: 'post',
                    data: params
                }
            ).then(function success(response)
            {
                var data=response['data'];

                $scope.xAxis=data["xAxis"];
                $scope.yaxis=data["yAxis"];
                $scope.yaxis1=data["yAxis1"];
                $scope.yaxis2=data["yAxis2"];
                $scope.title=data["title"];
                $scope.chartConfig_promotion =
                    {
                        options:{
                            title: {
                                text: '',
                                style: {
                                    display: 'none'
                                }
                            },
                            chart:{type:"bar",
                                spacingTop: 10,
                                spacingLeft: -20,
                                spacingRight: 10},
                            tooltip: {

                                formatter: function () {
                                    var s = '<b> Career Level ' + this.x + '</b>';

                                    $.each(this.points, function () {
                                        if(this.series.name=="Median Compensation")
                                        {
                                            s += '<br/>' + this.series.name + ': ' +
                                                this.y +' INR Lakh';
                                        }
                                        else
                                        {
                                            s += '<br/>' + this.series.name + ': ' +
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
                        yAxis:[{title:{text:""}},{ title: {
                            text: 'Rainfall'
                        },
                            labels: {
                                format: '{value} mm'
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
                                color:'rgb(255,0,0)',
                            },
                            {
                                grouping: false,
                                showInLegend:false,
                                name: 'Frequency ',
                                data:$scope.yaxis,
                                type:'column',
                                pointWidth: 25,
                                pointPadding: 2,
                                color:'rgb(85,142,213)',
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
                    $scope.chartConfig_promotion.series[1]["pointWidth"]=35;
                    $scope.chartConfig_promotion.series[1]["pointPadding"]=0;
                    $scope.chartConfig_promotion.series[0]["pointPlacement"]=0.2;
                }
                else if($scope.yaxis.length>=5&&$scope.yaxis.length<7)
                {
                    $scope.chartConfig_promotion.series[1]["pointWidth"]=27;
                    $scope.chartConfig_promotion.series[1]["pointPadding"]=0;
                    $scope.chartConfig_promotion.series[0]["pointPlacement"]=0.30;
                }
                else if($scope.yaxis.length>=8&&$scope.yaxis.length<10)
                {
                    $scope.chartConfig_promotion.series[1]["pointWidth"]=22;
                   // $scope.chartConfig_promotion.series[1]["pointPadding"]=-2;
                    // $scope.chartConfig.series[0]["pointPlacement"]=0.1;
                }

            })

        }

        function getGrowthChart(role,industries)
        {
            $scope.chartConfig="";
            $scope.title="";
            var params={Role:role,Industry:industries.toString(),userIndustry:$localStorage["User"]["Industry"]};
            $http(
                {
                    url: '/qustioner/getGrowthChart',
                    method: 'post',
                    data: params
                }
            ).then(function success(response)
            {
                var data=response['data'];
                $scope.xAxis=data["xAxis"];
                $scope.yaxis=data["yAxis"];
                $scope.yaxis1=data["yAxis1"];
                $scope.title=data["title"];
                $scope.chartConfig_growth =
                    {
                        options:{
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
                            categories:$scope.xAxis,
                            labels: {
                                formatter: function() {
                                    return this.value.toString()

                                }}},
                        yAxis:[{title:{text:""}},{title:{text:"Median Compensation in (INR Lakhs)"},opposite:true}],

                        credits: {
                            enabled: false
                        },
                        series: [

                            {
                                //showInLegend:false,
                                name: 'Career Level',
                                data:$scope.yaxis,
                                type:'column',
                                pointWidth: 28,
                                pointPadding: 2,
                                color:'rgb(85,142,213)',
                                dataLabels: {
                                    enabled: true,
                                    color: '#000000',
                                    //align: 'center',
                                    format: '{point.y}', // one decimal
                                    y: -20, // 10 pixels down from the top
                                    style: {
                                        fontSize: '10px',
                                        fontFamily: 'Verdana, sans-serif',
                                        textOutline: 0

                                    }

                                }


                            },
                            {
                                //showInLegend:false,
                                type:'spline',
                                name: 'Median Compensation',
                                data:$scope.yaxis1,
                                yAxis: 1,
                                pointWidth: 28,
                                pointPadding: 2,
                                color:'rgb(255,0,0)',
                                dataLabels: {
                                    enabled: false,
                                    color: '#000000',
                                    //align: 'center',
                                    format: '{point.y:,.2f}', // one decimal
                                    y: -20, // 10 pixels down from the top
                                    style: {
                                        fontSize: '10px',
                                        fontFamily: 'Verdana, sans-serif',
                                        textOutline: 0

                                    }

                                }


                            }

                        ]
                    };

            })

        }

    }
})()
