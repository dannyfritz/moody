module.exports = function(grunt) {
	grunt.initConfig({
		eslint: {
			target: ['lib/**.js']
		}
	});

	grunt.loadNpmTasks('grunt-eslint');
	
	grunt.registerTask('default', ['eslint']);
};
