import { PokemonService } from '../pokemon.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PokemonService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemonList', () => {
    it('should fetch pokemon list successfully', async () => {
      const mockResponse = {
        data: {
          count: 1118,
          next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
          previous: null,
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
          ]
        }
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await PokemonService.getPokemonList(0, 20);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getPokemonDetail', () => {
    it('should fetch pokemon detail successfully', async () => {
      const mockResponse = {
        data: {
          id: 1,
          name: 'bulbasaur',
          types: [{ type: { name: 'grass' } }]
        }
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await PokemonService.getPokemonDetail(1);
      expect(result).toEqual(mockResponse.data);
    });
  });
});