import { component$, Slot, useContextProvider, useStore, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";

import Navbar from "~/shared/navbar/navbar";
import App from "./index";
import { IPokemonGameState, IPokemonListState, PokemonGameContext, pokemonListContext } from "~/context";



export default component$(() => {

  // creamos el valor por defecto del contexto.
  const pokemonGame = useStore<IPokemonGameState>({
    id: 1,
    size: 200,
    isVisible: true,
    isBack: false
  })

  // creamos el valor por defecto del contexto de listado.
  const pokemonList = useStore<IPokemonListState>({
    currentPage: 1,
    isLoadding: false,
    pokemons: []
  })

  // proveemos los contextos en nuestra app
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(pokemonListContext, pokemonList);

  useStyles$(styles);
  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
