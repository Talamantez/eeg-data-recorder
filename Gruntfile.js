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
    sass: {
      dist: {
        files: {
          'src/css/app.css': 'sass/app.sass',
          'src/css/other-app.css': 'sass/app.scss'
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
   
  }
    
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('sassy', ['sass']);

  grunt.registerTask('default', ['jshint','sassy','buildbower','buildcss','test']);
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