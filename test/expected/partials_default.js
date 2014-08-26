module.exports = function (Handlebars) {
    function setup() {
        Handlebars.registerPartial("test/fixtures/footer", require("./test/fixtures/footer.hbs"));
        Handlebars.registerPartial("test/fixtures/navbar", require("./test/fixtures/navbar.hbs"));
    }

    return {
        setup: setup
    };
};