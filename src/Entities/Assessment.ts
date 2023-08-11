import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  In,
} from "typeorm";
import { Student } from "./Student";
import { SchoolClass } from "./SchoolClass";
import { Stream } from "./Stream";
import { ExamType } from "./ExamType";
import { Subject } from "./Subject";
import { DatabaseConnection } from "../Database/database";

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

export const getAssessmentsByTerm = async (term: number) => {
  const assessments = await Assessment.find({
    where: {
      term: term,
    },
    order: {
      id: "DESC",
    },
  });
  return assessments;
};


/**
 * Get students Mark Sheet.
 */
export const getStudentsMarkSheet = async (
  classId: number,
  examType: number,
  streamId: number,
  subjectId: number,
) => {
  const studentClass = await SchoolClass.findOne({ where: { id: classId }, });
  const stream = await Stream.findOne({ where: { id: streamId } });
  let examTypeSelected: ExamType | null = null 
  if (examType) {
    examTypeSelected = await ExamType.findOne({ where: { id: examType } });
  }
  const subject = await Subject.findOne({ where: { id: subjectId } });
  if (!studentClass) {
    throw new Error("Class Not Found");
  }
  if (!stream) {
    throw new Error("Stream Not Found");
  }
  if (!subject) {
    throw new Error("Subject Not Found");
  }
  
  const studentObjs = await Student.find({
    order: {
      id: "DESC",
    }
  });


  // get studentClass.students and stream.students and add them together to students and remove duplicates
  const students: Student[] = [
    ...new Set([
      ...studentObjs.filter((student) => {
        const stdClasess = student.classes
        if ( stdClasess.length <=0) {
          return false
        }
        const stdClass = stdClasess[0]
        return stdClass.id === studentClass.id
      }),
      ...studentObjs.filter((student) => {
        const stdStreams = student.streams
        if ( stdStreams.length <=0) {
          return false
        }
        const stdStream = stdStreams[0]
        return stdStream.id === streamId
      }
      )
    ])
  ];


  let assessments: Assessment[] = [];

  if (examTypeSelected) {
    assessments= await Assessment.find({
    where: {
      examType: examTypeSelected.id.toString(),
      subject: subject?.subject,
    },
    order: {
      id: "DESC",
    },
  });
  } else {
    assessments= await Assessment.find({
    where: {
      subject: subject?.subject,
    },
    order: {
      id: "DESC",
    },
  });
  }




  const studentsWithAssessments = students.filter((student) => {
    const studentAssessments = assessments.filter(
      (assessment) => parseInt(assessment.studentId) === student.id
    );
    if (studentAssessments.length > 0) {
      return true;
    }
    return false;
  });

  const studentsWithAssessmentsAndMarks = studentsWithAssessments.map(
    (student) => {
      const studentAssessments = assessments.filter(
        (assessment) => parseInt(assessment.studentId) === student.id
      );
      return {
        ...student,
        assessment: studentAssessments[0],
      };
    }
  );


  return studentsWithAssessmentsAndMarks;
}

export const getAllStudentsMarkSheet = async () => {
  const students = await Student.find({
    order: {
      id: "DESC",
    }
  });

  const assessments = await Assessment.find({
    order: {
      id: "DESC",
    },
  });

  const studentsWithAssessments = students.filter((student) => {
    const studentAssessments = assessments.filter(
      (assessment) => parseInt(assessment.studentId) === student.id
    );
    if (studentAssessments.length > 0) {
      return true;
    }
    return false;
  });

  const studentsWithAssessmentsAndMarks = studentsWithAssessments.map(
    (student) => {
      const studentAssessments = assessments.filter(
        (assessment) => parseInt(assessment.studentId) === student.id
      );
      return {
        ...student,
        assessment: studentAssessments[0],
      };
    }
  );

  return studentsWithAssessmentsAndMarks;
}