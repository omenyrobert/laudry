import { Request, Response } from "express";

import {
  getSalaryInfo,
  getSalaryInfoById,
  createSalaryInfo,
  updateSalaryInfo,
  deleteSalaryInfo,
} from "../Entities/SalaryInfo";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchSalaryInfo = async (req: Request, res: Response) => {
  try {
    const salaryInfo = await getSalaryInfo();
    return res.json(customPayloadResponse(true, salaryInfo)).status(200).end();
  } catch (error) {
    console.log(error);
  }
}

export const fetchSalaryInfoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const salaryInfo = await getSalaryInfoById(parseInt(id));
    return res.json(customPayloadResponse(true, salaryInfo)).status(200).end();
  } catch (error) {
    console.log(error);
  }
}

export const addSalaryInfo = async (req: Request, res: Response) => {
  try {
    const { gross_salary, bank_name, account_number, account_name, bank_branch, staff } = req.body;
    if (!gross_salary) {
      return res.json(customPayloadResponse(false, "Gross Salary Required")).status(200).end();
    }
    if (!bank_name) {
      return res.json(customPayloadResponse(false, "Bank Name Required")).status(200).end();
    }
    if (!account_number) {
      return res.json(customPayloadResponse(false, "Account Number Required")).status(200).end();
    }
    if (!account_name) {
      return res.json(customPayloadResponse(false, "Account Name Required")).status(200).end();
    }
    if (!bank_branch) {
      return res.json(customPayloadResponse(false, "Bank Branch Required")).status(200).end();
    }
    if (!staff) {
      return res.json(customPayloadResponse(false, "Staff Required")).status(200).end();
    }
    await createSalaryInfo(gross_salary, bank_name, account_number, account_name, bank_branch, staff);
    return res.json(customPayloadResponse(true, "Salary Info Added")).status(200).end();
  } catch (error) {
    console.log(error);
  }
}

export const modifySalaryInfo = async (req: Request, res: Response) => {
  try {
    const { id, gross_salary, bank_name, account_number, account_name, bank_branch, staff } = req.body;
    if (!id) {
      return res.json(customPayloadResponse(false, "Salary Info Id Required")).status(200).end();
    }
    if (!gross_salary) {
      return res.json(customPayloadResponse(false, "Gross Salary Required")).status(200).end();
    }
    if (!bank_name) {
      return res.json(customPayloadResponse(false, "Bank Name Required")).status(200).end();
    }
    if (!account_number) {
      return res.json(customPayloadResponse(false, "Account Number Required")).status(200).end();
    }
    if (!account_name) {
      return res.json(customPayloadResponse(false, "Account Name Required")).status(200).end();
    }
    if (!bank_branch) {
      return res.json(customPayloadResponse(false, "Bank Branch Required")).status(200).end();
    }
    if (!staff) {
      return res.json(customPayloadResponse(false, "Staff Required")).status(200).end();
    }
    await updateSalaryInfo(id, gross_salary, bank_name, account_number, account_name, bank_branch, staff);
    return res.json(customPayloadResponse(true, "Salary Info Updated")).status(200).end();
  } catch (error) {
    console.log(error);
  }
}

export const removeSalaryInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json(customPayloadResponse(false, "Salary Info Id Required")).status(200).end();
    }
    await deleteSalaryInfo(parseInt(id));
    return res.json(customPayloadResponse(true, "Salary Info Deleted")).status(200).end();
  } catch (error) {
    console.log(error);
  }
}
