/**
 * Created by developer on 21.10.16.
 */

angular.module("app")
.controller("NewPhotoController", function($scope, Notification) {
    var vm = this;

    vm.options = {
        url : "/photos/new",
        acceptedFiles : "image/jpeg, images/jpg, image/png"
    };

    vm.callbacks = {
        success: function(file) {
            var fileName = file.name.substring(0, file.name.lastIndexOf("."));
            var message = "Photo upload " + fileName + " finished.";

            Notification.primary({message: message, positionX: 'center', delay: 1500});
        }
    }
});