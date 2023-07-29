import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/shared/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

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
  const pokemonGame = useContext(PokemonGameContext);
  
  return(
    <>
      {/* 
        <div class="text-5xl">Pokemon: { location.params.id }</div>
        <PokemonImage id={Number(location.params.id)} /> 
      */}

      <div class="text-5xl">Pokemon: { pokemonId }</div>
      <PokemonImage id={pokemonId.value} isBack={pokemonGame.isBack} size={(pokemonGame.size)!*1.5} isVisible={pokemonGame.isVisible} /> 
      <div class="mt-2">
        <button onClick$={() => pokemonGame.isBack = !pokemonGame.isBack } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => pokemonGame.isVisible = !pokemonGame.isVisible } class="btn btn-primary mr-2">{pokemonGame.isVisible ? 'Ocultar' : 'Mostrar'}</button>
      </div>
    </>
  ) 
});