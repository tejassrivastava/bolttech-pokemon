import { fetchPokemonList, fetchPokemonDetail, fetchLocationDetail } from '../pokemon.service';
import axios from 'axios';
import NodeCache from 'node-cache';

jest.mock('axios');
jest.mock('node-cache');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Pokemon Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('fetchPokemonList', () => {
    const mockListResponse = {
      data: {
        count: 1118,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
        ]
      }
    };

    it('should fetch pokemon list successfully', async () => {
      mockedAxios.get.mockResolvedValue(mockListResponse);
      const result = await fetchPokemonList(0, 20);
      expect(result).toEqual(mockListResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
      );
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      mockedAxios.get.mockRejectedValue(error);
      await expect(fetchPokemonList(0, 20))
        .rejects
        .toThrow('Failed to fetch Pokemon list: Error: API Error');
    });
  });

  describe('fetchPokemonDetail', () => {
    const mockDetailResponse = {
      data: {
        id: 1,
        name: 'bulbasaur',
        sprites: {
          front_default: 'front-url',
          back_default: 'back-url'
        },
        types: [{ type: { name: 'grass' } }],
        height: 7,
        weight: 69
      }
    };

    it('should fetch pokemon detail successfully', async () => {
      mockedAxios.get.mockResolvedValue(mockDetailResponse);
      const result = await fetchPokemonDetail(1);
      expect(result).toEqual(mockDetailResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/1'
      );
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      mockedAxios.get.mockRejectedValue(error);
      await expect(fetchPokemonDetail(1))
        .rejects
        .toThrow('Failed to fetch Pokemon detail: Error: API Error');
    });
  });

  describe('fetchLocationDetail', () => {
    const mockLocationResponse = {
      data: {
        areas: [{ name: 'canalave-city-area', url: 'https://pokeapi.co/api/v2/location-area/1/' }],
        id: 1,
        name: 'canalave-city',
        names: [
          {
            language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
            name: 'Canalave City'
          }
        ],
        region: { name: 'sinnoh', url: 'https://pokeapi.co/api/v2/region/4/' }
      }
    };
  
    it('should fetch location detail successfully', async () => {
      mockedAxios.get.mockResolvedValue(mockLocationResponse);
      const result = await fetchLocationDetail(1);
      expect(result).toEqual(mockLocationResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/location/1'
      );
    });
  
    it('should handle API errors', async () => {
      const error = new Error('API Error');
      mockedAxios.get.mockRejectedValue(error);
      await expect(fetchLocationDetail(1))
        .rejects
        .toThrow('Failed to fetch location detail: Error: API Error');
    });
  });});
