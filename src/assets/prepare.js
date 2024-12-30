
export const prepareMon = ( Pokedex, Start = 0, End = 999 ) => {
    return Pokedex.slice( Start, Pokedex.findIndex( obj => obj.id === End ) );
}