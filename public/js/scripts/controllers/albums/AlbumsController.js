/**
 * Created by developer on 26.10.16.
 */

"use strict";

angular.module("app")
    .controller("AlbumsController", function($scope, $uibModal, Notification, AlbumService) {
        var vm = this;
        vm.albums = [];

        AlbumService.getAlbums()
            .then(function(result) {
                vm.albums = result.data;
            })
            .catch(function(error) {
                Notification.error({message: error, positionX: 'center', delay: 1500});
            });

        vm.newClick = function() {
            $uibModal.open({
                templateUrl: "/views/common/modal.html",
                controller: "NewAlbumModalController",
                controllerAs: "vm",
                size: "xs",
                backdrop: "static"
            })
            .result
                .then(function(result) {
                    AlbumService.createAlbum(result)
                        .then(function(result) {
                            vm.albums.push(result.data);

                            var message = "Album " + result.data.name + " created.";
                            Notification.primary({message: message, positionX: 'center', delay: 1500});
                        })
                        .catch(function(error) {
                            Notification.error({message: error, positionX: 'center', delay: 1500});
                        });
                })
                .catch(function(error) {

                });
        };

        vm.deleteClick = function (scope) {
            var album = scope.album;

            $uibModal.open({
                scope: scope,
                templateUrl: "/views/common/delete-modal.html",
                controller: "DeleteAlbumModalController",
                controllerAs: "vm",
                size: "xs",
                backdrop: "static"
            })
            .result
                .then(function(result) {
                    AlbumService.removeAlbum(album)
                        .then(function(result){
                            var index = vm.albums.indexOf(album);
                            vm.albums.splice(index, 1);

                            var message = "Album " + album.name + " removed.";
                            Notification.primary({message: message, positionX: 'center', delay: 1500});
                        })
                        .catch(function(error) {
                            Notification.error({message: error, positionX: 'center', delay: 1500});
                        });
                })
                .catch(function(error) {
                    Notification.error({message: error, positionX: 'center', delay: 1500});
                });
        };
    });