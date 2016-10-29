/**
 * Created by developer on 21.10.16.
 */

angular.module("app")
.service("PhotoService", function(HttpService, rootUrl) {
    this.serviceUrl = "/photos";

    this.getPhotos = function() {
        var url = this.serviceUrl + "/";

        return HttpService.doGet(url);
    }

    this.deletePhoto = function(params) {
        var url = this.serviceUrl + "/remove";

        return HttpService.doPost(url, params);
    }

    this.editPhoto = function(params) {
        var url = this.serviceUrl + "/edit";

        return HttpService.doPost(url, params);
    }
});