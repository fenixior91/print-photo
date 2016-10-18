/**
 * Created by developer on 17.10.16.
 */

$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "/gallery/photos/images",
        success: (function(result) {

        }),
        error: (function(error) {
            console.log(error);
        })
    });
});