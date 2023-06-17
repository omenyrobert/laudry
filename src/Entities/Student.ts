import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { House, getSelectedHouses } from "./House";
import { StudentType, selectedType } from "./StudentType";
import { getSelectedClasses } from "./SchoolClass";
import { Stream, getSelectedStream } from "./Stream";
import { Section, selectedSections } from "./Section";
import { DatabaseConnection } from "../Database/database";
import { Fee, selectedFee } from "./Fee";
import { Term, selectedTermIds, getTermBySelect } from "./Term";
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

  @ManyToMany(() => House, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "students_houses" })
  houses: House[];

  @ManyToMany(() => SchoolClass, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_classes" })
  classes: SchoolClass[];

  @ManyToMany(() => Stream, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_streams" })
  streams: Stream[];

  @ManyToMany(() => Term, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_terms" })
  terms: Term[];

  @ManyToMany(() => Fee, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_fees" })
  fees: Fee[];

  @ManyToMany(() => Section, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_section" })
  sections: Section[];

  @ManyToMany(() => StudentType, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_student_types" })
  student_types: StudentType[];
}

const extractArrays = (array: [], key: string, extraData: number) => {
  let newArray = array.map((a: any) => a[key]);
  if (newArray.length > 0 && extraData !== null) {
    newArray.pop();
    newArray.push(extraData);
  }
  if (newArray.length == 0 && extraData !== null) {
    newArray.push(extraData);
  }
  return newArray;
};

const studentExtraData = async (
  studentId: number,
  house: any = null,
  classId: any = null,
  streamId: any = null,
  studentTypeId: any = null,
  sectionId: any = null,
  feeId: any = null,
  termId: any = null
) => {
  interface data {
    houses: any;
    classes: any;
    streams: any;
    studentTypes: any;
    sections: any;
    fees: any;
    terms: any;
  }

  const queryRunner = DatabaseConnection.createQueryRunner();

  //houses
  const houseStudentQuery = await queryRunner.manager.query(
    `SELECT * FROM students_houses WHERE studentId = ${studentId}`
  );

  const houseIds = extractArrays(houseStudentQuery, "houseId", house);

  const studentHouses = await getSelectedHouses(houseIds);

  //classes
  const classStudentQuery = await queryRunner.manager.query(
    `SELECT * FROM student_classes WHERE studentId = ${studentId}`
  );

  const classIds = extractArrays(classStudentQuery, "schoolClassId", classId);

  const studentClasses = await getSelectedClasses(classIds);

  //streams
  const streamStudentQuery = await queryRunner.manager.query(
    `SELECT * FROM student_streams WHERE studentId = ${studentId}`
  );

  const streamIds = extractArrays(streamStudentQuery, "streamId", streamId);

  const studentStreams = await getSelectedStream(streamIds);

  //student types
  const studentTypesQuery = await queryRunner.manager.query(
    `SELECT * FROM student_student_types WHERE studentId = ${studentId}`
  );

  const studentTypesIds = extractArrays(
    studentTypesQuery,
    "studentTypeId",
    studentTypeId
  );

  const studentTypes = await selectedType(studentTypesIds);

  //sections
  const studentSectionQuery = await queryRunner.manager.query(
    `SELECT * FROM student_section WHERE studentId = ${studentId}`
  );

  const sectionIds = extractArrays(studentSectionQuery, "sectionId", sectionId);

  const studentSections = await selectedSections(sectionIds);

  //fees category
  const feeStudentQuery = await queryRunner.manager.query(
    `SELECT * FROM student_fees WHERE studentId = ${studentId}`
  );

  const feesIds = extractArrays(feeStudentQuery, "feeId", feeId);

  const studentFees = await selectedFee(feesIds);

  //terms

  const studentTermsQuery = await queryRunner.manager.query(
    `SELECT * FROM student_terms WHERE studentId = ${studentId}`
  );

  const termIds = extractArrays(studentTermsQuery, "termId", termId);

  const studentTerms = await selectedTermIds(termIds);

  const newData: data = {
    houses: studentHouses,
    classes: studentClasses,
    streams: studentStreams,
    studentTypes: studentTypes,
    sections: studentSections,
    fees: studentFees,
    terms: studentTerms,
  };
  return newData;
};

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
  });

  let termId;
  const currentTerm = await getTermBySelect();

  if (currentTerm !== null) {
    termId = currentTerm.id;
  }

  const newData: any = await studentExtraData(
    student.id,
    studentHouse,
    studentClass,
    studentStream,
    studentType,
    studentSection,
    feesCategory,
    termId
  );

  const loadStudentRelations = await Student.preload({
    id: student.id,
    houses: newData.houses,
    classes: newData.classes,
    streams: newData.streams,
    student_types: newData.studentTypes,
    sections: newData.sections,
    fees: newData.fees,
    terms: newData.terms,
  });

  if (loadStudentRelations) {
    await Student.save(loadStudentRelations);
  }

  return loadStudentRelations;
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
  await Student.update(id, {
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
  });

  let termId;
  const currentTerm = await getTermBySelect();

  if (currentTerm !== null) {
    termId = currentTerm.id;
  }

  const newData: any = await studentExtraData(
    id,
    studentHouse,
    studentClass,
    studentStream,
    studentType,
    studentSection,
    feesCategory,
    termId
  );

  const loadStudentRelations = await Student.preload({
    id: id,
    houses: newData.houses,
    classes: newData.classes,
    streams: newData.streams,
    student_types: newData.studentTypes,
    sections: newData.sections,
    fees: newData.fees,
    terms: newData.terms,
  });

  if (loadStudentRelations) {
    await Student.save(loadStudentRelations);
  }

  return loadStudentRelations;
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
