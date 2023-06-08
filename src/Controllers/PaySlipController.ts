import { Request, Response } from "express";
import {
  getPaySlips,
  createPaySlip,
  deletePaySlip,
} from "../Entities/PaySlip";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchPaySlips = async (req: Request, res: Response) => {
  try {
    const paySlips = await getPaySlips();
    return res.json(customPayloadResponse(true, paySlips)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const addPaySlip = async (req: Request, res: Response) => {
  try {
    const { gross_salary, net_salary, paySlipCategory, staffId, taxes, deductions } = req.body;
    const paySlip = await createPaySlip(gross_salary, net_salary, paySlipCategory, parseInt(staffId), taxes, deductions);
    return res.json(customPayloadResponse(true, paySlip)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const removePaySlip = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const paySlip = await deletePaySlip(id);
    return res.json(customPayloadResponse(true, paySlip)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}