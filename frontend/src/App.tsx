import { useEffect, useState } from 'react';
import { createBattle, getPokemonList } from './api/endpoints';
import './App.css';
import BattleResult from './components/BattleResult';
import PokemonBattle from './components/PokemonBattle';
import PokemonList from './components/PokemonList';
import { Pokemon } from './types/Pokemon';
import { selectRandomPokemon } from './utils/utils';

function App() {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
	const [oponent, setOponent] = useState<Pokemon | null>(null);
	const [winner, setWinner] = useState<Pokemon | null>(null);

	useEffect(() => {
		const fetchPokemon = async () => {
			const response = await getPokemonList();
			setPokemonList(response);
		};
		fetchPokemon();
	}, []);

	const handleSelectPokemon = (pokemon: Pokemon) => {
		setWinner(null);
		const selected = pokemonList.find((p) => p.id === pokemon.id);
		if (!selected) return;

		const randomOponent = selectRandomPokemon(pokemonList.filter((p) => p.id !== selected.id).map((p) => p.id));
		const oponent = pokemonList.find((p) => p.id === randomOponent);
		if (!oponent) return;

		setOponent(oponent);
		setSelectedPokemon(selected);
	};

	const handleStartBattle = async () => {
		if (!selectedPokemon || !oponent) return;

		const battleData = {
			pokemon1_id: selectedPokemon.id,
			pokemon2_id: oponent.id,
		};

		await createBattle(battleData).then((response) => setWinner(response));
	};

	return (
		<div>
			<div>
				<h1 className='text-black text-3xl font-bold'>Battle of Pokemon</h1>
			</div>

			<div className='mt-6'>
				<PokemonList pokemonList={pokemonList} handleSelectPokemon={handleSelectPokemon} />
			</div>

			<div className={`mt-6`}>{winner ? <BattleResult pokemon={winner} /> : <div className='h-[50px]'/>}</div>

			<div className='mt-8'>
				{selectedPokemon && oponent ? (
					<PokemonBattle
						selectedPokemon={selectedPokemon}
						oponent={oponent}
						handleStartBattle={handleStartBattle}
					/>
				) : (
					<div className='flex justify-center'>
						<p className='text-black text-lg font-semibold'>
							Select a Pokemon to start the battle. An opponent will be chosen randomly.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
