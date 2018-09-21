(function () {
    'use strict';
    angular.module('app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$translate', '$timeout', 'AuthService', 'APIService'];
    function SettingsController($translate, $timeout, AuthService, APIService) {
        var settings = this;

        settings.utils = {
            view: 'general',
            linkAvatar: '',
            base64Loader: '',
            base64Error: '',
            base64File: ''
        };

        settings.userOptions = {
            currentLanguage: settings.currentLang,
        };

        settings.update = JSON.parse(localStorage.getItem('user-data'));

        settings.availableLang = $translate.getAvailableLanguageKeys();
        settings.currentLang = $translate.use();

        settings.changeLanguage = function () {
            console.log(settings.currentLang);
            // APIService.userOptions(settings.update.id, settings.userOptions).then(function (response) {
            //     console.log(response);
            // });

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
                        settings.update = JSON.parse(localStorage.getItem('user-data'));
                    }
                })
            }
        }
    }

})();
