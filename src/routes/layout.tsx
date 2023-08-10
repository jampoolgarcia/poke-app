import { component$, Slot, useContextProvider, useStore, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";

import Navbar from "~/shared/navbar/navbar";
import { PokemonProvaider } from "~/context";

export default component$(() => {
  
  useStyles$(styles);
  return (
    <>
    <PokemonProvaider>
    <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </PokemonProvaider>
    </>
  );
});
