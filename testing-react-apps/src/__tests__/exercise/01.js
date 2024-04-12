// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {expect} from '@jest/globals'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const container = document.createElement('div')
  document.body.append(container)

  act(() => createRoot(container).render(<Counter />))

  const [decrementButton, incrementButton] =
    container.querySelectorAll('button')

  const messageDiv = container.firstChild.querySelector('div')

  expect(messageDiv.textContent).toBe('Current count: 0')

  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  // act(() => incrementButton.click())
  act(() => incrementButton.dispatchEvent(clickEvent))
  expect(messageDiv.textContent).toBe('Current count: 1')

  // act(() => decrementButton.click())
  act(() => decrementButton.dispatchEvent(clickEvent))
  expect(messageDiv.textContent).toBe('Current count: 0')

  // container.remove()
})

/* eslint no-unused-vars:0 */
