import { LitElement, html, css } from "lit"

class Tabs extends LitElement {
  static styles = css`
    nav {
      display: flex;
    }

    nav > ::slotted([slot="tab"]) {
      border: 2px solid transparent;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: var(--light-color-3);
      cursor: pointer;
      flex: 1 1 auto;
      margin-bottom: -2px;
      padding: 1em 2em;
      text-align: center;
    }

    nav > ::slotted([slot="tab"]:hover) {
      background-color: var(--lighten-color-1);
      color: var(--light-color-1);
      transition: all 200ms linear;
    }

    nav > ::slotted([slot="tab"][selected]) {
      background-color: var(--lighten-color-1);
      border-bottom-color: transparent;
      transition: all 200ms ease;
    }

    nav > ::slotted([slot="tab"]) {
      border-bottom-color: var(--panel-border-color);
    }

    ::slotted([slot="panel"]) {
      background-color: var(--lighten-color-1);
      display: none;
      justify-content: center;
      padding: 20px;
      align-items: center;
      justify-content: center;
      border-radius: 0 0 10px 10px;
    }

    ::slotted([slot="panel"][selected]) {
      display: flex;
    }
  `

  static properties = {
    selected: {}
  }

  connectedCallback() {
    super.connectedCallback()
    this.tabs.forEach(tab => {
      if (tab.getAttribute("tab") === this.selected) {
        tab.setAttribute("selected", "")
      } else {
        tab.removeAttribute("selected")
      }
    })
    this.panels.forEach(panel => {
      if (panel.getAttribute("tab") === this.selected) {
        panel.setAttribute("selected", "")
      } else {
        panel.removeAttribute("selected")
      }
    })
  }

  handleSelect(e) {
    const segments = window.location.hash.split("/")
    segments[segments.length-1] = e.target.getAttribute("tab")
    window.location = segments.join("/")
  }

  render() {
    return html`
    <nav>
      <slot name="tab" role="button" @click=${e => this.handleSelect(e)}></slot>
    </nav>
    <slot name="panel"></slot>
    `
  }

  get tabs() {
    return Array.from(this.querySelectorAll("[slot=tab]"))
  }

  get panels() {
    return Array.from(this.querySelectorAll("[slot=panel]"))
  }
}
customElements.define("cl-tabs", Tabs)