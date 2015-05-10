module.exports = function(grunt) {

  grunt.initConfig({
    clean: 
      ["dist/", "src/css/*"],
    jshint: {
      files: ['Gruntfile.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist: {
        options:{
            loadPath: require('node-refills').includePaths
            },
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
  // Take out cssmin, do this with sass
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
              {expand: true, src: ['path/**'], dest: 'dest/'},
              {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
              {expand: true, flatten: true, src: ['src/views/**'], dest: 'dist/', filter: 'isFile'},
	            {expand: true, flatten: true, src: ['src/img/**'], dest: 'dist/img/', filter:'isFile'}
            ]
         }
      }    
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('clear-dist', 'clean');
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
