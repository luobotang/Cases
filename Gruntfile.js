module.exports = function (grunt) {
	// 项目配置
	grunt.initConfig({
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
		browserify: {
			index: {
				src: '',
				dest: ''
			},
			casepage: {
				src: '',
				dest: ''
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-browserify');

};