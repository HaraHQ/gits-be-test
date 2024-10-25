import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  module_name: string = '';

  @Column()
  activated_at: number = 0;

  @Column()
  config_id: string = '';
}