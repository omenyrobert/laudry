import { Request, Response } from "express";
import {
  getReports,
  createReport,
  updateReport,
  getSingleReport,
  deleteReport,
} from "../Entities/Report";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchReports = async (req: Request, res: Response) => {
  try {
    const reports = await getReports();
    return res.json(customPayloadResponse(true, reports)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const addReport = async (req: Request, res: Response) => {
  try {
    const { action, stream, comment, classField, term, studentId, headTeachersComment, classTeachersComment } = req.body;
    if (!req.files) {
      return res
        .json(customPayloadResponse(false, "Files Required"))
        .status(200)
        .end();
    }
    const files = req.files as Express.Multer.File[];
    const headTeachersSignature = files.find(
      (file) => file.fieldname === "headTeachersSignature"
    );
    const classTeachersSignature = files.find(
      (file) => file.fieldname === "classTeachersSignature"
    );

    if (!classTeachersSignature) {
      return res
        .json(customPayloadResponse(false, "Class Teachers Signature Required"))
        .status(200)
        .end();
    }
    if (!headTeachersSignature) {
      return res
        .json(customPayloadResponse(false, "Head Teachers Signature Required"))
        .status(200)
        .end();
    }



    if (!action) {
      return res
        .json(customPayloadResponse(false, "Action Required"))
        .status(200)
        .end();
    }
    if (!stream) {
      return res
        .json(customPayloadResponse(false, "Stream Required"))
        .status(200)
        .end();
    }
    if (!classField) {
      return res
        .json(customPayloadResponse(false, "Class Required"))
        .status(200)
        .end();
    }
    if (!term) {
        return res
          .json(customPayloadResponse(false, "Comment Required"))
          .status(200)
          .end();
    }
    if (!studentId) {
    return res
        .json(customPayloadResponse(false, "Class Required"))
        .status(200)
        .end();
    }
    await createReport(
      action, 
      stream, 
      comment, 
      classField, 
      term, 
      studentId,
      headTeachersComment,
      classTeachersComment,
      headTeachersSignature.filename,
      classTeachersSignature.filename
      );
    return res
      .json(customPayloadResponse(true, "Report Added"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const modifyReport = async (req: Request, res: Response) => {
  try {
    const reportId = parseInt(req.params.id);
    const { action, stream, comment, classField, term, studentId,  headTeachersComment, classTeachersComment } = req.body;
    if (!req.files) {
      return res
        .json(customPayloadResponse(false, "Files Required"))
        .status(200)
        .end();
    }
    const files = req.files as Express.Multer.File[];
    const headTeachersSignature = files.find(
      (file) => file.fieldname === "headTeachersSignature"
    );
    const classTeachersSignature = files.find(
      (file) => file.fieldname === "classTeachersSignature"
    );

    if (!classTeachersSignature) {
      return res
        .json(customPayloadResponse(false, "Class Teachers Signature Required"))
        .status(200)
        .end();
    }
    if (!headTeachersSignature) {
      return res
        .json(customPayloadResponse(false, "Head Teachers Signature Required"))
        .status(200)
        .end();
    }
    if (!action) {
      return res
        .json(customPayloadResponse(false, "Action Required"))
        .status(200)
        .end();
    }
    if (!reportId) {
      return res
        .json(customPayloadResponse(false, "Report Id Required"))
        .status(200)
        .end();
    }
    if (!stream) {
      return res
        .json(customPayloadResponse(false, "Stream Required"))
        .status(200)
        .end();
    }
    if (!classField) {
      return res
        .json(customPayloadResponse(false, "Class Required"))
        .status(200)
        .end();
    }
    if (!term) {
        return res
          .json(customPayloadResponse(false, "Comment Required"))
          .status(200)
          .end();
    }
    if (!studentId) {
    return res
        .json(customPayloadResponse(false, "Class Required"))
        .status(200)
        .end();
    }
    const reportToUpdate = await getSingleReport(reportId);
    if (reportToUpdate) {
      await updateReport(
        reportId, 
        action, 
        stream, 
        comment, 
        classField, 
        term, 
        studentId,
        headTeachersComment,
        classTeachersComment,
        headTeachersSignature.filename,
        classTeachersSignature.filename
        );
      return res
        .json(customPayloadResponse(true, "Report Updated"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Report not Updated"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeReport = async (req: Request, res: Response) => {
  try {
    const reportId = parseInt(req.params.id);
    const reportToDelete = await getSingleReport(reportId);
    if (reportToDelete) {
      await deleteReport(reportId);
      return res
        .json(customPayloadResponse(true, "Report Deleted"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Report not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};
