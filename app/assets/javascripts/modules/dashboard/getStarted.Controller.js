/**
 * Created by Jyoti Jain on 10/25/2017.
 */
(function(){
    angular.module('naut').controller("getStartedController",getStartedController);
    getStartedController.$inject=['$scope','data','$localStorage','$state','$http'];
    function getStartedController($scope,data,$localStorage,$state,$http)
    {
        $scope.xAxis=data["xAxis"];
        $scope.yaxis=data["yAxis"];
        $scope.yaxis1=data["yAxis1"];
        $scope.yaxis2=data["yAxis2"];
        $scope.title=data["title"];
        $scope.otherInfo=data["otherInfo"];
        $scope.class="fa-chevron-right";
        $scope.isLogin=false;
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


        $scope.UserInfo={};
        if(angular.isUndefined($localStorage["User"])){
            $localStorage["User"]='',
                $state.go("page.index");
        }
        else if($localStorage["User"].hasOwnProperty("Email"))
        {
            $scope.UserInfo=$localStorage["User"];
            $scope.isLogin=true;

        }
        $scope.getStarted=function () {

            $state.go('page.questions');

        }
        $scope.logout=function()
        {
            $localStorage["guestUser"]  ="";
            $localStorage["User"]="";
            $state.go("page.index");
        }
        $scope.changeClass=function(id)
        {
            if($('#'+id).hasClass('fa-chevron-right'))
            {
                $('#'+id).removeClass('fa-chevron-right');
                $('#'+id).addClass('fa-chevron-down');
            }
            else{
                $('#'+id).removeClass('fa-chevron-down');
                $('#'+id).addClass('fa-chevron-right');
            }
            //$('#l1').addClass('fa-chevron-down');

            //if($scope.class=="fa-chevron-right")
            //{
            //    $scope.class="fa-chevron-down";
            //
            //}else{
            //    $scope.class="fa-chevron-right"
            //}

        }
    }
})()
