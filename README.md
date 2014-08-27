# grunt-register-hbs-partials

> look for partials in a specified folder and generate a nodejs module which registers the partials to Handlebars

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-register-hbs-partials --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-register-hbs-partials');
```

## The "register_partials" task

### Overview
In your project's Gruntfile, add a section named `register_partials` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  register_partials: {
    default_options: {
           options: {
               extension: '.hbs' 
           },
           files: {
               '[yourpath]/partials_default.js': [ 'templates/partials/footer.hbs', 'templates/partials/footer.hbs']
           }
       }
  },
});
```

## it will generate something like this

```js
module.exports = function (Handlebars) {
    function setup() {
        Handlebars.registerPartial("test/partials/footer", require("./test/partials/footer.hbs"));
        Handlebars.registerPartial("test/partials/navbar", require("./test/partials/navbar.hbs"));
    }

    return {
        setup: setup
    };
};
```

so you can use ``` {{> test/partials/footer }} ``` in your templates

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  register_partials: {
    default_options: {
           options: {
               extension: '.hbs' 
           },
           files: {
               '[yourpath]/partials_default.js': [ 'templates/partials/footer.hbs', 'templates/partials/footer.hbs']
           }
       }
  },
});
```

#### Custom Options

You can set a rootPartialsDir so it will not be in the name when you start referencing the partials in your tamplates

```js
grunt.initConfig({
  register_partials: {
    default_options: {
           options: {
              extension: '.hbs',
              rootPartialsDir: 'test/'
           },
          files: [
             {  src: ['**/*.hbs'], dest: 'tmp/partials_custom.js' }
          ]
       }
  },
});
```


you can also set the `` requireRoot `` property to force the outputted require statement to start at another directory

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
