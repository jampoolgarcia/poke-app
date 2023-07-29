// core
import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { Link, type DocumentHead, useNavigate, useContent } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";


export default component$(() => {

  // usamos el contexto.
  const pokemonGame = useContext(PokemonGameContext);

  // creamos para usar la navegacion a nivel de codigo
  const nav = useNavigate();



  // funciones
  const changePokemon =$((value: number) =>{
    if((pokemonGame.id+value)<= 0) return;
    pokemonGame.id += value;
  })

  // template
  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{ pokemonGame.id }</span>

      <div onClick$={() => nav(`/pokemon/${pokemonGame.id}`)}>
        <PokemonImage id={pokemonGame.id} size={pokemonGame.size} isBack={pokemonGame.isBack} isVisible={pokemonGame.isVisible} /> 
      </div>

      <div class="mt-2">
        <button onClick$={() => changePokemon(-1)} class="btn btn-primary mr-2">Back</button>
        <button onClick$={() => changePokemon(+1)} class="btn btn-primary mr-2">Next</button>
        <button onClick$={() => pokemonGame.isBack = !pokemonGame.isBack } class="btn btn-primary mr-2">Voltear</button> 
        <button onClick$={() => pokemonGame.isVisible = !pokemonGame.isVisible } class="btn btn-primary mr-2 w-32">{ pokemonGame.isVisible ? 'Ocultar': 'Revelar'}</button> 
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Poke-Qwik",
  meta: [
    {
      name: "description",
      content: "This is a first app in Qwik, Jampool Garcia. Poke-Qwik",
    },
  ],
};
