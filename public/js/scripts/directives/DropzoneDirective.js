/**
 * Created by developer on 21.10.16.
 */

"use strict";

angular.module("app")
    .directive("dropzoneDirective", function($timeout) {
        return {
            restrict: "EA",
            replace: true,
            template: '<form id="photoDropzone" action="/photos/new" class="dropzone" enctype="multipart/form-data"></form>',
            link: function(scope, element, attributes) {
            }
        }
    })