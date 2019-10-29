import 'leaflet'

import setupColorElement from './FormElements/ColorElement'
import setupFormElement from './FormElements/FormElement'
import setupDashElement from './FormElements/DashElement'
import setupIconElement from './FormElements/IconElement'
import setupOpacityElement from './FormElements/OpacityElement'
import setupPopupContentElement from './FormElements/PopupContentElement'
import setupSizeElement from './FormElements/SizeElement'
import setupWeightElement from './FormElements/WeightElement'

import setupForm from './Form/Form'
import setupGeometryForm from './Form/GeometryForm'
import setupMarkerForm from './Form/MarkerForm'

import setupMarker from './Marker/Marker'
import setupDefaultMarker from './Marker/DefaultMarker'
import setupGlyphiconMarker from './Marker/GlyphiconMarker'

import setupStyleForm from './StyleForm'
import setupControl from './Control'

import setupUtil from './Util'

require('../css/Leaflet.StyleEditor.css')

L.StyleEditor = {
  marker: {},
  forms: {},
  formElements: {}
}

setupUtil()

setupFormElement()
setupColorElement()
setupDashElement()
setupIconElement()
setupOpacityElement()
setupPopupContentElement()
setupSizeElement()
setupWeightElement()

setupForm()
setupGeometryForm()
setupMarkerForm()

setupMarker()
setupDefaultMarker()
setupGlyphiconMarker()

setupStyleForm()
setupControl()

export default L
