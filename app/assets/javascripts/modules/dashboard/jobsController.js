(function () {
    'use strict';

    angular
        .module('naut')
        .controller('jobscontroller', jobscontroller);

    jobscontroller.$inject = ['$scope', '$state', 'job_data', '$localStorage', '$uibModal',  '$http', 'toaster', '$rootScope']

    function jobscontroller($scope, $state, job_data, $localStorage, $uibModal,  $http, toaster, $rootScope) {
        var vm = this;


$scope.alljobs=job_data['jobs']
$scope.applied_roles=job_data['roles']



    }
})();