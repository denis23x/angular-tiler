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

        //  Sort by likes
        header.mostPopular = function (reverse) {
            $rootScope.$broadcast('mostPopular', reverse);
        };

        //  Sort by watches
        //  TODO: review this sorting by other type?
        header.mostWatches = function (reverse) {
            $rootScope.$broadcast('mostWatches', reverse);
        };

        //  Show all posts
        header.showAll = function () {
            $rootScope.$broadcast('showAll');
        };

        //  Show only collection
        header.showCollection = function (collection) {
            console.log(collection);
        };

        //  Show only category
        header.showCategory = function (category) {
            $rootScope.$broadcast('showCategory', category);
        };

        //  Log out user, go home, clear userData and localStorage
        header.logOut = function () {
            AuthService.userLogout();
        };

    }

})();