/**
 * Created by developer on 17.10.16.
 */

var RoutesUtils = function() {

}

RoutesUtils.prototype.isUserLoggedIn = function(req, res, pageToRender, pageToRedirect, data) {
    if (req.user) {
        res.render(pageToRender, {
            user: req.user,
            data: data
        });
    } else {
        res.redirect(pageToRedirect);
    }
};

RoutesUtils.prototype.isUserIsNotLoggedIn = function(req, res, pageToRender, pageToRedirect, message) {
    if (!req.user) {
        res.render(pageToRender, {
            message: req.flash(message)
        });
    } else {
        res.redirect(pageToRedirect);
    }
}

module.exports = new RoutesUtils();