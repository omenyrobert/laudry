import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class ExamType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  examType!: string;

  @Column()
  mark!: number;
}

export const getExamTypes = async () => {
  const examTypes = await ExamType.find({
    order: {
      id: "DESC",
    },
  });
  return examTypes;
}

export const createExamType = async (examType: string, mark: number) => {
  const examTypeToInsert = await ExamType.insert({ examType, mark });
  return examTypeToInsert;
}

export const deleteExamType = async (id: number) => {
  const examType = await ExamType.delete(id);
  if (examType) {
    return "Exam Type Deleted";
  }
}

export const updateExamType = async (id: number, examType: string, mark: number) => {
  const examTypeToUpdate = await ExamType.update(id, { examType, mark });
  return examTypeToUpdate;
}

export const getSingleExamType = async (id: number) => {
  const examType = await ExamType.findOne({ where: { id } });
  return examType;
}
