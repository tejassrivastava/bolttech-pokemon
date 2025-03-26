import axios from 'axios';
import NodeCache from 'node-cache';
import { PokemonListResponse, PokemonDetail } from '../types/pokemon.types';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour
const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonService {
  static async getPokemonList(offset: number = 0, limit: number = 20): Promise<PokemonListResponse> {
    const cacheKey = `pokemon-list-${offset}-${limit}`;
    const cachedData = cache.get<PokemonListResponse>(cacheKey);

    if (cachedData) return cachedData;

    const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    cache.set(cacheKey, response.data);
    return response.data;
  }

  static async getPokemonDetail(id: number): Promise<PokemonDetail> {
    const cacheKey = `pokemon-detail-${id}`;
    const cachedData = cache.get<PokemonDetail>(cacheKey);

    if (cachedData) return cachedData;

    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  }
}