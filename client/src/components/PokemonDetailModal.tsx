import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { getPokemonLocationDetail } from '../services/api';
import styles from './PokemonDetailModal.module.css';
interface PokemonDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: any;
  id: any;
}

export const PokemonDetailModal = ({ isOpen, onClose, pokemon, id }: PokemonDetailModalProps) => {
  
    const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {        
        const data = await getPokemonLocationDetail(Number(id));
        setLocationData(data);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    if (isOpen && id) {
      fetchLocationData();
    }

  }, [isOpen, id]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                  <div className="flex justify-between items-center">
                    <DialogTitle as="h3" className="text-2xl font-bold capitalize text-gray-900">
                      {pokemon.name}
                    </DialogTitle>
                    <button 
                      onClick={onClose} 
                      className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-center gap-4">
                      <img 
                        src={pokemon.sprites.front_default} 
                        alt={`${pokemon.name} front`}
                        className="w-32 h-32"
                      />
                      <img 
                        src={pokemon.sprites.back_default} 
                        alt={`${pokemon.name} back`}
                        className="w-32 h-32"
                      />
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold">Types:</h4>
                      <div className="flex gap-2 mt-1">
                        {pokemon.types.map((type: any) => (
                          <span 
                            key={type.type.name}
                            className="px-2 py-1 rounded text-sm text-white bg-blue-500"
                          >
                            {type.type.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold">Height:</h4>
                        <p>{pokemon.height / 10}m</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Weight:</h4>
                        <p>{pokemon.weight / 10}kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {locationData === null ? <> <div className="flex justify-center items-center h-full pt-3">
      <div className={styles.loader}></div>
    </div></> : (
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-semibold text-lg mb-2">Location Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Region</p>
                      <p className="font-medium capitalize">{(locationData as any)?.region?.name || 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">City</p>
                      <p className="font-medium capitalize">
                        {(locationData as any)?.names?.find((n: any) => n.language.name === 'en')?.name || (locationData as any)?.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};