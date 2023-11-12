import { Toast } from "../components/generic/toast.js"

export function copyText(text) {
  navigator.clipboard.writeText(text)
  Toast.notify("Copied to clipboard")
}