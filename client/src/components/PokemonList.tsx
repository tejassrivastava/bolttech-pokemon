import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PokemonCard } from './PokemonCard';
import { getPokemonList } from '../services/api';

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemonList(offset);
      setPokemons(prev => [...prev, ...data.results]);
      setOffset(prev => prev + 20);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <InfiniteScroll
      dataLength={pokemons.length}
      next={fetchPokemons}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      className="bg-red grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
    >
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </InfiniteScroll>
  );
};