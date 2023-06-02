import { Request, Response } from "express";
import {
  getAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  getSingleAssessment,
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

    if (!finalMark) {
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

    await createAssessment(
      studentId,
      examType,
      subject,
      mark,
      finalMark,
      comment,
      term
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

    if (!finalMark) {
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
        term
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
