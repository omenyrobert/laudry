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
import { Staff } from "./Staff";

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
  students: Student[];

  @ManyToMany(() => Staff, {
    cascade: true,
    eager: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinTable({ name: "staff_classes" })
  staff: Staff[];
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


// add class to staff

export const addClassToStaff = async (classId: number, staffId: number) => {
  const classToAdd = await getClassById(classId);
  const staffToAdd = await Staff.findOne({ where: { id: staffId } });
  if (classToAdd && staffToAdd) {
    staffToAdd.classes.push(classToAdd);
    await Staff.save(staffToAdd);
    return staffToAdd;
  }
}


// remove class from staff

export const removeClassFromStaff = async (classId: number, staffId: number) => {
  const classToRemove = await getClassById(classId);
  const staffToRemove = await Staff.findOne({ where: { id: staffId } });
  if (classToRemove && staffToRemove) {
    staffToRemove.classes = staffToRemove.classes.filter((item: any) => item.id !== classToRemove.id);
    await Staff.save(staffToRemove);
    return staffToRemove;
  }
}


// get number of students in a class
export const getNumberOfStudentsInClass = async (classId: number) => {
  const classToFind = await getClassById(classId);
  const students = await Student.find();
  const numberOfStudents = students.filter(
    (item: Student) =>{
      return item.classes.some((item: any) => item.id === classToFind.id)
    }).length;
  return numberOfStudents
}

// get number of students per class and return and array of objects
export const getNumberOfStudentsPerClass = async () => {
  const classes = await SchoolClass.find();
  const numberOfStudentsPerClass = await Promise.all(classes.map(async (item: any) => {
    const numberOfStudents = await getNumberOfStudentsInClass(item.id);
    return {
      id: item.id,
      class: item.class,
      numberOfStudents: numberOfStudents
    }
  }))
  return numberOfStudentsPerClass;
}