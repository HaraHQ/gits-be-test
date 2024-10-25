import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

type PaymentType = 'cash' | 'credit' | 'insurance'

@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  module_id: number = 0;

  @Column()
  config_id: number = 0;

  @Column()
  patient_id: number = 0;

  @Column()
  payment_type: PaymentType = 'cash';

  @Column({ nullable: true })
  insurance_type: string = '';

  @Column()
  is_paid: boolean = false;
}