import { SchoolClass } from "./SchoolClass";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  In,
  ManyToMany,
} from "typeorm";
import { Student } from "./Student";

@Entity()
export class Stream extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  stream!: string;

  @ManyToMany(() => SchoolClass, (schoolclass) => schoolclass.streams)
  school_classes: SchoolClass[];

  @ManyToMany(() => Student, (student) => student.streams)
  students: Student[];
}

export const getStreams = async () => {
  const streams = await Stream.find({
    order: {
      id: "DESC",
    },
  });
  return streams;
};

export const createStream = async (stream: string) => {
  const streamToInsert = await Stream.insert({ stream: stream });
  return streamToInsert;
};

export const deleteStream = async (id: number) => {
  const stream = await Stream.delete(id);
  if (stream) {
    return "Stream Deleted";
  }
};

export const updateStream = async (id: number, stream: string) => {
  const streamToUpdate = await Stream.update(id, { stream: stream });
  return streamToUpdate;
};

export const getSingleStream = async (id: number) => {
  const stream = (await Stream.findOne({ where: { id: id } })) as Stream;
  return stream;
};

export const getSelectedStream = async (ids: any) => {
  const selectedStreams = await Stream.find({ where: { id: In(ids) } });
  return selectedStreams;
};
