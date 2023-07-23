import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>(({params, redirect}) => {
  const id = Number(params.id);

  console.log("id", id);

  if(
    isNaN(id) ||
    id < 1    ||
    id > 1000
  ) {
    redirect(301, '/');
  }

  return id;
});

export default component$(() => {

  //const location = useLocation();
  const pokemonId = usePokemonId();
  
  return(
    <>
      {/* 
        <div class="text-5xl">Pokemon: { location.params.id }</div>
        <PokemonImage id={Number(location.params.id)} /> 
      */}

      <div class="text-5xl">Pokemon: { pokemonId }</div>
      <PokemonImage id={pokemonId.value} isVisible /> 
    </>
  ) 
});