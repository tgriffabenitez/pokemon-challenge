import { Pokemon } from 'src/module/pokemon/entities/pokemon.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Pokemon)
  pokemon1: Pokemon;

  @ManyToOne(() => Pokemon)
  pokemon2: Pokemon;

  @ManyToOne(() => Pokemon)
  winner: Pokemon;

  @ManyToOne(() => Pokemon)
  loser: Pokemon;

  @Column()
  turns: number;

  @Column()
  fightDate: Date;
}
