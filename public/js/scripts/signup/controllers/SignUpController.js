/**
 * Created by developer on 04.11.16.
 */

angular.module("signup")
    .controller("SignUpController", function ($scope) {
        var vm = this;

        vm.email = null;
        vm.password = null;
        vm.login = null;
    });