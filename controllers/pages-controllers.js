(function () {
    'use strict';
    angular.module('app')
        .controller('AboutController', AboutController)
        .controller('SettingsController', SettingsController);

    AboutController.$inject = [];
    function AboutController() {
        var about = this;

        about.$onInit = function () {
            window.location.hash ? about.smoothScroll(window.location.hash) : false;
        };

        //  Enable scrollspy for navbar
        angular.element('body').scrollspy({
            target: '.about-nav',
            offset: 75
        });

        about.smoothScroll = function (hash) {
            angular.element('html, body').animate({
                scrollTop: $(hash).offset().top -75
            }, 300, function () {
                window.location.hash = hash;
            });
        };

        //  Navbar links handler
        angular.element('.about-nav a, .about-dev-icons a').click(function(e) {
            e.preventDefault();
            about.smoothScroll(this.hash);
        });

    }

    SettingsController.$inject = ['$translate', '$timeout', 'AuthService'];
    function SettingsController($translate, $timeout, AuthService) {
        var settings = this;

        settings.utils = {
            view: 'general',
            linkAvatar: '',
            base64Loader: '',
            base64Error: '',
            base64File: ''
        };

        settings.update = AuthService.authenticatedUser();

        settings.availableLang = $translate.getAvailableLanguageKeys();
        settings.currentLang = $translate.use();

        settings.changeLanguage = function () {
            $translate.use(settings.currentLang);
        };

        settings.updateSettings = function (isValid) {
            settings.settingsFormSubmitted = true;

            if (isValid) {
                angular.forEach(settings.update, function(value, key) {
                    if (value === '' || value === null || value === undefined) {
                        delete settings.update[key];
                    }
                });

                AuthService.updateUserSettings(settings.update.id, settings.update).then(function (response) {
                    if (response.hasOwnProperty('status')) {
                        settings.updateFormServerError = {};
                        switch(response.status) {
                            case 400:
                            case 401:
                            case 403:
                                settings.updateFormServerError = response.data;
                                break;
                            case 422:
                                settings.updateFormServerError = response.data.errors;
                                break;
                            default:
                                break
                        }
                    } else {
                        settings.updateFormServerSuccess = true;
                        settings.updateFormServerError ? delete settings.updateFormServerError : false;
                        $timeout(function () {settings.updateFormServerSuccess = false;},3000);
                        settings.update = JSON.parse(localStorage.getItem('auth-data'));
                    }
                })
            }
        }
    }

})();
