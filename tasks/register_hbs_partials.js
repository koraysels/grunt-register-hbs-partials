/*
 * grunt-register-hbs-partials
 * https://github.com/koray.sels/grunt-register-hbs-partials
 *
 * Copyright (c) 2014 koray.sels
 * Licensed under the MIT license.
 */
'use strict';
var fs = require('fs');
var readdirp = require('readdirp');
var path = require('path');

var readNext = function (count, self) {
    readdirp({root: self.partialsDir[count], fileFilter: '*.*'})
        .on('warn', function (err) {
            console.warn('Non-fatal error trying to cache partials.', err);
        })
        .on('error', function (err) {
            console.error('Fatal error trying to cache partials', err);
            return;
        })
        .on('data', function (entry) {
            if (!entry) {
                return;
            }
            var source = fs.readFileSync(entry.fullPath, 'utf8');
            var dirname = path.dirname(entry.path);
            dirname = dirname === '.' ? '' : dirname + '/';

            var name = dirname + path.basename(entry.name, path.extname(entry.name));


//            Handlebars.registerPartial(name, source);
        })
        .on('end', function () {
            count += 1;

            // If all directories aren't read, read the next directory
            if (count < self.partialsDir.length) {
                readNext();
            } else {
                self.isPartialCachingComplete = true;
            }
        });
};

module.exports = function (grunt) {

    grunt.registerMultiTask('register_partials', 'look for partials in a specified folder and generate a nodejs module which registers the partials to Handlebars', function () {
            // Merge task-specific and/or target-specific options with these defaults.
            var options = this.options({
                extension: '.hbs',
                rootPartialsDir: "undefined"
            });

//            Iterate over all specified file groups.
            this.files.forEach(function (file) {
                var contents = "module.exports = function (Handlebars) {" +
                    "\n    function setup() {";
                contents += file.src.filter(function (filepath) {
                    // Remove nonexistent files (it's up to you to filter or warn here).
                    if (!grunt.file.exists(filepath)) {
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
                        partialDir = partialDir === '.' ? '' : partialDir + '/';
                    }

                    var partialName = partialDir + path.basename(filepath, options.extension);

                    return '\n        Handlebars.registerPartial("' + partialName + '", require("./' + partialDir + path.basename(filepath) + '"));';
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
    );
};
