import { Request, Response } from "express";
import {
  getPaySlipCategories,
  createPaySlipCategory,
  deletePaySlipCategory,
  updatePaySlipCategory,
  getSinglePaySlipCategory,
} from "../Entities/PaySlipCategory";


import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchPaySlipCategories = async (req: Request, res: Response) => {
  try {
    const paySlipCategories = await getPaySlipCategories();
    return res.json(customPayloadResponse(true, paySlipCategories)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const createPaySlipCategoryController = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    const paySlipCategory = await createPaySlipCategory(category);
    return res.json(customPayloadResponse(true, paySlipCategory)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const deletePaySlipCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const paySlipCategory = await deletePaySlipCategory(parseInt(id));
    return res.json(customPayloadResponse(true, paySlipCategory)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const updatePaySlipCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const paySlipCategory = await updatePaySlipCategory(parseInt(id), category);
    return res.json(customPayloadResponse(true, paySlipCategory)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}
