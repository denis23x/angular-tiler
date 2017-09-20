(function () {
    'use strict';
    angular.module('app').directive('materialRipple', function () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                angular.element(element).addClass('material-ripple');
                element.click(function(event){
                    var surface = $(this);

                    if (surface.find(".material-ink").length == 0) {
                        surface.prepend("<div class='material-ink'></div>");
                    }

                    var ink = surface.find(".material-ink");
                    ink.removeClass("animate");

                    if (!ink.height() && !ink.width()) {
                        var diameter = Math.max(surface.outerWidth(), surface.outerHeight());
                        ink.css({height: diameter, width: diameter});
                    }

                    var xPos = event.pageX - surface.offset().left - (ink.width() / 2);
                    var yPos = event.pageY - surface.offset().top - (ink.height() / 2);
                    var rippleColor = surface.data("ripple-color");

                    ink.css({
                        top: yPos + 'px',
                        left: xPos + 'px',
                        background: rippleColor
                    }).addClass("animate");
                });
            }
        }
    })
})();
