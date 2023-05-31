import { Request, Response } from "express";
import {
  getStudentTypes,
  addStudentType,
  deleteStudentType,
  updateStudentType,
  getStudentTypeById,
  getStudentTypeByType,
} from "../Entities/StudentType";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchStudentTypes = async (req: Request, res: Response) => {
  try {
    const studentTypes = await getStudentTypes();
    return res.json(customPayloadResponse(true, studentTypes)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const addStudentTypeController = async (req: Request, res: Response) => {
  try {
    const { type } = req.body;

    const studentType = await addStudentType(type);

    return res.json(customPayloadResponse(true, studentType)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const deleteStudentTypeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const studentType = await deleteStudentType(parseInt(id));

    return res.json(customPayloadResponse(true, studentType)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const updateStudentTypeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const studentType = await updateStudentType(parseInt(id), type);

    return res.json(customPayloadResponse(true, studentType)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const getStudentTypeByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const studentType = await getStudentTypeById(parseInt(id));

    return res.json(customPayloadResponse(true, studentType)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const getStudentTypeByTypeController = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;

    const studentType = await getStudentTypeByType(type);

    return res.json(customPayloadResponse(true, studentType)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

