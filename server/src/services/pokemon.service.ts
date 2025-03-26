import axios from 'axios';
import NodeCache from 'node-cache';
import { PokemonListResponse, PokemonDetail } from '../types/pokemon.types';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour
const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (offset: number = 0, limit: number = 20): Promise<PokemonListResponse> => {
  const cacheKey = `pokemon-list-${offset}-${limit}`;
  console.debug(`[PokemonService] Checking cache for pokemon list with key: ${cacheKey}`);
  
  const cachedData = cache.get<PokemonListResponse>(cacheKey);
  if (cachedData) {
    console.debug('[PokemonService] Returning cached pokemon list data');
    return cachedData;
  }

  try {
    console.debug(`[PokemonService] Fetching pokemon list from API with offset: ${offset}, limit: ${limit}`);
    const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    console.debug(`[PokemonService] Successfully fetched ${response.data.results.length} pokemon`);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('[PokemonService] Error fetching pokemon list:', error);
    throw new Error(`Failed to fetch Pokemon list: ${error}`);
  }
};

export const fetchPokemonDetail = async (id: number): Promise<PokemonDetail> => {
  const cacheKey = `pokemon-detail-${id}`;
  console.debug(`[PokemonService] Checking cache for pokemon detail with key: ${cacheKey}`);
  
  const cachedData = cache.get<PokemonDetail>(cacheKey);
  if (cachedData) {
    console.debug(`[PokemonService] Returning cached pokemon detail data for ID: ${id}`);
    return cachedData;
  }

  try {
    console.debug(`[PokemonService] Fetching pokemon detail from API for ID: ${id}`);
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    console.debug(`[PokemonService] Successfully fetched pokemon: ${response.data.name}`);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error(`[PokemonService] Error fetching pokemon detail for ID ${id}:`, error);
    throw new Error(`Failed to fetch Pokemon detail: ${error}`);
  }
};