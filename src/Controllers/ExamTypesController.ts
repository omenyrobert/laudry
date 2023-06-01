import { Request, Response } from "express";
import {
  getExamTypes,
  createExamType,
  deleteExamType,
  updateExamType,
  getSingleExamType,
} from "../Entities/ExamType";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchExamTypes = async (req: Request, res: Response) => {
  try {
    const examTypes = await getExamTypes();
    return res.json(customPayloadResponse(true, examTypes)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const addExamType = async (req: Request, res: Response) => {
  try {
    const { examType, mark } = req.body;
    if (!examType) {
      return res
        .json(customPayloadResponse(false, "Exam Type Required"))
        .status(200)
        .end();
    }
    if (!mark) {
      return res
        .json(customPayloadResponse(false, "Mark Required"))
        .status(200)
        .end();
    }
    await createExamType(examType, mark);
    return res
      .json(customPayloadResponse(true, "Exam Type Added"))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const modifyExamType = async (req: Request, res: Response) => {
  try {
    const { examType, id, mark } = req.body;
    const examTypeId = id;
    if (!examType) {
      return res
        .json(customPayloadResponse(false, "Exam Type Required"))
        .status(200)
        .end();
    }
    if (!examTypeId) {
      return res
        .json(customPayloadResponse(false, "Exam Type Id Required"))
        .status(200)
        .end();
    }
    const examTypeToModify = await getSingleExamType(examTypeId);

    if (examTypeToModify) {
      await updateExamType(examTypeId, examType, mark);
      return res
        .json(customPayloadResponse(true, "Exam Type Modified"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Exam Type Not Found"))
        .status(200)
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}


export const removeExamType = async (req: Request, res: Response) => {
  try {
    const examTypeId = parseInt(req.params.id);
    if (!examTypeId) {
      return res
        .json(customPayloadResponse(false, "Exam Type Id Required"))
        .status(200)
        .end();
    }
    const examTypeToDelete = await getSingleExamType(examTypeId);
    if (examTypeToDelete) {
      await deleteExamType(examTypeId);
      return res
        .json(customPayloadResponse(true, "Exam Type Deleted"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Exam Type Not Found"))
        .status(400)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const fetchSingleExamType = async (req: Request, res: Response) => {
  try {
    const examTypeId = parseInt(req.params.id);
    if (!examTypeId) {
      return res
        .json(customPayloadResponse(false, "Exam Type Id Required"))
        .status(200)
        .end();
    }
    const examType = await getSingleExamType(examTypeId);
    if (examType) {
      return res
        .json(customPayloadResponse(true, examType))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Exam Type Not Found"))
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
