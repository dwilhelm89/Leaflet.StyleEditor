import { Form, FormClass } from './forms';
import { StyleEditorClass } from './StyleEditorClass';
import { StyleEditor } from './StyleEditor';
import { Map } from 'leaflet';

export class StyleForm extends StyleEditorClass {
  styleEditorInterior: HTMLElement;
  styleEditorDiv: HTMLElement;
  forms: Form[] = [];

  constructor(styleEditor: StyleEditor, map: Map, forms: FormClass[]) {
    super(styleEditor);
    this.createForms(forms);
  }

  createForms(forms: FormClass[]) {
    forms.forEach((formClass: FormClass) => {
      const form = new formClass(
        this.styleEditor,
        this.styleEditor.interiorEditorUI
      );
      form.create();
      this.forms.push(form);
    });
  }

  show() {
    // hide all forms
    this.forms.forEach((form) => {
      form.hide();
    });
    // show first form
    this.forms.find((form: Form) => form.whenToShow(this.styleEditor.getCurrentLayers()))?.show()
  }

}
