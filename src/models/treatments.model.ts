import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  registration_id: number = 0;

  @Column()
  encounter: string = '';

  @Column()
  medical_claim_id: number = 0;
}