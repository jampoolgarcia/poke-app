import { $, component$, useContext, useOnDocument, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';


import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { pokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';

export default component$(() => {

  const pokemonState = useContext(pokemonListContext);

  useVisibleTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemons = await getSmallPokemons(pokemonState.currentPage*40, 40);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoadding = false;
  })

  useOnDocument('scroll', $(()=>{

    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if((currentScroll+200) >= maxScroll && !pokemonState.isLoadding) 
      pokemonState.isLoadding = true, 
      pokemonState.currentPage++;
  }))

  return ( <>
    <div class="flex flex-col">
      <span class="my-5 text-5xl">status</span>
      <span>página Actual:  { pokemonState.currentPage } </span>
      <span>Cargando la página: { pokemonState.isLoadding ? 'Si': 'No'}</span>
    </div>

    <div class="grid sm:grid-cols-2 md:grid-cols-6 xl:grid-cols-8 gap-5 mt-5">
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