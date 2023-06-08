import { Request, Response } from "express";
import {
  getPaySlips,
  createPaySlip,
  deletePaySlip,
  updatePaySlip
} from "../Entities/PaySlip";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchPaySlips = async (req: Request, res: Response) => {
  try {
    const paySlips = await getPaySlips();
    return res.json(customPayloadResponse(true, paySlips)).status(200).end();
  } catch (error) {
    console.log(error)
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const addPaySlip = async (req: Request, res: Response) => {
  try {
    const { gross_salary, net_salary, paySlipCategory, staff, taxes, deductions } = req.body;
    if (!gross_salary || !net_salary || !paySlipCategory || !staff) {
      return res
        .json(customPayloadResponse(false, "Please fill all required fields"))
        .status(400)
        .end();
    }

    const paySlip = await createPaySlip(gross_salary, net_salary, parseInt(paySlipCategory), parseInt(staff), taxes, deductions);
    return res.json(customPayloadResponse(true, paySlip)).status(200).end();
  } catch (error) {
    console.log(error)
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const removePaySlip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const paySlip = await deletePaySlip(parseInt(id));
    return res.json(customPayloadResponse(true, paySlip)).status(200).end();
  } catch (error) {
    console.log(error)
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}


export const editPaySlip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { gross_salary, net_salary, paySlipCategory, staff, taxes, deductions } = req.body;
    if (!gross_salary || !net_salary || !paySlipCategory || !staff) {
      return res
        .json(customPayloadResponse(false, "Please fill all required fields"))
        .status(400)
        .end();
    }

    const paySlip = await updatePaySlip(parseInt(id), gross_salary, net_salary, parseInt(paySlipCategory), parseInt(staff), taxes, deductions);
    return res.json(customPayloadResponse(true, paySlip)).status(200).end();
  } catch (error) {
    console.log(error)
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}