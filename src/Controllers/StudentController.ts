import { Request, Response } from "express";
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  getSingleStudent,
  updateStudentPhoto,
  createDocument,
  getStudentDocuments,
  deleteStudentDocument,
  searchStudents,
  getNumberOfStudents,
  getStudentsWithFeesBalanceLessThan50
} from "../Entities/Student";
import { getTermBySelect } from "../Entities/Term";

import {
  customPayloadResponse,
  extraLatestArrayIndex,
} from "../Helpers/Helpers";
import { getStudentTermPayments } from "../Entities/StudentPaidBalance";

export const fetchStudents = async (req: Request, res: Response) => {
  try {
    const { page, count } = req.query;
    if (!page) {
      return res
        .json(customPayloadResponse(false, "Invalid Query Parameters"))
        .status(400)
        .end();
    }

    if (!count) {
      return res
        .json(customPayloadResponse(false, "Invalid Query Parameters"))
        .status(400)
        .end();
    }



    const pageInt = parseInt(page as string);
    const countInt = parseInt(count as string);

    if (isNaN(pageInt)) {
      return res
        .json(customPayloadResponse(false, "Invalid Query Parameters"))
        .status(400)
        .end();
    }

    if (isNaN(countInt)) {
      return res
        .json(customPayloadResponse(false, "Invalid Query Parameters"))
        .status(400)
        .end();
    }

    if (pageInt < 0) {
      return res
        .json(customPayloadResponse(false, "Invalid Query Parameters"))
        .status(400)
        .end();
    }

    const activeTerm = await getTermBySelect();
    const termId = activeTerm !== null ? activeTerm.id : null;
    const [studentsToFetch, studentCount] = await getStudents(pageInt, countInt);
    const students = await Promise.all(
      studentsToFetch.map(async (student) => {
        const studentPaymentsPerTerm = await getStudentTermPayments(
          student.id,
          termId
        );
        const feesType = extraLatestArrayIndex(student.fees);
        const balanceToReturn =
          studentPaymentsPerTerm !== null
            ? studentPaymentsPerTerm
            : { balance: feesType?.amount, amount: 0 };
        return { ...student, feesBalance: JSON.stringify(balanceToReturn) };
      })
    );

    return res
      .json(
        customPayloadResponse(true, { students: students, count: studentCount })
      )
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "Error Occured"))
      .status(500)
      .end();
  }
};

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
      studentStream,
      studentLevel
    } = req.body;

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
      studentStream,
      studentLevel
    );

    return res.json(customPayloadResponse(true, student)).status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
};

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
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
};

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
      fatherName,
      fatherContact,
      motherName,
      motherContact,
      studentType,
      studentSection,
      studentHouse,
      studentClass,
      feesCategory,
      studentStream,
      studentLevel
    } = req.body;

    const photo = req.file ? req.file.filename : "";

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
      studentStream,
      studentLevel
    );

    if (student) {
      return res
        .json(customPayloadResponse(true, "Student Updated Successfully"))
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
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
};

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
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
};

export const updateStudentPhotoController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("Uploading Files");
    const { id } = req.params;
    const photo = req.file ? req.file.filename : "";
    const student = await updateStudentPhoto(parseInt(id), photo);
    if (student) {
      return res
        .json(customPayloadResponse(true, "Student Photo Updated Successfully"))
        .status(200)
        .end();
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
};

export const addStudentDocument = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    if (!req.file) {
      return res
        .json(customPayloadResponse(false, "No File Uploaded"))
        .status(400)
        .end();
    }

    const file = req.file ? req.file.filename : "";
    const filename = req.file ? req.file.originalname : "";

    const document = await createDocument(parseInt(student), file, filename);
    if (document) {
      return res
        .json(customPayloadResponse(true, document))

        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Student Not Found"))
        .status(404)
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
};

export const fetchStudentDocuments = async (req: Request, res: Response) => {
  try {
    const { student } = req.params;
    const documents = await getStudentDocuments(parseInt(student));
    if (documents) {
      return res.json(customPayloadResponse(true, documents)).status(200).end();
    } else {
      return res
        .json(customPayloadResponse(false, "Student Not Found"))
        .status(404)
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
};

export const removeStudentDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await deleteStudentDocument(parseInt(id));
    if (document) {
      return res
        .json(customPayloadResponse(true, "Document Deleted Successfully"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Document Not Found"))
        .status(404)
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
};

export const searchingStudents = async (req: Request, res: Response) => {
  try {
    const { page, keyword, count } = req.query;

    if (!page || !keyword) {
      return res
        .json(customPayloadResponse(false, "Invalid Query Parameters"))
        .status(400)
        .end();
    }

    const pageInt = parseInt(page as string);

    if (isNaN(pageInt)) {
      return res
        .json(customPayloadResponse(false, "Invalid Query Parameters"))
        .status(400)
        .end();
    }

    if (pageInt < 0) {
      return res
        .json(customPayloadResponse(false, "Invalid Query Parameters"))
        .status(400)
        .end();
    }

    const activeTerm = await getTermBySelect();
    const termId = activeTerm !== null ? activeTerm.id : null;
    let stuCount = count as string
    const [studentsToFetch, studentCount] = await searchStudents(
      keyword.toString(),
      pageInt,
      count ? parseInt(stuCount) : 20
    );
    const students = await Promise.all(
      studentsToFetch.map(async (student) => {
        const studentPaymentsPerTerm = await getStudentTermPayments(
          student.id,
          termId
        );
        const feesType = extraLatestArrayIndex(student.fees);
        const balanceToReturn =
          studentPaymentsPerTerm !== null
            ? studentPaymentsPerTerm
            : { balance: feesType?.amount, amount: 0 };
        return { ...student, feesBalance: JSON.stringify(balanceToReturn) };
      })
    );

    return res
      .json(
        customPayloadResponse(true, { students: students, count: studentCount })
      )
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};



export const fetchNumberOfStudents = async (req: Request, res: Response) => {
    const numberOfStudents = await getNumberOfStudents();
    if (numberOfStudents) {
      return res
        .json(customPayloadResponse(true, numberOfStudents))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "No Students Found"))
        .status(404)
        .end();
    }
  
}

export const fetchStudentsWithFeesBalanceLessThan50Controller = async (req: Request, res: Response) => {
  try {
    const students = await getStudentsWithFeesBalanceLessThan50();
    if (students) {
      return res
        .json(customPayloadResponse(true, students))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "No Students Found"))
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
