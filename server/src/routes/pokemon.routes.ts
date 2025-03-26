import { Router } from 'express';
import { getPokemonList, getPokemonDetail } from '../controllers/pokemon.controller';

const router = Router();

router.get('/list', getPokemonList);
router.get('/:id', getPokemonDetail);

export default router;