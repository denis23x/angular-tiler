(function () {
    'use strict';
    angular.module('app').service('TranslateService', [ function () {

        // var version = 'v1';

        return {
            russianLanguage: function () {
                var dictionary = {
                    header: {
                        logoDesc    : 'проект tiler',
                        newest      : 'новые',
                        oldest      : 'старые',
                        popular     : 'популярные',
                        unpopular   : 'не популярные',
                        or          : 'или',
                        searchBy    : 'поиск по заголовкам',
                        inCategory  : 'в категории',
                        all         : 'все',
                        signIn      : 'Войти',
                        logOut      : 'Выйти',
                        about       : 'О сайте'
                    },
                    FOO: 'Как дела'
                };

                return dictionary;
            },
            englishLanguage: function () {
                var dictionary = {
                    header: {
                        logoDesc    : 'dev project: tiler',
                        newest      : 'the newest',
                        oldest      : 'oldest',
                        popular     : 'most popular',
                        unpopular   : 'unpopular',
                        or          : 'or',
                        searchBy    : 'search by title',
                        inCategory  : 'in category',
                        all         : 'all',
                        signIn      : 'Sign In',
                        logOut      : 'Log Out',
                        about       : 'About'
                    },
                    FOO: 'How are you'
                };

                return dictionary;
            }
        };
    }])
})();