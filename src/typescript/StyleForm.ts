import { Form } from './forms';
import { StyleEditorClass } from './StyleEditorClass';
import { StyleEditor } from './StyleEditor';

export class StyleForm extends StyleEditorClass {
  styleEditorInterior: HTMLElement;
  styleEditorDiv: HTMLElement;
  private form: Form

  constructor(styleEditor: StyleEditor, parentUiElement: HTMLElement) {
    super(styleEditor);
    this.createForm(parentUiElement);
  }

  private createForm(parentUiElement: HTMLElement) {
    this.form = new Form(
      this.styleEditor,
      parentUiElement
    );
    this.form.create();
  }

  show() {
    this.form.show();
  }

}
