// src/entities/Customer.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  amount: string;

  @Column()
  customerId: string;
}