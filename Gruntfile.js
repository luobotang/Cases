module.exports = function (grunt) {

	var banner = '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */';
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			options: {
				banner: banner,
				compress: true,
				plugins: [new (require('less-plugin-npm-import'))()]
			},
			build: {
				src: "less/main.less",
				dest: "app/css/main.css"
			}
		},
		browserify: {
			options: {
				banner: banner,
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