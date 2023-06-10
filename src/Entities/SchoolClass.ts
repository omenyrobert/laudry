import { Student } from "./Student";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  In,
} from "typeorm";

import { Stream, getSelectedStream } from "./Stream";

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

  @ManyToMany(() => Student, (student) => student.classes)
  students: [];
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
  const classToFind = (await SchoolClass.findOne({
    where: { id: id },
  })) as SchoolClass;
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

export const getSelectedClasses = async (ids: any) => {
  const classes = await SchoolClass.find({ where: { id: In(ids) } });
  return classes;
};
