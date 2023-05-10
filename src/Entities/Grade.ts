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
}

export const getGrades = async () => {
  const grades = await Grade.find({
    order: {
      id: "DESC",
    },
  });
  return grades;
};

export const createGrade = async (from: number, to: number, grade: string) => {
  const GradeToInsert = await Grade.insert({ from: from, to: to, grade: grade });
  return GradeToInsert;
};

export const deleteGrade = async (id: number) => {
  const grade = await Grade.delete(id);
  if (grade) {
    return "Grade Deleted";
  }
};

export const updateGrade = async (id: number, from: number, to: number, grade: string) => {
  const GradeToUpdate = await Grade.update(id, { from: from, to: to, grade: grade });
  return GradeToUpdate;
};

export const getSingleGrade = async (id: number) => {
  const grade = await Grade.findOne({ where: { id: id } });
  return grade;
};
