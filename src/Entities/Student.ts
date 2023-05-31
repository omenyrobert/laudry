// Purpose: TypeScript entity for Student table created using TypeORM.
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { House } from "./House";
import { StudentType } from "./StudentType";
import { SchoolClass } from "./SchoolClass";


@Entity()
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  middleName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  dateOfBirth!: string;

  @Column()
  gender!: string;

  @Column()
  nationality!: string;

  @Column()
  residence!: string;

  @Column()
  photo!: string;

  @Column()
  nin!: string;

  @Column()
  nationalId!: string;

  @Column()
  fatherName!: string;

  @Column()
  fatherContact!: string;

  @Column()
  motherName!: string;

  @Column()
  motherContact!: string;

  @ManyToOne(() => StudentType, (studentType) => studentType.id)
  @JoinColumn()
  studentType!: string;

  @Column()
  studentSection!: string;

  @ManyToOne(() => House, (house) => house.id)
  @JoinColumn()
  studentHouse!: string;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.id)
  @JoinColumn()
  studentClass!: string;

  @Column()
  feesCategory!: string;

}

export const getStudents = async () => {
  const students = await Student.find({
    order: {
      id: "DESC",
    },
  });
  return students;
}

export const createStudent = async (
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  dateOfBirth: string,
  gender: string,
  nationality: string,
  residence: string,
  photo: string,
  nin: string,
  nationalId: string,
  fatherName: string,
  fatherContact: string,
  motherName: string,
  motherContact: string,
  studentType: string,
  studentSection: string,
  studentHouse: string,
  studentClass: string,
  feesCategory: string,
) => {

  const studentToInsert = await Student.insert({
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth,
    gender,
    nationality,
    residence,
    photo,
    nin,
    nationalId,
    fatherName,
    fatherContact,
    motherName,
    motherContact,
    studentType,
    studentSection,
    studentHouse,
    studentClass,
    feesCategory,
  });
  return studentToInsert;
}

export const deleteStudent = async (id: number) => {
  const student = await Student.delete(id);
  if (student) {
    return true;
  } else {
    return false;
  }
}

export const updateStudent = async (
  id: number,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  dateOfBirth: string,
  gender: string,
  nationality: string,
  residence: string,
  photo: string,
  nin: string,
  nationalId: string,
  fatherName: string,
  fatherContact: string,
  motherName: string,
  motherContact: string,
  studentType: string,
  studentSection: string,
  studentHouse: string,
  studentClass: string,
  feesCategory: string,
) => {
  
  const studentToUpdate = await Student.update(id, {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth,
    gender,
    nationality,
    residence,
    photo,
    nin,
    nationalId,
    fatherName,
    fatherContact,
    motherName,
    motherContact,
    studentType,
    studentSection,
    studentHouse,
    studentClass,
    feesCategory,
  });
  return studentToUpdate;
}

export const getSingleStudent = async (id: number) => {
  const student = await Student.findOne({ where: { id: id } });
  return student;
}



