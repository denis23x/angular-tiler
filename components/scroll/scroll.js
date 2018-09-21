(function () {
    'use strict';
    angular
        .module('app').component('scrollComponent', {
        templateUrl: 'components/scroll/scroll.html',
        controller: ('ScrollController', ScrollController),
        controllerAs: 'scroll'
    });

    // Start modal component
    ScrollController.$inject = ['$interval'];
    function ScrollController($interval) {
        var scroll = this;

        scroll.up = function () {
            angular.element('html, body').animate({scrollTop: 0}, 300);
        };

        $interval( function(){
            scroll.top = window.scrollY;
        }, 1000);

    }

})();