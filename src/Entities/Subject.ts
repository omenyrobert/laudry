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
