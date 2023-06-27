import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  action!: string;

  @Column()
  stream!: string;

  @Column()
  comment!: string;

  @Column()
  classField!: string;

  @Column()
  term!: number;

  @Column()
  studentId!: number;
}

export const getReports = async () => {
  const reports = await Report.find({
    order: {
      id: "DESC",
    },
  });
  return reports;
};

export const createReport = 
async (
    action: string,
    stream: string,
    comment: string,
    classField: string,
    term: number,
    studentId: number,
) => {
  const reportToInsert = await Report.insert({ action, stream, comment, classField, term, studentId });
  return reportToInsert;
};

export const deleteReport = async (id: number) => {
  const report = await Report.delete(id);
  if (report) {
    return "Report Deleted";
  }
};

export const updateReport = async (
    id: number, 
    action: string, 
    stream: string, 
    comment: string,
    classField: string,
    term: number,
    studentId: number
    ) => {
  const reportToUpdate = await Report.update(id, { action, stream, comment, classField, studentId, term });
  return reportToUpdate;
};

export const getSingleReport = async (id: number) => {
  const report = await Report.findOne({ where: { id } });
  return report;
};
