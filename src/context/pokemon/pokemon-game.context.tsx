import { createContextId } from '@builder.io/qwik';

export interface IPokemonGameState {
    id: number;
    size?: number;
    isBack?: boolean;
    isVisible?: boolean;
}

export const PokemonGameContext = createContextId<IPokemonGameState>('pokemon-game.context');

