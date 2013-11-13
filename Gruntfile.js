module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: pkg.components,
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> by <%= pkg.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: pkg.components,
                dest: 'dist/<%= pkg.buildName %>.min.js'
            }
        },
        jasmine: {
            pivotal: {
                src: pkg.components,
                options: {
                    specs: 'tests/spec.js',
                    helpers: ['./bower_components/jquery/jquery.js', './node_modules/jasmine-jquery/lib/jasmine-jquery.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('build', ['uglify']);
    grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);

};