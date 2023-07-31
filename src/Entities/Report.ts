import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  action!: string;

  @Column()
  stream!: string;

  @Column({
    nullable: true
  })
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
    comment: string | null,
    classField: string,
    term: number,
    studentId: number,
) => {
  console.log("term", term);
  console.log("studentId", studentId);
  const reportToInsert = new Report();
  reportToInsert.action = action;
  reportToInsert.stream = stream;
  reportToInsert.classField = classField;
  reportToInsert.term = term;
  reportToInsert.studentId = studentId;
  if (comment) {
    reportToInsert.comment = comment;
  }
  await reportToInsert.save();
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
