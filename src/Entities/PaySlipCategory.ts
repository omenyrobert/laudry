import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity()
export class PaySlipCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category!: string;

}

export const getPaySlipCategories = async () => {
  const paySlipCategories = await PaySlipCategory.find({
    order: {
      id: "DESC",
    },
  });
  return paySlipCategories;
}

export const createPaySlipCategory = async (category: string) => {
  const PaySlipCategoryToInsert = await PaySlipCategory.insert({ category: category });
  return PaySlipCategoryToInsert;
}

export const deletePaySlipCategory = async (id: number) => {
  const paySlipCategory = await PaySlipCategory.delete(id);
  if (paySlipCategory) {
    return true
  }
  return false
}

export const updatePaySlipCategory = async (id: number, category: string) => {
  const PaySlipCategoryToUpdate = await PaySlipCategory.update(id, { category: category });
  return PaySlipCategoryToUpdate;
}

export const getSinglePaySlipCategory = async (id: number) => {
  const paySlipCategory = await PaySlipCategory.findOne({ where: { id: id } });
  return paySlipCategory;
}

