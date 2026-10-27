import { Component, inject, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonListItem } from '../../domain';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
  private pokemonService = inject(PokemonService);

  pokemons = signal<PokemonListItem[]>([]);

  readonly limit = 24;

  cargarPokemons(): void {
    this.pokemonService.obtenerListaPokemon(this.limit, 0).subscribe({
      next: (data) => { this.pokemons.set(data.results); },
    });
  };

  constructor() {
    this.cargarPokemons();
  }
};
