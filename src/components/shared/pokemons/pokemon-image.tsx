import { $, component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size?: number;
    isBack?: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$(({ id, size = 96, isBack = false, isVisible = true }: Props) =>{
   // declaraciones
   const api = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
   const imgLoaded = useSignal(false);

   const url = useComputed$<string>(() =>{
     return `${api}/${isBack ? 'back/': ''}${id}.png`
   })

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
            src={url.value} 
            alt="pokemon img" 
            style={{ width: `${size}px`, height: `${size}px`}}
            onLoad$={() => {
                console.log('imgLoaded');
                imgLoaded.value=true
            }}
            class={[{
                'hidden': !imgLoaded.value,
                'brightness-0': !isVisible
            }, 'transition-all']}
            />

       
        </div>
          
        </>
    )
})