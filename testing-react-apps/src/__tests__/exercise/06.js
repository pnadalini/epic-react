// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import Location from '../../examples/location'

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 37.77,
      longitude: -122.41,
    },
  }
  const {promise, resolve} = deferred()

  navigator.geolocation.getCurrentPosition.mockImplementation(callback => {
    promise.then(() => {
      callback(fakePosition)
    })
  })
  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  resolve()

  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i))
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays an error to the user if the mock fails', async () => {
  const {promise, reject} = deferred()

  const errorMessage = 'error'
  const fakeError = new Error(errorMessage)

  navigator.geolocation.getCurrentPosition.mockImplementation(
    (_, errorCallback) => {
      promise.catch(() => {
        errorCallback(fakeError)
      })
    },
  )
  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  reject()

  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i))

  expect(screen.getByRole(/alert/i)).toHaveTextContent(errorMessage)
})

/*
eslint
  no-unused-vars: "off",
*/
