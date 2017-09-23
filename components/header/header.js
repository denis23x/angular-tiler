(function () {
    'use strict';
    angular
        .module('app').component('headerComponent', {
        templateUrl: 'components/header/header.html',
        controller: ('HeaderController', HeaderController),
        controllerAs: 'header'
    });

    // Start header component
    HeaderController.$inject = ['$rootScope', 'AuthService'];
    function HeaderController($rootScope, AuthService) {
        var header = this;

        //  Get user auth on load application
        header.userData = AuthService.authenticatedUser();

        //  Catch if user was login
        $rootScope.$on('userAuthenticated', function () {
            header.userData = JSON.parse(localStorage.getItem('auth-data'));
        });

        //  Catch if user logout
        $rootScope.$on('userLogout', function () {
            delete header.userData;
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

        //  Log out user, go home, clear userData and localStorage
        header.logOut = function () {
            AuthService.userLogoutUser();
        };
    }

})();