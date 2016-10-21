/**
 * Created by developer on 21.10.16.
 */

angular.module("app")
.controller("NewPhotoController", function($scope) {
    var vm = this;

    vm.options = {
        url : "/photos/new",
        acceptedFiles : "image/jpeg, images/jpg, image/png"
    };
});