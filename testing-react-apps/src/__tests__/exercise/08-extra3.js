// testing custom hooks
// http://localhost:3000/counter-hook
import {act, renderHook} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', async () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)

  act(() => result.current.increment())
  expect(result.current.count).toBe(4)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', async () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})
  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(2)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
