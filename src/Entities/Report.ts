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

  @Column({
    nullable: true
  })
  headTeachersComment!: string;

  @Column({
    nullable: true
  })
  classTeachersComment!: string;

  @Column({
    nullable: true
  })
  headTeachersSignature!: string;

  @Column({
    nullable: true
  })
  classTeachersSignature!: string;
}

export const getReports = async () => {
  const reports = await Report.find({
    order: {
      id: "DESC",
    },
  });
  return reports;
};

export const createReport = async (
    action: string,
    stream: string,
    comment: string | null,
    classField: string,
    term: number,
    studentId: number,
    headTeachersComment: string | null = null,
    classTeachersComment: string | null = null,
    headTeachersSignature: string | null = null,
    classTeachersSignature: string | null = null
) => {
  console.log("term", term);
  console.log("studentId", studentId);
  const reportToInsert = new Report();
  reportToInsert.action = action;
  reportToInsert.stream = stream;
  reportToInsert.classField = classField;
  reportToInsert.term = term;
  reportToInsert.studentId = studentId;
  if (headTeachersComment) {
    reportToInsert.headTeachersComment = headTeachersComment;
  }
  if (classTeachersComment) {
    reportToInsert.classTeachersComment = classTeachersComment;
  }
  if (headTeachersSignature) {
    reportToInsert.headTeachersSignature = headTeachersSignature;
  }
  if (classTeachersSignature) {
    reportToInsert.classTeachersSignature = classTeachersSignature;
  }
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
    studentId: number,
    headTeachersComment: string | null = null,
    classTeachersComment: string | null = null,
    headTeachersSignature: string | null = null,
    classTeachersSignature: string | null = null
    ) => {
  const reportToUpdate = await Report.findOne({ where: { id } });
  if (!reportToUpdate) {
    throw new Error("Report not found");
  }
  reportToUpdate.action = action;
  reportToUpdate.stream = stream;
  reportToUpdate.classField = classField;
  reportToUpdate.term = term;
  reportToUpdate.studentId = studentId;
  if (headTeachersComment) {
    reportToUpdate.headTeachersComment = headTeachersComment;
  }
  if (classTeachersComment) {
    reportToUpdate.classTeachersComment = classTeachersComment;
  }
  if (headTeachersSignature) {
    reportToUpdate.headTeachersSignature = headTeachersSignature;
  }
  if (classTeachersSignature) {
    reportToUpdate.classTeachersSignature = classTeachersSignature;
  }
  if (comment) {
    reportToUpdate.comment = comment;
  }
  await reportToUpdate.save();
  return reportToUpdate;
};

export const getSingleReport = async (id: number) => {
  const report = await Report.findOne({ where: { id } });
  return report;
};
