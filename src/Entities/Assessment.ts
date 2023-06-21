import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  In,
} from "typeorm";

@Entity()
export class Assessment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  studentId!: string;

  @Column()
  examType!: string;

  @Column()
  subject!: string;

  @Column()
  mark!: number;

  @Column()
  finalMark!: number;

  @Column()
  comment!: string;

  @Column()
  term!: number;

  @Column()
  grade!: string;

  @Column()
  examPercent!: number;

  @Column({nullable: true})
  stream!: string;

  @Column({nullable: true})
  points!: string;
}

export const getAssessments = async () => {
  const assessments = await Assessment.find({
    order: {
      id: "DESC",
    },
  });
  return assessments;
};

export const createAssessment = async (
  studentId: string,
  examType: string,
  subject: string,
  mark: number,
  finalMark: number,
  comment: string,
  term: number,
  grade: string,
  examPercent: number,
  stream: string,
  points: string,
) => {
  const assessment = await Assessment.insert({
    studentId,
    examType,
    subject,
    mark,
    finalMark,
    comment,
    term,
    grade,
    examPercent,
    stream,
    points
  });

  return assessment;
};

export const updateAssessment = async (
  id: number,
  studentId: string,
  examType: string,
  subject: string,
  mark: number,
  finalMark: number,
  comment: string,
  term: number,
  grade: string,
  examPercent: number,
  stream: string,
  points: string,
) => {
  const assessment = await Assessment.update(id, {
    studentId: studentId,
    examType: examType,
    subject: subject,
    mark: mark,
    finalMark: finalMark,
    comment: comment,
    term: term,
    grade: grade,
    examPercent,
    stream,
    points,
  });

  return assessment;
};

export const deleteAssessment = async (id: number) => {
  const assessment = await Assessment.delete(id);
  
  if (assessment) {
    return "Assessment Deleted";
  }
  
  return assessment
};

export const getSingleAssessment = async (id: number) => {
  const assessment = await Assessment.findOne({ where: { id: id } });

  return assessment;
};

export const getSelectedAssessments = async (ids: any) => {
  const selectedAssessments = await Assessment.find({ where: { id: In(ids) } });
  
  return selectedAssessments;
};
