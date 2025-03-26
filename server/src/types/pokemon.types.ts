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
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: PokemonType[];
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

export interface LocationDetail {
  areas: {
    name: string;
    url: string;
  }[];
  id: number;
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  region: {
    name: string;
    url: string;
  };
}