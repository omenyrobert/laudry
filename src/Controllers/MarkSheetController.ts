import {  getStudentsMarkSheet } from "../Entities/Assessment";
import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers";


export const fetchMarksheets = async (req: Request, res: Response) => {
  try {
    const {classId, streamId, examTypeId, subjectId} = req.body;
    const marksheet = await getStudentsMarkSheet(classId, examTypeId, streamId, subjectId);
    return res
      .json(customPayloadResponse(true, marksheet))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}




