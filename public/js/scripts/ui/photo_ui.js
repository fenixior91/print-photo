/**
 * Created by developer on 17.10.16.
 */

$(document).ready(function () {
    $("#add-photo").click(function(e) {
        e.preventDefault();

        var data = {
            name: "photo",
            description: "description",
            uri: "http://www.google.com"
        };

        $.ajax({
            type: "post",
            url: "/gallery/photo/add",
            data: data,
            success: function(result) {
                console.log(result);
            },
            dataType: "json"
        })
    });
});