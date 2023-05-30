import { Request, Response } from "express";
import {
  getFees,
  createFee,
  deleteFee,
  updateFee,
  getSingleFee,
} from "../Entities/Fee";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchFees = async (req: Request, res: Response) => {
  try {
    const fees = await getFees();
    return res.json(customPayloadResponse(true, fees)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const addFee = async (req: Request, res: Response) => {
  try {

    const { name, amount } = req.body;
    if (!name) {
      return res
        .json(customPayloadResponse(false, "Fee name Required"))
        .status(200)
        .end();
    }
    if (!amount) {
      return res
        .json(customPayloadResponse(false, "Fee Amount Required"))
        .status(200)
        .end();
    }
    await createFee(name, amount);
    return res
      .json(customPayloadResponse(true, "Fee Added"))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const modifyFee = async (req: Request, res: Response) => {
  try {
    const { name, id, amount } = req.body;
    const feeId = id
    if (!name) {
      return res
        .json(customPayloadResponse(false, "Fee name Required"))
        .status(200)
        .end();
    }
    if (!feeId) {
      return res
        .json(customPayloadResponse(false, "Fee Id Required"))
        .status(200)
        .end();
    }
    const feeToModify = await getSingleFee(feeId);

    if (feeToModify) {
      await updateFee(feeId, name, amount);
      return res
        .json(customPayloadResponse(true, "Fee Modified"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Fee Not Found"))
        .status(200)
        .end();
    }
  } catch (error) {
    console.log(error)
    // Return Internal server error response
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}


export const removeFee = async (req: Request, res: Response) => {
  try {
    const feeId = parseInt(req.params.id)
    if (!feeId) {
      return res
        .json(customPayloadResponse(false, "Fee Id Required"))
        .status(200)
        .end();
    }
    const feeToDelete = await getSingleFee(feeId);
    if (feeToDelete) {
      await deleteFee(feeId);
      return res
        .json(customPayloadResponse(true, "Fee Deleted"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Fee Not Found"))
        .status(400)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const fetchSingleFee = async (req: Request, res: Response) => {
  try {
    const feeId = parseInt(req.params.id);
    if (!feeId) {
      return res
        .json(customPayloadResponse(false, "Fee Id Required"))
        .status(200)
        .end();
    }
    const fee = await getSingleFee(feeId);
    if (fee) {
      return res
        .json(customPayloadResponse(true, fee))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Fee Not Found"))
        .status(200)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}


