/**
 * Created by developer on 26.10.16.
 */

angular.module("app")
    .controller("DeleteAlbumModalController", function($scope, $uibModalInstance) {
        var vm = this;

        vm.modalBody = "/views/albums/delete.html";
        vm.modalTitle = "Delete album " + $scope.album.name;

        vm.delete = function() {
            $uibModalInstance.close();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
    });