import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Staff } from "./Staff";

@Entity()
export class SalaryInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  gross_salary!: number;


  @ManyToOne(
    () => Staff,
    (staff) => staff.salaryInfo,
    {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  )
  staff!: Staff;

  @Column()
  bank_name!: string;
  
  @Column()
  account_number!: string;

  @Column()
  account_name!: string;

  @Column({nullable: true})
  bank_branch!: string;
}

export const getSalaryInfo = async () => {
  const salaryInfo = await SalaryInfo.find({
    order: {
      id: "DESC",
    },
    relations: {
      staff: true,
    },
  });
  return salaryInfo;
}

export const getSalaryInfoById = async (id: number) => {
  const salaryInfo = await SalaryInfo.findOne({
    where: {
      id,
    },
    relations: {
      staff: true,
    },
  });
  return salaryInfo;
}

export const createSalaryInfo = async (
  gross_salary: number,
  bank_name: string,
  account_number: string,
  account_name: string,
  bank_branch: string,
  staff: number
) => {
  const staffMember = await Staff.findOne({
    where: {
      id: staff,
    },
  });
  if (!staffMember) {
    throw new Error("Staff member not found");
  }
  const salaryInfo = new SalaryInfo();
  salaryInfo.gross_salary = gross_salary;
  salaryInfo.bank_name = bank_name;
  salaryInfo.account_number = account_number;
  salaryInfo.account_name = account_name;
  salaryInfo.bank_branch = bank_branch;
  salaryInfo.staff = staffMember;
  await salaryInfo.save();
  return salaryInfo;
};

export const updateSalaryInfo = async (
  id: number,
  gross_salary: number,
  bank_name: string,
  account_number: string,
  account_name: string,
  bank_branch: string,
  staff: number
) => {
  const salaryInfo = await SalaryInfo.findOne({
    where: {
      id,
    },
  });
  if (!salaryInfo) {
    throw new Error("Salary info not found");
  }
  const staffMember = await Staff.findOne({
    where: {
      id: staff,
    },
  });
  if (!staffMember) {
    throw new Error("Staff member not found");
  }
  salaryInfo.gross_salary = gross_salary;
  salaryInfo.bank_name = bank_name;
  salaryInfo.account_number = account_number;
  salaryInfo.account_name = account_name;
  salaryInfo.bank_branch = bank_branch;
  salaryInfo.staff = staffMember;
  await salaryInfo.save();
  return salaryInfo;
}

export const deleteSalaryInfo = async (id: number) => {
  const salaryInfo = await SalaryInfo.findOne({
    where: {
      id,
    },
  });
  if (!salaryInfo) {
    throw new Error("Salary info not found");
  }
  await salaryInfo.remove();
  return salaryInfo;
}
