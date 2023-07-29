// core
import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { Link, type DocumentHead, useNavigate, useContent } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";
import { usePokemonGame } from "~/hooks/use-pokemon-game";


export default component$(() => {

  // usamos el contexto.
  const { id, isBack, isVisible, size, nextPokemon, prevPokemon, toggleBack, toggleVisible} = usePokemonGame();

  // creamos para usar la navegacion a nivel de codigo
  const nav = useNavigate();


  // template
  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{ id.value }</span>

      <div onClick$={() => nav(`/pokemon/${id.value}`)}>
        <PokemonImage id={id.value} size={size.value} isBack={isBack.value} isVisible={isVisible.value} /> 
      </div>

      <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary mr-2">Back</button>
        <button onClick$={ nextPokemon } class="btn btn-primary mr-2">Next</button>
        <button onClick$={ toggleBack } class="btn btn-primary mr-2">Voltear</button> 
        <button onClick$={ toggleVisible } class="btn btn-primary mr-2 w-32">{ isVisible.value ? 'Ocultar': 'Revelar'}</button> 
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
