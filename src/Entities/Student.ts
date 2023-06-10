import { Term, selectedTermIds } from "./Term";
import { SchoolClass } from "./SchoolClass";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { House, getSelectedHouses } from "./House";
import { StudentType, getStudentTypeById } from "./StudentType";
import { getSelectedClasses } from "./SchoolClass";
import { Stream, getSelectedStream } from "./Stream";

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

  @Column({ nullable: true })
  photo!: string;

  @Column()
  fatherName!: string;

  @Column()
  fatherContact!: string;

  @Column()
  motherName!: string;

  @Column()
  motherContact!: string;

  @ManyToOne(() => StudentType, (studentType) => studentType.id, {
    cascade: true,
    eager: true,
  })
  studentType!: StudentType;

  @Column()
  studentSection!: string;

  @Column()
  feesCategory!: string;

  @ManyToMany(() => House, {
    cascade: true,
    eager: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "students_houses" })
  houses: House[];

  @ManyToMany(() => SchoolClass, {
    cascade: true,
    eager: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_classes" })
  classes: SchoolClass[];

  @ManyToMany(() => Stream, {
    cascade: true,
    eager: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_streams" })
  streams: Stream[];

  @ManyToMany(() => Term, {
    cascade: true,
    eager: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_terms" })
  terms: Term[];
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
  fatherName: string,
  fatherContact: string,
  motherName: string,
  motherContact: string,
  studentType: string,
  studentSection: string,
  studentHouse: any,
  studentClass: any,
  feesCategory: any,
  studentStream: any
) => {
  const studentHouses = await getSelectedHouses(studentHouse);
  const studentTypeToInsert = await getStudentTypeById(parseInt(studentType));
  const studentClasses = await getSelectedClasses(studentClass);
  const studentStreams = await getSelectedStream(studentStream);
  const studentTerms = await selectedTermIds();

  const student = await Student.save({
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth,
    gender: gender,
    nationality: nationality,
    residence: residence,
    fatherName: fatherName,
    fatherContact: fatherContact,
    motherName: motherName,
    motherContact: motherContact,
    studentType: studentTypeToInsert,
    studentSection: studentSection,
    houses: studentHouses,
    classes: studentClasses,
    feesCategory: feesCategory,
    streams: studentStreams,
    terms: studentTerms,
  });
  return student;
};

export const deleteStudent = async (id: number) => {
  const student = await Student.delete(id);
  if (student) {
    return true;
  } else {
    return false;
  }
};

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
  fatherName: string,
  fatherContact: string,
  motherName: string,
  motherContact: string,
  studentType: string,
  studentSection: string,
  studentHouse: string,
  studentClass: string,
  feesCategory: string,
  studentStream: string
) => {
  // const house = await getHouseById(parseInt(studentHouse));
  const studentTypeToInsert = await getStudentTypeById(parseInt(studentType));
  // const studentClassToInsert = await getClassById(parseInt(studentClass));
  // const studentStreamToInsert = await getSingleStream(parseInt(studentStream));

  const studentToUpdate = await Student.update(id, {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth,
    gender: gender,
    nationality,
    residence: residence,
    photo: photo,
    fatherName: fatherName,
    fatherContact: fatherContact,
    motherName: motherName,
    motherContact: motherContact,
    studentType: studentTypeToInsert,
    studentSection: studentSection,
    // studentHouse: house,
    // studentClass: studentClassToInsert,
    feesCategory: feesCategory,
    // studentStream: studentStreamToInsert
  });

  return studentToUpdate;
};

export const getSingleStudent = async (id: number) => {
  const student = await Student.findOne({ where: { id: id } });
  return student;
};

export const getStudents = async (page: number = 0, limit: number = 50) => {
  const students = await Student.find({
    order: {
      id: "DESC",
    },
    take: limit,
    skip: page * limit,
  });
  return students;
};
