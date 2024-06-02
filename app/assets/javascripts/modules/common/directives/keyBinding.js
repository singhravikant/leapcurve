(function(){

    'use strict'
    angular.module('naut')
        .directive('keybinding', function () {
            return {
                restrict: 'E',
                scope: {
                    invoke: '&'
                },
                link: function (scope, el, attr) {
                    Mousetrap.bind(attr.on, scope.invoke);
                }
            };
        });
})();