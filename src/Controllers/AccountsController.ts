import { Request, Response } from "express";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getSingleAccount,
} from "../Entities/Account";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await getAccounts();
    return res
      .json(customPayloadResponse(true, accounts))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const addAccount = async (req: Request, res: Response) => {
  try {
    const {
      accountName,
      accountType,
      subType,
      amount,
      supplierName,
      contacts,
      address,
      about
    } = req.body;

    if (!accountName) {
      return res
        .json(customPayloadResponse(false, "Account Name Required"))
        .status(200)
        .end();
    }

    if (!accountType) {
      return res
        .json(customPayloadResponse(false, "Account Type Required"))
        .status(200)
        .end();
    }

    if (!subType) {
      return res
        .json(customPayloadResponse(false, "Sub Type Required"))
        .status(200)
        .end();
    }

    await createAccount(
      accountName,
      accountType,
      subType,
      amount,
      supplierName,
      contacts,
      address,
      about
    );
        
    return res
      .json(customPayloadResponse(true, "Account Added"))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const modifyAccount = async (req: Request, res: Response) => {
  try {
    const {
      id,
      accountName,
      accountType,
      subType,
      amount,
      supplierName,
      contacts,
      address,
      about
    } = req.body;

    const accountId = id;

    if (!accountId) {
      return res
        .json(customPayloadResponse(false, "Account ID Required"))
        .status(200)
        .end();
    }

    if (!accountName) {
      return res
        .json(customPayloadResponse(false, "Account Name Required"))
        .status(200)
        .end();
    }

    if (!accountType) {
      return res
        .json(customPayloadResponse(false, "Account Type Required"))
        .status(200)
        .end();
    }

    if (!subType) {
      return res
        .json(customPayloadResponse(false, "Sub Type Required"))
        .status(200)
        .end();
    }

    const accountToModify = await getSingleAccount(accountId);

    if (accountToModify) {
      await updateAccount(
        accountId,
        accountName,
        accountType,
        subType,
        amount,
        supplierName,
        contacts, 
        address,
        about,
      );

      return res
        .json(customPayloadResponse(true, "Account Modified"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Account Not Found"))
        .status(200)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const removeAccount = async (req: Request, res: Response) => {
  try {
    const accountId = parseInt(req.params.id);

    if (!accountId) {
      return res
        .json(customPayloadResponse(false, "Account ID Required"))
        .status(200)
        .end();
    }

    const accountToDelete = await getSingleAccount(accountId);

    if (accountToDelete) {
      await deleteAccount(accountId);
      return res
        .json(customPayloadResponse(true, "Account Deleted"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Account Not Found"))
        .status(400)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
    }
}
