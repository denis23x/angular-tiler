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

    SettingsController.$inject = ['$translate', 'AuthService', 'CommonService'];
    function SettingsController($translate, AuthService, CommonService) {
        var settings = this;

        settings.update = JSON.parse(localStorage.getItem('auth-data'));

        settings.availableLang = $translate.getAvailableLanguageKeys();
        settings.currentLang = $translate.use();

        settings.changeLanguage = function () {
            $translate.use(settings.currentLang);
        };

        angular.element('#file2').on('change', function (fileInput) {
            CommonService.getBase64(false, fileInput.currentTarget.files[0]).then(function (response) {
                settings.update.avatar = response;
            });
        });

        settings.setAvatarByLink = function () {
            CommonService.getBase64(settings.avatarLink).then(function (response) {
                settings.update.avatar = response;
            })
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
                    if (response.success) {
                        settings.updateFormServerSuccess = true;
                        settings.update = JSON.parse(localStorage.getItem('auth-data'));
                    } else {
                        console.log(response);
                        settings.updateFormServerError = response.data;
                    }
                })
            }
        }
    }

})();
