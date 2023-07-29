import { Slot, component$, useContextProvider, useStore } from '@builder.io/qwik';
import { IPokemonGameState, PokemonGameContext } from './pokemon-game.context';
import { IPokemonListState, pokemonListContext } from './pokemon-list.context';

export const PokemonProvaider = component$(() => {

  // creamos el valor por defecto del contexto.
  const pokemonGame = useStore<IPokemonGameState>({
    id: 1,
    size: 200,
    isVisible: true,
    isBack: false
  })

  // creamos el valor por defecto del contexto de listado.
  const pokemonList = useStore<IPokemonListState>({
    currentPage: 1,
    isLoadding: false,
    pokemons: []
  })

    // proveemos los contextos en nuestra app
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(pokemonListContext, pokemonList);

  return (<Slot />)
});