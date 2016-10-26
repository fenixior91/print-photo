/**
 * Created by developer on 26.10.16.
 */

"use strict";

angular.module("app")
    .controller("ShowAlbumController", function($scope, Notification, AlbumService) {
        var vm = this;
        vm.albums = [];

        AlbumService.getAlbums()
            .then(function(result) {
                vm.albums = result.data;
            })
            .catch(function(error) {
                Notification.error({message: error, positionX: 'center', delay: 1500});
            });
    });