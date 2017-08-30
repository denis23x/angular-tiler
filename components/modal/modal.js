(function () {
    'use strict';
    angular
        .module('app').component('modalComponent', {
        templateUrl: 'components/modal/modal.html',
        bindings: {
            post: '<'
        },
        controller: ('ModalController', ModalController),
        controllerAs: 'modal'
    });

    // Start modal component
    ModalController.$inject = ['$state'];
    function ModalController($state) {

        var modal = this,
            modalElement = jQuery('#modalWindow');

        modal.$onInit = function() {
            modalElement.modal('show');
        };

        modalElement.on('hidden.bs.modal', function (e) {
            $state.go('^');
        })

    }

    //  Filter for description post text
    angular.module('app').filter('unsafe', ['$sce', function ($sce){
        return $sce.trustAsHtml;
    }])

})();