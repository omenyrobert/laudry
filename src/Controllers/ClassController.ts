import { Request, Response } from "express";
import {
  getClasses,
  getClassById,
  updateClass,
  deleteClassById,
  createClass,
} from "../Entities/SchoolClass";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchClasses = async (req: Request, res: Response) => {
  try {
    const classes = await getClasses();
    return res.json(customPayloadResponse(true, classes)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const addClass = async (req: Request, res: Response) => {
  try {

    const { name, stream } = req.body;
    if (!name) {
      return res
        .json(customPayloadResponse(false, "Class name Required"))
        .status(200)
        .end();
    }
    await createClass(name, stream);
    return res
      .json(customPayloadResponse(true, "Class Added"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const modifyClass = async (req: Request, res: Response) => {
  try {
    const { name, classId, stream } = req.body;
    if (!name) {
      return res
        .json(customPayloadResponse(false, "Class name Required"))
        .status(200)
        .end();
    }
    if (!classId) {
      return res
        .json(customPayloadResponse(false, "Class Id Required"))
        .status(200)
        .end();
    }
    const classToModify = await getClassById(classId);

    if (classToModify) {
      await updateClass(classId, name, stream);
      return res
        .json(customPayloadResponse(true, "Class Updated"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Class not Updated"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeClass = async (req: Request, res: Response) => {
  try {
    const classId = parseInt(req.params.id);
    const classToDelete = await getClassById(classId);
    if (classToDelete) {
      await deleteClassById(classId);
      return res
        .json(customPayloadResponse(true, "Class Deleted"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Class not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};
