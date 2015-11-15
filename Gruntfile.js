module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    env: {
      build: {
        NODE_ENV: 'production'
      }
    },

    browserify: {
      dev: {
        options: {
          debug: true,
          transform: ['reactify']
        },
        files: {
          'dist/js/build.js': ['src/js/**/*.js','src/js/**/*.jsx']
        }
      },
      build: {
        options: {
          debug: false,
          transform: ['reactify']
        },
        files: {
          'dist/js/build.js': ['src/js/**/*.js','src/js/**/*.jsx']
        }
      }
    },    
    copy: {
        main:{
            files:[
                {
                  expand: true, 
                  src: ['src/html/*.html'], 
                  dest: 'dist/',
                  flatten: true
                },
                {
                  expand: true, 
                  src: ['src/assets/fonts/*'], 
                  dest: 'dist/fonts/', 
                  filter: 'isFile', 
                  flatten: true
                }
            ]
        }
    },    
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
    concat: {
        options: {
            // define a string to put between each file in the concatenated output
            separator: ';'
        },
        dist: {
            // the files to concatenate
            src: ['bower_components/socket.io-client/socket.io.js','bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap/dist/js/bootstrap.js', 'bower_components/bootstrap-select/dist/js/bootstrap-select.js'],
            // the location of the resulting JS file
            dest: 'dist/js/<%= pkg.name %>.js'
        }
    },
    uglify: {
       bower: {
        options: {
          mangle: true,
          compress: true
        },
          files: {
            'dist/js/<%= pkg.name %>.js': 'dist/js/<%= pkg.name %>.js'
          } 
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      combine: {
        files: {
          'dist/css/<%= pkg.name %>.css': ['bower_components/bootstrap/dist/css/bootstrap.css','bower_components/bootstrap-select/dist/css/bootstrap-select.css','src/css/*.css']
        }
      }
    },
    clean: [ 'dist' ]
  });
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('cleanit', ['clean']);

  grunt.registerTask('cssit',['cssmin']);

  grunt.registerTask('concatit', ['concat']);

  grunt.registerTask('uglyit', ['uglify']);
  
  grunt.registerTask('hintit', ['jshint']);

  grunt.registerTask('copyit', ['copy']);

  grunt.registerTask('test', 'run tests', function () {
    var done = this.async();
    require('child_process').exec('npm test', function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });

  grunt.registerTask('notest', ['cleanit', 'cssit', 'concatit', 'uglyit', 'copyit','env:build', 'browserify:build']);
  grunt.registerTask('default', ['cssit', 'concatit', 'uglyit', 'hintit', 'test']);

};
