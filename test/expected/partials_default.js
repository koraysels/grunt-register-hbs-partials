module.exports = function (Handlebars) {
    function setup() {
        Handlebars.registerPartial("test/fixtures/navbar", require("./test/fixtures/navbar.hbs"));
        Handlebars.registerPartial("test/fixtures/footer", require("./test/fixtures/footer.hbs"));
    }

    return {
        setup: setup
    };
};