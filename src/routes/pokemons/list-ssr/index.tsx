import { component$, useComputed$ } from '@builder.io/qwik';
import { DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { IBasicPokemon, IPokemonListResponse } from '~/interfaces';

export const usePokemonList = routeLoader$<IBasicPokemon[]>(async ({query, redirect, pathname}) =>{

  const offset = Number(query.get('offset') || '0');

  if(
    isNaN(offset) ||
    offset < 0
  ) { 
    throw redirect(301, `/pokemons/list-ssr?offset=0`); 
  }
  
  console.log('[request]')
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  const data = await resp.json() as IPokemonListResponse;

  return data.results;
})



export default component$(() => {

  // declaraciones
  const pokemons = usePokemonList();
  const location = useLocation();
  const currentOffset = useComputed$<number>(() =>{
    const offsetString = new URLSearchParams(location.url.search);
    let num = Number(offsetString.get('offset') || 0);
    if(num < 0) {
      num = 0;
    }
    return num;
  })

  // template
  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">status</span>
        <span>Current offset: { currentOffset.value } </span>
        <span>Está cargando la página: {location.isNavigating ? 'si': 'no'}</span>
      </div>

      <div class="mt-5">
        <Link 
        href={`/pokemons/list-ssr?offset=${currentOffset.value<=0 ? '0' : currentOffset.value-10}`}
        class="btn btn-primary mr-2 disabled">Anterior</Link>

        <Link 
        href={`/pokemons/list-ssr?offset=${currentOffset.value+10}`}
        class="btn btn-primary mr-2">Siguiente</Link>
      </div>

      <div class="grid grid-cols-5 mt-5">
          {
            pokemons.value.map(({ name }) => (
              <div key={name} class="mt-5 flex flex-col justify-center items-center">
                <span class="capitalize">{ name }</span>
              </div>
            ))
          }
      </div>
    </>
  )
});

export const head: DocumentHead = {
  title: "SSR List",
};