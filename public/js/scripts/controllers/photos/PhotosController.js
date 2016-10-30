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

        vm.openEditModal = function (scope) {
            var photo = scope.photo;

            $uibModal.open({
                scope: scope,
                templateUrl: "/views/common/modal.html",
                controller: "EditPhotoModalController",
                controllerAs: "vm",
                size: "lg",
                backdrop: "static"
            })
                .result.then(function(result) {
                PhotoService.editPhoto(photo)
                    .then(function(result) {
                        var message = "Edition of " + photo.title + " finished.";
                        Notification.primary({message: message, positionX: 'center', delay: 1500});
                    })
                    .catch(function(error) {
                        var message = "Can not edit " + photo.title + ": " + error;
                        Notification.error({message: message, positionX: 'center', delay: 1500});
                    });
            });
        };

        vm.openDeleteModal = function (scope) {
            var photo = scope.photo;

            $uibModal.open({
                scope: scope,
                templateUrl: "/views/common/delete-modal.html",
                controller: "DeletePhotoModalController",
                controllerAs: "vm",
                size: "xs",
                backdrop: "static"
            })
                .result.then(function(result) {
                PhotoService.deletePhoto(photo)
                    .then(function(result) {
                        var index = vm.photos.indexOf(photo);
                        vm.photos.splice(index, 1);

                        var message = "Photo " + photo.title + " has removed.";
                        Notification.primary({message: message, positionX: 'center', delay: 1500});
                    })
                    .catch(function(error) {
                        var message = "Can not remove " + photo.title + ".";
                        Notification.error({message: message, positionX: 'center', delay: 1500});
                    });
            });
        };
    });