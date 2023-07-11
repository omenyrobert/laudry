import { Request, Response } from "express";
import {
  getClasses,
  getClassById,
  updateClass,
  deleteClassById,
  createClass,
  addClassToStaff,
  removeClassFromStaff,
  getNumberOfStudentsPerClass
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


export const addClassToStaffController = async (req: Request, res: Response) => {
  try {
    const { classId, staffId } = req.body;
    if (!classId) {
      return res
        .json(customPayloadResponse(false, "Class Id Required"))
        .status(200)
        .end();
    }
    if (!staffId) {
      return res
        .json(customPayloadResponse(false, "Staff Id Required"))
        .status(200)
        .end();
    }
    await addClassToStaff(classId, staffId);
    return res
      .json(customPayloadResponse(true, "Class Added to Staff"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};


export const removeClassFromStaffController = async (req: Request, res: Response) => {
  try {
    const { classId, staffId } = req.body;
    if (!classId) {
      return res.json(customPayloadResponse(false, "Class Id Required")).status(200).end();
    }
    if (!staffId) {
      return res.json(customPayloadResponse(false, "Staff Id Required")).status(200).end();
    }
    await removeClassFromStaff(classId, staffId);
    return res.json(customPayloadResponse(true, "Class Removed from Staff")).status(200).end();
  } catch (error) {
    console.log(error);
  }
}

export const getNumberOfStudentsPerClassController = async (req: Request, res: Response) => {
  try {
    const numberOfStudents = await getNumberOfStudentsPerClass();
    return res.json(customPayloadResponse(true, numberOfStudents)).status(200).end();

  } catch (error) {
    console.log(error);
  }
}