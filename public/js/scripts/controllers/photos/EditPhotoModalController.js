/**
 * Created by developer on 21.10.16.
 */

"use strict";

angular.module("app")
    .controller("EditPhotoModalController", function($scope, $uibModalInstance) {
        var vm = this;

        vm.title = $scope.photo.title;
        vm.modalBody = "/views/photos/edit-photo-modal.html";
        vm.modalTitle = "Edit " + vm.title;

        vm.save = function() {
            $uibModalInstance.close();
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    });