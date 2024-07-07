import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonService } from '../pokemon/pokemon.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './entities/battle.entity';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Battle)
    private battleRepository: Repository<Battle>,
    private pokemonService: PokemonService,
  ) {}

  /**
   * Creates a battle between two pokemons.
   * It receives a CreateBattleDto with the ids of the pokemons and returns the winner.
   *
   * @param createBattleDto Dto with the ids of the pokemons
   * @returns Pokemon that won the battle
   * @throws Error if the pokemons are not found
   */
  create(createBattleDto: CreateBattleDto) {
    return this.battle(
      createBattleDto.pokemon1_id,
      createBattleDto.pokemon2_id,
    );
  }

  /**
   * Simulates a battle between two pokemons.
   * It receives the id of two pokemons and returns the winner.
   *
   * @param pokemon1_id id of the first pokemon
   * @param pokemon2_id id of the second pokemon
   * @returns pokemnon that won the battle
   */
  async battle(pokemon1_id: string, pokemon2_id: string) {
    const pokemon1 = await this.pokemonService.findOne(pokemon1_id);
    const pokemon2 = await this.pokemonService.findOne(pokemon2_id);

    if (!pokemon1 || !pokemon2) throw new Error('Pokemon not found');

    let attacker = this.firstToAttack(pokemon1, pokemon2);
    let defender = attacker === pokemon1 ? pokemon2 : pokemon1;

    let turns = 0;
    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      turns++;
      defender.hp -= this.calculateDamage(attacker, defender);
      [attacker, defender] = [defender, attacker];
    }

    const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;

    this.battleRepository.save({
      pokemon1,
      pokemon2,
      winner,
      turns,
      fightDate: new Date(),
      loser: winner === pokemon1 ? pokemon2 : pokemon1,
    });

    return winner;
  }

  /**
   * Calculates the damage that the attacker will cause to the defender.
   * If the damage is less than 1, it will return 1.
   * The damage is calculated by subtracting the defense of the defender from the attack of the attacker.
   *
   * @param attacker Pokemon that is attacking
   * @param defender Pokemon that is defending
   * @returns Damage that the attacker will cause to the defender
   */
  private calculateDamage(attacker: Pokemon, defender: Pokemon): number {
    const damage = attacker.attack - defender.defense;
    return damage > 0 ? damage : 1;
  }

  /**
   * Calculates which pokemon will attack first.
   * The pokemon with the highest speed will attack first.
   * If the speed of the pokemons is the same, the one with the highest attack will attack first.
   *
   * @param pokemon1 Pokemon 1
   * @param pokemon2 Pokemon 2
   * @returns Pokemon that will attack first
   */
  private firstToAttack(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon {
    if (pokemon1.speed > pokemon2.speed) return pokemon1;
    if (pokemon1.speed < pokemon2.speed) return pokemon2;

    return pokemon1.attack > pokemon2.attack ? pokemon1 : pokemon2;
  }
}
