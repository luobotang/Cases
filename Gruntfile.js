module.exports = function(grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //watch: {
    //  css: {
    //    files: ["less/*.less"],
    //    tasks: ['less']
    //  },
    //  js: {
    //    files: [
    //      'js/src/*.js',
    //      'Gruntfile.js'
    //    ],
    //    tasks: ['jshint']
    //  }
    //},
    //jshint: {
    //  options: {
    //    jshintrc: '.jshintrc'
    //  },
    //  all: ['Gruntfile.js', 'js/src/2048_game.js', 'js/src/2048_numbers.js']
    //},
    less: {
      development: {
        options: {
          compress: true
        },
        files: {
          "css/main.css": "less/main.less"
        }
      }
    },
    connect: {
      // todo: config a server to run site
      server: {
        options: {
          port: 8000,
          hostname: 'localhost',
          base: 'html',
          middleware: function (connect) {
            return [
              function (req, response, netx) {
                connect.static(require('path').resolve('.'))
              }
            ];
          }
        }
      }
    }
  });
  // 加载Grunt插件
  //grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // 注册grunt默认任务
  //grunt.registerTask('default', ['watch']);
};
