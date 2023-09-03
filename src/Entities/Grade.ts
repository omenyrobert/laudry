import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ClassLevel } from "./ClassLevel";
import  { Subject } from "./Subject";

@Entity()
export class Grade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  from!: Number;

  @Column()
  to!: Number;

  @Column()
  grade!: string;

  @Column({nullable: true})
  points!: Number;

  @ManyToMany(() => ClassLevel, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinTable({ name: "class_level_grades" })
  classLevels: ClassLevel[];

  @ManyToMany(() => Subject, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinTable({ name: "subject_grades" })
  subjects: Subject[];

}

export const getGrades = async () => {
  const grades = await Grade.find({
    order: {
      id: "DESC",
    },
  });
  return grades;
};

export const createGrade = async (
  from: number, 
  to: number, 
  grade: string, 
  points: number,
  classLevels: any[] | null | undefined = null,
  subjects: any[] | null | undefined = null,
) => {
  const GradeToInsert = new Grade();
  GradeToInsert.from = from;
  GradeToInsert.to = to;
  GradeToInsert.grade = grade;
  GradeToInsert.points = points;
  let levels: ClassLevel[] = []
  if (classLevels) {
    classLevels.forEach(async (classLevel) => {
      const level = await  ClassLevel.findOne({ where: { id: classLevel.id } });
      if (level) {
        levels.push(level);
      }
    });
  }
  GradeToInsert.classLevels = levels;
  let subjectObjs: Subject[] = []
  if (subjects) {
    subjects.forEach(async (subject) => {
      const subjectToInsert = await  Subject.findOne({ where: { id: subject.id } });
      if (subjectToInsert) {
        subjectObjs.push(subjectToInsert);
      }
    });
  }
  GradeToInsert.subjects = subjectObjs;
  await GradeToInsert.save();
  return GradeToInsert;
};

export const deleteGrade = async (id: number) => {
  const grade = await Grade.delete(id);
  if (grade) {
    return "Grade Deleted";
  }
};

export const updateGrade = async (
  id: number,
  from: number,
  to: number,
  grade: string,
  points: number,
  classLevels: any[] | null | undefined = null,
  subjects: any[] | null | undefined = null,
) => {
  const GradeToUpdate = await Grade.findOne({ where: { id: id } });
  if (GradeToUpdate === null) {
    throw new Error("Grade not found");
  }
  GradeToUpdate.from = from;
  GradeToUpdate.to = to;
  GradeToUpdate.grade = grade;
  GradeToUpdate.points = points;
  let levels: ClassLevel[] = []
  if (classLevels) {
    classLevels.forEach(async (classLevel) => {
      const level = await  ClassLevel.findOne({ where: { id: classLevel.id } });
      if (level) {
        levels.push(level);
      }
    });
  }
  GradeToUpdate.classLevels = levels;
  let subjectObjs: Subject[] = []
  if (subjects) {
    subjects.forEach(async (subject) => {
      const subjectToInsert = await  Subject.findOne({ where: { id: subject.id } });
      if (subjectToInsert) {
        subjectObjs.push(subjectToInsert);
      }
    });
  }
  GradeToUpdate.subjects = subjectObjs;
  await GradeToUpdate.save();
  return GradeToUpdate;
};

export const getSingleGrade = async (id: number) => {
  const grade = await Grade.findOne({ where: { id: id } });
  return grade;
};
