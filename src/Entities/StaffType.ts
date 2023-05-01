import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class StaffType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;
}

export const getStaffTypes = async () => {
  const staffTypes = await StaffType.find({
    order: {
      id: "DESC",
    },
  });

  return staffTypes;
};

export const addStaffType = async (type: string) => {
  const staffTypeToAdd = await StaffType.insert({
    type: type,
  });
  return staffTypeToAdd;
};

export const getStaffTypeById = async (id: number) => {
  const staffTypeToFindById = await StaffType.findOne({ where: { id: id } });
  return staffTypeToFindById;
};

export const getStaffTypeByType = async (type: string) => {
  const staffTypeToFindByType = await StaffType.findOne({
    where: { type: type },
  });
  return staffTypeToFindByType;
};

export const deleteStaffType = async (id: number) => {
  const staffTypeToDelete = await StaffType.delete(id);
  if (staffTypeToDelete) {
    return "Staff Type Deleted";
  }
};

export const updateStaffType = async (id: number, type: string) => {
  const staffTypeToUpdate = await StaffType.update(id, { type: type });
  return staffTypeToUpdate;
};
