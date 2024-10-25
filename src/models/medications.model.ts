import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  medicine_name: string = '';

  @Column({ nullable: true })
  stock: number = 0;

  @Column()
  price: number = 0;

  @Column()
  @Unique(['sku'])
  sku: string = '';

  @Column()
  config_id: string = '';
}

@Entity()
export class MedicationClaim {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  meds: string = "{}";

  @Column()
  treatment_id: string = '';
}