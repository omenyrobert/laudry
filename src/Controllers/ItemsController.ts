import { Request, Response } from "express";

import {
  getItems,
  addItem,
  deleteItem,
  updateItem,
  getItemById,
  getItemByName,
} from "../Entities/Item";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchItems = async (req: Request, res: Response) => {
  try {
    const items = await getItems();
    return res
      .status(200)
      .json(customPayloadResponse(true, items))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to fetch items"))
      .end();
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, cost } = req.body;

    if (!name) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Item name required"))
        .end();
    }

    if (cost === undefined || cost === null) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Item cost required"))
        .end();
    }

    const findItem = await getItemByName(name);
    if (findItem) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Item already exists"))
        .end();
    }

    const insertItem = await addItem(name, Number(cost));
    if (insertItem) {
      return res
        .status(200)
        .json(customPayloadResponse(true, "Item Added"))
        .end();
    }

    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to add item"))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to add item"))
      .end();
  }
};

export const modifyItem = async (req: Request, res: Response) => {
  try {
    const { itemId, name, cost } = req.body;

    if (!itemId) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Item Id required"))
        .end();
    }

    if (!name && (cost === undefined || cost === null)) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Nothing to update"))
        .end();
    }

    const item = await getItemById(itemId);
    if (!item) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Item not found"))
        .end();
    }

    const newName = name ?? item.name;
    const newCost = cost !== undefined && cost !== null ? Number(cost) : item.cost;

    await updateItem(itemId, newName, newCost);

    return res
      .status(200)
      .json(customPayloadResponse(true, "Item Updated"))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to update item"))
      .end();
  }
};

export const removeItem = async (req: Request, res: Response) => {
  try {
    const itemId = parseInt(req.params.id);
    if (Number.isNaN(itemId)) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Invalid Item Id"))
        .end();
    }

    const item = await getItemById(itemId);
    if (!item) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Item not found"))
        .end();
    }

    await deleteItem(itemId);
    return res
      .status(200)
      .json(customPayloadResponse(true, "Item Deleted"))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to delete item"))
      .end();
  }
};
