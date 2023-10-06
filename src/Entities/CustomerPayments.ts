// src/entities/Customer.ts
import { Entity, PrimaryGeneratedColumn, Column, TableForeignKey } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: string;

  @Column()
  date: string;

  @Column()
  // @TableForeignKey
  customerId: number;


  @Column()
  // @TableForeignKey
  accountID: number;

}