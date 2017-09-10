(function () {
    'use strict';
    angular
        .module('app').component('headerComponent', {
        templateUrl: 'components/header/header.html',
        controller: ('HeaderController', HeaderController),
        controllerAs: 'header'
    });

    // Start header component
    HeaderController.$inject = ['$rootScope', 'AuthService', '$state'];
    function HeaderController($rootScope, AuthService, $state) {
        var header = this;

        header.reversePopular = false;
        header.reverseNewest = false;

        //  Get user auth on load application
        header.userData = AuthService.authenticatedUser();

        //  Catch if user was login
        $rootScope.$on('userAuthenticated', function () {
            header.userData = JSON.parse(localStorage.getItem('auth-data'));
        });

        //  Header search input broadcast value
        header.startSearch = function () {
            $rootScope.$broadcast('startSearch', header.searchText);
        };

        //  Sort by likes
        header.mostPopular = function () {
            header.reversePopular ? header.reversePopular = false : header.reversePopular = true;
            $rootScope.$broadcast('mostPopular', header.reversePopular);
        };

        //  Sort by watches
        //  TODO: review this sorting by other type?
        header.mostWatches = function () {
            header.reverseNewest ? header.reverseNewest = false : header.reverseNewest = true;
            $rootScope.$broadcast('mostWatches', header.reverseNewest);
        };

        //  Log out user, go home, clear userData and localStorage
        header.logOut = function () {
            $state.go('home');
            header.userData = false;
            localStorage.removeItem('auth-data');
            localStorage.removeItem('auth-token');
        };

    }

})();