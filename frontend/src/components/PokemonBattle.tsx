import { Button } from '@mui/material';
import React from 'react';
import { Pokemon } from '../types/Pokemon';
import PokemonCard from './PokemonCard';

type Props = {
	selectedPokemon: Pokemon;
	oponent: Pokemon;
	handleStartBattle: () => void;
};

const PokemonBattle: React.FC<Props> = ({ selectedPokemon, oponent, handleStartBattle }) => {
	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-5 items-center justify-center gap-3'>
				<div className='col-span-2'>
					<PokemonCard pokemon={selectedPokemon} />
				</div>
				<div className='col-span-1'>
					<Button
						className='flex justify-center items-center w-full'
						sx={battleButtonStyle}
						variant='contained'
						disableRipple
						onClick={handleStartBattle}>
						start Battle
					</Button>
				</div>
				<div className='col-span-2'>
					<PokemonCard pokemon={oponent} />
				</div>
			</div>
		</>
	);
};

export default PokemonBattle;

const battleButtonStyle = {
	'backgroundColor': '#387639',
	'textTransform': 'capitalize',
	'letterSpacing': '1px',
	'fontFamily': 'sans-serif',
	':hover': {
		backgroundColor: '#387639',
	},
};
