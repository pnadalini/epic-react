// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const countReducer = (currentState, newState) => {
  console.info(currentState, newState)
  if (typeof newState === 'function') {
    return newState(currentState)
  }
  return newState
}

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  // const increment = () => setState({count: count + step})
  const increment = () =>
    setState(currentState => ({count: currentState.count + step}))

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
