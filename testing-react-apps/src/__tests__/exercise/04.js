// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData
  // const handleSubmit = jest.fn()
  const handleSubmit = data => (submittedData = data)
  render(<Login onSubmit={handleSubmit} />)

  const username = 'username'
  const password = 'password'

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)

  const submitButton = screen.getByRole('button', {name: /submit/i})
  await userEvent.click(submitButton)

  expect(submittedData).toEqual({username, password})
})

/*
eslint
  no-unused-vars: "off",
*/
