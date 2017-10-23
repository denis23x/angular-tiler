(function () {
    'use strict';
    angular.module('app')
        .controller('AboutController', AboutController);

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
                // window.location.hash = hash;
            });
        };

        //  Navbar links handler
        angular.element('.about-nav a, .about-dev-icons a').click(function(e) {
            e.preventDefault();
            about.smoothScroll(this.hash);
        });

    }

})();
