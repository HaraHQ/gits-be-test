import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  hospital_name: string = '';

  @Column()
  hospital_address: string = '';

  @Column()
  user_id: string = '';
}