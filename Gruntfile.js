module.exports = function (grunt) {
	// 项目配置
	grunt.initConfig({
		less: {
			development: {
				options: {
					compress: true
				},
				files: {
					"app/css/main.css": "less/main.less"
				}
			}
		},
		browserify: {
			options: {
				transform: ['coffeeify'],
				browserifyOptions: {
					extensions: ['.js', '.coffee']
				}
			},
			p_index: {
				src: 'js/index.main.js',
				dest: 'app/js/index.js'
			},
			P_case: {
				src: 'js/case.main.js',
				dest: 'app/js/case.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-browserify');

};