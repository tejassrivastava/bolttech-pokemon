export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    front_default: string;
    back_default: string;
  };
  height: number;
  weight: number;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}