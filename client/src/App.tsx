import './App.css'
import { PokemonList } from './components/PokemonList'

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokémon Explorer</h1>
      <PokemonList />
    </div>
  )
}

export default App
