import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getPokemonList = async (offset: number = 0, limit: number = 20) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/list?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const getPokemonDetail = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
  return response.data;
};