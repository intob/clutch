/**
 * @param {File} file 
 * @returns {Promise<String>}
 */
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = () => {
      reject()
    }
    reader.readAsText(file)
  })
}