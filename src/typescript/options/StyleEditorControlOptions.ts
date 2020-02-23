import { ControlOptions } from "leaflet";

export interface StyleEditorControlOptions extends ControlOptions {
  title?: string
  cancel?: string
  cancelTitle?: string
}

export const DefaultStyleEditorControlOptions : StyleEditorControlOptions = {
  position: 'topleft',
  title: 'Style Editor',
  cancel: 'cancel',
  cancelTitle: 'cancel'
}

