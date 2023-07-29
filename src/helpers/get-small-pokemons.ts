import { IPokemonListResponse, ISmallPokemon } from "~/interfaces";

export const getSmallPokemons = (async(offset = 0, limint =10): Promise<ISmallPokemon[]>  =>  {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limint}&offset=${offset}`);
    const data = await resp.json() as IPokemonListResponse;

    return data.results.map(({url, name}) =>{
        const segment = url.split('/');
        const id = Number(segment.at(-2)!);
        return { id, name };
    })
})