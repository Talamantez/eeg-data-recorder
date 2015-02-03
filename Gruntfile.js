module.exports = function(grunt) {

  grunt.initConfig({
    clean: 
      ["dist/", "src/css/*"]
    ,
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          'src/css/style.css': 'sass/style.sass'
        }
      }
    },
    watch: {
      options:{
        livereload: true,
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      sass: {
        files: ['sass/**/*.sass', 'sass/**/*.scss'],
        tasks: ['sass']
      } 
    },
    bower_concat: {
        all: {
          dest: 'src/js/bower.js'
      }
    },
    uglify: {
       bower: {
        options: {
          mangle: true,
          compress: true
        },
          files: {
            'dist/js/bower.min.js': 'src/js/bower.js'
          } 
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    copy: {
          main: {
            files: [
              // includes files within path
/*              {expand: false, src: ['src/html/*'], dest: 'dist', filter: 'isFile'}

              // includes files within path and its sub-directories
              {expand: true, src: ['path/**'], dest: 'dest/'},

              // makes all src relative to cwd
              {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

*/              // flattens results to a single level
              {expand: true, flatten: true, src: ['src/html/**'], dest: 'dist/', filter: 'isFile'},
            ]
         }
      }    
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('clear-dist', 'clean')
  grunt.registerTask('sassy', ['sass']);
  grunt.registerTask('default', ['clear-dist','jshint','sassy','buildbower','buildcss','copy','test']);
  grunt.registerTask('concat', ['bower_concat']);
  grunt.registerTask('buildbower', [
    'bower_concat',
    'uglify:bower'
    ]);
  grunt.registerTask('buildcss',[
    'cssmin'
    ]);
  grunt.registerTask('test', 'run tests', function () {
    var done = this.async();
    require('child_process').exec('npm test', function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
};