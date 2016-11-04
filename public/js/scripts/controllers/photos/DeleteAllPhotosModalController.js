/**
 * Created by developer on 30.10.16.
 */

"use strict";

angular.module("app")
    .controller("DeleteAllPhotosModalController", function($scope, $uibModalInstance) {
        var vm = this;

        vm.modalBody = "/views/photos/delete-all-modal.html";
        vm.modalTitle = "Delete All Photos";

        vm.delete = function() {
            $uibModalInstance.close();
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss();
        };
    });