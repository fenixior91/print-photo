/**
 * Created by developer on 26.10.16.
 */

"use strict";

angular.module("app")
    .controller("EditAlbumController", function($scope, $stateParams, Notification, AlbumService) {
        var vm = this;

        vm.album = {};
        vm.loading = true;

        AlbumService.getAlbum($stateParams.id)
            .then(function(result) {
                vm.album = result.data;
                vm.loading = false;
            })
            .catch(function(error) {
                Notification.error({message: error, positionX: 'center', delay: 1500});
                vm.loading = false;
            });
    });