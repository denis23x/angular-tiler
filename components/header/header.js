(function () {
    'use strict';
    angular
        .module('app').component('headerComponent', {
        templateUrl: 'components/header/header.html',
        controller: ('HeaderController', HeaderController),
        controllerAs: 'header'
    });

    // Start header component
    HeaderController.$inject = ['$rootScope', 'AuthService', 'APIService'];
    function HeaderController($rootScope, AuthService, APIService) {
        var header = this;

        //  Get user data
        header.userData = JSON.parse(localStorage.getItem('user-data'));
        header.collections = JSON.parse(localStorage.getItem('user-collections'));

        header.activeSorting = '-created_at';
        header.activeCategory = 'all';

        APIService.loadCategories().then(function (response) {
            header.categories = response;
        });

        //  Catch if user was login
        $rootScope.$on('userRefresh', function () {
            header.userData = JSON.parse(localStorage.getItem('user-data'));
        });

        //  Catch collections if user create another one
        $rootScope.$on('refreshCollections', function () {
            header.collections = JSON.parse(localStorage.getItem('user-collections'));
        });

        //  Header search input broadcast value
        header.startSearch = function () {
            $rootScope.$broadcast('startSearch', header.searchText);
        };

        header.sortingPosts = function (type) {
            $rootScope.$broadcast('sortingPosts', type);
        };

        header.showPosts = function (type, id) {
            switch(type) {
                case 'all':
                    $rootScope.$broadcast('showAll'); break;
                case 'collection':
                    $rootScope.$broadcast('showCollection', id); break;
                case 'category':
                    $rootScope.$broadcast('showCategory', id); break;
                default:
                    break;
            }
        };

        //  Log out user, go home, clear userData and localStorage
        header.logOut = function () {
            AuthService.userLogout();
        };

    }

})();