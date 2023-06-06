// Purpose: TypeScript entity for Student table created using TypeORM.
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { House, getHouseById } from "./House";
import { StudentType, getStudentTypeById } from "./StudentType";
import { SchoolClass, getClassById } from "./SchoolClass";
import { Stream, getSingleStream } from "./Stream";


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

  @Column({nullable: true,})
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

  @ManyToOne(() => House, (house) => house.id, {
    cascade: true,
    eager: true,
  })
  studentHouse!: House;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.id, {
    cascade: true,
    eager: true,
  })
  studentClass!: SchoolClass;

  @ManyToOne(() => Stream, (stream) => stream.id, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  studentStream!: Stream;

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
  fatherName: string,
  fatherContact: string,
  motherName: string,
  motherContact: string,
  studentType: string,
  studentSection: string,
  studentHouse: string,
  studentClass: string,
  feesCategory: string,
  studentStream: string,
) => {

  const house = await getHouseById(parseInt(studentHouse));
  const studentTypeToInsert = await getStudentTypeById(parseInt(studentType));
  const studentClassToInsert = await getClassById(parseInt(studentClass));
  const studentStreamToInsert = await getSingleStream(parseInt(studentStream));

  const studentToInsert = new Student();
  studentToInsert.firstName = firstName;
  studentToInsert.middleName = middleName;
  studentToInsert.lastName = lastName;
  studentToInsert.email = email;
  studentToInsert.phoneNumber = phoneNumber;
  studentToInsert.dateOfBirth = dateOfBirth;
  studentToInsert.gender = gender;
  studentToInsert.nationality = nationality;
  studentToInsert.residence = residence;
  studentToInsert.fatherName = fatherName;
  studentToInsert.fatherContact = fatherContact;
  studentToInsert.motherName = motherName;
  studentToInsert.motherContact = motherContact;
  studentToInsert.studentType = studentTypeToInsert;
  studentToInsert.studentSection = studentSection;
  studentToInsert.studentHouse = house;
  studentToInsert.studentClass = studentClassToInsert;
  studentToInsert.feesCategory = feesCategory;
  studentToInsert.studentStream = studentStreamToInsert

  const student = await Student.save(studentToInsert);
  return student;
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
  fatherName: string,
  fatherContact: string,
  motherName: string,
  motherContact: string,
  studentType: string,
  studentSection: string,
  studentHouse: string,
  studentClass: string,
  feesCategory: string,
  studentStream: string,
) => {
  
  const house = await getHouseById(parseInt(studentHouse));
  const studentTypeToInsert = await getStudentTypeById(parseInt(studentType));
  const studentClassToInsert = await getClassById(parseInt(studentClass));
  const studentStreamToInsert = await getSingleStream(parseInt(studentStream));

  const studentToUpdate = await Student.update(id, {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: dateOfBirth,
    gender:gender,
    nationality,
    residence: residence,
    photo: photo,
    fatherName: fatherName,
    fatherContact: fatherContact,
    motherName: motherName,
    motherContact: motherContact,
    studentType: studentTypeToInsert,
    studentSection: studentSection,
    studentHouse: house,
    studentClass: studentClassToInsert,
    feesCategory: feesCategory,
    studentStream: studentStreamToInsert
  });

  return studentToUpdate;
  
}

export const getSingleStudent = async (id: number) => {
  const student = await Student.findOne({ where: { id: id } });
  return student;
}



