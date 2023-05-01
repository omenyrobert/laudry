import { Request, Response } from "express";

import {
  getStaffTypes,
  addStaffType,
  deleteStaffType,
  updateStaffType,
  getStaffTypeById,
  getStaffTypeByType,
} from "../Entities/StaffType";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchStaffTypes = async (req: Request, res: Response) => {
  try {
    const staffTypes = await getStaffTypes();
    return res.json(customPayloadResponse(true, staffTypes)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const createStaffType = async (req: Request, res: Response) => {
  try {
    const { staffType } = req.body;
    const findType = await getStaffTypeByType(staffType);
    if (findType) {
      return res.json(customPayloadResponse(false, "Type Exists"));
    }
    const insertType = await addStaffType(staffType);
    if (insertType) {
      return res
        .json(customPayloadResponse(true, "Type Added"))
        .status(200)
        .end();
    }
  } catch (error) {
    console.log(error);
  }
};

export const modifyStaffType = async (req: Request, res: Response) => {
  try {
    const { staffType, typeId } = req.body;
    if (!staffType) {
      return res
        .json(customPayloadResponse(false, "Staff Type Required"))
        .status(200)
        .end();
    }
    if (!typeId) {
      return res
        .json(customPayloadResponse(false, "Staff Type Id Required"))
        .status(200)
        .end();
    }
    const typeUpdate = await getStaffTypeById(typeId);
    if (typeUpdate) {
      await updateStaffType(typeId, staffType);
      return res
        .json(customPayloadResponse(true, "Staff Type Updated"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Staff Type not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeStaffType = async (req: Request, res: Response) => {
  try {
    const staffTypeId = parseInt(req.params.id);
    const staffType = await getStaffTypeById(staffTypeId);
    if (staffType) {
      await deleteStaffType(staffTypeId);
      return res
        .json(customPayloadResponse(true, "Staff Type Deleted"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Staff Type not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};
