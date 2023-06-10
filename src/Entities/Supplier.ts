import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, In } from "typeorm";

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  supplierName!: string;

  @Column()
  contacts!: string;

  @Column()
  emails!: string;

  @Column()
  address!: string;

  @Column()
  about!: string;
}

export const getSuppliers = async () => {
  const suppliers = await Supplier.find({
    order: {
      id: "DESC",
    },
  });
  return suppliers;
};

export const createSupplier = async (
  supplierName: string,
  contacts: string,
  emails: string,
  address: string,
  about: string,
) => {  
  const supplierToInsert = await Supplier.insert({
    supplierName,
    contacts,
    emails,
    address,
    about,
  });

  return supplierToInsert;
};

export const deleteSupplier = async (id: number) => {
  const supplier = await Supplier.delete(id);
  if (supplier) {
    return "Supplier Deleted";
  }
};

export const updateSupplier = async (
  id: number,
  supplierName: string,
  contacts: string,
  emails: string,
  address: string,
  about: string,
) => {
  const supplierToUpdate = await Supplier.update(id, {
    supplierName,
    contacts,
    emails,
    address,
    about,
  });
  return supplierToUpdate;
};

export const getSingleSupplier = async (id: number) => {
  const supplier = await Supplier.findOne({ where: { id: id } }) as Supplier;
  return supplier;
};

export const getSelectedSuppliers = async (ids: number[]) => {
  const selectedSuppliers = await Supplier.find({ where: { id: In(ids) } });
  return selectedSuppliers;
};
