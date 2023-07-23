// core
import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/shared/pokemons/pokemon-image";


export default component$(() => {
  // declaraciones 
  const pokemonId = useSignal<number>(0);

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

      <div class="mt-2 text-center">
        <PokemonImage id={pokemonId.value} />        
        <button onClick$={() => changePokemon(-1)} class="btn btn-primary mr-2">Back</button>
        <button onClick$={() => changePokemon(+1)} class="btn btn-primary mr-2">Next</button>
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
