import { Component, computed, inject, signal } from '@angular/core';
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
  paginaActual = signal(1);
  totalCount = signal(0);
  totalPaginas = computed(() => Math.ceil(this.totalCount() / this.limit));

  cargarPokemons(): void {
    const offset = (this.paginaActual() -1) * this.limit;

    this.pokemonService.obtenerListaPokemon(this.limit, offset).subscribe({
      next: (data) => { 
        this.pokemons.set(data.results); 
        this.totalCount.set(data.count);
      },
    });
  };

  irAPagina(p: number): void {
    if(p < 1 || p > this.totalPaginas() || p === this.paginaActual()) return;
    this.paginaActual.set(p);
    this.cargarPokemons();
  }

  constructor() {
    this.cargarPokemons();
  }

  getId(url: string): number {
    return this.pokemonService.getIdFromUrl(url);
  }

  getSprite(url: string): string {
    return this.pokemonService.getSpriteUrl(url);
  }
};
