module.exports = function (grunt) {
  grunt.initConfig({
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
  grunt.loadNpmTasks('grunt-gh-pages')

  grunt.registerTask('default', ['gh-pages'])
}
