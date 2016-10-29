/**
 * Created by developer on 29.10.16.
 */

"use strict";

angular.module("app")
    .controller("PhotosController", function($scope, $uibModal, Notification, PhotoService) {
        var vm = this;
        vm.photos = [];
        vm.loading = true;

        vm.options = {
            url : "/photos/new",
            acceptedFiles : "image/jpeg, images/jpg, image/png"
        };

        vm.callbacks = {
            success: function(file) {
                var fileName = file.name.substring(0, file.name.lastIndexOf("."));
                var message = "Photo upload " + fileName + " finished.";

                Notification.primary({message: message, positionX: 'center', delay: 1500});
            }
        }

        vm.loadPhotos = function() {
            if (vm.photos.length === 0) {
                PhotoService.getPhotos()
                    .then(function (data) {
                        vm.photos = data.data;
                        vm.loading = false;
                    })
                    .catch(function(error) {

                    });
            }
        };
    });