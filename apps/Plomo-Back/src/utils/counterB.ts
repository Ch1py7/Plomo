export module CounterB {
  let value = 0

  export const increment = () => {
    value++
    return value
  }

  export const reset = () => {
    value = 0
  }

  export const getValue = () => {
    return value
  }
}