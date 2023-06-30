import { Request, Response } from "express";
import {
  getReductions,
  addReductions,
  getReductionsById,
  updateReductions,
  deleteReductions,
} from "../Entities/Reductions";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchReductions = async (req: Request, res: Response) => {
  try {
    const reductions = await getReductions();
    return res.json(customPayloadResponse(true, reductions)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const addReduction = async (req: Request, res: Response) => {
  try {
    const {
      date,
      stock,
      stockId,
      quantity,
      quantityTaken,
      takenBy,
      takenByContacts,
      balance,
    } = req.body;

    if (!date) {
      return res
        .json(customPayloadResponse(false, "Date Required"))
        .status(200)
        .end();
    }
    if (!stock) {
      return res
        .json(customPayloadResponse(false, "Stock Required"))
        .status(200)
        .end();
    }
    if (!stockId) {
      return res
        .json(customPayloadResponse(false, "Stock ID Required"))
        .status(200)
        .end();
    }
    if (!quantity) {
      return res
        .json(customPayloadResponse(false, "Quantity Required"))
        .status(200)
        .end();
    }

    await addReductions(
      date,
      stock,
      stockId,
      quantity,
      quantityTaken,
      takenBy,
      takenByContacts,
      balance
    );

    return res
      .json(customPayloadResponse(true, "Reduction Added"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const updateReduction = async (req: Request, res: Response) => {
  try {
    const reductionId = parseInt(req.params.id);
    const {
      date,
      stock,
      stockId,
      quantity,
      quantityTaken,
      takenBy,
      takenByContacts,
      balance
    } = req.body;

    if (!date) {
      return res
        .json(customPayloadResponse(false, "Date Required"))
        .status(200)
        .end();
    }
    if (!stock) {
      return res
        .json(customPayloadResponse(false, "Stock Required"))
        .status(200)
        .end();
    }
    if (!stockId) {
      return res
        .json(customPayloadResponse(false, "Stock ID Required"))
        .status(200)
        .end();
    }
    if (!quantity) {
      return res
        .json(customPayloadResponse(false, "Quantity Required"))
        .status(200)
        .end();
    }
    if (!reductionId) {
      return res
        .json(customPayloadResponse(false, "Reduction ID Required"))
        .status(200)
        .end();
    }

    const reductionToUpdate = await getReductionsById(reductionId);
    if (reductionToUpdate) {
      await updateReductions(
        reductionId,
        date,
        stock,
        stockId,
        quantity,
        quantityTaken,
        takenBy,
        takenByContacts,
        balance
      );

      return res
        .json(customPayloadResponse(true, "Reduction Updated"))
        .status(200)
        .end();
    }

    return res
      .json(customPayloadResponse(false, "Reduction not Updated"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeReduction = async (req: Request, res: Response) => {
  try {
    const reductionId = parseInt(req.params.id);
    const reductionToDelete = await getReductionsById(reductionId);

    if (reductionToDelete) {
      await deleteReductions(reductionId);

      return res
        .json(customPayloadResponse(true, "Reduction Deleted"))
        .status(200)
        .end();
    }

    return res
      .json(customPayloadResponse(false, "Reduction not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};
