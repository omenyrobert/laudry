import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import  {Staff} from "./Staff";
import { ClassLevel } from "./ClassLevel";

@Entity()
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subject!: string;

  @ManyToMany(() => Staff, {
    cascade: true,
    eager: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinTable({ name: "staff_subjects" })
  staff: Staff[];

  @ManyToMany(() => ClassLevel, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinTable({ name: "class_level_subjects" })
  classLevels: ClassLevel[];





}

export const getSubjects = async () => {
  const subjects = await Subject.find({
    order: {
      id: "DESC",
    },
  });
  return subjects;
};

export const createSubject = async (
  subject: string, 
  classLevels: any[] | null | undefined = null
) => {
  const subjectToInsert = new Subject();
  subjectToInsert.subject = subject;
  let levels: ClassLevel[] = []
  if (classLevels) {
    classLevels.forEach(async (classLevel) => {
      const level = await  ClassLevel.findOne({ where: { id: classLevel.id } });
      if (level) {
        levels.push(level);
      }
    });
  }
  subjectToInsert.classLevels = levels;
  await subjectToInsert.save();


  return subjectToInsert;
};

export const deleteSubject = async (id: number) => {
  const subject = await Subject.delete(id);
  if (subject) {
    return "Subject Deleted";
  }
};

export const updateSubject = async (
  id: number, 
  subject: string,
  classLevels: any[] | null | undefined = null
) => {
  const SubjectToUpdate = await Subject.findOne({ where: { id: id } });
  if (SubjectToUpdate === null) {
    throw new Error("Subject not found");
  }
  SubjectToUpdate.subject = subject;
  let levels: ClassLevel[] = []
  if (classLevels) {
    classLevels.forEach(async (classLevel) => {
      const level = await  ClassLevel.findOne({ where: { id: classLevel.id } });
      if (level) {
        levels.push(level);
      }
    });
  }
  SubjectToUpdate.classLevels = levels;
  await SubjectToUpdate.save();

  return SubjectToUpdate;
};

export const getSingleSubject = async (id: number) => {
  const subject = await Subject.findOne({ where: { id: id } });
  return Subject;
};


// add subject to staff
export const addSubjectToStaff = async (subjectId: number, staffId: number) => {
  const subject = await Subject.findOne({ where: { id: subjectId } });
  const staff = await Staff.findOne({ where: { id: staffId } });
  if (subject && staff) {
    staff.subjects.push(subject);
    await staff.save();
    return "Subject Added to Staff";
  }
};


// remove subject from staff

export const removeSubjectFromStaff = async ( subjectId: number, staffId: number) => {
  const subject = await Subject.findOne({ where: { id: subjectId } });
  const staff = await Staff.findOne({ where: { id: staffId } });
  if (subject && staff) {
    staff.subjects = staff.subjects.filter((subject) => subject.id !== subjectId);
    await staff.save();
    return "Subject Removed from Staff";
  }
};
