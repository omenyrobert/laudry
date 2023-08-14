import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  Like,
  In,
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
import { ClassLevel, getSelectedLevels } from "./ClassLevel";
import { extraLatestArrayIndex } from "../Helpers/Helpers";
import { getStudentTermPayments } from "./StudentPaidBalance";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column({
    nullable: true,
  })
  middleName!: string;

  @Column()
  lastName!: string;

  @Column({
    nullable: true,
  })
  email!: string;

  @Column({
    nullable: true,
  })
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

  @Column({ nullable: true })
  feesBalance!: string;

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

  @ManyToMany(() => ClassLevel, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "student_levels" })
  student_levels: ClassLevel[];

  @OneToMany(
    () => StudentDocument,
    (studentDocument) => studentDocument.student,
    {
      cascade: true,
      eager: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      nullable: true,
    }
  )
  documents: StudentDocument[];
}

@Entity()
export class StudentDocument extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @ManyToOne(() => Student, (student) => student.documents)
  student: Student;

  @Column()
  name!: string;
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
  termId: any = null,
  levelId: any = null
) => {
  interface data {
    houses: any;
    classes: any;
    streams: any;
    studentTypes: any;
    sections: any;
    fees: any;
    terms: any;
    levels: any;
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

  //levels

  const studentLevelQuery = await queryRunner.manager.query(
    `SELECT * FROM student_levels WHERE studentId = ${studentId}`
  );

  const levelIds = extractArrays(studentLevelQuery, "classLevelId", levelId);

  const studentLevels = await getSelectedLevels(levelIds);

  const newData: data = {
    houses: studentHouses,
    classes: studentClasses,
    streams: studentStreams,
    studentTypes: studentTypes,
    sections: studentSections,
    fees: studentFees,
    terms: studentTerms,
    levels: studentLevels,
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
  studentStream: any,
  studentLevel: any
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
    termId,
    studentLevel
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
    student_levels: newData.levels,
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
  studentStream: string,
  studentLevel: string,
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
    termId,
    studentLevel
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
    student_levels: newData.levels
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

export const getStudents = async (page: number = 0, count: number = 20) => {
  const students = await Student.findAndCount({
    order: {
      id: "DESC",
    },
    take: count,
    skip: page * count,
  });
  console.log(students[0].length)
  return students;
};

export const updateStudentPhoto = async (id: number, photo: string) => {
  await Student.update(id, {
    photo: photo,
  });
  return true;
};

export const createDocument = async (
  studentId: number,
  url: string,
  name: string
) => {
  const student = await Student.findOne({ where: { id: studentId } });

  if (!student) {
    throw new Error("Student not found");
  }

  const document = await StudentDocument.save({
    url: url,
    name: name,
    student: student,
  });

  return document;
};

export const getStudentDocuments = async (studentId: number) => {
  const student = await Student.findOne({ where: { id: studentId } });

  if (!student) {
    throw new Error("Student not found");
  }

  return student.documents;
};

export const deleteStudentDocument = async (id: number) => {
  const document = await StudentDocument.delete(id);
  if (document) {
    return true;
  } else {
    return false;
  }
};

export const searchStudents = async (
  keyword: string,
  page: number = 0,
  count: number = 20
) => {
  const searchStudents = await Student.findAndCount({
    order: {
      id: "DESC",
    },
    where: [
      { firstName: Like(`%${keyword}%`) },
      { lastName: Like(`%${keyword}`) },
      { email: Like(`%${keyword}`) },
    ],
    take: count,
    skip: page * count,
  });
  return searchStudents;
};

// Get nuber of students
export const getNumberOfStudents = async () => {
  const students = await Student.find();

  return students.length;
};

// get students with fees balance less than 50%
export const getStudentsWithFeesBalanceLessThan50 = async () => {
  const studentsToFetch = await Student.find();
  const activeTerm = await getTermBySelect();

  if (activeTerm === null) {
    throw new Error("Act Term not found");
  }

  const students = await Promise.all(
    studentsToFetch.map(async (student) => {
      const studentPaymentsPerTerm = await getStudentTermPayments(
        student.id,
        activeTerm.id
      );
      const feesType = extraLatestArrayIndex(student.fees);
      const balanceToReturn =
        studentPaymentsPerTerm !== null
          ? studentPaymentsPerTerm
          : { balance: feesType?.amount, amount: 0 };
      return { ...student, feesBalance: JSON.stringify(balanceToReturn) };
    })
  );

  const studentsWithFeesBalanceLessThan50 = students.filter((student: any) => {
    if (student.feesBalance !== null) {
      // decode the JSON
      const feesBalance = JSON.parse(student.feesBalance);

      if (feesBalance.balance && feesBalance.amount) {
        const balance = parseFloat(feesBalance.balance);
        const amount = parseFloat(feesBalance.amount);
        const percentage = (balance / amount) * 100;
        if (percentage <= 50) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  });

  return studentsWithFeesBalanceLessThan50;
};


