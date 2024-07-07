import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  speed: number;

  @Column()
  hp: number;

  @Column({ name: 'image_url' })
  imageUrl: string;
}
