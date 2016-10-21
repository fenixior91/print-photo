/**
 * Created by developer on 21.10.16.
 */

"use strict";

angular.module("app")
    .controller("DeletePhotoModalController", function($scope, $uibModalInstance) {
        var vm = this;
        vm.title = $scope.photo.title;
        vm.modalBody = "/views/photos/delete-photo-modal.html";
        vm.modalTitle = "Delete " + vm.title;

        vm.delete = function() {
            $uibModalInstance.close();
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    });