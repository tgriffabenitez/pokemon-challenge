import { Alert } from '@mui/material';
import React from 'react';
import { Pokemon } from '../types/Pokemon';

type BattleResultProps = {
	pokemon: Pokemon;
};

const BattleResult: React.FC<BattleResultProps> = ({ pokemon }) => {
	return (
		<div className='h-[50px]'>
			<Alert icon={false} severity='info' sx={alertStyle}>
				{`${pokemon.name} wins!`}
			</Alert>
		</div>
	);
};

export default BattleResult;

const alertStyle = {
	color: '#000',
	border: '1.5px solid #000',
	borderRadius: '0.375rem',
	fontSize: '1.2rem',
	fontWeight: 500,
	display: 'flex',
	textAlign: 'left',
};
