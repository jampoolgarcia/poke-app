import { component$, useStore } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
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
        {/* {
          pokemons.value.map(({ name, id }) => (
            <div key={name} class="mt-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} />
              <span class="capitalize">{ name }</span>
            </div>
          ))
        } */}
    </div>
  </>)
});

export const head: DocumentHead = {
  title: "Client List",
};