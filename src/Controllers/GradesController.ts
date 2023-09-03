import { Request, Response } from "express";
import {
  getGrades,
  createGrade,
  updateGrade,
  getSingleGrade,
  deleteGrade,
} from "../Entities/Grade";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchGrades = async (req: Request, res: Response) => {
  try {
    const grades = await getGrades();
    return res.json(customPayloadResponse(true, grades)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const addGrade = async (req: Request, res: Response) => {
  try {
    const { from, to, grade, points, classLevels, subjects } = req.body;
    if (!grade) {
      return res
        .json(customPayloadResponse(false, "Grade Required"))
        .status(200)
        .end();
    }
    if (!from) {
        return res
          .json(customPayloadResponse(false, "From Required"))
          .status(200)
          .end();
    }
    if (!to) {
        return res
          .json(customPayloadResponse(false, "To Required"))
          .status(200)
          .end();
    }
    await createGrade(from, to, grade, points, classLevels, subjects);
    return res
      .json(customPayloadResponse(true, "Grade Added"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const modifyGrade = async (req: Request, res: Response) => {
  try {
    const gradeId = parseInt(req.params.id);
    const { from, to, grade, points, classLevels, subjects } = req.body;
    if (!grade) {
      return res
        .json(customPayloadResponse(false, "Grade Required"))
        .status(200)
        .end();
    }
    if (!gradeId) {
      return res
        .json(customPayloadResponse(false, "Grade Id Required"))
        .status(200)
        .end();
    }
    if (!from) {
        return res
          .json(customPayloadResponse(false, "From Required"))
          .status(200)
          .end();
    }
      if (!to) {
        return res
          .json(customPayloadResponse(false, "To Required"))
          .status(200)
          .end();
    }
    const gradeToUpdate = await getSingleGrade(gradeId);
    if (gradeToUpdate) {
      await updateGrade(gradeId, from, to, grade, points, classLevels, subjects);
      return res
        .json(customPayloadResponse(true, "Grade Updated"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Grade not Updated"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeGrade = async (req: Request, res: Response) => {
  try {
    const gradeId = parseInt(req.params.id);
    const gradeToDelete = await getSingleGrade(gradeId);
    if (gradeToDelete) {
      await deleteGrade(gradeId);
      return res
        .json(customPayloadResponse(true, "Grade Deleted"))
        .status(200)
        .end();
    }
    return res
        .json(customPayloadResponse(false, "Grade not Found"))
        .status(200)
        .end();
    } catch (error) {
        console.log(error);
    }
};
    
