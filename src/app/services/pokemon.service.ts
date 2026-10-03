import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of} from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { PokemonInterface, PokemonListResponse, PokemonListItem } from '../domain';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  // Cache para guardar detalle pokemon de tip pokemon interface
  private readonly cacheDetalle = new Map<string, Observable<PokemonInterface>>();

  obtenerListaPokemon(limit: number = 20, offset: number = 0): Observable<{results: PokemonListItem[]; count: number}> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`)
    .pipe(map((respuesta) => ({results: respuesta.results, count: respuesta.count})));
  };

  obtenerDetallePokemon(name: string): Observable<PokemonInterface> {
    if (this.cacheDetalle.has(name)) {
      return this.cacheDetalle.get(name)!;
    }

    const peticion$ = this.http.get<PokemonInterface>(`${this.baseUrl}/pokemon/${name}`).pipe(shareReplay(1));

    this.cacheDetalle.set(name, peticion$);
    return peticion$;
  }

  getIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean);

    // forma corta de convertir a numero: Number(parts[parts.length -1])
    return +parts[parts.length -1];
  }

  getSpriteUrl(url: string): string {
    const id = this.getIdFromUrl(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
};

