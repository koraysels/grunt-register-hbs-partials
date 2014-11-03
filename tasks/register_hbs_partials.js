/*
 * grunt-register-hbs-partials
 * https://github.com/koray.sels/grunt-register-hbs-partials
 *
 * Copyright (c) 2014 koray.sels
 * Licensed under the MIT license.
 */
'use strict';
var fs = require('fs');
var path = require('path');
var slash = require('slash');
module.exports = function (grunt) {

    grunt.registerMultiTask('register_partials', 'look for partials in a specified folder and generate a nodejs module which registers the partials to Handlebars', function () {
            // Merge task-specific and/or target-specific options with these defaults.
            var options = this.options({
                extension: '.hbs',
                rootPartialsDir: "undefined",
                requireRoot: "undefined"
            });

//            Iterate over all specified file groups.
            this.files.forEach(function (file) {
                var contents = "module.exports = function (Handlebars) {" +
                    "\n    function setup() {";
                contents += file.src.filter(function (filepath) {


                    // Remove nonexistent files (it's up to you to filter or warn here).
                    if (!grunt.file.exists(filepath) && !grunt.file.isDir(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).map(function (filepath) {
                    // Read and return the file's source.
                    if (!filepath) {
                        return;
                    }

                    var partialDir = options.rootPartialsDir;

                    if (partialDir === "undefined") {
                        partialDir = path.dirname(filepath);
                    } else {
                        partialDir = path.dirname(path.relative(options.rootPartialsDir, filepath));
                    }
                    partialDir = partialDir === '.' ? '' : partialDir + '/';


                    if (options.requireRoot !== "undefined") {
                        filepath = path.relative(options.requireRoot, filepath);
                    }



                    var partialName = partialDir + path.basename(filepath, options.extension);

                    return '\n        Handlebars.registerPartial("' + partialName + '", require("./' + slash(filepath) + '"));';
                }).join("");


                contents += "\n    }" +
                    "\n" +
                    "\n    return {" +
                    "\n        setup: setup" +
                    "\n    };" +
                    "\n};";

                grunt.file.write(file.dest, contents);
                grunt.log.writeln('File "' + file.dest + '" created.');

            });
        }
    )
    ;
}
;
