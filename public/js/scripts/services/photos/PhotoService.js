/**
 * Created by developer on 21.10.16.
 */

angular.module("app")
.service("PhotoService", function(HttpService, rootUrl, sep) {
    this.serviceUrl = sep + "photos";

    this.getPhotos = function() {
        var url = this.serviceUrl + sep + "images";

        return HttpService.doGet(url);
    }

    this.deletePhoto = function(params) {
        var url = this.serviceUrl + sep + "remove";

        return HttpService.doPost(url, params);
    }

    this.editPhoto = function(params) {
        var url = this.serviceUrl + sep + "edit";

        return HttpService.doPost(url, params);
    }
});