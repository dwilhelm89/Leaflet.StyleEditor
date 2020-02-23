import { StyleEditorClassOptions, StyleEditorControlOptions, DefaultStyleEditorClassOptions, DefaultStyleEditorControlOptions  } from '.'

export interface StyleEditorOptions extends StyleEditorControlOptions, StyleEditorClassOptions {}

export const DefaultStyleEditorOptions = { ...DefaultStyleEditorClassOptions, ...DefaultStyleEditorControlOptions }
