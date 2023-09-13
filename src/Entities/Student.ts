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
} from "typeorm";
import { House, getSelectedHouses, getHouseByName, addHouse } from "./House";
import { StudentType, selectedType } from "./StudentType";
import { Stream, getSelectedStream, getStreamByName, createStream } from "./Stream";
import { Section, selectedSections } from "./Section";
import { Fee, selectedFee } from "./Fee";
import { Term, selectedTermIds, getTermBySelect } from "./Term";
import { SchoolClass, getSelectedClasses, getClassByName, createClass } from "./SchoolClass";
import { ClassLevel, getSelectedLevels, getLevelByName, createLevel } from "./ClassLevel";
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

const parseToInt = (value: any): number => {
  return parseInt(value, 10) ?? 0;
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

  const studentTypeId = parseToInt(studentType);
  const studentSectionId = parseToInt(studentSection);
  const studentHouseId = parseToInt(studentHouse);
  const studentClassId = parseToInt(studentClass);
  const studentFeeId = parseToInt(feesCategory);
  const studentStreamId = parseToInt(studentStream);
  const studentLevelId = parseToInt(studentLevel);

  await loadStudentRelationships(
    student.id,
    studentTypeId,
    studentLevelId,
    studentHouseId,
    studentStreamId,
    studentClassId,
    studentSectionId,
    studentFeeId
  );
  return "Student Created";
};

export const deleteStudent = async (id: number) => {
  const student = await Student.delete(id);
  return !!student;
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
  studentLevel: string
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

  const studentTypeId = parseToInt(studentType);
  const studentSectionId = parseToInt(studentSection);
  const studentHouseId = parseToInt(studentHouse);
  const studentClassId = parseToInt(studentClass);
  const studentFeeId = parseToInt(feesCategory);
  const studentStreamId = parseToInt(studentStream);
  const studentLevelId = parseToInt(studentLevel);

  await loadStudentRelationships(
    id,
    studentTypeId,
    studentLevelId,
    studentHouseId,
    studentStreamId,
    studentClassId,
    studentSectionId,
    studentFeeId
  );

  return "Student Updated";

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
  console.log(students[0].length);
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

const loadStudentRelationships = async (
  student_id: number,
  student_type: number,
  student_level: number,
  student_house: number,
  student_stream: number,
  student_class: number,
  student_section: number,
  student_fees: number
) => {
  const student = await getSingleStudent(student_id);

  if (student === null) {
    return null;
  }

  const term = await getTermBySelect();
  const termId = term?.id ?? 0;

  const studentTypeIds = student.student_types?.map((type) => type.id) || [];
  studentTypeIds.push(student_type);

  const studentLevelIds =
    student.student_levels?.map((level) => level.id) || [];
  studentLevelIds.push(student_level);

  const studentHouseIds = student.houses?.map((house) => house.id) || [];
  studentHouseIds.push(student_house);

  const studentClassIds = student.classes?.map((classId) => classId.id) || [];
  studentClassIds.push(student_class);

  const studentFeeIds = student.fees?.map((fee) => fee.id) || [];
  studentFeeIds.push(student_fees);

  const studentStreamIds = student.streams?.map((stream) => stream.id) || [];
  studentStreamIds.push(student_stream);

  const studentSectionIds =
    student.sections?.map((section) => section.id) || [];
  studentSectionIds.push(student_section);

  const studentTermIds = student.terms?.map((term) => term.id) || [];
  studentTermIds.push(termId);

  const dataToUpdate: Partial<typeof student> = {};

  dataToUpdate.student_types = await selectedType(studentTypeIds);
  dataToUpdate.student_levels = await getSelectedLevels(studentLevelIds);
  dataToUpdate.houses = await getSelectedHouses(studentHouseIds);
  dataToUpdate.classes = await getSelectedClasses(studentClassIds);
  dataToUpdate.streams = await getSelectedStream(studentStreamIds);
  dataToUpdate.fees = await selectedFee(studentFeeIds);
  dataToUpdate.sections = await selectedSections(studentSectionIds);
  dataToUpdate.terms = await selectedTermIds(studentTermIds);

  if (Object.keys(dataToUpdate).length > 0) {
    
    const studentToUpdate = {
      ...student,
      ...dataToUpdate,
    };

    await Student.save(studentToUpdate);
  }

  return student;
};

export const createStudentWithMandatoryFields = async (
  firstName: string,
  middleName: string,
  lastName: string,
  gender: string,
  dateOfBirth: string,
  phoneNumber: string,
  nationality: string,
  residence: string,
  fatherName: string,
  fatherContact: string,
  motherName: string,
  motherContact: string,
  house: string | null = null,
  className: string | null = null,
  streamName: string | null = null,
  studentType: string | null = null,
  classLevel: string | null = null,
) => {
  let studentHouse = await getHouseByName(house);
  let studentClass = await getClassByName(className);
  let studentStream = await getStreamByName(streamName);
  //let studentType = await getStudentTypeByName(studentType);
  let studentLevel = await getLevelByName(classLevel);
  const student = new Student();
  student.firstName = firstName;
  student.middleName = middleName;
  student.lastName = lastName;
  student.gender = gender;
  student.dateOfBirth = dateOfBirth;
  student.phoneNumber = phoneNumber;
  student.nationality = nationality
  student.residence = residence
  student.fatherName = fatherName
  student.fatherContact = fatherContact
  student.motherName = motherName
  student.motherContact = motherContact

  await Student.save(student);

  if (studentHouse === null && house !== null) {
    await addHouse(house);
    studentHouse = await getHouseByName(house);
  }

  if (studentStream === null && streamName !== null) {
    await createStream(streamName);
    studentStream = await getStreamByName(streamName);
  }

  if (studentClass === null && className !== null ) {
    const streamIDs = []
    if (studentStream !== null) {
      streamIDs.push(studentStream.id)
    }
    await createClass(className, streamIDs);
    studentClass = await getClassByName(className);
  }

  if (studentLevel === null && classLevel !== null) {
    await createLevel(classLevel);
    studentLevel = await getLevelByName(classLevel);
  }

  // add to student 
  
  if (studentHouse !== null) {
    student.houses = [studentHouse];
  }

  if (studentStream !== null) {
    student.streams = [studentStream];
  }

  if (studentClass !== null) {
    student.classes = [studentClass];
  }

  if (studentLevel !== null) {
    student.student_levels = [studentLevel];
  }

  await Student.save(student);



  return student;
}
