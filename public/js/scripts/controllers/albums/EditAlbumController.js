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