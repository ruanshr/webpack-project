export function setLS(key, item) {
  localStorage.setItem(key, item);
}

export let count = 1

export let increment: any = function increment () {
  count++
}

setTimeout(() => {
  increment = 3333;
})