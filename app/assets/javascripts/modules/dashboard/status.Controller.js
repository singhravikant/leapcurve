/**
 * Created by Jyoti Jain on 10/25/2017.
 */
(function(){
    angular.module('naut').controller("statusController",statusController);
    statusController.$inject=['$scope','data','$localStorage','$state','$http'];
    function statusController($scope,data,$localStorage,$state,$http)
    {
        var vm=this;
        vm.fixedComp=0;
        vm.varComp=0;
        vm.totalComp=0;
        $scope.xAxis=[];
        $scope.title=data["title"];
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
        // $scope.xAxis = data['chartdata'][0]["xAxis"];;
        // $scope.chartConfig = {
        //     chart:{renderTo:"chartContainer"},
        //     title:{text:"Role Premium"},
        //     tooltip: {
        //         formatter: function () {
        //             return 'Max Level is' + this.point.x;
        //         },
        //         useHTML:true
        //     },
        //     xAxis: {
        //         title: {
        //             text: 'Career Level'
        //         },
        //         categories:$scope.xAxis
        //     },
        //     yAxis: {
        //         title: {
        //             text: 'Median Compansation INR in lakh'
        //         },
        //
        //     },
        //     plotOptions: {
        //         series: {
        //             pointPadding: 0,
        //             groupPadding: 0,
        //         }
        //     },
        //     series:[]
        //
        // };
        // for (var y=0;y<data["chartdata"].length;y++)
        // {
        //     $scope.chartConfig.series.push ({ name: 'Industry 1',
        //         data:data["chartdata"][y]["yAxis"],
        //         type:'column',
        //         pointWidth: 30,
        //         color:'rgb(85,142,213)',
        //     })
        // }


        $scope.UserInfo={};
        if(angular.isUndefined($localStorage["User"])){
            $localStorage["User"]='',
                $state.go("page.index")
        }
        else if($localStorage["User"].hasOwnProperty("Email"))
        {
            $scope.UserInfo=$localStorage["User"];



        }
        vm.generateReport=function()
        {
            if(vm.fixedComp==0||vm.varComp==0||vm.totalComp==0)
            {
                return;
            }
            $scope.UserInfo["Salary"]=parseFloat(vm.totalComp)*100000;
            var params={data:$scope.UserInfo}
            $http({
                url: '/users/updateUserInfo',
                method: 'post',
                data: params
            }).then(function success(response) {
                var data = response["data"];
                if(data["status"]==200)
                {


                    if(data["msg"]=="sucessfully updated")
                    {
                        //toaster.pop('success','',data["msg"]+".Please Login. ");
                        // alert(data["msg"]);
                        $scope.username= $localStorage["User"]=data["user"];
                        //$scope.isLogin=false;
                        $state.go('app.report');
                    }
                    else
                    {
                        toaster.pop('error','',data["msg"]);
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
})()
