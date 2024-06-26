// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, PokemonErrorBoundary, fetchPokemon} from '../pokemon'

let pokemon
let error

const pokemonPromise = fetchPokemon('pikacahu').then(
  response => (pokemon = response),
  errorData => (error = errorData),
)

function PokemonInfo() {
  if (error) {
    throw error
  }
  if (!pokemon) {
    throw pokemonPromise
  }

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}
function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback="loading...">
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
