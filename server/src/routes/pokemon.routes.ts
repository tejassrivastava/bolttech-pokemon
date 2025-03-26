import { Router } from 'express';
import { getPokemonList, getPokemonDetail, getLocationDetail } from '../controllers/pokemon.controller';

const router = Router();

router.get('/list', getPokemonList);
router.get('/location/:id', getLocationDetail); 
router.get('/:id', getPokemonDetail);

export default router;