import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Account } from "./Account";


@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  amount!: number;

  @Column()
  balance!: number;

  @ManyToOne(() => Account, (account) => account.payments, {
    onDelete: "CASCADE",
  })
  account!: Account;

}