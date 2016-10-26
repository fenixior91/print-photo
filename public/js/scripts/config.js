/**
 * Created by developer on 21.10.16.
 */

"use strict";

angular.module("app")
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("index", {
            url: "/",
            templateUrl: "/views/main/index.html",
            controllerAs: "vm",
            controller: "IndexController"
        })
        .state("show-photo", {
            url: "/photos/show",
            templateUrl: "/views/photos/albums.html",
            controllerAs: "vm",
            controller: "ShowPhotoController"
        })
        .state("new-photo", {
            url: "/photos/new",
            templateUrl: "/views/photos/new.html",
            controllerAs: "vm",
            controller: "NewPhotoController",
        })
        .state("edit-photo", {
            url: "/photos/edit",
            templateUrl: "/views/photos/edit.html",
            controllerAs: "vm",
            controller: "EditPhotoController"
        })
        .state("albums", {
            url: "/albums",
            templateUrl: "/views/albums/albums.html",
            controllerAs: "vm",
            controller: ""
        });
});