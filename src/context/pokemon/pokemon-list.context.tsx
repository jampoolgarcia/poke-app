import { createContextId } from "@builder.io/qwik";
import { ISmallPokemon } from "~/interfaces";

export interface IPokemonListState {
  currentPage: number;
  pokemons: ISmallPokemon[];
  isLoadding: boolean;
}

export const pokemonListContext = createContextId<IPokemonListState>('pokemon-list.context');