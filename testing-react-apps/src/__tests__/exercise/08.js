// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
// import Counter from 'examples/counter-hook'

const TestComponent = () => {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<TestComponent />)
  const message = screen.getByText(/current count/i)
  expect(message.textContent).toContain('Current count: 0')

  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})

  await userEvent.click(increment)
  expect(message.textContent).toContain('Current count: 1')

  await userEvent.click(decrement)
  expect(message.textContent).toContain('Current count: 0')
})

/* eslint no-unused-vars:0 */
