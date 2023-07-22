import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";


export default component$(() => {
  // Variables y logica
  const pokemonId = useSignal<number>(0);
  const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  // template
  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{ pokemonId }</span>

      <div class="mt-2 text-center">
        <img src={`${url}/${pokemonId.value}.png`} alt="pokemon img" style={{ width: '200px', height: '200px' }} />
        <button onClick$={ () => pokemonId.value-- } class="btn btn-primary mr-2">Back</button>
        <button onClick$={ () => pokemonId.value++ } class="btn btn-primary mr-2">Next</button>
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
