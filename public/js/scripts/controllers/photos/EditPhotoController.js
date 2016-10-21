/**
 * Created by developer on 21.10.16.
 */

"use strict";

angular.module("app")
.controller("EditPhotoController", function ($scope, $uibModal, PhotoService) {
    var vm = this;
    vm.photos = [];
    vm.loading = true;

    PhotoService.getPhotos()
        .then(function(data) {
            vm.photos = data.photos;
            vm.loading = false;
        })
        .catch(function(error) {
            console.log(error);
        })
    
    vm.openEditModal = function (scope) {
        $uibModal.open({
            scope: scope,
            templateUrl: "/views/common/modal.html",
            controller: "EditPhotoModalController",
            controllerAs: "vm",
            size: "lg",
            backdrop: "static"
        })
    };

    vm.openDeleteModal = function (scope) {
        $uibModal.open({
            scope: scope,
            templateUrl: "/views/common/delete-modal.html",
            controller: "DeletePhotoModalController",
            controllerAs: "vm",
            size: "xs",
            backdrop: "static"
        })
        .result.then(function(result) {
            PhotoService.deletePhoto(scope.photo);
        });
    };
});