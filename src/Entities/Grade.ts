import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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
}

export const getGrades = async () => {
  const grades = await Grade.find({
    order: {
      id: "DESC",
    },
  });
  return grades;
};

export const createGrade = async (from: number, to: number, grade: string, points: number) => {
  const GradeToInsert = await Grade.insert({ from: from, to: to, grade: grade, points });
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
) => {
  const GradeToUpdate = await Grade.update(id, { from: from, to: to, grade: grade, points });
  return GradeToUpdate;
};

export const getSingleGrade = async (id: number) => {
  const grade = await Grade.findOne({ where: { id: id } });
  return grade;
};
