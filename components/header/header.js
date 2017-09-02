(function () {
    'use strict';
    angular
        .module('app').component('headerComponent', {
        templateUrl: 'components/header/header.html',
        controller: ('HeaderController', HeaderController),
        controllerAs: 'header'
    });

    // Start header component
    HeaderController.$inject = ['$rootScope'];
    function HeaderController($rootScope) {
        var header = this;

        header.reversePopular = false;
        header.reverseNewest = false;

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
    }

})();