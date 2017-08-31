(function () {
    'use strict';
    angular
        .module('app').component('modalComponent', {
        templateUrl: ['$stateParams', function ($stateParams) {
            return 'components/modal/templates/' + $stateParams.type + ".html";
        }],
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

        modal.authView = true;
        modal.regView = false;

        modal.auth = {
            email: '',
            password: ''
        };

        modal.reg = {
            name: '',
            surname: '',
            email: '',
            password: '',
            password_confirmation: '',
            terms: true
        };

        modal.$onInit = function() {
            modalElement.modal('show');
        };

        modalElement.on('hidden.bs.modal', function (e) {
            $state.go('^');
        });

        modal.authSwitch = function () {
            modal.authView === true ? modal.authView = false : modal.authView = true;
            modal.regView === true ? modal.regView = false : modal.regView = true;
        };

        modal.authUser = function (isValid) {
            modal.authFormSubmitted = true;
            console.log(this);
        };

        modal.regUser = function(isValid) {
            modal.regFormSubmitted = true;
            console.log(this);
        };

    }

    //  Filter for description post text
    angular.module('app').filter('unsafe', ['$sce', function ($sce){
        return $sce.trustAsHtml;
    }])

})();