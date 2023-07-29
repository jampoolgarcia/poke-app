import { $, useComputed$, useContext } from "@builder.io/qwik"


import { PokemonGameContext } from "~/context";

export const usePokemonGame = () =>{

    // usamos el contexto.
    const pokemonGame = useContext(PokemonGameContext);


    // funciones
    const changePokemon =$((value: number) =>{
        if((pokemonGame.id+value)<= 0) return;
        pokemonGame.id += value;
    })

    const toggleBack = $(() => pokemonGame.isBack = !pokemonGame.isBack);
    const toggleVisible = $(() => pokemonGame.isVisible = !pokemonGame.isVisible);

    return {
       // propiedades
       id: useComputed$(() => pokemonGame.id),
       isBack: useComputed$(() => pokemonGame.isBack),
       isVisible: useComputed$(() => pokemonGame.isVisible),
       size: useComputed$(() => pokemonGame.size),
       // metodos
       nextPokemon: $(() => changePokemon(+1)),
       prevPokemon: $(() => changePokemon(-1)),
       toggleBack: toggleBack,
       toggleVisible: toggleVisible
    }
}