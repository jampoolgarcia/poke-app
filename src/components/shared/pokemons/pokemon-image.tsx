import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size?: number;
    backImg?: boolean;
}

export const PokemonImage = component$(({ id, size = 200, backImg = false }: Props) =>{
   // declaraciones
   const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
   const imgLoaded = useSignal<boolean>(false);

   // funciones
   useTask$(({track}) => {
    track(() => id);
    imgLoaded.value = false;
   }) 

    // template
    return (
        <>
        <div class="flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
            { !imgLoaded.value && <span>Cargando...</span>}
            <img 
            src={`${url}/${backImg ? 'back/': ''}${id}.png`} 
            alt="pokemon img" 
            style={{ width: `${size}px`, height: `${size}px`}}
            class={{
                'hidden': !imgLoaded.value
            }}
            onLoad$={() => imgLoaded.value=true }/>
        </div>
          
        </>
    )
})