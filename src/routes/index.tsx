// core
import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";


export default component$(() => {
  // declaraciones 
  const pokemonId = useSignal(1);
  const showBackImg = useSignal(false); 
  const visible = useSignal(false);

  // funciones
  const changePokemon =$((value: number) =>{
    if((pokemonId.value+value)<= 0) return;

    pokemonId.value += value;
  })

  // template
  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{ pokemonId }</span>

      <PokemonImage id={pokemonId.value} isBack={showBackImg.value} isVisible={visible.value} /> 

      <div class="mt-2">
        <button onClick$={() => changePokemon(-1)} class="btn btn-primary mr-2">Back</button>
        <button onClick$={() => changePokemon(+1)} class="btn btn-primary mr-2">Next</button>
        <button onClick$={() => showBackImg.value = !showBackImg.value } class="btn btn-primary mr-2">Voltear</button> 
        <button onClick$={() => visible.value = !visible.value } class="btn btn-primary mr-2 w-32">{ visible.value ? 'Ocultar': 'Revelar'}</button> 
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
