'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      allFiles: ['client/**/*.js', 'server/**/*.js', 'test/**/*.js']
    }

  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // tasks
  grunt.registerTask('default', ['jshint']);
};

