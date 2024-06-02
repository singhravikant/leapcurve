
angular.module("naut").controller("quizController",quizController);
function quizController($scope,$http,$localStorage,$uibModal,$localStorage,$state)
{
    var vm=this;
    $scope.allQues=[];
    $scope.userChoice={};
    $scope.que={};
    $scope.queOptions=[];
    $scope.alldone=false;
    $scope.selectedOption=0;
    $scope.progressBar=0
    $scope.isQuesProcessed=0
    getallQuestion("complexity");
    $scope.isLogin=true;
    // dreawEdge();
    if(angular.isUndefined($localStorage["User"])||$localStorage["User"]=="")
    {
        $localStorage["User"]="";
        $scope.isLogin=true;
    }else
    {
        $scope.isLogin=false;
    }
        function dreawEdge(){
            var ctx = document.querySelector("canvas").getContext("2d"),
                pst = 0, dlt = 2;

            ctx.fillStyle = "#ff8466";
            // ctx.font = "bold 30px Arial";

            // ctx.fillText($scope.progressBar, (ctx.width / 2) - 17, (ctx.height / 2) + 8);
            ctx.strokeStyle = "#ff8466";
            ctx.lineWidth = 6;
            function drawPie(ctx, x, y, radius, percent) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.arc(x, y, radius, 0, 2 * Math.PI * percent /100);
                ctx.fill();
                // ctx.fillStyle = "#ffffff";
                ctx.font = "bold 30px Arial";
                ctx.fillText(percent+'%', (ctx.canvas.width / 2)+42, (ctx.canvas.height / 2) +5);
                ctx.textAlign = "end";
                // ctx.fillText('He!', 150, 100);
                // ctx.fillText(percent+'%',10,y);
                // ctx.stroke();
                // }
                // function drawWedge(ctx, x, y, radius, percent) {
                ctx.translate(x, y);        // translate to rotating pivot
                ctx.rotate(Math.PI * 0.5);  // rotate, here 90° deg
                ctx.translate(-x, -y);      // translate back

                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.arc(x, y, radius, 0, 2 * Math.PI * 100 /100);
                ctx.stroke();

                ctx.setTransform(1,0,0,1,0,0);
            }
            ctx.clearRect(0,0,300,150); drawPie(ctx, 70, 70, 60, $scope.progressBar);
            }
    $scope.$watch(function(){return $localStorage["User"]},function(oldvalue,newvalue) {
        if (!$localStorage["User"]=='') {
            $scope.isLogin=false;
            $scope.username=$localStorage["User"]
        }
        else{
            $scope.isLogin=true;
            $localStorage["User"]=''
        }
    })

    $scope.openForm = function ()
    {
        var modalInstance=$uibModal.open({
            templateUrl: "/assets/templates/SignUpForm.html",
            controller: userSignUpCtrl,
            size: "md",
            backdrop: true
        });
    };
    function userSignUpCtrl($scope,$uibModalInstance,toaster,$http)
    {
        $scope.isLogin=true;
        $scope.close = function () {
            $uibModalInstance.close();
        }
        $scope.changeview=function () {
            if($scope.isLogin)
            {
                $scope.isLogin=false;
            }
            else
            {
                $scope.isLogin=true;
            }

        }
        $scope.userInfo={
          "Name":"",
            "Email":"",
            "Contact":"",
            "Password":"",
            "Score":""
            ,"Salary":""
            ,"DOB":"",
            "Education":"Select Highest Education",
            "YOG":"",
            "Experience":"Years Of Experience",
            "Designation":"Select Designation",
            "Industry":"Select Industry",
            "Institite":""};

        $scope.sign_up_user=function()
        {
            var user=$scope.userInfo;
            if(!$scope.isLogin)
            {
                if (user.Name==undefined||user.Name=="")
                {
                    toaster.pop('alert',"Please enter a valid name");
                    return;
                }
                if (user.Contact==undefined||user.Contact=="")
                {
                    toaster.pop('alert',"Please enter a valid Contact No");
                    return;
                }
                // if (user.DOB==undefined||user.DOB=="")
                // {
                //     toaster.pop('alert',"Please enter a valid name");
                //     return;
                // }
                if (user.Salary==undefined||user.Salary=="")
                {
                    toaster.pop('alert',"Please enter a valid Salary");
                    return;
                }
                if (user.Institite==undefined||user.Institite=="")
                {
                    toaster.pop('alert',"Please enter Institute/University of highest education");
                    return;
                }
                if (user.Education=="Select Highest Education")
                {
                    toaster.pop('alert',"Please Select your highest Qualification");
                    return;
                }
                if (user.YOG==undefined||user.YOG=="")
                {
                    toaster.pop('alert',"Please enter year of Graduation");
                    return;
                }
                if (user.Experience=="Years Of Experience")
                {
                    toaster.pop('alert',"Please Select your total working experience");
                    return;
                }
                if (user.Designation=="Select Designation")
                {
                    toaster.pop('alert',"Select your Designation");
                    return;
                }
                if (user.Industry=="Select Industry")
                {
                    toaster.pop('alert',"Select Industry");
                    return;
                }
                user["isLogin"]=false;
            }
            else
            {
                user["isLogin"]=true;
            }

            if (user.Email==undefined||user.Email=="")
            {
                toaster.pop('alert',"Please enter a valid Email-ID");
                // alert("Please enter a valid email");
                return;
            }

            if (user.Password==undefined||user.Password=="")
            {
                toaster.pop('alert',"Please enter a valid Password");
                // alert("Please enter a password");
                return;
            }

            var params={data:user}
            $http({
                url: '/users/sign_up_user',
                method: 'post',
                data: params
            }).then(function success(response) {
                var data = response["data"];
                if(data["status"]==200)
                {
                    if($scope.isLogin)
                    {
                        if(data["msg"]=="Sucessfully Login")
                        {
                            toaster.pop('error','',data["msg"]);
                            // alert(data["msg"]);
                            $scope.username= $localStorage["User"]=data['username'];
                            $scope.isLogin=false;
                            $uibModalInstance.close();
                        }
                        else
                        {
                            toaster.pop('error','',data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
                    }else
                    {
                        if(data["msg"]=="sucessfully signup")
                        {
                            toaster.pop('error','',data["msg"]);
                            // alert(data["msg"]);
                            $scope.username= $localStorage["User"]=user.Name;
                            $scope.isLogin=false;
                            $uibModalInstance.close();
                        }
                        else
                        {
                            toaster.pop('error','',data["msg"]);
                            // alert(data["msg"]);
                            return;
                        }
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
    userSignUpCtrl.$inject = ["$scope", "$uibModalInstance","toaster",'$http'];

    function getallQuestion(factor)
    {

        if(factor=="")
        {
            // alert("factor can't be null");
            return;
        }
        var params={"factor":factor}
        $http({
            url: '/qustioner/getQuestionFactorWise',
            method: 'post',
            data: params
        }).then(function success(response)
        {
            var Data=response["data"];
            $scope.allQues=Data["allQues"];
            $scope.ProgressIncVal=100/$scope.allQues.length;
            $scope.que["queTxt"]=$scope.allQues[0]["queTxt"];
            $scope.que["queHint"]=$scope.allQues[0]["queHint"];
            $scope.que["queNo"]=$scope.allQues[0]["queNo"];
            $scope.que["factor"]=$scope.allQues[0]["factor"];
            $scope.que["index"]=0;
            $scope.que["slelectIndex"]=-1;
            $scope.que["view"]=$scope.allQues[0]["view"];


            $scope.que["optionWeigth"]=$scope.allQues[0]["optionWeigth"];
            if($scope.allQues[0]["view"]=="normal")
            {
                $scope.queOptions=$scope.allQues[0]["queOption"];
            }
            else if($scope.allQues[0]["view"]=="boxH")
            {

                for(var i=0;i<$scope.allQues[0]["queOption"].length;i++)
                {
                    $scope.queOptions.push($scope.allQues[0]["queOption"][i].split('-'));
                }
            }
            else if($scope.allQues[0]["view"]=="boxV")
            {

                for(var i=0;i<$scope.allQues[0]["queOption"].length;i++)
                {
                    $scope.queOptions.push($scope.allQues[0]["queOption"][i].split('-'));
                }
            }
            else if($scope.allQues[0]["view"]=="row")
            {

                for(var i=0;i<$scope.allQues[0]["queOption"].length;i++)
                {
                    $scope.queOptions.push($scope.allQues[0]["queOption"][i].split('|'));
                }
            }

            dreawEdge();
        })
    }

    $scope.nextQues=function (queno)
    {
        if ($scope.userChoice.hasOwnProperty($scope.allQues[queno]["queId"]))
        {

            if(queno+1>$scope.isQuesProcessed) {
                $scope.progressBar += $scope.ProgressIncVal
                $scope.isQuesProcessed=queno+1
                dreawEdge();
            }
            if ($scope.allQues.length>queno+1)
            {
                $scope.que={};
                $scope.queOptions=[];
                $scope.que["queTxt"]=$scope.allQues[queno+1]["queTxt"];
                $scope.que["queHint"]=$scope.allQues[queno+1]["queHint"];
                $scope.que["queNo"]=$scope.allQues[queno+1]["queNo"];
                $scope.que["factor"]=$scope.allQues[queno+1]["factor"];
                $scope.que["index"]=queno+1;
                $scope.que["view"]=$scope.allQues[queno+1]["view"];;
                if($scope.allQues[queno+1].hasOwnProperty("slelectIndex"))
                {
                    $scope.que["slelectIndex"]=$scope.allQues[queno+1]["slelectIndex"];
                }
                else
                {
                    $scope.que["slelectIndex"]=-1;
                }
                $scope.que["slelectIndex"]=$scope.allQues[queno+1]["slelectIndex"];
                $scope.que["optionWeigth"]=$scope.allQues[queno+1]["optionWeigth"];
                if($scope.allQues[queno+1]["view"]=="normal")
                {
                    $scope.queOptions=$scope.allQues[queno+1]["queOption"];
                }
                else if($scope.allQues[queno+1]["view"]=="boxH")
                {

                    for(var i=0;i<$scope.allQues[queno+1]["queOption"].length;i++)
                    {
                        $scope.queOptions.push($scope.allQues[queno+1]["queOption"][i].split('-'));
                    }
                }
                else if($scope.allQues[queno+1]["view"]=="boxV")
                {

                    for(var i=0;i<$scope.allQues[queno+1]["queOption"].length;i++)
                    {
                        $scope.queOptions.push($scope.allQues[queno+1]["queOption"][i].split('-'));
                    }
                }
                else if($scope.allQues[queno+1]["view"]=="row")
                {

                    for(var i=0;i<$scope.allQues[queno+1]["queOption"].length;i++)
                    {
                        $scope.queOptions.push($scope.allQues[queno+1]["queOption"][i].split('|'));
                    }
                }

            }
            else if($scope.allQues.length==queno+1)
            {
                $scope.alldone=true;
                $scope.que={};
                $scope.queOptions=[];
            }
        }

        else
        {
            // alert("Please choose one option.");
        }
      $("html, body").animate({ scrollTop: 0 }, "slow");


    }
    $scope.prevQues= function (queno)
    {
        if ($scope.allQues.length>0)
        {
            $scope.que={};
            $scope.queOptions=[];
            $scope.que["queTxt"]=$scope.allQues[queno-1]["queTxt"];
            $scope.que["queHint"]=$scope.allQues[queno-1]["queHint"];
            $scope.que["queNo"]=$scope.allQues[queno-1]["queNo"];
            $scope.que["factor"]=$scope.allQues[queno-1]["factor"];
            $scope.que["index"]=queno-1;
            $scope.que["slelectIndex"]=$scope.allQues[queno-1]["slelectIndex"];
            $scope.que["view"]=$scope.allQues[queno-1]["view"];;
            $scope.que["optionWeigth"]=$scope.allQues[queno-1]["optionWeigth"];
            if($scope.allQues[queno-1]["view"]=="normal")
            {
                $scope.queOptions=$scope.allQues[queno-1]["queOption"];
            }
            else if($scope.allQues[queno-1]["view"]=="boxH")
            {

                for(var i=0;i<$scope.allQues[queno-1]["queOption"].length;i++)
                {
                    $scope.queOptions.push($scope.allQues[queno-1]["queOption"][i].split('-'));
                }
            }
            else if($scope.allQues[queno-1]["view"]=="boxV")
            {

                for(var i=0;i<$scope.allQues[queno-1]["queOption"].length;i++)
                {
                    $scope.queOptions.push($scope.allQues[queno-1]["queOption"][i].split('-'));
                }
            }
            else if($scope.allQues[queno-1]["view"]=="row")
            {

                for(var i=0;i<$scope.allQues[queno-1]["queOption"].length;i++)
                {
                    $scope.queOptions.push($scope.allQues[queno-1]["queOption"][i].split('|'));
                }
            }


        }
        // var selectedOpt=$scope.userChoice[$scope.que["factor"]+$scope.que["queNo"].toString()];
        // for(var opt=0;opt<$scope.que["optionWeigth"].length;opt++)
        // {
        //     if(selectedOpt==$scope.que["optionWeigth"][opt])
        //     {
        //         $('.box,.impact-box').removeClass('active');
        //         if($scope.que["factor"]=="impact")
        //         {
        //             $('#impt-'+index+opt).addClass("active")
        //         }
        //         if($scope.que["factor"]=="responsibility")
        //         {
        //             $('#resp-'+index+opt).addClass("active")
        //         }
        //         if($scope.que["factor"]=="effectiveness")
        //         {
        //             $('#eff-'+index+opt).addClass("active")
        //         }
        //         // $('#label-'+  $scope.PrevSelection).removeClass('activeLabel')
        //         if($scope.que["factor"]=="complexity" && $scope.que["view"] !='boxH'){
        //             $('#label-'+opt).addClass('activeLabel')
        //         }
        //         else{
        //             $('#label-'+opt).addClass('active')
        //
        //         }
        //     }
        // }

       $("html, body").animate({ scrollTop: 0 }, "slow");


    }
    $scope.getChoice= function (index,Optindex,type)
    {
//            alert($scope.que["optionWeigth"][Optindex]);
        $scope.userChoice[$scope.allQues[index]["queId"]]=$scope.que["optionWeigth"][Optindex];
        $scope.que["slelectIndex"]=Optindex;
        $scope.allQues[index]["slelectIndex"]=Optindex;
        // $('.box,.impact-box').removeClass('active');
        // if($scope.que["factor"]=="impact")
        // {
        //     $('#impt-'+index+Optindex).addClass("active")
        // }
        // if($scope.que["factor"]=="responsibility")
        // {
        //     $('#resp-'+index+Optindex).addClass("active")
        // }
        // if($scope.que["factor"]=="effectiveness")
        // {
        //     $('#eff-'+index+Optindex).addClass("active")
        // }
        // $('#label-'+  $scope.PrevSelection).removeClass('activeLabel')
        // if($scope.que["factor"]=="complexity" && type !='boxH'){
        //     $('#label-'+Optindex).addClass('activeLabel')
        // }
        // else{
        //     $('#label-'+Optindex).addClass('active')
        //
        // }
        // $scope.PrevIndex=index;
        // $scope.PrevSelection=Optindex;
    }

    $scope.getScore=function ()
    {
        var total=0;
        angular.forEach($scope.userChoice,function(v,k)
        {
            total=total+parseInt(v);
        });
        $state.go('app.report/:score',{score:total})
//            $http({
//                url: '/qustioner/getScore',
//                method: 'post',
//                data: { score: total }
//            }).then(function success(response)
//            {});
//         $.post( "/qustioner/getScore", { score: total } );
    }


}
quizController.$inject=["$scope","$http","$localStorage","$uibModal","$localStorage","$state"]