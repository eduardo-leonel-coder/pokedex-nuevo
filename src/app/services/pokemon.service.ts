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
  private readonly cacheDetalle = new Map<number, Observable<PokemonInterface>>();
};

