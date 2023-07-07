require("dotenv").config();
import { Request, Response } from "express";

import {
  customPayloadResponse,
  randomStringGenerator,
  hashPassword,
  sendingMail,
} from "../Helpers/Helpers";

import {
  getStaffMembers,
  addStaffMember,
  deleteStaffMember,
  getMemberById,
  getMemberByEmail,
  updateMember,
  updatePassword,
  updateProfile,
  updateProfilePicture,
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
    const { firstName, lastName, email, middleName, staffType, roles } =
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
      staffType,
      roles
    );

    if (insertMember) {
      const mailOptions = {
        to: email,
        subject: "Temporary Password",
        template: "Email",
        context: {
          body:
            "Hey " +
            firstName +
            " " +
            middleName +
            " " +
            lastName +
            ", Below is your temporary password.",
          data: password,
        },
      };
      sendingMail(mailOptions);
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
    const {
      firstName,
      lastName,
      email,
      middleName,
      staffType,
      staffId,
      roles,
      isRemove,
    } = req.body;

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
      const staffRoles = staff.roles || [];

      let updatedRoles: string[];

      if (isRemove) {
        updatedRoles = staffRoles.filter((role) => role !== roles);
      } else {
        updatedRoles = [...staffRoles, roles];
      }

      const staffMember = await updateMember(
        staffId,
        email,
        lastName,
        firstName,
        middleName,
        staffType,
        updatedRoles
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

export const fetchStaffById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .json(customPayloadResponse(false, "Staff Id Required"))
        .status(200)
        .end();
    }
    const staffId = parseInt(id);
    const staff = await getMemberById(staffId);
    if (staff) {
      return res.json(customPayloadResponse(true, staff)).status(200).end();
    }
    return res
      .json(customPayloadResponse(false, "Staff Member not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const updateStaffProfile = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      gender,
      address,
      phone_number,
      date_of_birth,
      marital_status,
      nationality,
      staff_type,
    } = req.body;
    const { id } = req.params;

    if (!id) {
      return res
        .json(customPayloadResponse(false, "Staff Id Required"))
        .status(200)
        .end();
    }

    const staff = await updateProfile(
      parseInt(id),
      first_name,
      middle_name,
      last_name,
      email,
      staff_type,
      address,
      phone_number,
      date_of_birth,
      gender,
      marital_status,
      nationality
    );

    if (staff) {
      return res
        .json(customPayloadResponse(true, "Profile Updated"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Staff Member not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const updateStaffProfilePicture = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    console.log("Uploading files");

    if (!req.file) {
      return res
        .json(customPayloadResponse(false, "Profile Picture Required"))
        .status(200)
        .end();
    }

    if (!id) {
      return res
        .json(customPayloadResponse(false, "Staff Id Required"))
        .status(200)
        .end();
    }

    if (!req.file) {
      return res
        .json(customPayloadResponse(false, "Profile Picture Required"))
        .status(200)
        .end();
    }

    const photo = req.file.filename;

    const staff = await updateProfilePicture(parseInt(id), photo);

    if (staff) {
      return res
        .json(customPayloadResponse(true, "Profile Picture Updated"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Staff Member not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};
