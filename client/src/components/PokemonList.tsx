import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PokemonCard } from './PokemonCard';
import { getPokemonList } from '../services/api';
import styles from './PokemonList.module.css';
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
      loader={
        <div className="flex justify-center items-center w-full col-span-full py-8">
          <div className={styles.loader}></div>
        </div>
      }
      className="bg-red grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
    >
      {pokemons && pokemons.map((pokemon, index) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        return (
          <PokemonCard 
            key={`${pokemon.name}-${id}-${index}`} 
            pokemon={pokemon} 
          />
        );
      })}
    </InfiniteScroll>
  );
};