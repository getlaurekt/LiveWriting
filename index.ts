type TypeInput = HTMLInputElement;
type TypeLabel = HTMLLabelElement;

interface InterfaceLiveWriting {
  input: TypeInput;
  label: TypeLabel;
  defaultInputText: string;
  placeholder: string;
}

class LiveWriting implements InterfaceLiveWriting {
  readonly input: TypeInput;
  readonly label: TypeLabel;
  readonly defaultInputText: string = "";
  readonly placeholder: string;

  constructor(input: TypeInput, label: TypeLabel, placeholder: string) {
    this.input = input;
    this.label = label;
    this.placeholder = placeholder;
    this.input.addEventListener("focusout", this.onFocusOut.bind(this));
    this.input.addEventListener("keydown", this.onKeyDown.bind(this));
    this.setDefault();
  }
  private setDefault() {
    return (this.label.innerText = this.placeholder), (this.input.value = "");
  }
  private checkInput() {
    const inputText = this.input.value;
    const labelText = this.label.innerText;
    const isEmptyInput = inputText === "";
    const isLabelPlaceholder = labelText === this.placeholder;
    if (isEmptyInput && !isLabelPlaceholder) {
      return this.setDefault();
    } else if (!isEmptyInput) {
      return this.setLabelText(), this.resetInputText();
    }
  }
  private setLabelText() {
    return (this.label.innerText = this.input.value);
  }
  private resetInputText() {
    return (this.input.value = this.defaultInputText);
  }
  private onFocusOut(event: Event) {
    if (this.checkInput()) return;
  }
  private onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (this.checkInput()) return;
    }
  }
}

const Input = document.querySelector("#text-input") as TypeInput;
const Label = document.querySelector("#text-displayer") as TypeLabel;
const InlineEditing = new LiveWriting(Input, Label, "Placeholder");
