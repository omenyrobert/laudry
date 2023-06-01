import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";

import { Stream, getSelectedStream } from "./Stream";
import { Student } from "./Student";

@Entity()
export class SchoolClass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  class!: string;

  @ManyToMany(() => Stream, {
    cascade: true,
    eager: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "school_class_streams" })
  streams: Stream[];

  @OneToMany(() => Student, (student) => student.studentClass, {
    //cascade: true,
    //eager: true,
    nullable: true,
  })
  students!: Student[];
}

export const getClasses = async () => {
  const classes = await SchoolClass.find({
    order: {
      id: "DESC",
    },
    relations: ["streams"],
  });
  return classes;
};

export const createClass = async (name: string, stream: any) => {
  const selectedStreams = await getSelectedStream(stream);
  const classToCreate = await SchoolClass.save({
    class: name,
    streams: selectedStreams,
  });
  return classToCreate;
};

export const getClassById = async (id: number) => {
  const classToFind = await SchoolClass.findOne({ where: { id: id } }) as SchoolClass;
  return classToFind;
};

export const deleteClassById = async (id: number) => {
  const classToDelete = await SchoolClass.delete(id);
  if (classToDelete) {
    return "Class deleted";
  }
};

export const updateClass = async (id: number, name: string, stream: any) => {
  const selectedStreams = await getSelectedStream(stream);
  const classUpdate = await getClassById(id);
  if (classUpdate !== null) {
    const classToUpdate = await SchoolClass.preload({
      id: classUpdate.id,
      class: name,
      streams: selectedStreams,
    });
    if (classToUpdate) {
      await SchoolClass.save(classToUpdate);
    }
    return classToUpdate;
  }
};
