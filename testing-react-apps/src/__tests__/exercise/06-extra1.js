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
  const fakePosition = {
    coords: {
      latitude: 37.77,
      longitude: -122.41,
    },
  }
  let setReturnValue
  const useMockCurrentPosition = () => {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
