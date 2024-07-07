import { Body, Controller, Post } from '@nestjs/common';
import { BattleService } from './battle.service';
import { CreateBattleDto } from './dto/create-battle.dto';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  create(@Body() createBattleDto: CreateBattleDto) {
    return this.battleService.create(createBattleDto);
  }
}
