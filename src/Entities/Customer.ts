import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Sales } from './Sales';
import { Account } from './Account';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  location: string;

  @Column()
  phone: string;

  @OneToMany(() => Sales, (sales) => sales.customer, {
    onDelete: "CASCADE",
  })
  sales!: Sales[];

  @OneToMany(() => Account, (account) => account.customer, {
    onDelete: "CASCADE",
    eager: true,
  })
  accounts!: Account[];
}


export const createCustomer = async (
  name: string,
  email: string,
  location: string,
  phone: string
) => {
  const customer = new Customer();
  customer.name = name;
  customer.email = email;
  customer.location = location;
  customer.phone = phone;
  return customer.save();
}

export const getCustomers = async () => {
  const customers = await Customer.find({
    order: {
      id: "DESC",
    },
  });
  return customers;
}

export const deleteCustomer = async (id: number) => {
  const customer = await Customer.findOne({
    where: {
      id
    }
  });
  
  if (!customer) {
    throw new Error('Customer not found');
  }

  return customer.remove();

}


export const updateCustomer = async (
  id: number,
  name: string,
  email: string,
  location: string,
  phone: string
) => {
  const customer = await Customer.findOne({
    where: {
      id
    }
  });
  
  if (!customer) {
    throw new Error('Customer not found');
  }

  customer.name = name;
  customer.email = email;
  customer.location = location;
  customer.phone = phone;
  return customer.save();
}

export const getCustomer = async (id: number) => {
  const customer = await Customer.findOne({
    where: {
      id
    }
  });
  
  if (!customer) {
    throw new Error('Customer not found');
  }

  return customer;
}

