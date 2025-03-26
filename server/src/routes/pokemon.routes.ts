import { Router } from 'express';
import { PokemonService } from '../services/pokemon.service';

const router = Router();

router.get('/list', async (req, res) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 20;
    const data = await PokemonService.getPokemonList(offset, limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon list' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await PokemonService.getPokemonDetail(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon details' });
  }
});

export default router;