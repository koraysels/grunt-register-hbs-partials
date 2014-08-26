/*
 * grunt-register-hbs-partials
 * https://github.com/koray.sels/grunt-register-hbs-partials
 *
 * Copyright (c) 2014 koray.sels
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
        },

        // Configuration to be run (and then tested).
        register_partials: {
            default_options: {
                options: {
                    extension: '.hbs'
                },
                files: {
                    'tmp/partials_default.js': [ 'test/fixtures/footer.hbs', 'test/fixtures/navbar.hbs']
                },
            },
            custom_options: {
                options: {
                    extension: '.hbs',
                    rootPartialsDir: 'test/fixtures',
                    requireRoot : 'test/'
                },
                files: [
                    {  src: ['**/*.hbs'], dest: 'tmp/partials_custom.js' }
                ]
            },
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'register_partials', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
