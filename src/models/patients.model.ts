import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @Column({ nullable: true })
  birthdate: string = '';

  @Column()
  gender: 'M' | 'F' = 'M';

  @Column()
  nik: number = 0;

  @Column()
  config_id: string = '';

  @Column()
  photo_url: string = '';

  @Column()
  ss_id: string = '';

  @Column()
  phone: string = '';

  @Column()
  address: string = '';

  @Column()
  address_city: string = '';

  @Column()
  address_postal: string = '';

  @Column()
  relative: string = '';

  @Column()
  relative_phone: string = '';

  @Column()
  birthplace: string = '';

  @Column()
  marital: string = '';
}