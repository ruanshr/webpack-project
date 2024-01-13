export function setLS(key, value) {
  const val = value ? JSON.stringify(value) : value
  localStorage.setItem(key, value)
}

export function getLS(key) {
  const val = localStorage.getItem(key)
  return val ? JSON.parse(val) : val
}
