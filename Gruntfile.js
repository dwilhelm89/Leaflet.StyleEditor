module.exports = function (grunt) {
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
          'src/javascript/Leaflet.StyleEditor.js',
          'src/javascript/Util.js',

          'src/javascript/FormElements/FormElement.js',
          'src/javascript/FormElements/IconElement.js',
          'src/javascript/FormElements/ColorElement.js',
          'src/javascript/FormElements/SizeElement.js',
          'src/javascript/FormElements/OpacityElement.js',
          'src/javascript/FormElements/WeightElement.js',
          'src/javascript/FormElements/DashElement.js',
          'src/javascript/FormElements/PopupContentElement.js',

          'src/javascript/Form/Form.js',
          'src/javascript/Form/GeometryForm.js',
          'src/javascript/Form/MarkerForm.js',

          'src/javascript/Marker/Marker.js',
          'src/javascript/Marker/DefaultMarker.js',
          'src/javascript/Marker/GlyphiconMarker.js',

          'src/javascript/StyleForm.js',

          'src/javascript/Control.js'
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
    },

    'gh-pages': {
      options: {
        base: 'dist',
        only: [
          'javascript/Leaflet.StyleEditor.min.js',
          'css/Leaflet.StyleEditor.min.css'
        ]
      },
      src: [
        'javascript/Leaflet.StyleEditor.min.js',
        'css/Leaflet.StyleEditor.min.css'
      ]
    }
  })
  grunt.loadNpmTasks('grunt-contrib-uglify-es')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-gh-pages')

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin'])
}
