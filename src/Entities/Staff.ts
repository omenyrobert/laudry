import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { StaffType } from "./StaffType";
import { SalaryInfo } from "./SalaryInfo";
import { PaySlip } from "./PaySlip";

@Entity()
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column({ nullable: true })
  middle_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @ManyToOne(
    () => StaffType,
    () => {
      onDelete: "CASCADE";
      onUpdate: "CASCADE";
    }
  )
  @JoinColumn()
  public staff_type!: StaffType;

  @Column({ select: false })
  password!: string;

  @OneToMany(
    () => SalaryInfo,
    (salaryInfo) => salaryInfo.staff,
    {
      cascade: true,
      eager: true,
      nullable: true,
    }
  )
  salaryInfo!: SalaryInfo;

  @OneToMany(
    () => PaySlip,
    (paySlip) => paySlip.staff,
    {
      cascade: true,
      eager: true,
      nullable: true,
    }
  )
  paySlips!: PaySlip[];


}

export const getStaffMembers = async () => {
  const staffMembers = await Staff.find({
    order: {
      id: "DESC",
    },
    relations: {
      staff_type: true,
    },
  });
  return staffMembers;
};

export const addStaffMember = async (
  email: string,
  last_name: string,
  first_name: string,
  middle_name: string,
  password: any,
  staffType: any
) => {
  const staffToAdd = await Staff.insert({
    email: email,
    last_name: last_name,
    first_name: first_name,
    middle_name: middle_name,
    password: password,
    staff_type: staffType,
  });
  return staffToAdd;
};

export const deleteStaffMember = async (id: number) => {
  const staffToDelete = await Staff.delete(id);
  if (staffToDelete) {
    return "Staff Deleted";
  }
};

export const getMemberById = async (id: number) => {
  const staffToFindById = await Staff.findOne({ where: { id: id } });
  return staffToFindById;
};

export const getMemberByEmail = async (email: string) => {
  const staffToFindByEmail = await Staff.findOne({
    where: { email: email },
    select: [
      "id",
      "email",
      "password",
      "first_name",
      "last_name",
      "middle_name",
    ],
  });
  return staffToFindByEmail;
};

export const updateMember = async (
  id: number,
  email: string,
  last_name: string,
  first_name: string,
  middle_name: string,
  staffType: any
) => {
  const staffToUpdate = await Staff.update(id, {
    email: email,
    last_name: last_name,
    first_name: first_name,
    middle_name: middle_name,
    staff_type: staffType,
  });
  return staffToUpdate;
};

export const updatePassword = async (email: string, password: any) => {
  const updatePassword = await Staff.update(
    { email: email },
    { password: password }
  );
  return updatePassword;
};
