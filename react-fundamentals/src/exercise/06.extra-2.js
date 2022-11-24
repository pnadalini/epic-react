// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react"

function UsernameForm({onSubmitUsername}) {
  const ref = React.useRef()
  const [errorMessage, setErrorMessage] = React.useState(null)
  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmitUsername(ref.current.value)
  }
  const handleChange = (e) => {
    const value = e.target.value
    const isValid = value === value.toLowerCase()
    setErrorMessage(isValid ? null : "Username must be lower case")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          id="usernameInput"
          type="text"
          ref={ref}
          onChange={handleChange}
        />
      </div>
      {errorMessage ? (
        <span role="alert" style={{color: "red"}}>
          {errorMessage}
        </span>
      ) : null}
      <button type="submit" disabled={!!errorMessage}>
        Submit
      </button>
    </form>
  )
}

function App() {
  const onSubmitUsername = (username) => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
