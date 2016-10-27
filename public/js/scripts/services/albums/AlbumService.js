/**
 * Created by developer on 26.10.16.
 */

"use strict";

angular.module("app")
    .service("AlbumService", function(HttpService, rootUrl, sep) {
        this.serviceUrl = sep + "albums";

        this.getAlbums = function() {
            var url = this.serviceUrl;

            return HttpService.doGet(url);
        };

        this.getAlbum = function(id) {
            var url = this.serviceUrl + "/" + id;

            return HttpService.doGet(url);
        }

        this.createAlbum = function(params) {
            var url = this.serviceUrl + sep + "create";

            return HttpService.doPost(url, params);
        }

        this.removeAlbum = function(params) {
            var url = this.serviceUrl + "/remove";

            return HttpService.doPost(url, params);
        }
    });