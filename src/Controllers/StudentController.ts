import { Request, Response } from "express";
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  getSingleStudent,
} from "../Entities/Student";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchStudents = async (req: Request, res: Response) => {
  try {
    const students = await getStudents();
    return res.json(customPayloadResponse(true, students)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const addStudent = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      nationality,
      residence,
      fatherName,
      fatherContact,
      motherName,
      motherContact,
      studentType,
      studentSection,
      studentHouse,
      studentClass,
      feesCategory,
    } = req.body;

    console.log(req.body)

    const student = await createStudent(
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      nationality,
      residence,
      fatherName,
      fatherContact,
      motherName,
      motherContact,
      studentType,
      studentSection,
      studentHouse,
      studentClass,
      feesCategory,
    );

    return res.json(customPayloadResponse(true, student)).status(200).end();



  } catch (error) {
    console.log(error)
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const removeStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await deleteStudent(parseInt(id));
    if (student) {
      return res
        .json(customPayloadResponse(true, "Student Deleted Successfully"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Student Not Found"))
        .status(404)
        .end();
    }
  } catch (error) {
    console.log(error)
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const editStudent = async (req: Request, res: Response) => {
  try {
    const {
      id,
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      nationality,
      residence,
      photo,
      fatherName,
      fatherContact,
      motherName,
      motherContact,
      studentType,
      studentSection,
      studentHouse,
      studentClass,
      feesCategory,
    } = req.body;

    const student = await updateStudent(
      parseInt(id),
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      nationality,
      residence,
      photo,
      fatherName,
      fatherContact,
      motherName,
      motherContact,
      studentType,
      studentSection,
      studentHouse,
      studentClass,
      feesCategory,
    );

    if (student) {
      return res
        .json(customPayloadResponse(true, "Student Updated Successfully"))
        .status(200)
        .end();
    }
    else {
      return res
        .json(customPayloadResponse(false, "Student Not Found"))
        .status(404)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const fetchSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await getSingleStudent(parseInt(id));
    if (student) {
      return res.json(customPayloadResponse(true, student)).status(200).end();
    } else {
      return res
        .json(customPayloadResponse(false, "Student Not Found"))
        .status(404)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}


