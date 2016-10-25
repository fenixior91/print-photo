/**
 * Created by developer on 21.10.16.
 */

angular.module("app")
.service("HttpService", function($q, $http) {
    this.doPost = function(url, params) {
        var deferred = $q.defer();

        $http.post(url, params)
            .success(function(data) {
                if (data.status === "ok")
                    deferred.resolve(data);
                else
                    deferred.reject(data);
            })
            .error(function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    this.doGet = function(url) {
        var deferred = $q.defer();

        $http.get(url)
            .success(function(data) {
                if (data.status === "ok")
                    deferred.resolve(data);
                else
                    deferred.reject(data);
            })
            .error(function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };
});