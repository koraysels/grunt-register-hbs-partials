module.exports = function (Handlebars) {
    function setup() {
        Handlebars.registerPartial("footer", require("./fixtures/footer.hbs"));
        Handlebars.registerPartial("navbar", require("./fixtures/navbar.hbs"));
    }

    return {
        setup: setup
    };
};