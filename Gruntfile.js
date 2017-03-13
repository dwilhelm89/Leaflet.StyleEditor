module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'dist/javascript/Leaflet.StyleEditor.min.js': 'dist/javascript/Leaflet.StyleEditor.min.js'
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'src/javascript/Leaflet.StyleForms.js',
                    'src/javascript/Leaflet.StyleEditor.js'

                ],
                dest: 'dist/javascript/Leaflet.StyleEditor.min.js'
            }
        },

        cssmin: {
            combine: {
                files: {
                    'dist/css/Leaflet.StyleEditor.min.css': ['src/css/Leaflet.StyleEditor.css']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
