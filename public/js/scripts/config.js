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
        .state("photos", {
            url: "/photos",
            templateUrl: "/views/photos/photos.html",
            controllerAs: "vm",
            controller: "PhotosController"
        })
        .state("albums", {
            url: "/albums",
            templateUrl: "/views/albums/albums.html",
            controllerAs: "vm",
            controller: "AlbumsController"
        })
        .state("edit-album", {
            url: "/albums/edit/:id",
            templateUrl: "/views/albums/edit.html",
            controllerAs: "vm",
            controller: "EditAlbumController"
        });
});