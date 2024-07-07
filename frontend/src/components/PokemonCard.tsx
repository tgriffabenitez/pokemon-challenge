import { Card, LinearProgress, linearProgressClasses, styled } from '@mui/material';
import { Pokemon } from '../types/Pokemon';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === 'light' ? '#72fb4e' : '#72fb4e',
	},
}));

const PokemonImage: React.FC<{ imageUrl: string; name: string }> = ({ imageUrl, name }) => {
	return (
		<div className='flex items-center flex-col'>
			<img className='h-[200px] w-[200px] object-cover' src={imageUrl} alt={`Imagen del ${name}`} />
		</div>
	);
};

const PokemonInfo: React.FC<{ name: string }> = ({ name }) => {
	return (
		<div className='flex flex-col p-2'>
			<p className='text-2xl text-black font-semibold'>{name}</p>
			<hr />
		</div>
	);
};

const PokemonStats: React.FC<{ stats: { label: string; value: number }[] }> = ({ stats }) => {
	return (
		<div className='flex flex-col gap-2 px-2'>
			{stats.map((stat, index) => (
				<div key={index} className='flex flex-col'>
					<p>{stat.label}</p>
					<BorderLinearProgress variant='determinate' value={stat.value * 10} />
				</div>
			))}
		</div>
	);
};

type Props = {
	pokemon: Pokemon;
};

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
	const pokemonStats = [
		{ label: 'HP', value: pokemon.hp },
		{ label: 'Attack', value: pokemon.attack },
		{ label: 'Defense', value: pokemon.defense },
		{ label: 'Speed', value: pokemon.speed },
	];

	return (
		<Card key={pokemon?.id} className='h-[450px] w-[300px] flex flex-col justify-center p-1'>
			<PokemonImage imageUrl={pokemon?.imageUrl} name={pokemon?.name} />
			<PokemonInfo name={pokemon?.name} />
			<PokemonStats stats={pokemonStats} />
		</Card>
	);
};

export default PokemonCard;
