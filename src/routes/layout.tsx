import { component$, Slot, useContextProvider, useStore, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";

import Navbar from "~/shared/navbar/navbar";
import App from "./index";
import { IPokemonGameState, PokemonGameContext } from "~/context";



export default component$(() => {

  // creamos el valor por defecto del contexto.
  const PokemonGame = useStore<IPokemonGameState>({
    id: 1,
    size: 200,
    isVisible: true,
    isBack: false
  })

  // proveemos el contexto en nuestra app
  useContextProvider(PokemonGameContext, PokemonGame);

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
