/**
 * Created by developer on 17.10.16.
 */

module.exports = function(env) {
    var url = "mongodb://admin-dev:admin123@ds023704.mlab.com:23704/print-photo-dev";

    if (env === "test")
        url = "mongodb://admin-test:admin123@ds023704.mlab.com:23704/print-photo-test";
    else if (env === "production")
        url = "mongodb://admin:admin123@ds051605.mlab.com:51605/print-photo";

    return url;
};