// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {error: null}
//   }
//   static getDerivedStateFromError(error) {
//     return {error}
//   }
//   render() {
//     if (this.state.error) {
//       return <this.props.FallbackComponent error={this.state.error} />
//     }
//     return this.props.children
//   }
// }

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemonData: null,
    status: 'idle',
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) return

    setState({status: 'pending'})

    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({status: 'resolved', pokemonData})
      })
      .catch(error => {
        setState({status: 'rejected', error})
      })
  }, [pokemonName])

  switch (state.status) {
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw state.error
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemonData} />

    case 'idle':
    default:
      return 'Submit a pokemon'
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleOnReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleOnReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
