'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      allFiles: ['client/**/*.js', 'server/**/*.js', 'test/**/*.js']
    },
    mocha_istanbul: {
        coverage: {
            src: 'test', // the folder, not the files,
            options: {
                recursive: true
            }
        }
    }
  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  // tasks
  grunt.registerTask('default', ['jshint', 'mocha_istanbul:coverage']);
//  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
};

