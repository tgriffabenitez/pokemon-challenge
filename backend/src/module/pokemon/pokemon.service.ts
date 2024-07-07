import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
  ) {}

  findAll() {
    return this.pokemonRepository.find();
  }

  findOne(pokemonId: string) {
    return this.pokemonRepository.findOneBy({ id: pokemonId });
  }
}
