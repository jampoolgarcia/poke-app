import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';


import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { ISmallPokemon } from '~/interfaces';

export interface IPokemonPageState {
  currentPage: number;
  pokemons: ISmallPokemon[];
}

export default component$(() => {

  const pokemonState = useStore<IPokemonPageState>({
    currentPage: 0,
    pokemons: []
  })

  useVisibleTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemons = await getSmallPokemons(pokemonState.currentPage*30, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  })

  return ( <>
    <div class="flex flex-col">
      <span class="my-5 text-5xl">status</span>
      <span>página Actual:  { pokemonState.currentPage } </span>
      <span>Cargando la página: </span>
    </div>

    <div class="mt-5">
      <button 
      onClick$={ () => pokemonState.currentPage-- }
      class="btn btn-primary mr-2 disabled">Anterior</button>

      <button 
      onClick$={ () => pokemonState.currentPage++ }
      class="btn btn-primary mr-2">Siguiente</button>
    </div>

    <div class="grid grid-cols-5 mt-5">
        {
          pokemonState.pokemons.map(({ name, id }) => (
            <div key={name} class="mt-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} />
              <span class="capitalize">{ name }</span>
            </div>
          ))
        } 
    </div>
  </>)
});

export const head: DocumentHead = {
  title: "Client List",
};