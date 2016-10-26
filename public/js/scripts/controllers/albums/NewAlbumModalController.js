/**
 * Created by developer on 26.10.16.
 */

"use strict";

angular.module("app")
    .controller("NewAlbumModalController", function($scope, $uibModalInstance) {
        var vm = this;

        vm.modalBody = "/views/albums/new.html";
        vm.modalTitle = "New Album";
        vm.album = {
            name: ""
        };

        vm.save = function() {
            $uibModalInstance.close(vm.album);
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss();
        }
    });