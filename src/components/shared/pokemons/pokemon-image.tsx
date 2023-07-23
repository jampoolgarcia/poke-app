import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size?: number;
    isBack?: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$(({ id, size = 200, isBack = false, isVisible = false }: Props) =>{
   // declaraciones
   const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
   const imgLoaded = useSignal(false);

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
            src={`${url}/${isBack ? 'back/': ''}${id}.png`} 
            alt="pokemon img" 
            style={{ width: `${size}px`, height: `${size}px`}}
            onLoad$={() => imgLoaded.value=true }
            class={[{
                'hidden': !imgLoaded.value,
                'brightness-0': !isVisible
            }, 'transition-all']}
            />

       
        </div>
          
        </>
    )
})