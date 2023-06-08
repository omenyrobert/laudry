import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { PaySlipCategory } from "./PaySlipCategory";
import { Staff } from "./Staff";

@Entity()
export class PaySlip extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  gross_salary!: number;

  @Column()
  net_salary!: number;

  @OneToMany(
    () => Tax,
    tax => tax.paySlip,
    {
      nullable: true,
      eager: true
    }
  )
  taxes: Tax[];

  @OneToMany(
    () => Deduction,
    deduction => deduction.paySlip,
    {
      nullable: true,
      eager: true
    }
  )
  deductions: Deduction[];

  @ManyToOne(
    () => PaySlipCategory,
    paySlipCategory => paySlipCategory.paySlips,
  )
  paySlipCategory: PaySlipCategory;

  @ManyToOne(
    () => Staff,
    staff => staff.paySlips,
  )
  staff: Staff;


}

@Entity()
export class Tax extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  percentage!: number;

  @ManyToOne(
    () => PaySlip,
    paySlip => paySlip.taxes,
  )
  paySlip: PaySlip;

}

@Entity()
export class Deduction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  amount!: number;

  @ManyToOne(
    () => PaySlip,
    paySlip => paySlip.deductions,
  )
  paySlip: PaySlip;

}



export const getPaySlips = async () => {
  const paySlips = await PaySlip.find({
    order: {
      id: "DESC",
    },
    relations: ['taxes', 'deductions', 'paySlipCategory', 'staff']
  });
  return paySlips;
}

type TaxOBJ = {
  id?: number,
  name: string,
  percentage: number
}

type DeductionOBJ = {
  id?: number,
  name: string,
  amount: number
}

export const createPaySlip = async (gross_salary: number, net_salary: number, paySlipCategory: PaySlipCategory, staffId: number, taxes: TaxOBJ[] = [], deductions: DeductionOBJ[] = []) => {
  const staff = await Staff.findOne({ where: { id: staffId } });
  if (!staff) {
    throw new Error('Staff member not found');
  }
  const PaySlipToInsert = await PaySlip.insert({ 
    gross_salary: gross_salary, 
    net_salary: net_salary, 
    paySlipCategory: paySlipCategory, 
    staff: staff
  });

  const insertedPaySlip = await PaySlip.findOne({ where: { id: PaySlipToInsert.identifiers[0].id }, relations: ['taxes', 'deductions', 'paySlipCategory', 'staff'] }) as PaySlip;

  for (let i = 0; i < taxes.length; i++) {
    const tax = taxes[i];
    await Tax.insert({ name: tax.name, percentage: tax.percentage, paySlip: insertedPaySlip });
  }

  for (let i = 0; i < deductions.length; i++) {
    const deduction = deductions[i];
    await Deduction.insert({ name: deduction.name, amount: deduction.amount, paySlip: insertedPaySlip });
  }


  return PaySlipToInsert;
}

export const deletePaySlip = async (id: number) => {
  const paySlip = await PaySlip.delete(id);
  if (paySlip) {
    return true
  }
  return false
}
