/**
 * Created by developer on 21.10.16.
 */

"use strict";

angular.module("app")
    .directive("gallery", function($window) {
        return {
            restrict: "A",
            link: function(scope, element, attributes) {
                var elements = element.find("div");

                angular.forEach(elements,  function(value, key) {
                    var element = angular.element(value);

                    if (element.attr("id") === "links") {
                        element.on("click", function (event) {
                            event = event || $window.event;

                            var target = event.target || event.srcElement;
                            var link = target.src ? target.parentNode : target;
                            var options = {index: link, event: event};
                            var links = angular.element(this).find("a");

                            blueimp.Gallery(links, options);
                        });
                    }
                });
            }
        };
    });