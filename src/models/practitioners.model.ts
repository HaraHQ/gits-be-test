import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Practitioner {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @Column({ nullable: true })
  specialization: string = '';

  @Column()
  gender: 'M' | 'F' = 'M';

  @Column()
  config_id: string = '';

  @Column()
  photo_url: string = '';
}