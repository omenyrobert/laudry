import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { StaffType } from "./StaffType";
import { SalaryInfo } from "./SalaryInfo";
import { PaySlip } from "./PaySlip";
import { StaffProfile } from "./StaffProfile";
import { Subject } from "./Subject";
import { SchoolClass } from "./SchoolClass";

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
    }, {
      eager: true,
    }
  )
  @JoinColumn()
  public staff_type!: StaffType;

  @Column({ select: false })
  password!: string;

  @Column("simple-array", { nullable: true })
  roles: string[];

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


  // Add profile columns all are nullable

  @Column({ nullable: true })
  profile_picture!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  phone_number!: string;

  @Column({ nullable: true })
  date_of_birth!: Date;

  @Column({ nullable: true })
  gender!: string;

  @Column({ nullable: true })
  marital_status!: string;

  @Column({ nullable: true })
  nationality!: string;


  @OneToOne(()=> StaffProfile, staffProfile => staffProfile.staff, {
    cascade: true,
    eager: true,
    nullable: true,
    })
  @JoinColumn()
  staffProfile!: StaffProfile;

  @ManyToMany(() => Subject, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinTable({ name: "staff_subjects" })
  subjects: Subject[];

  @ManyToMany(() => SchoolClass, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinTable({ name: "staff_classes" })
  classes: SchoolClass[];




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
  staffType: any,
  roles: string[]
) => {
  const staffToAdd = await Staff.insert({
    email: email,
    last_name: last_name,
    first_name: first_name,
    middle_name: middle_name,
    password: password,
    staff_type: staffType,
    roles: roles,
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
  staffType: any,
  roles: string[]
) => {
  const staffToUpdate = await Staff.update(id, {
    email: email,
    last_name: last_name,
    first_name: first_name,
    middle_name: middle_name,
    staff_type: staffType,
    roles: roles
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


export const updateProfile = async (
  id: number,
  first_name: string,
  middle_name: string,
  last_name: string,
  email: string,
  staff_type: number,
  address: string,
  phone_number: string,
  date_of_birth: string,
  gender: string,
  marital_status: string,
  nationality: string,
) => {
  
  // get staff account
  const staff = await Staff.findOne({ where: { id: id } });

  if (!staff) {
    throw new Error("Staff account does not exist");
  }

  const getStaffType = await StaffType.findOne({ where: { id: staff_type } });

  if (!getStaffType) {  
    throw new Error("Staff type does not exist");
  }

  // update all fields
  staff.first_name = first_name;
  staff.middle_name = middle_name;
  staff.last_name = last_name;
  staff.staff_type = getStaffType;
  staff.address = address;
  staff.phone_number = phone_number;
  staff.date_of_birth = new Date(date_of_birth);
  staff.gender = gender
  staff.marital_status = marital_status;
  staff.nationality = nationality;
  staff.email = email;

  // save staff
  await staff.save();

  return staff;
};

export const updateProfilePicture = async (
  id: number,
  profile_picture: string
) => {
  const staff = await Staff.findOne({ where: { id: id } });

  if (!staff) {
    throw new Error("Staff account does not exist");
  }

  staff.profile_picture = profile_picture;

  await staff.save();


  return staff;
}
