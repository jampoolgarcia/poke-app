import { component$, useContext } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>(({params, redirect}) => {
  const id = Number(params.id);

  console.log("id", id);

  if(
    isNaN(id) ||
    id < 1    ||
    id > 1000
  ) {
    throw redirect(301, '/');
  }

  return id;
});

export default component$(() => {

  // usamos el id que obtenemos mediante el hook del routerloader
  const pokemonId = usePokemonId();

  // usamos el contexto
  const { id, isBack, size, isVisible, toggleBack, toggleVisible } = usePokemonGame();
  
  return(
    <>
      {/* 
        <div class="text-5xl">Pokemon: { location.params.id }</div>
        <PokemonImage id={Number(location.params.id)} /> 
      */}

      <div class="text-5xl">Pokemon: { pokemonId }</div>
      <PokemonImage id={id.value} isBack={isBack.value} size={(size.value)!*1.5} isVisible={isVisible.value} /> 
      <div class="mt-2">
        <button onClick$={ toggleBack } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ toggleVisible } class="btn btn-primary mr-2 w-32">{isVisible.value ? 'Ocultar' : 'Mostrar'}</button>
      </div>
    </>
  ) 
});