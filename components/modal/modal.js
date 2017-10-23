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

            //  If user registration by social
            if ($location.search().email !== undefined) {
                modal.utils.regContinue = true;
                modal.authSwitch();
                modal.reg.name = $location.search().name;
                modal.reg.email = $location.search().email;
                modal.reg.surname = $location.search().surname;
                $location.url($location.path());
            }
        };

        //  Back state on hidden modal
        modalElement.on('hidden.bs.modal', function (e) {
            $state.go('^');
        });

        modal.postHandler = function () {
            //  TODO: post handler
        };

        modal.authHandler = function () {
            modal.authView = true;
            modal.regView = false;
            modal.utils = {
                regContinue: false,
                defaultAvatarLink: window.location.origin + '/img/default-avatars/captainamerica.png'
            };

            //  Get selected avatar of user
            angular.element('#carouselDefaultAvatars').on('slid.bs.carousel', function (e) {
                modal.utils.defaultAvatarLink = angular.element(e.relatedTarget).find('img')[0].src;
            });

            modal.auth = {
                username: '',
                password: '',
                grant_type: AuthService.passportData('grant_type'),
                client_id: AuthService.passportData('client_id'),
                client_secret: AuthService.passportData('client_secret')
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

            modal.authRedirect = function (type) {
                modalElement.modal('hide');
                modalElement.on('hidden.bs.modal', function (e) {
                    $state.go('home').then(function () {
                        type === 'success' ? $state.go('settings') : $state.go('error');
                    });
                });
            };

            modal.authUser = function (isValid) {
                modal.authFormSubmitted = true;

                if (isValid) {
                    AuthService.authorizationUser(modal.auth).then(function (response) {
                        response.hasOwnProperty('access_token') ?  modal.authRedirect('success') : modal.authFormServerError = response.data;
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
                                grant_type: AuthService.passportData('grant_type'),
                                client_id: AuthService.passportData('client_id'),
                                client_secret: AuthService.passportData('client_secret'),
                                username : modal.reg.email,
                                password : modal.reg.password
                            };
                            AuthService.authorizationUser(modal.firstAuth).then(function (response) {
                                response.hasOwnProperty('access_token') ? modal.authRedirect('success') : modal.authRedirect('error');
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