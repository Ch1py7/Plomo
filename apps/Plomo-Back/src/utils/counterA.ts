export module CounterA {
  let value = 0
  let goal: number

  export const setGoal = (newGoal: number) => {
    goal = newGoal
  }

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

  export const getGoal = () => {
    return goal
  }
}