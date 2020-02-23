import { ControlOptions } from "leaflet";
import { Strings } from '../types'

export interface StyleEditorControlOptions extends ControlOptions {
  strings: Strings 
}

export const DefaultStyleEditorControlOptions: StyleEditorControlOptions = {
  position: 'topleft',
  strings: {
    title: 'Style Editor',
    cancel: 'cancel',
    cancelTitle: 'cancel'
  }
}

