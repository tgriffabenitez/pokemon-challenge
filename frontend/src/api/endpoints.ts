import { CreateBattle } from '../types/Battle';
import { Pokemon } from '../types/Pokemon';
import Api from './ApiConfig';

export const getPokemonList = async () => {
	const response = await Api.get('/pokemon');
	return response.data;
};

export const createBattle = async (battleData: CreateBattle): Promise<Pokemon> => {
	const response = await Api.post('/battle', battleData);
	return response.data;
};
