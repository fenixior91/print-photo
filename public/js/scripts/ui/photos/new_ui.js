/**
 * Created by developer on 19.10.16.
 */

$(document).ready(function() {
    Dropzone.options.photoDropzone = {
        accept: function(file, done) {
            if (file.type === "image/jpeg" || file === "image/png" || file.type === "image/gif") {
                done();
            }
        }
    };
});