// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'
import {handlers} from 'test/server-handlers'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText('Welcome')).toBeInTheDocument()
  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`logging without a password`, async () => {
  render(<Login />)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test(`getting a 500 error`, async () => {
  const errorMessage = 'server error'
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: errorMessage}))
      },
    ),
  )

  render(<Login />)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})
