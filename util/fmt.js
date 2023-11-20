export function fmtDate(date) {
  const parsed = new Date(date*1000)
  if (parsed.toDateString() === "Invalid Date") {
    return
  }
  return parsed.toLocaleString().slice(0, -3)
}

export function fmtDateForInput(date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function fmtSize(bytes) {
  const kB = Math.floor(bytes/1000)
  if (kB < 1) {
    return `${bytes}B`
  }
  const MB = Math.floor(bytes/1000000)
  if (MB < 1) {
    return `${kB}kB`
  }
  const GB = bytes/1000000000
  if (GB < 1) {
    return `${MB}MB`
  }
  return `${GB.toFixed(2)}GB`
}

export function fmtDuration(durationInMs) {
  const min = Math.floor(durationInMs/1000/60)
  const sec = Math.round(durationInMs/1000 % 60)
  return `${min}:${sec.toString().padStart(2, "0")}`
}

export function fmtId(id, paddingChar=".", paddingLength=3) {
  return `${id.slice(0, 4)}${"".padStart(paddingLength, paddingChar)}${id.slice(-4)}`
}

export function fmtEmail(email) {
  return email.split("@")[0].toLowerCase()
}

export function buildSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}