/**
 * Created by developer on 21.10.16.
 */

angular.module("app")
    .controller("ShowPhotoController", function($scope, PhotoService) {
        var vm = this;
        vm.photos = [];
        vm.loading = true;

        PhotoService.getPhotos()
            .then(function (data) {
                vm.photos = data.photos;
                vm.loading = false;
            }, function(error) {

            });

    });