// Interfaz principal de un Pokemon
export interface PokemonInterface {
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: PokemonType[];
    stats: PokemonStat[];
    abilities: PokemonAbility[];
};

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
};

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
};

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
}

// Interfaz para lista de pokemons
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
};

export interface PokemonListItem {
    name: string;
    url: string;
};

export interface FavoritoPokemon {
    id: number;
    name: string;
    spriteUrl: string;
    // dato opcional que llega despues en otra peticion
    types?: string[];
};