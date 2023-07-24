import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,

} from "typeorm";
import {getTermBySelect} from "./Term"
@Entity()
export class StudentPaidBalance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  balance!: string;

  @Column()
  amount!: string;

  @Column()
  studentId!:number;

  @Column()
  termId!:number;

}

export const addRow = async (
  studentId: any,
  termId: any,
  balance: string,
  amount: string
) => {
  await StudentPaidBalance.insert({
    studentId: studentId,
    termId: termId,
    balance: balance,
    amount: amount,
  });
};

export const updateRow = async (
  studentId: any,
  termId: any,
  balance: string,
  amount: string,
  id: number
) => {
  await StudentPaidBalance.update(id, {
    studentId: studentId,
    termId: termId,
    balance: balance,
    amount: amount,
  });
};

export const getStudentTermPayments = async (studentId: any, termId: any) => {
  const studentPayments = await StudentPaidBalance.findOne({
    where: { studentId: studentId, termId: termId },
  });
  return studentPayments;
};
