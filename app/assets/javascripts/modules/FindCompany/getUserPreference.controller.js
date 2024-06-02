(function()
{
    angular.module('naut').controller('getUserPreferenceController',getUserPreferenceController);
    getUserPreferenceController.$inject=['$scope','$http','$localStorage','$state'];
    function getUserPreferenceController($scope,$http,$localStorage,$state)
    {
       $scope.ISI=0; //Immediate Salary improvement
       $scope.STCL=0;//Short term Career Level growth
       $scope.STSG=0;//Short term Salary growth
       $scope.AVGSG=0;//Average term Salary growth
       $scope.AVGCLG=0;//Average term CL growth
        $scope.LTCL=0;//Long term Career Level growth
        $scope.LTSG=0;//Long term Salary growth
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
                        {  if ($localStorage["User"] != "") {
                            data["user"]["changefunction"]= $localStorage["User"]["changefunction"];
                            data["user"]["changeindustry"] = $localStorage["User"]["changeindustry"];
                        }
                            $scope.username= $localStorage["User"]=data["user"];
                            $state.go('app.comparison');
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
                $state.go('app.comparison');

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

                if($localStorage["User"]["Preference"]!=null&&$localStorage["User"].hasOwnProperty("Preference")&&$localStorage["User"]["Preference"].length>0)
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
})();