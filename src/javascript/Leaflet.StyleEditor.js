import 'leaflet'
import setupColorElement from './FormElements/ColorElement'
import setupOpacityElement from './FormElements/OpacityElement'

L.StyleEditor = {
  marker: {},
  forms: {},
  formElements: {}
}

require('./Util').setupUtil(L)

require('./FormElements/FormElement').setupFormElement(L)
setupColorElement(L)
require('./FormElements/DashElement').setupDashElement(L)
require('./FormElements/IconElement').setupIconElement(L)
setupOpacityElement(L)
require('./FormElements/PopupContentElement').setupPopupContentElement(L)
require('./FormElements/SizeElement').setupSizeElement(L)
require('./FormElements/WeightElement').setupWeightElement(L)

require('./Form/Form').setupForm(L)
require('./Form/GeometryForm').setupGeometryForm(L)
require('./Form/MarkerForm').setupMarkerForm(L)

require('./Marker/Marker').setupMarker(L)
require('./Marker/DefaultMarker').setupDefaultMarker(L)
require('./Marker/GlyphiconMarker').setupGlyphiconMarker(L)

require('./StyleForm').setupStyleForm(L)
require('./Control').setupControl(L)

export default L
