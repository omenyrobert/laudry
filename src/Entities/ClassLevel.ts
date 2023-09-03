import { SchoolClass, getSelectedClasses } from "./SchoolClass";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  In,
} from "typeorm";

@Entity()
export class ClassLevel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @ManyToMany(() => SchoolClass, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({ name: "school_class_levels" })
  classes: SchoolClass[];
}

export const addLevel = async (name: string, classIds: any) => {
  const classes = await getSelectedClasses(classIds);
  const levelToInsert = await ClassLevel.save({ name: name, classes: classes });
  return levelToInsert;
};

export const createLevel = async (name: string) => {
  const level =  new ClassLevel();
  level.name = name;
  await level.save();
  return level;
};

export const fetchLevels = async () => {
  const levels = await ClassLevel.find({
    order: {
      id: "DESC",
    },
  });
  return levels;
};

export const getLevelById = async (id: number) => {
  const levelToFind = (await ClassLevel.findOne({
    where: { id: id },
  })) as ClassLevel;
  return levelToFind;
};

export const updateLevel = async (id: number, name: string, classIds: any) => {
  const classes = await getSelectedClasses(classIds);
  const levelUpdate = await getLevelById(id);
  if (levelUpdate !== null) {
    const levelToUpdate = await ClassLevel.preload({
      id: levelUpdate.id,
      name: name,
      classes: classes,
    });
    if (levelToUpdate) {
      await ClassLevel.save(levelToUpdate);
    }
    return levelToUpdate;
  }
};

export const deleteClassById = async (id: number) => {
  const levelToDelete = await ClassLevel.delete(id);
  if (levelToDelete) {
    return "Class deleted";
  }
};

export const getSelectedLevels = async (ids: any) => {
  const selectedLevels = await ClassLevel.find({ where: { id: In(ids) } });
  return selectedLevels;
};
