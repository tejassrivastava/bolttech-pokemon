import { useState, useEffect } from 'react';
import { getPokemonDetail } from '../services/api';
import { PokemonDetailModal } from './PokemonDetailModal';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [details, setDetails] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
      const data = await getPokemonDetail(Number(id));
      setDetails(data);
    };
    fetchDetails();
  }, [pokemon]);

  if (!details) return (
    <div className="flex justify-center items-center h-full">
      <div className={styles.loader}></div>
    </div>
  );

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      >
        <img 
          src={details.sprites.front_default} 
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h3 className="text-xl font-semibold text-center capitalize mt-2">
          {pokemon.name}
        </h3>
        <div className="flex justify-center gap-2 mt-2">
          {details.types.map((type: any) => (
            <span 
              key={type.type.name}
              className="px-2 py-1 rounded text-sm text-white bg-blue-500"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <PokemonDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemon={details}
      />
    </>
  );
};