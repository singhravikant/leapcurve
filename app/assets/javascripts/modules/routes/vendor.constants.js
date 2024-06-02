/**=========================================================
 * Module: VendorAssetsConstant.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .constant('VENDOR_ASSETS', {
            // jQuery based and standalone scripts
            scripts: {
              'animate':            ['/assets/animate.min.css'],
              'icons':              ['/assets/font-awesome/css/font-awesome.min.css']

            },
            // Angular modules scripts (name is module name to be injected)
            modules: [
              {name: 'toaster',           files: ['/assets/AngularJS-Toaster/toaster.js',
                                                  '/assets/toaster.css']},
                {name: 'oitozero.ngSweetAlert',           files: ['/assets/sweetalert.min.js','/assets/SweetAlert.js',
                                                                    '/assets/sweetalert.css']}
            ]

        });

})();

