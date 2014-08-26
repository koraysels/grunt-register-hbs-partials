module.exports = function (Handlebars) {
    function setup() {
        Handlebars.registerPartial("fixtures/navbar", require("./test/fixtures/navbar.hbs"));
        Handlebars.registerPartial("fixtures/footer", require("./test/fixtures/footer.hbs"));
    }

    return {
        setup: setup
    };
};