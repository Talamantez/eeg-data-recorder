module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    bower_concat: {
      all: {
        dest: 'dist/bower.js'
    },
    uglify: {
       bower: {
        options: {
          mangle: true,
          compress: true
        },
          files: {
            'js/bower.min.js': 'js/bower.js'
          }
        
      }
    }
    }
  });
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('concat', ['bower_concat']);
  grunt.registerTask('buildbower', [
    'bower_concat',
    'uglify:bower'
    ]);

};