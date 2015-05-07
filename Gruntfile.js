module.exports = function(grunt) {
    // Project configuration.

    // Grunt Initialization: pass in an object.
    grunt.initConfig({
        // Define file with alias pkg
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                // Reference pkg defined above and template comments that will appear at top of generated file for future reference (meta-data)
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                // Start and end files
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            }
        },
        copy: {
            main: {
                expand: true,
                // Current working directory
                cwd: "node_modules/",
                // Copies this info and writes it to the 'dest' without uglifying (since it's already minified!)
                // And, CSS cannot be minified because it would affect the html...
                src: [
                    //"angular/angular.min.js",
                    //"angular/angular.min.js.map",
                    //"angular/angular-csp.css",
                    "bootstrap/dist/css/bootstrap.min.css",
                    "bootstrap/dist/css/bootstrap.css.map",
                    "bootstrap/dist/js/bootstrap.min.js",
                    "jquery/dist/jquery.min.js"
                ],
                "dest": "server/public/vendor/"
            },
            main: {
                expand: true,
                // Current working directory
                cwd: "client/",
                // Copies this info and writes it to the 'dest' without uglifying (since it's already minified!)
                // And, CSS cannot be minified because it would affect the html...
                src: "styles/stylesheet.css",
                "dest": "server/public/"
            },


        }
    });
    // Register the tasks we need when we run grunt.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};