module.exports = function (Handlebars) {
    function setup() {
        Handlebars.registerPartial('navbar', require("./koray/navbar.hbs"));
        Handlebars.registerPartial('footer', require("./koray/header.hbs"));
    }

    return {
        setup: setup
    };
};