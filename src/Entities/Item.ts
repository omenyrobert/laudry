import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  cost!: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  orderItems!: OrderItem[];
}

// ====== Item helpers ======

export const getItems = async () => {
  const items = await Item.find({
    order: { id: "DESC" },
  });
  return items;
};

export const addItem = async (name: string, cost: number) => {
  const itemToAdd = await Item.insert({ name, cost });
  return itemToAdd;
};

export const getItemById = async (id: number) => {
  const itemToFindById = await Item.findOne({ where: { id } });
  return itemToFindById;
};

export const getItemByName = async (name: string) => {
  const itemToFindByName = await Item.findOne({ where: { name } });
  return itemToFindByName;
};

export const deleteItem = async (id: number) => {
  const itemToDelete = await Item.delete(id);
  if (itemToDelete) {
    return "Item Deleted";
  }
};

export const updateItem = async (id: number, name: string, cost: number) => {
  const itemToUpdate = await Item.update(id, { name, cost });
  return itemToUpdate;
};
