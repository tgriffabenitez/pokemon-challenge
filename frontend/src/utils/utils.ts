export const selectRandomPokemon = (pokemonId: String[] | null) => {
    if (!pokemonId) return '';
	return pokemonId[Math.floor(Math.random() * pokemonId.length)];
};
