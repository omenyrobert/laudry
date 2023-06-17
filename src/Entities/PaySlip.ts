import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  OneToMany,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { PaySlipCategory } from "./PaySlipCategory";
import { Staff } from "./Staff";

@Entity()
export class PaySlip extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @Column()
  gross_salary!: number;

  @Column()
  net_salary!: number;

  @OneToMany(
    () => Tax,
    tax => tax.paySlip,
    {
      nullable: true,
      eager: true,
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  taxes: Tax[];

  @OneToMany(
    () => Deduction,
    deduction => deduction.paySlip,
    {
      nullable: true,
      eager: true,
      cascade: true,
      onDelete: "CASCADE",
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
    {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
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
    {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
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

export const createPaySlip = async (gross_salary: number, net_salary: number, paySlipCategory: number, staffId: number, taxes: TaxOBJ[] = [], deductions: DeductionOBJ[] = []) => {

  const staff = await Staff.findOne({ where: { id: staffId } });
  if (!staff) {
    throw new Error('Staff member not found');
  }

  const paySlipCategoryObj = await PaySlipCategory.findOne({ where: { id: paySlipCategory } });
  if (!paySlipCategoryObj) {
    throw new Error('PaySlipCategory not found');
  }

  const PaySlipToInsert = await PaySlip.insert({ 
    gross_salary: gross_salary, 
    net_salary: net_salary, 
    paySlipCategory: paySlipCategoryObj, 
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


export const updatePaySlip = async (id: number, gross_salary: number, net_salary: number, paySlipCategory: number, staffId: number, taxes: TaxOBJ[] = [], deductions: DeductionOBJ[] = []) => {

  const paySlip = await PaySlip.findOne({ where: { id: id } });

  if (!paySlip) {
    throw new Error('PaySlip not found');
  }

  const staff = await Staff.findOne({ where: { id: staffId } });

  if (!staff) {
    throw new Error('Staff member not found');
  }

  const paySlipCategoryObj = await PaySlipCategory.findOne({ where: { id: paySlipCategory } });

  if (!paySlipCategoryObj) {
    throw new Error('PaySlipCategory not found');
  }

  const PaySlipToUpdate = await PaySlip.update(id, {
    gross_salary: gross_salary,
    net_salary: net_salary,
    paySlipCategory: paySlipCategoryObj,
    staff: staff
  });

  const insertedPaySlip = await PaySlip.findOne({ where: { id: id }, relations: ['taxes', 'deductions', 'paySlipCategory', 'staff'] }) as PaySlip;

  for (let i = 0; i < taxes.length; i++) {
    const tax = taxes[i];
    if (tax.id) {
      await Tax.update(tax.id, { name: tax.name, percentage: tax.percentage, paySlip: insertedPaySlip });
    } else {
      await Tax.insert({ name: tax.name, percentage: tax.percentage, paySlip: insertedPaySlip });
    }
  }

  for (let i = 0; i < deductions.length; i++) {
    const deduction = deductions[i];
    if (deduction.id) {
      await Deduction.update(deduction.id, { name: deduction.name, amount: deduction.amount, paySlip: insertedPaySlip });
    } else {
      await Deduction.insert({ name: deduction.name, amount: deduction.amount, paySlip: insertedPaySlip });
    }
  }

  return PaySlipToUpdate;
}