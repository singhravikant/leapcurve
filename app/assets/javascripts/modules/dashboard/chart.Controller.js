/**
 * Created by Jyoti Jain on 10/22/2017.
 */
(function()
{
    angular.module('naut').controller('ChartController',ChartController);
    ChartController.$inject=['$scope','$http','$localStorage','resolvData'];
    function ChartController($scope,$http,$localStorage,resolvData)
    {
        var vm=this;
        var salary=$localStorage['User']["Salary"]/100000
        var dataIndus=resolvData["allIndustry"];
        var data1=resolvData["allRole"];
        $scope.CompensatioXaxisTitle="Career Level"
        $scope.title=resolvData["title"]
        $scope.index=resolvData["index"];
        $scope.mylevel=resolvData["mylevel"];
        $scope.xAxis=resolvData["xAxis"];
        $scope.xAxis8=resolvData["xAxis8"];
        $scope.xAxis9=resolvData["xAxis9"];
        $scope.yaxis=resolvData["yaxis"];
        var salary=$localStorage["User"]["Salary"]/100000;
        $scope.UserInfo=$localStorage["User"];
        $scope.chartConfig_promotion="";
        $scope.chartConfig_growth="";

        if ($scope.xAxis8.length==1)
        {
            $scope.CompensatioXaxisTitle="Percentile"
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
                        categories:["33","50","90"]
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
                            name: 'Percentaile',
                            data: [$scope.xAxis8[0],resolvData["xAxis50"][0],$scope.xAxis9[0]],
                            type:'column',
                            pointWidth: 28,
                            color:'#f34235',


                        },
                        {
                            // showInLegend:false,
                            name: 'Your Salary Level',
                            type:'column',
                            tooltip: {
                                headerFormat: '<b>{series.name}</b><br>',
                                pointFormat: '{point.y} INR Lakhs'
                            },
                            data: [[1,salary]],
                            pointWidth: 28,
                            color:'#a94442'},

                    ]
                };
        }
        else
        {
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
                            data: [[$scope.index,salary]],
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
        }
        $scope.isbtn1selected=true;
        $scope.isbtn2selected=false;
        $scope.isbtn3selected=false;
        $scope.isbtn4selected=false;
        $scope.allIndustries=[];
        $scope.allRole=[];
        vm.selectIndustry={Name:"Select Industry"};
        vm.selectRole={Name:"Select Role"};
        vm.selectIndustries=[];
        if(angular.isUndefined($localStorage["User"])){
            $localStorage["User"]='',
                $state.go("app.index")
        }
        $scope.gotolink=function(id)
        {

            $state.go('app.dashboard/:id',{id:id});
        }
        for(var i=0;i<dataIndus.length-1;i++)
        {
            var allIndustry={};
            allIndustry["Name"]=dataIndus[i];
            $scope.allIndustries.push(allIndustry);
        }
        for(var i=0;i<data1.length-1;i++)
        {
            var allRole={};
            allRole["Name"]=data1[i];
            $scope.allRole.push(allRole);


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
                  getRoleChartMulti($localStorage["User"]["Industry"],$localStorage["User"]["Role"]);
                  vm.selectIndustry={Name:"Select Industry"};
                  vm.selectRole={Name:"Select Role"};
                  vm.selectIndustries=[];
                  break;
              case "button3":
                  $scope.isbtn3selected=true;
                  getPromationChart($localStorage["User"]["Industry"],$localStorage["User"]["Role"]);
                  vm.selectIndustry={Name:"Select Industry"};
                  vm.selectRole={Name:"Select Role"};
                  vm.selectIndustries=[];
                  break;
              case "button4":
                  $scope.isbtn4selected=true;
                  getGrowthChart($localStorage["User"]["Role"],"");
                  vm.selectIndustry={Name:"Select Industry"};
                  vm.selectRole={Name:"Select Role"};
                  vm.selectIndustries=[];
                  break;
              default :
                  return;

           }
      }
        $scope.getChartData=function()
        {
            if($scope.isbtn1selected)
            {
                getCompensationChart(vm.selectRole["Name"],vm.selectIndustry['Name']);
            }
            else  if($scope.isbtn2selected)
            {
                if(vm.selectIndustries.length>3)
                {
                    alert("Please select maximum 3 industries. ");
                    return;
                }
                else
                {
                    if(vm.selectRole["Name"]=="Select Role")
                    {
                        alert("Please select Role. ");
                        return;
                    }
                    else
                    {
                        var Industry=[]
                        for(var ind=0;ind<vm.selectIndustries.length;ind++)
                        {
                            Industry.push(vm.selectIndustries[ind]["Name"])
                        }
                        getRoleChartMulti(Industry,vm.selectRole["Name"]);
                    }

                }

            }
            else  if($scope.isbtn3selected)
            {
                if(vm.selectRole["Name"]=="Select Role")
                {
                    alert("Please select Role. ");
                    return;
                }
                else{
                    if(vm.selectIndustry["Name"]=="Select Industry")
                    {
                        alert("Please select Industry. ");
                        return;
                    }
                    else{
                        getPromationChart(vm.selectIndustry["Name"],vm.selectRole["Name"]);
                    }

                }

            }
            else
            if($scope.isbtn4selected)
            {

                if(vm.selectIndustries.length>0)
                {
                    var Industry=[]
                    for(var ind=0;ind<vm.selectIndustries.length;ind++)
                    {
                        Industry.push(vm.selectIndustries[ind]["Name"])
                    }
                }
                getGrowthChart(vm.selectRole["Name"],Industry);

            }
        }
        function getCompensationChart(role,industries)
        {

            var params={};
            if(role=="Select Role"&&industries!="Select Industry")
            {
                params["Industry"]=industries
                params["Level"]=$scope.UserInfo["Level"]
            }else if(industries=="Select Industry"&&role!="Select Role")
            {
                params["Role"]=role;

                params["Level"]=$scope.UserInfo["Level"]
            }
            else
            {
                params={Industry:industries,Role:role,Level:$scope.UserInfo["Level"]};
            }


            //var params={Role:role,Industry:industries.toString(),userindustry:$localStorage["User"]["Industry"]};
            $http(
                {
                    url: '/qustioner/report',
                    method: 'post',
                    data: params
                }
            ).then(function success(response)
                {
                    var resolvData=response['data'];
                    $scope.index=resolvData["index"];
                    $scope.mylevel=resolvData["mylevel"];
                    $scope.xAxis=resolvData["xAxis"];
                    $scope.xAxis8=resolvData["xAxis8"];
                    $scope.xAxis9=resolvData["xAxis9"];
                    $scope.yaxis=resolvData["yaxis"];
                    $scope.title=resolvData["title"]
                    var salary=$localStorage["User"]["Salary"]/100000;
                    $scope.UserInfo=$localStorage["User"];
                    $scope.chartConfig_promotion="";
                    if ($scope.xAxis8.length==1)
                    {
                        $scope.CompensatioXaxisTitle="Percentile"
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
                                    categories:["33","50","90"]
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
                                        name: 'Percentaile',
                                        data: [$scope.xAxis8[0],resolvData["xAxis50"][0],$scope.xAxis9[0]],
                                        type:'column',
                                        pointWidth: 28,
                                        color:'#f34235',


                                    },
                                    {
                                        // showInLegend:false,
                                        name: 'Your Salary Level',
                                        type:'column',
                                        tooltip: {
                                            headerFormat: '<b>{series.name}</b><br>',
                                            pointFormat: '{point.y} INR Lakhs'
                                        },
                                        data: [[1,salary]],
                                        pointWidth: 28,
                                        color:'#a94442'},

                                ]
                            };
                    }
                    else
                    {
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
                                        data: [[$scope.index,salary]],
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
                    }
                })

        }
        function getRoleChartMulti(industries,role)
        {
            $scope.title="";
            var name=[];
           if(vm.selectIndustries.length==0)
           {
               name.push({Name:$scope.UserInfo["Industry"]})
           }
            else
           {
               name=vm.selectIndustries
           }
            $scope.chartConfig="";
            var params={Industry:industries.toString(),Role:role};
            $http(
                {
                    url: '/qustioner/getRoleChart',
                    method: 'post',
                    data: params
                }
            ).then(function success(response)
                {
                    var data=response['data'];
                    $scope.title=data["title"];
                    $scope.xAxis=[];
                   for(var l=0;l<data["chartdata"].length;l++)
                   {
                       if(data["chartdata"][l]["xAxis"].length>$scope.xAxis.length)
                       {
                           $scope.xAxis=data["chartdata"][l]["xAxis"];
                       }

                   }
                     $scope.chartConfig =
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
                                 spacingRight: 10,

                         },
                             tooltip: {
                                 formatter: function () {
                                     return 'Median Salary: <b>' +  Math.round(this.y,2) + '</b> INR Lakh' ;
                                 }
                             }
                         },
                         xAxis: {
                             title: {
                                 text: 'Career Level '
                             },labels: {
                                 overflow: 'justify'
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
                                               ]
                     };
                    for (var y=0;y<data["chartdata"].length;y++)
                    {
                       if(data["chartdata"].length<=1)
                       {
                           if (y==0)
                           {
                               $scope.chartConfig.series.push ({ name:data["chartdata"][y]["industryName"],
                                   data:data["chartdata"][y]["yAxis"],
                                   type:'column',
                                   pointWidth: 25,
                                   color:'#f34235',
                                   // tooltip: {
                                   //     formatter: function () {
                                   //         return 'Median Salary: <b>' + this.y + '</b> INR Lakh' ;
                                   //     }
                                   // }
                               })
                           }
                           else  if (y==1)
                           {
                               $scope.chartConfig.series.push ({ name:data["chartdata"][y]["industryName"],
                                   data:data["chartdata"][y]["yAxis"],
                                   type:'column',
                                   pointWidth: 25,
                                   color:'#3c763d',
                                   // tooltip: {
                                   //     formatter: function () {
                                   //         return 'Median Salary: <b>' + this.y + '</b> INR Lakh' ;
                                   //     }
                                   // }
                               })
                           }

                       }
                        else{if (y==0)
                       {
                           $scope.chartConfig.series.push ({ name: data["chartdata"][y]["industryName"],
                               data:data["chartdata"][y]["yAxis"],
                               type:'column',
                               color:'#f34235',
                               // tooltip: {
                               //     formatter: function () {
                               //         return 'Median Salary: <b>' + this.y + '</b> INR Lakh' ;
                               //     }
                          // }
                           })
                       }
                       else  if (y==1)
                       {
                           $scope.chartConfig.series.push ({ name:data["chartdata"][y]["industryName"],
                               data:data["chartdata"][y]["yAxis"],
                               type:'column',
                               color:'#3c763d',
                               // tooltip: {
                               //     formatter: function () {
                               //         return 'Median Salary: <b>' + this.y + '</b> INR Lakh' ;
                               //     }
                               // }
                           })
                       }
                       else
                       {
                           $scope.chartConfig.series.push ({ name: data["chartdata"][y]["industryName"],
                               data:data["chartdata"][y]["yAxis"],
                               type:'column',
                               color:'#337ab7',
                               // tooltip: {
                               //     formatter: function () {
                               //         return 'Median Salary: <b>' + this.y + '</b> INR Lakh' ;
                               //     }
                               // }
                           })
                       }}
                    }
                    //vm.selectIndustry={Name:"Select Industry"};
                    //vm.selectRole={Name:"Select Role"};
                    //vm.selectIndustries=[];
                })
        }
        function getPromationChart(industry,role)
        {
            $scope.chartConfig="";
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
                    $scope.chartConfig =
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
                                            else if(this.series.name=="Frequency")
                                            {
                                                s += '<br/> % of Total People : ' +
                                                    this.y ;
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
                                name: 'Frequency',
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

                })

        }
        function getGrowthChart(role,industries)
        {
            $scope.chartConfig="";
            $scope.title="";
            var params={};
            if(role=="Select Role"&&vm.selectIndustries.length>0)
            {
                params["Industry"]=industries.toString();
            }else if(vm.selectIndustries.length==0&&role!="Select Role")
            {
                params["Role"]=role;
            }
            else
            {
                params={Industry:industries.toString(),Role:role};
            }


            //var params={Role:role,Industry:industries.toString(),userindustry:$localStorage["User"]["Industry"]};
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
                    $scope.chartConfig =
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
                                    return this.value.toString();

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
                    //vm.selectIndustry={Name:"Select Industry"};
                    //vm.selectRole={Name:"Select Role"};
                    //vm.selectIndustries=[];
                })

        }

    }
})()
