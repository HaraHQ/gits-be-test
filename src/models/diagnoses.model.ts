import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Diagnose {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  registration_id: number = 0;

  @Column()
  diagnose: string = '';

  @Column()
  patient_id: number = 0;
}