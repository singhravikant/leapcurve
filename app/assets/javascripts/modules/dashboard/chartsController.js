(function () {

    angular.module('naut').controller('chartController',chartController);
    chartController.$inject=['$scope',"$http","$state","data"]
    function chartController($scope,$http,$state,data) {
        var vm=this;
        var dataIndus=data["allIndustry"];
        var data1=data["allRole"];
        vm.selectIndustry="";
        vm.selectRole="";
        vm.chartConfigIndus="";
        vm.chartConfigRole="";
        vm.chartConfigRoleAll="";
      $scope.allIndustries=[];
      $scope.allRole=[];
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
        $scope.goForChart=function (id)
        {
            vm.chartConfigIndus="";
            var params={};
          if(id=="Industry")
          {
              vm.chartConfigRole="";
              vm.chartConfigRoleAll="";
              params={"industry":vm.selectIndustry["Name"],"Name":id};
              $http({
                  url: '/qustioner/getIndustryWiseAvgSalary',
                  method: 'post',
                  data: params
              }).then(function success(response)
              {
                  var data=response["data"];
                  if(!angular.isUndefined(data))
                  {

                      $scope.xAxis=data["xAxis"];
                      $scope.yaxis=data["yaxis"];
                      vm.chartConfigIndus = {

                          title:{text:vm.selectIndustry["Name"]},
                          tooltip: {
                              valueDecimals: 2,
                              valuePrefix: 'Rs.',

                              formatter: function () {
                                  return 'Avg. Salary ' + this.point.x;
                              },
                              useHTML:true
                          },
                          legend: {
                              enabled: false
                          },

                          xAxis: {
                              title: {
                                  text: 'Levels'
                              },
                              categories:$scope.xAxis
                          },
                          yAxis: {
                              title: {
                                  text: 'Salaries (INR in Lacs per Annum)'
                              },
//              categories:<%#=@allSalary%>,
//              plotOptions: {
//                  series: {
                              // pointStart: <%#=@allSalary.min()%>
//                  }
//              },
                          },

                          series: [
                              {
                                  name: 'Levels',
                                  data:$scope.yaxis,
                                  type:'column',
                                  pointWidth: 28,
                                  color:'#FF8465',

                              }

                          ]
                      };
                  }
                  else
                  {

                      $scope.xAxis=[];
                      $scope.yAxis=[];

                  }

              });

          }
          else if(id=="Role")
          {

              params={"industry":vm.selectRole["Name"],"Name":"Role"};
              $http({
                  url: '/qustioner/getIndustryWiseAvgSalary',
                  method: 'post',
                  data: params
              }).then(function success(response)
              {
                  var data=response["data"];
                  if(!angular.isUndefined(data))
                  {

                      $scope.xAxis=data["xAxis"];
                      $scope.yaxis=data["yaxis"];
                      $scope.xAxis1=data["xAxis1"];
                      $scope.yaxis1=data["yaxis1"];
                      vm.chartConfigRole = {

                          title:{text:vm.selectRole["Name"]},
                          tooltip: {
                              valueDecimals: 2,
                              valuePrefix: 'Rs.',

                              formatter: function () {
                                  return 'Avg. Score ' + this.point.x;
                              },
                              useHTML:true
                          },
                          legend: {
                              enabled: false
                          },

                          xAxis: {
                              title: {
                                  text: 'Industry'
                              },
                              categories:$scope.xAxis
                          },
                          yAxis: {
                              title: {
                                  text: 'Scores'
                              },
//              categories:<%#=@allSalary%>,
//              plotOptions: {
//                  series: {
                              // pointStart: <%#=@allSalary.min()%>
//                  }
//              },
                          },

                          series: [
                              {
                                  name: 'Industry',
                                  data:$scope.yaxis,
                                  type:'column',
                                  pointWidth: 28,
                                  color:'#FF8465',

                              }

                          ]
                      };
                      vm.chartConfigRoleAll = {

                          title:{text:vm.selectRole["Name"]},
                          tooltip: {
                              valueDecimals: 2,
                              valuePrefix: 'Rs.',

                              formatter: function () {
                                  return 'Avg. Score ' + this.point.x;
                              },
                              useHTML:true
                          },
                          legend: {
                              enabled: false
                          },

                          xAxis: {
                              title: {
                                  text: 'Function & Role'
                              },
                              categories:$scope.xAxis1
                          },
                          yAxis: {
                              title: {
                                  text: 'Score'
                              },
//              categories:<%#=@allSalary%>,
//              plotOptions: {
//                  series: {
                              // pointStart: <%#=@allSalary.min()%>
//                  }
//              },
                          },

                          series: [
                              {
                                  name: 'Function & Role',
                                  data:$scope.yaxis1,
                                  type:'column',
                                  pointWidth: 28,
                                  color:'#FF8465',

                              }

                          ]
                      };
                  }
                  else
                  {

                      $scope.xAxis=[];
                      $scope.yAxis=[];

                  }
              });

          }
          else if (id == "Both"){
              params = {"industry": vm.selectIndustry["Name"], "Name": id, "role": vm.selectRole["Name"]};
              $http({
                  url: '/qustioner/getIndustryWiseAvgSalary',
                  method: 'post',
                  data: params
              }).then(function success(response) {
                  var data = response["data"];
                  console.log(data);
                  if (!angular.isUndefined(data)) {
                      $scope.xAxis = data["xAxis"];
                      $scope.yaxis = data["yaxis"];
                      vm.chartConfigBoth = {
                          title: {text: vm.selectIndustry["Name"] + " & " + vm.selectRole["Name"]},
                          tooltip: {
                              valueDecimals: 2,
                              valuePrefix: 'Rs.',
                              formatter: function () {
                                  return 'Avg. Salary ' + this.point.x;
                              },
                              useHTML: true
                          },
                          legend: {
                              enabled: false
                          },
                          xAxis: {
                              title: {
                                  text: 'Levels'
                              },
                              categories: $scope.xAxis
                          },
                          yAxis: {
                              title: {
                                  text: 'Salaries (INR in Lacs per Annum)'
                              }
                          },
                          series: [
                              {
                                  name: 'Levels',
                                  data: $scope.yaxis,
                                  type: 'column',
                                  pointWidth: 28,
                                  color: '#FF8465',
                              }
                          ]
                      };
                  }
                  else {
                      $scope.xAxis = [];
                      $scope.yAxis = [];
                  }

              });
          }

     }
        $scope.checkForBoth = function () {
            if (vm.selectIndustry != "" || vm.selectRole != "") {
                $scope.goForChart("Both");
            }
        }
        $scope.changeTab = function (id) {
            $scope.tabname = id;
            vm.selectIndustry = "";
            vm.selectRole = "";
            vm.chartConfigIndus = "";
            vm.chartConfigRole = "";
            vm.chartConfigRoleAll = "";
            vm.chartConfigBoth = "";
        }


    }

})()