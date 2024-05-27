// testing custom hooks
// http://localhost:3000/counter-hook
import {act, render} from '@testing-library/react'
import useCounter from '../../components/use-counter'

let result
function TestComponent() {
  result = useCounter()
  return null
}

test('exposes the count and increment/decrement functions', async () => {
  render(<TestComponent />)
  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
