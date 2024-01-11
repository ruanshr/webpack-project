import { count, increment } from "./utils";

console.log(count)

setTimeout(() => {
  console.log(count, "--------", increment)
})