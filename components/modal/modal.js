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
    ModalController.$inject = ['$state', 'AuthService', '$location'];
    function ModalController($state, AuthService, $location) {

        var modal = this,
            modalElement = jQuery('#modalWindow');

        //  Show modal on init
        modal.$onInit = function() {
            modalElement.modal('show');
            // console.log($location.search().token);
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
            modal.utils = {
                defaultAvatarLink: window.location.origin + '/img/default-avatars/captainamerica.png'
            };

            //  Disable avatar carousel sliding
            angular.element('#carouselDefaultAvatars').carousel({
                interval: 0
            });

            //  Get selected avatar of user
            angular.element('#carouselDefaultAvatars').on('slide.bs.carousel', function (e) {
                modal.utils.defaultAvatarLink = angular.element(e.relatedTarget).find('img')[0].src;
            });

            modal.auth = {
                email: '',
                password: ''
            };

            modal.reg = {
                avatar: '',
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

            modal.authSuccess = function () {
                modalElement.modal('hide');

                //  TODO: this retrieve transition error
                modalElement.on('hidden.bs.modal', function (e) {
                    $state.go('settings');
                });
            };

            modal.authUser = function (isValid) {
                modal.authFormSubmitted = true;

                if (isValid) {
                    AuthService.authorizationUser(modal.auth).then(function (response) {
                        response.hasOwnProperty('status') ? modal.authFormServerError = response.data : modal.authSuccess();
                    })
                }
            };

            modal.authUserBySocial = function (key) {
                AuthService.registrationBySocial(key);
            };

            modal.regUser = function(isValid) {
                modal.regFormSubmitted = true;

                if (isValid) {
                    AuthService.registrationUser(modal.reg).then(function (response) {
                        if (response.hasOwnProperty('status')) {
                            switch(response.status) {
                                case 401:
                                    modal.regFormServerError = response.data;
                                    break;
                                case 422:
                                    modal.regFormServerError = response.data.errors;
                                    break;
                                default:
                                    break
                            }
                            modal.regFormServerError.takenEmail = modal.reg.email;
                        } else {
                            modal.firstAuth = {
                                email : modal.reg.email,
                                password : modal.reg.password
                            };
                            AuthService.authorizationUser(modal.firstAuth).then(function (response) {
                                response.hasOwnProperty('status') ? $state.go('error') : modal.authSuccess();
                            });
                        }
                    })
                }
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