import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers";
import { payAccount, getAccounts } from "../Entities/Account";


export const payAccountController = async (req: Request, res: Response) => {
  try {
    const { id, amount, date } = req.body;
    if (!id) {
      return res.json(customPayloadResponse(false, "Account Id Required")).status(200).end();
    }
    if (!amount) {
      return res.json(customPayloadResponse(false, "Amount Required")).status(200).end();
    }
    if (!date) {
      return res.json(customPayloadResponse(false, "Date Required")).status(200).end();
    }
    await payAccount(id, parseInt(amount), date);
    return res.json(customPayloadResponse(true, "Account Paid")).status(200).end();
    
  } catch (error) {
    console.log(error);
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}

export const getAccountsController = async (req: Request, res: Response) => {
  try {
    const accounts = await getAccounts();
    return res.json(customPayloadResponse(true, accounts)).status(200).end();
  } catch (error) {
    console.log(error);
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}