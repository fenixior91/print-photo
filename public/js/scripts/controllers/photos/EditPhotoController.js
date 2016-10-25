/**
 * Created by developer on 21.10.16.
 */

"use strict";

angular.module("app")
.controller("EditPhotoController", function ($scope, $uibModal, Notification, PhotoService) {
    var vm = this;
    vm.photos = [];
    vm.loading = true;

    PhotoService.getPhotos()
        .then(function(data) {
            vm.photos = data.data;
            vm.loading = false;
        })
        .catch(function(error) {
            console.log(error);
        })
    
    vm.openEditModal = function (scope) {
        var photo = scope.photo;

        $uibModal.open({
            scope: scope,
            templateUrl: "/views/common/modal.html",
            controller: "EditPhotoModalController",
            controllerAs: "vm",
            size: "lg",
            backdrop: "static"
        })
        .result.then(function(result) {
            PhotoService.editPhoto(photo)
                .then(function(result) {
                    var message = "Edition of " + photo.title + " finished.";
                    Notification.primary({message: message, positionX: 'center'});
                })
                .catch(function(error) {
                    var message = "Can not edit " + photo.title + ": " + error;
                    Notification.error({message: message, positionX: 'center'});
                });
        });
    };

    vm.openDeleteModal = function (scope) {
        var photo = scope.photo;

        $uibModal.open({
            scope: scope,
            templateUrl: "/views/common/delete-modal.html",
            controller: "DeletePhotoModalController",
            controllerAs: "vm",
            size: "xs",
            backdrop: "static"
        })
        .result.then(function(result) {
            PhotoService.deletePhoto(photo)
                .then(function(result) {
                    var index = vm.photos.indexOf(photo);
                    vm.photos.splice(index, 1);

                    var message = "Photo " + photo.title + " has removed.";
                    Notification.primary({message: message, positionX: 'center'});
                })
                .catch(function(error) {
                    var message = "Can not remove " + photo.title + ".";
                    Notification.error({message: message, positionX: 'center'});
                });
        });
    };
});