// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react"

function UsernameForm({onSubmitUsername}) {
  const [value, setValue] = React.useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmitUsername(value)
  }

  const handleChange = (e) => {
    setValue(e.target.value.toLowerCase())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          id="usernameInput"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = (username) => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
