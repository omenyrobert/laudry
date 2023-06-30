import { Request, Response } from "express";
import  {
  addStaffNextOfKin,
  addStaffDocument,
  addStaffEducation,
  addStaffWorkExperience,
  getStaffProfile,
  deleteNextOfKin,
  deleteWorkExperience,
  deleteQualification,
  deleteStaffDocument
} from "../Entities/StaffProfile";
import { customPayloadResponse } from "../Helpers/Helpers";

export const addNextOfKin = async (req: Request, res: Response) => {
  try {
    const { staff, name, relationship, contact } = req.body;
    if (!staff) {
      return res
        .json(customPayloadResponse(false, "Staff ID Required"))
        .status(200)
        .end();
    }
    if (!name) {
      return res
        .json(customPayloadResponse(false, "Name Required"))
        .status(200)
        .end();
    }
    if (!relationship) {
      return res
        .json(customPayloadResponse(false, "Relationship Required"))
        .status(200)
        .end();
    }
    if (!contact) {
      return res
        .json(customPayloadResponse(false, "Phone Number Required"))
        .status(200)
        .end();
    }

    const nextOfKin = await addStaffNextOfKin(
      staff,
      name,
      relationship,
      contact
    );

    return res
      .json(customPayloadResponse(true, nextOfKin))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
}

export const addEducation = async (req: Request, res: Response) => {
  try {
    const { staff, institution, qualification, start_date, end_date } = req.body;
    if (!staff) {
      return res
        .json(customPayloadResponse(false, "Staff ID Required"))
        .status(200)
        .end();
    }
    if (!institution) {
      return res
        .json(customPayloadResponse(false, "Institution Required"))
        .status(200)
        .end();
    }
    if (!qualification) {
      return res
        .json(customPayloadResponse(false, "Qualification Required"))
        .status(200)
        .end();
    }
    if (!start_date) {
      return res
        .json(customPayloadResponse(false, "Start Date Required"))
        .status(200)
        .end();
    }
    if (!end_date) {
      return res
        .json(customPayloadResponse(false, "End Date Required"))
        .status(200)
        .end();
    }

    const education = await addStaffEducation(
      staff,
      institution,
      qualification,
      start_date,
      end_date
    );

    return res
      .json(customPayloadResponse(true, education))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
}

export const addWorkExperience = async (req: Request, res: Response) => {
  try {
    const { staff, company, position, start_date, end_date } = req.body;
    if (!staff) {
      return res
        .json(customPayloadResponse(false, "Staff ID Required"))
        .status(200)
        .end();
    }
    if (!company) {
      return res
        .json(customPayloadResponse(false, "Company Required"))
        .status(200)
        .end();
    }
    if (!position) {
      return res
        .json(customPayloadResponse(false, "Position Required"))
        .status(200)
        .end();
    }
    if (!start_date) {
      return res
        .json(customPayloadResponse(false, "Start Date Required"))
        .status(200)
        .end();
    }
    if (!end_date) {
      return res
        .json(customPayloadResponse(false, "End Date Required"))
        .status(200)
        .end();
    }

    const workExperience = await addStaffWorkExperience(
      staff,
      company,
      position,
      start_date,
      end_date
    );

    return res
      .json(customPayloadResponse(true, workExperience))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
}


export const addDocument = async (req: Request, res: Response) => {
  try {
    const { staff, name } = req.body;
    if (!staff) {
      return res
        .json(customPayloadResponse(false, "Staff ID Required"))
        .status(200)
        .end();
    }
    if (!name) {
      return res
        .json(customPayloadResponse(false, "Name Required"))
        .status(200)
        .end();
    }
    if (!req.file) {
      return res
        .json(customPayloadResponse(false, "File Required"))
        .status(200)
        .end();
    }

    const content = req.file.filename

    const document = await addStaffDocument(
      staff,
      name,
      content,
    );

    return res
      .json(customPayloadResponse(true, document))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { staff } = req.body;

    if (!staff) {
      return res
        .json(customPayloadResponse(false, "Staff ID Required"))
        .status(200)
        .end();
    }

    const profile = await getStaffProfile(staff);
    return res
      .json(customPayloadResponse(true, profile))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
}

export const deleteNextOfKinController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .json(customPayloadResponse(false, "ID Required"))
        .status(200)
        .end();
    }

    const nextOfKin = await deleteNextOfKin(parseInt(id));
    return res
      .json(customPayloadResponse(true, nextOfKin))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
}

export const deleteWorkExperienceController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .json(customPayloadResponse(false, "ID Required"))
        .status(200)
        .end();
    }

    const workExperience = await deleteWorkExperience(parseInt(id));
    return res
      .json(customPayloadResponse(true, workExperience))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
}

export const deleteQualificationController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .json(customPayloadResponse(false, "ID Required"))
        .status(200)
        .end();
    }

    const qualification = await deleteQualification(parseInt(id));
    return res
      .json(customPayloadResponse(true, qualification))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
}

export const removeDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .json(customPayloadResponse(false, "ID Required"))
        .status(200)
        .end();
    }

    const document = await deleteStaffDocument(parseInt(id));
    return res
      .json(customPayloadResponse(true, document))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
}