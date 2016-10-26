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

        this.createAlbum = function(params) {
            var url = this.serviceUrl + sep + "create";

            return HttpService.doPost(url, params);
        }
    });