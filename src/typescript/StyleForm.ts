import { Form, FormClass } from './forms';
import { StyleEditorClass } from './StyleEditorClass';
import { StyleEditor } from './StyleEditor';
import { DomEvent, DomUtil, Map } from 'leaflet';

export class StyleForm extends StyleEditorClass {
  styleEditorInterior: HTMLElement;
  styleEditorDiv: HTMLElement;
  forms: Form[] = [];

  constructor(styleEditor: StyleEditor, map: Map, forms: FormClass[]) {
    super(styleEditor);
    this.createForms(forms);
    this.addDOMEvents(map);
  }

  addDOMEvents(map: Map) {
    DomEvent.addListener(map as unknown as HTMLElement, 'click', this.lostFocus, this);
    DomEvent.addListener(
      this.styleEditor.editorUI,
      'click',
      this.lostFocus,
      this
    );
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

  private lostFocus(e) {
    let parent = e.target;
    for (let i = 0; i < 10; i++) {
      if (!parent) {
        break;
      }
      if (
        !!parent.className &&
        DomUtil.hasClass(parent, 'leaflet-styleeditor-interior')
      ) {
        return;
      }
      parent = parent.parentNode;
    }
  }
}
