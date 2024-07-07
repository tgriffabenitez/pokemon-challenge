import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from '../pokemon/pokemon.module';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { Battle } from './entities/battle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Battle]), PokemonModule],
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}
