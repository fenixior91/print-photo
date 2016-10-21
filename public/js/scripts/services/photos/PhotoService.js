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
});