// Cache resources
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import {createResource} from '../utils'

function PokemonInfo({pokemonResource}) {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300,
  busyMinDurationMs: 700,
}

const PokemonResouceCacheContext = React.createContext()

const usePokeonResourceCache = () => {
  return React.useContext(PokemonResouceCacheContext)
}

function createPokemonResource(pokemonName) {
  return createResource(fetchPokemon(pokemonName))
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)
  const getPokemonResource = usePokeonResourceCache()

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    startTransition(() => {
      setPokemonResource(getPokemonResource(pokemonName))
    })
  }, [pokemonName, startTransition, getPokemonResource])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className={`pokemon-info ${isPending ? 'pokemon-loading' : ''}`}>
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </PokemonErrorBoundary>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

const initialValue = {}

const PokemonCacheProvider = ({children, cacheTime}) => {
  const cache = React.useRef(initialValue)
  const expirations = React.useRef({})

  React.useEffect(() => {
    const interval = setInterval(() => {
      for (const [name, time] of Object.entries(expirations.current)) {
        if (time <= Date.now()) {
          delete cache.current[name]
          delete expirations.current[name]
        }
      }
    }, 1_000)
    return () => clearInterval(interval)
  }, [])

  const getPokemonResource = React.useCallback(
    name => {
      const pokemonName = name.toLowerCase()
      let pokemonResource = cache.current[pokemonName]
      if (!pokemonResource) {
        pokemonResource = createPokemonResource(pokemonName)
        cache.current[pokemonName] = pokemonResource
      }
      expirations.current[pokemonName] = Date.now() + cacheTime
      return pokemonResource
    },
    [cache, cacheTime],
  )

  return (
    <PokemonResouceCacheContext.Provider value={getPokemonResource}>
      {children}
    </PokemonResouceCacheContext.Provider>
  )
}

function AppWithProvider() {
  const cacheTime = 5_000
  return (
    <PokemonCacheProvider cacheTime={cacheTime}>
      <App />
    </PokemonCacheProvider>
  )
}

export default AppWithProvider
