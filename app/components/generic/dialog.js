import { html, css, LitElement } from "lit"

class Dialog extends LitElement {

  static styles = css`
  :modal {
    background-color: var(--lighten-color-1);
    color: var(--light-color-2);
    padding: 20px;
    border-radius: 10px;
    max-width: 600px;
    border: none;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 360px;
  }

  dialog::backdrop {
    background: rgba(0,0,0,.85);
    backdrop-filter: blur(4px);
  }

  .dialog-buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin: 20px 0;
  }
  `

  connectedCallback() {
    super.connectedCallback()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
  }

  render() {
    return html`
    <dialog>
      <form method="dialog">
        <slot></slot>
      </form>
      <div class="dialog-buttons">
        <cl-button @click=${this.handleOk}>OK</cl-button>
        <cl-button @click=${this.handleCancel}>Cancel</cl-button>
      </div>
    </dialog>
    `
  }

  getValues() {
    const values = {}
    const slotElements = this.slot.assignedElements({ flatten: true })
    slotElements.forEach(el => {
      if ([ "INPUT", "TEXTAREA", "SELECT", "cl-INPUT", "cl-TEXTAREA", "cl-SELECT" ]
        .includes(el.tagName)) {
        values[el.getAttribute("name")] = el.value
      } else {
        el.querySelectorAll(
          "input,textarea,select,cl-input,cl-textarea,cl-select").forEach(i => {
          values[i.getAttribute("name")] = i.value
        })
      }
    })
    return values
  }

  showDialog() {
    this.dialog.showModal()
  }

  handleOk() {
    this.dialog.close()
    this.dispatchEvent(new CustomEvent("ok", {
      bubbles: false,
      composed: true,
      detail: {
        values: this.getValues()
      }
    }))
  }

  handleCancel() {
    this.dialog.close()
    this.dispatchEvent(new CustomEvent("cancel", {
      bubbles: false,
      composed: true
    }))
  }

  get dialog() {
    return this.renderRoot.querySelector("dialog")
  }

  get slot() {
    return this.renderRoot.querySelector("slot")
  }
}
customElements.define("cl-dialog", Dialog)