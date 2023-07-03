import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import  {Staff} from "./Staff";

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


}

export const getSubjects = async () => {
  const subjects = await Subject.find({
    order: {
      id: "DESC",
    },
  });
  return subjects;
};

export const createSubject = async (subject: string) => {
  const subjectToInsert = await Subject.insert({ subject: subject });
  return subjectToInsert;
};

export const deleteSubject = async (id: number) => {
  const subject = await Subject.delete(id);
  if (subject) {
    return "Subject Deleted";
  }
};

export const updateSubject = async (id: number, subject: string) => {
  const SubjectToUpdate = await Subject.update(id, { subject: subject });
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
