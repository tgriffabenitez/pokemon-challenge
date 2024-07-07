import { Card } from '@mui/material';
import { Pokemon } from '../types/Pokemon';

type PokemonCardProps = {
	pokemon: Pokemon;
	handleSelectPokemon: (pokemon: Pokemon) => void;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, handleSelectPokemon }) => {
	return (
		<Card
			className='h-[130px] w-[150px] flex flex-col justify-center p-1 shadow-lg cursor-pointer rounded-md'
			key={pokemon.id}
			onClick={() => handleSelectPokemon(pokemon)}>
			<div>
				<img
					className='h-[100px] w-[100px] object-cover flex justify-center mx-auto'
					src={`${pokemon.imageUrl}`}
					alt={`Imagen del pokemon ${pokemon.name}`}
				/>
			</div>
			<div>
				<h3 className='text-left mb-0'>{pokemon.name}</h3>
			</div>
		</Card>
	);
};

type PokemonListPorps = {
	pokemonList: Pokemon[];
	handleSelectPokemon: (pokemon: Pokemon) => void;
};

const PokemonList: React.FC<PokemonListPorps> = ({ pokemonList, handleSelectPokemon }) => {
	return (
		<div className='flex flex-col'>
			<div>
				<h3 className='text-black text-lg font-semibold mb-2'>Select your pokemon</h3>
			</div>
			<div className='flex flex-row gap-3 justify-between'>
				{pokemonList?.map((pokemon: Pokemon) => (
					<div key={pokemon.id}>
						<PokemonCard pokemon={pokemon} handleSelectPokemon={handleSelectPokemon} />
					</div>
				))}
			</div>
		</div>
	);
};

export default PokemonList;
