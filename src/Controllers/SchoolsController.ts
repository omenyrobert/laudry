import { Request, Response } from "express";
import {
  getSchools,
  createSchool,
  updateSchool,
  getSingleSchool,
  deleteSchool,
} from "../Entities/School";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchSchools = async (req: Request, res: Response) => {
  try {
    const schools = await getSchools();
    return res
      .json(customPayloadResponse(true, schools))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const addSchool = async (req: Request, res: Response) => {
  try {
    const {
      name,
      motto,
      location,
      phoneNumbers,
      emails,
      description,
      sites,
      logo,
    } = req.body;
    if (!name || !motto || !location || !phoneNumbers || !emails || !description || !sites) {
      return res
        .json(customPayloadResponse(false, "All fields are required"))
        .status(200)
        .end();
    }
    await createSchool(
      name,
      motto,
      location,
      phoneNumbers,
      emails,
      description,
      sites,
      logo,
    );
    return res
      .json(customPayloadResponse(true, "School added successfully"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const modifySchool = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      motto,
      location,
      phoneNumbers,
      emails,
      description,
      sites,
    } = req.body;

    const logo = req.file ? req.file.filename : "";

    if (!name || !motto || !location || !phoneNumbers || !emails || !description || !sites) {
      return res
        .json(customPayloadResponse(false, "All fields are required"))
        .status(200)
        .end();
    }
    if (!id) {
      return res
        .json(customPayloadResponse(false, "School ID is required"))
        .status(200)
        .end();
    }
    const schoolToUpdate = await getSingleSchool(id);
    if (schoolToUpdate) {
      await updateSchool(
        id,
        name,
        motto,
        location,
        phoneNumbers,
        emails,
        description,
        sites,
        logo
      );
      return res
        .json(customPayloadResponse(true, "School updated successfully"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "School not found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeSchool = async (req: Request, res: Response) => {
  try {
    const schoolId = parseInt(req.params.id);
    const schoolToDelete = await getSingleSchool(schoolId);
    if (schoolToDelete) {
      await deleteSchool(schoolId);
      return res
        .json(customPayloadResponse(true, "School deleted successfully"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "School not found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};
