import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss',
})
export class PokemonCard {

  // OnPush: estrategia de revision del componente
  name = input.required<string>();
  spriteUrl = input.required<string>();
  id = input.required<number>();

}
