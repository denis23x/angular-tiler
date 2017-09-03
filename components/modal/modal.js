(function () {
    'use strict';
    angular
        .module('app').component('modalComponent', {
        templateUrl: ['$stateParams', function ($stateParams) {
            return 'components/modal/templates/' + $stateParams.type + ".html";
        }],
        bindings: {
            post: '<',
            avatars: '<'
        },
        controller: ('ModalController', ModalController),
        controllerAs: 'modal'
    });

    // Start modal component
    ModalController.$inject = ['$state', 'APIService'];
    function ModalController($state, APIService) {

        var modal = this,
            modalElement = jQuery('#modalWindow');

        //  Show modal on init
        modal.$onInit = function() {
            modalElement.modal('show');
        };

        //  Back state on hidden modal
        modalElement.on('hidden.bs.modal', function (e) {
            $state.go('^');
        });

        modal.postHandler = function () {

        };

        modal.authHandler = function () {
            modal.authView = true;
            modal.regView = false;

            //  Disable carousel sliding
            angular.element('#carouselDefaultAvatars').carousel({
                interval: 0
            });

            //  Get selected avatar of user
            angular.element('#carouselDefaultAvatars').on('slide.bs.carousel', function (e) {
                modal.reg.avatar = e.relatedTarget.attributes.index.value;
            });

            modal.auth = {
                email: '',
                password: ''
            };

            modal.reg = {
                avatar: '0',
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                terms: true
            };

            modal.authSwitch = function () {
                modal.authView === true ? modal.authView = false : modal.authView = true;
                modal.regView === true ? modal.regView = false : modal.regView = true;
            };

            modal.authUser = function (isValid) {
                modal.authFormSubmitted = true;
            };

            modal.regUser = function(isValid) {
                modal.regFormSubmitted = true;

                if (isValid) {
                    APIService.registrationUser(modal.reg);
                } else {
                    console.log('valid false');
                }

            };


            modal.check = function() {
                APIService.getUser();
            };

        };

        //  Handler division of work by type
        switch($state.params.type) {
            case 'post': modal.postHandler();
                break;
            case 'auth': modal.authHandler();
                break;
            default:
                break
        }

    }

    //  Filter for description post text
    angular.module('app').filter('unsafe', ['$sce', function ($sce){
        return $sce.trustAsHtml;
    }])

})();