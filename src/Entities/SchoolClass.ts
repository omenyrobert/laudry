import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinTable,
  ManyToMany,
} from "typeorm";

import { Stream } from "./Stream";

@Entity()
export class SchoolClass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  class!: string;

  @ManyToMany(() => Stream, (stream) => stream.stream, { cascade: true })
  @JoinTable()
  stream!: Stream[];
}

export const getClasses = async () => {
  const classes = await SchoolClass.find({
    order: {
      id: "DESC",
    },
    relations: {
      stream: true,
    },
  });
  return classes;
};

export const createClass = async (name: string, stream: any) => {
  const classToCreate = await SchoolClass.insert({
    class: name,
    stream: stream,
  });
  return classToCreate;
};

export const getClassById = async (id: number) => {
  const classToFind = await SchoolClass.findOne({ where: { id: id } });
  return classToFind;
};

export const deleteClassById = async (id: number) => {
  const classToDelete = await SchoolClass.delete(id);
  if (classToDelete) {
    return "Class deleted";
  }
};

export const updateClass = async (id: number, name: string, stream: any) => {
  const classToUpdate = await SchoolClass.update(id, {
    class: name,
    stream: stream,
  });
  return classToUpdate;
};
