import { Request, Response } from "express";

import {
  customPayloadResponse,
  randomStringGenerator,
  hashPassword,
} from "../Helpers/Helpers";

import {
  getStaffMembers,
  addStaffMember,
  deleteStaffMember,
  getMemberById,
  getMemberByEmail,
  updateMember,
  updatePassword,
} from "../Entities/Staff";

export const fetchMembers = async (req: Request, res: Response) => {
  try {
    const members = await getStaffMembers();
    return res.json(customPayloadResponse(true, members)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const createStaffMember = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, middleName, staffType } = req.body;
    if (!firstName) {
      return res
        .json(customPayloadResponse(false, "First Name Required"))
        .status(200)
        .end();
    }
    if (!lastName) {
      return res
        .json(customPayloadResponse(false, "Last Name Required"))
        .status(200)
        .end();
    }
    if (!email) {
      return res
        .json(customPayloadResponse(false, "Email Required"))
        .status(200)
        .end();
    }

    const staffMemberByEmail = await getMemberByEmail(email);

    if (staffMemberByEmail) {
      return res
        .json(customPayloadResponse(false, "Email Taken!!"))
        .status(200)
        .end();
    }

    const password = randomStringGenerator(10);

    const hashPwd = await hashPassword(password, 10);

    const insertMember = await addStaffMember(
      email,
      lastName,
      firstName,
      middleName,
      hashPwd,
      staffType
    );

    if (insertMember) {
      return res
        .json(customPayloadResponse(true, "Member Added"))
        .status(200)
        .end();
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeStaffMember = async (req: Request, res: Response) => {
  try {
    const staffId = parseInt(req.params.id);
    const staff = await getMemberById(staffId);
    if (staff) {
      await deleteStaffMember(staffId);
      return res
        .json(customPayloadResponse(true, "Staff Deleted"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Staff not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const modifyStaffMember = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, middleName, staffType, staffId } =
      req.body;
    if (!firstName) {
      return res
        .json(customPayloadResponse(false, "First Name Required"))
        .status(200)
        .end();
    }
    if (!lastName) {
      return res
        .json(customPayloadResponse(false, "Last Name Required"))
        .status(200)
        .end();
    }
    if (!email) {
      return res
        .json(customPayloadResponse(false, "Email Required"))
        .status(200)
        .end();
    }
    if (!staffId) {
      return res
        .json(customPayloadResponse(false, "Staff Id Required"))
        .status(200)
        .end();
    }

    const staff = await getMemberById(staffId);

    if (staff) {
      const staffMember = await updateMember(
        staffId,
        email,
        lastName,
        firstName,
        middleName,
        staffType
      );
      
      if (staffMember) {
        return res
          .json(customPayloadResponse(true, "Staff Updated"))
          .status(200)
          .end();
      }
      return res
        .json(customPayloadResponse(false, "Staff not Found"))
        .status(200)
        .end();
    }
  } catch (error) {
    console.log(error);
  }
};

export const passwordUpdate = async (req: Request, res: Response) => {
  try {
    const { password, confirm_password, email } = req.body;
    if (!password) {
      return res
        .json(customPayloadResponse(false, "Password is required"))
        .status(200)
        .end();
    }
    if (!confirm_password) {
      return res
        .json(customPayloadResponse(false, "Confirm Password is required"))
        .status(200)
        .end();
    }
    if (!email) {
      return res
        .json(customPayloadResponse(false, "Email is required"))
        .status(200)
        .end();
    }
    if (password !== confirm_password) {
      return res
        .json(customPayloadResponse(false, "Password Mismatch"))
        .status(200)
        .end();
    }
    if (password === confirm_password) {

      const user = await getMemberByEmail(email);

      if (user) {

        const hashPwd = await hashPassword(password, 10);

        const passwordUpdate = await updatePassword(email, hashPwd);
        if (passwordUpdate) {
          return res
            .json(customPayloadResponse(true, "Password Updated"))
            .status(200)
            .end();
        }
      } else {
        return res
          .json(customPayloadResponse(false, "Password Cannot Be Changed"))
          .status(200)
          .end();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
