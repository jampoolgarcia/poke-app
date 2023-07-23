import { component$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size?: number;
    backImg?: boolean;
}

export const PokemonImage = component$(({ id, size = 200, backImg = false }: Props) =>{
   // declaraciones
   const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
//    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png"

   // funciones

    // template
    return (
        <>
          <img 
            src={`${url}/${backImg ? 'back/': ''}${id}.png`} 
            alt="pokemon img" 
            style={{ width: `${size}px`, height: `${size}px` }} />
        </>
    )
})