module.exports = function (Handlebars) {
    function setup() {
        Handlebars.registerPartial("fixtures/footer", require("./test/fixtures/footer.hbs"));
        Handlebars.registerPartial("fixtures/navbar", require("./test/fixtures/navbar.hbs"));
    }

    return {
        setup: setup
    };
};