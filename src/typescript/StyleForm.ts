import { Form } from './forms';
import { StyleEditorClass } from './StyleEditorClass';
import { StyleEditor } from './StyleEditor';

export class StyleForm extends StyleEditorClass {
  styleEditorInterior: HTMLElement;
  styleEditorDiv: HTMLElement;
  private form: Form

  constructor(styleEditor: StyleEditor) {
    super(styleEditor);
    this.createForm();
  }

  private createForm() {
    this.form = new Form(
      this.styleEditor,
      this.styleEditor.interiorEditorUI
    );
    this.form.create();
  }

  show() {
    this.form.show();
  }

}
