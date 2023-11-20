import { html, css, LitElement } from "lit"

class FileInput extends LitElement {
  static styles = css`
  input {
    display: none;
  }
  `

  static properties = {
    accept: { attribute: true },
    multiple: { attribute: true, type: Boolean },
    disabled: { attribute: true, type: Boolean }
  }

  render() {
    return html`
    <input type="file" @change=${this.handleChange} accept=${this.accept} ?multiple=${this.multiple} />
    <icon-button icon="upload" @click=${this.handleUploadClick} ?disabled=${this.disabled}>Upload</icon-button>
    `
  }

  handleChange(e) {
    this.dispatchEvent(new CustomEvent("change", {
      bubbles: true,
      composed: true,
      detail: {
        files: e.target.files
      }
    }))
    e.target.value = ""
  }

  handleUploadClick() {
    this.fileInput.click()
  }

  get fileInput() {
    return this.renderRoot.querySelector("input")
  }
}
customElements.define("file-input", FileInput)