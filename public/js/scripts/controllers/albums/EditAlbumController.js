/**
 * Created by developer on 26.10.16.
 */

"use strict";

angular.module("app")
    .controller("EditAlbumController", function($scope, $stateParams, Notification, AlbumService, PhotoService) {
        var vm = this;

        vm.album = {};
        vm.photos = [];
        vm.loading = true;
        vm.existingPhotosEnable = false;

        vm.options = {
            url : "/photos/new",
            acceptedFiles : "image/jpeg, images/jpg, image/png"
        };

        vm.callbacks = {
            sending: function(file, xhr, formData) {
                formData.append("id", $stateParams.id);
                formData.append("xxxx", $stateParams.id);

                console.log(formData.get("id"));
                console.log(formData.get("file"));
            }
        }

        AlbumService.getAlbum($stateParams.id)
            .then(function(result) {
                vm.album = result.data;
                vm.loading = false;
            })
            .catch(function(error) {
                Notification.error({message: error, positionX: 'center', delay: 1500});
                vm.loading = false;
            });

        vm.loadExistingPhotos = function() {
            vm.existingPhotosEnable = !vm.existingPhotosEnable;

            if (vm.photos.length === 0) {
                PhotoService.getPhotos()
                    .then(function(result) {
                        vm.photos = result.data;
                        console.log(vm.photos);
                    })
                    .catch(function(error) {
                        Notification.error({message: error, positionX: 'center', delay: 1500});
                    });
            }
        }
    });