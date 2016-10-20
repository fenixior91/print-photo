/**
 * Created by developer on 19.10.16.
 */

$(document).ready(function () {
    var photos = [];
    var template;
    var links = $("#links");

    ShowUi.appendTemplate(photos, template, links);
});

var ShowUi = function() {

};

ShowUi.appendTemplate = function(photos, template, links) {
    ShowUi.loadPhotos()
        .then(ShowUi.loadTemplate)
        .then(function(data) {
            photos = data.data.data;
            template = $(data.template);

            for (var i = 0; i < photos.length; i++) {
                var photo = photos[i];

                var tmpTemplate = template.clone();

                var photoLink = tmpTemplate.find("#photo-link");
                var photoSrc = tmpTemplate.find("#photo-src");

                photoLink.attr("id", "photo-link-" + i);
                photoLink.attr("href", photo.photoSrc);
                photoLink.attr("title", photo.title);
                photoLink.attr("alt", photo.alt);

                photoSrc.attr("id", "photo-src-" + i);
                photoSrc.attr("src", photo.thumbnailSrc);
                photoSrc.attr("alt", photo.alt);

                links.append(tmpTemplate);
            }

        })
        .catch(function(error) {
            console.log(error);
        });
}

ShowUi.loadPhotos = function() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "get",
            url: "/photos/images",
            success: (function(data) {
                resolve(data);
            }),
            error: (function(error) {
                reject(error);
            })
        });
    });
};

ShowUi.loadTemplate = function(data) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "get",
            url: "/views/photos/links.ejs",
            success: (function(template) {
                var result = {
                    data: data,
                    template: template
                }

                resolve(result);
            }),
            error: (function(error) {
                reject(error);
            })
        });
    });
};