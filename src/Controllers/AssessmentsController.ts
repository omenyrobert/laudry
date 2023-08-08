import { Request, Response } from "express";
import {
  getAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  getSingleAssessment,
  getAssessmentsByTerm
} from "../Entities/Assessment";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchAssessments = async (req: Request, res: Response) => {
  try {
    const assessments = await getAssessments();
    return res
      .json(customPayloadResponse(true, assessments))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const addAssessment = async (req: Request, res: Response) => {
  try {
    const {
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
      points,
    } = req.body;

    if (!studentId) {
        return res
          .json(customPayloadResponse(false, "Student Required"))
          .status(200)
          .end();
    }

    if (!examType) {
        return res
          .json(customPayloadResponse(false, "Exam Type Required"))
          .status(200)
          .end();
    }

    if (!subject) {
        return res
          .json(customPayloadResponse(false, "Subject Required"))
          .status(200)
          .end();
    }

    if (!mark) {
        return res
          .json(customPayloadResponse(false, "Mark Required"))
          .status(200)
          .end();
    }

    if (finalMark != 0 && !finalMark) {
        return res
          .json(customPayloadResponse(false, "Final Mark Required"))
          .status(200)
          .end();
    }

    if (!comment) {
        return res
          .json(customPayloadResponse(false, "Comment Required"))
          .status(200)
          .end();
    }

    if (!term) {
        return res
          .json(customPayloadResponse(false, "Term Required"))
          .status(200)
          .end();
    }


    if (!examPercent) {
      return res
        .json(customPayloadResponse(false, "Exam Percent Required"))
        .status(200)
        .end();
    }

    await createAssessment(
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
    );
        
    return res
      .json(customPayloadResponse(true, "Assessment Added"))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const modifyAssessment = async (req: Request, res: Response) => {
  try {
    const {
      id,
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
    } = req.body;

    const assessmentId = id;

    if (!assessmentId) {
      return res
        .json(customPayloadResponse(false, "Assessment Id Required"))
        .status(200)
        .end();
    }

    if (!studentId) {
        return res
          .json(customPayloadResponse(false, "Student Required"))
          .status(200)
          .end();
    }

    if (!examType) {
        return res
          .json(customPayloadResponse(false, "Exam Type Required"))
          .status(200)
          .end();
    }

    if (!subject) {
        return res
          .json(customPayloadResponse(false, "Subject Required"))
          .status(200)
          .end();
    }

    if (!mark) {
        return res
          .json(customPayloadResponse(false, "Mark Required"))
          .status(200)
          .end();
    }

    if (finalMark != 0 && !finalMark) {
        return res
          .json(customPayloadResponse(false, "Final Mark Required"))
          .status(200)
          .end();
    }

    if (!comment) {
        return res
          .json(customPayloadResponse(false, "Comment Required"))
          .status(200)
          .end();
    }

    if (!term) {
        return res
          .json(customPayloadResponse(false, "Term Required"))
          .status(200)
          .end();
    }

    if (!examPercent) {
      return res
        .json(customPayloadResponse(false, "Exam Percent Required"))
        .status(200)
        .end();
    }

    const assessmentToModify = await getSingleAssessment(assessmentId);

    if (assessmentToModify) {
      await updateAssessment(
        assessmentId,
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
      );
      return res
        .json(customPayloadResponse(true, "Assessment Modified"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Assessment Not Found"))
        .status(200)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const removeAssessment = async (req: Request, res: Response) => {
  try {
    const assessmentId = parseInt(req.params.id);

    if (!assessmentId) {
      return res
        .json(customPayloadResponse(false, "Assessment Id Required"))
        .status(200)
        .end();
    }

    const assessmentToDelete = await getSingleAssessment(assessmentId);

    if (assessmentToDelete) {
      await deleteAssessment(assessmentId);
      return res
        .json(customPayloadResponse(true, "Assessment Deleted"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Assessment Not Found"))
        .status(400)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
    }
}

export const getAssessmentsByTermController = async (
  req: Request,
  res: Response
) => {
  try {
    const { term } = req.params;

    if (!term || isNaN(Number(term))) {
      return res
        .status(400)
        .json(customPayloadResponse(false, "Invalid term value"));
    }

    const assessments = await getAssessmentsByTerm(Number(term));

    return res
      .status(200)
      .json(customPayloadResponse(true, assessments));
  } catch (error) {
    console.error("An error occurred while retrieving assessments:", error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "An error occurred"));
  }
};
