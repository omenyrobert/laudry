import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  In
} from "typeorm";
import { Student } from "./Student";

@Entity()
export class StudentType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @ManyToMany(() => Student, (student) => student.student_types)
  students: [];
}

export const getStudentTypes = async () => {
  const studentTypes = await StudentType.find({
    order: {
      id: "DESC",
    },
  });

  return studentTypes;
};

export const addStudentType = async (type: string) => {
  const studentTypeToAdd = await StudentType.insert({
    type: type,
  });
  return studentTypeToAdd;
};

export const getStudentTypeById = async (id: number) => {
  const studentTypeToFindById = (await StudentType.findOne({
    where: { id: id },
  })) as StudentType;
  return studentTypeToFindById;
};

export const getStudentTypeByType = async (type: string) => {
  const studentTypeToFindByType = await StudentType.findOne({
    where: { type: type },
  });
  return studentTypeToFindByType;
};

export const deleteStudentType = async (id: number) => {
  const studentTypeToDelete = await StudentType.delete(id);
  if (studentTypeToDelete) {
    return "Staff Type Deleted";
  }
};

export const updateStudentType = async (id: number, type: string) => {
  const studentTypeToUpdate = await StudentType.update(id, { type: type });
  return studentTypeToUpdate;
};

export const selectedType = async (ids:any) => {
  const selectedTypes = await StudentType.find({
    where: { id: In(ids) },
  });
  return selectedTypes;
};
