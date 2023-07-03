import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Student } from "./Student";
import { Term } from "./Term";

@Entity()
export class StudentFeePayment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne(
  //   () => Student,
  //   () => {
  //     onDelete: "CASCADE";
  //     onUpdate: "CASCADE";
  //   },
  //   { eager: false }
  // )
  // @JoinColumn()
  // public student!: Student;
  @Column()
  studentId!: number;

  @Column()
  method!: string;

  @Column()
  amount_paid!: string;

  @Column()
  date!: string;

  @Column()
  termId!: number;

  // @ManyToOne(
  //   () => Term,
  //   () => {
  //     onDelete: "CASCADE";
  //     onUpdate: "CASCADE";
  //   },
  //   { eager: false }
  // )
  // @JoinColumn()
  // public term!: Term;

  @Column({ nullable: true })
  paid_by!: String;

  @Column({ nullable: true })
  contact!: String;

  @Column({ nullable: true })
  bank!: String;

  @Column({ nullable: true })
  branch!: String;

  @Column({ nullable: true })
  bank_slip_no!: String;

  @Column({ nullable: true })
  account_name!: String;

  @Column({ nullable: true })
  account_no!: String;

  @Column({ nullable: true })
  mobile_name!: String;

  @Column({ nullable: true })
  mobile_no!: String;

  @Column({ nullable: true })
  from_account!: String;
}

export const addFeePayment = async (
  student: any,
  method: string,
  amount: string,
  date: string,
  paidBy: string | any = null,
  contact: string | any = null,
  bank: string | any = null,
  branch: string | any = null,
  accountNo: string | any = null,
  accountName: string | any = null,
  mobileNo: string | any = null,
  bankSlipNo: string | any = null,
  mobileName: string | any = null,
  term: any,
  fromAccount: any = null
) => {
  const paymentToAdd = await StudentFeePayment.insert({
    studentId: student,
    method: method,
    amount_paid: amount,
    date: date,
    paid_by: paidBy,
    mobile_no: mobileNo,
    account_name: accountName,
    account_no: accountNo,
    branch: branch,
    bank: bank,
    contact: contact,
    bank_slip_no: bankSlipNo,
    mobile_name: mobileName,
    termId: term,
    from_account: fromAccount,
  });
  return paymentToAdd;
};

export const updateFeePayment = () => {};

export const removeFeePayment = () => {};

export const getFeePayment = () => {};

export const getStudentPayments = async (student: any, term: any) => {
  const studentPayments = await StudentFeePayment.find({
    where: { studentId: student, termId: term },
  });
  return studentPayments;
};
