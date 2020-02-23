import { StyleEditorClassOptions, StyleEditorControlOptions, DefaultStyleEditorClassOptions, DefaultStyleEditorControlOptions } from '.'

export interface StyleEditorOptions extends StyleEditorControlOptions, StyleEditorClassOptions { }

export const DefaultStyleEditorOptions = {
  ...DefaultStyleEditorClassOptions,
  ...DefaultStyleEditorControlOptions,
  strings: {
    title: DefaultStyleEditorControlOptions.strings.title,
    cancel: DefaultStyleEditorControlOptions.strings.cancel,
    cancelTitle: DefaultStyleEditorControlOptions.strings.cancelTitle,
    tooltip: DefaultStyleEditorClassOptions.strings.tooltip,
    hide: DefaultStyleEditorClassOptions.strings.hide
  }
}
