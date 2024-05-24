// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import Location from '../../examples/location'

import {useCurrentPosition} from 'react-use-geolocation'
import {act} from 'react-test-renderer'

jest.mock('react-use-geolocation')

beforeAll(() => {})

test('displays the users current location', async () => {
  let setReturnValue
  const useMockCurrentPosition = () => {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  const errorMessage = 'error'

  act(() => {
    setReturnValue([, {message: errorMessage}])
  })

  expect(screen.getByRole(/alert/i)).toHaveTextContent(errorMessage)
})

/*
eslint
  no-unused-vars: "off",
*/
