import { Request, Response } from 'express';
import { fetchPokemonList, fetchPokemonDetail } from '../services/pokemon.service';

export const getPokemonList = async (req: Request, res: Response) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 20;
  
  console.debug(`[PokemonController] Fetching pokemon list with offset: ${offset}, limit: ${limit}`);
  
  try {
    const data = await fetchPokemonList(offset, limit);
    console.debug(`[PokemonController] Successfully fetched ${data.results.length} pokemon`);
    res.json(data);
  } catch (error) {
    console.error('[PokemonController] Error fetching pokemon list:', error);
    res.status(500).json({ error: 'Failed to fetch Pokemon list' });
  }
};

export const getPokemonDetail = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  
  console.debug(`[PokemonController] Fetching pokemon detail for ID: ${id}`);
  
  try {
    const data = await fetchPokemonDetail(id);
    console.debug(`[PokemonController] Successfully fetched pokemon: ${data.name}`);
    res.json(data);
  } catch (error) {
    console.error(`[PokemonController] Error fetching pokemon detail for ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch Pokemon detail' });
  }
};