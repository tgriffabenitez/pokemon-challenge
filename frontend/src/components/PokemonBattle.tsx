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
			<div className='flex flex-row justify-between items-center'>
				<PokemonCard pokemon={selectedPokemon} />
				<Button
					className='flex justify items-center'
					sx={battleButtonStyle}
					variant='contained'
					disableRipple
					onClick={handleStartBattle}>
					start Battle
				</Button>
				<PokemonCard pokemon={oponent} />
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
