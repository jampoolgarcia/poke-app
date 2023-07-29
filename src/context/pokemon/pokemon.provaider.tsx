import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { IPokemonGameState, PokemonGameContext } from './pokemon-game.context';
import { IPokemonListState, pokemonListContext } from './pokemon-list.context';

export const PokemonProvaider = component$(() => {

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

  // leer datos del localstorage y guardar en el context
  // nota: al no especificar el track solo se ejecuta una vez la tarea.
  useVisibleTask$(() => {
    if(localStorage.getItem('pokemon-game')){
      const {
        isVisible,
        isBack,
        id,
        size
      } = JSON.parse(localStorage.getItem('pokemon-game')!) as IPokemonGameState;

      pokemonGame.isVisible = isVisible;
      pokemonGame.isBack = isBack;
      pokemonGame.id = id;
      pokemonGame.size = size;
    }
  })

  // guardar los datos del contexto en el local storage
  useVisibleTask$(({track}) => {
    // ejecutar la tarea cada que cambie uno de los valores...
    track (()=> [pokemonGame.isBack, pokemonGame.id, pokemonGame.isVisible, pokemonGame.size]);
    // guarda en el local stora el nuevo estado 
    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  })

  return (<Slot />)
});