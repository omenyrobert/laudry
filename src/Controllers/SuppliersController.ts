import { Request, Response } from "express";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSingleSupplier,
} from "../Entities/Supplier";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await getSuppliers();
    return res
      .json(customPayloadResponse(true, suppliers))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
};

export const addSupplier = async (req: Request, res: Response) => {
  try {
    const {
      supplierName,
      contacts,
      emails,
      address,
      about
    } = req.body;

    if (!supplierName) {
      return res
        .json(customPayloadResponse(false, "Supplier Name Required"))
        .status(200)
        .end();
    }

    if (!contacts) {
      return res
        .json(customPayloadResponse(false, "Contacts Required"))
        .status(200)
        .end();
    }

    if (!emails) {
      return res
        .json(customPayloadResponse(false, "Emails Required"))
        .status(200)
        .end();
    }

    if (!about) {
      return res
        .json(customPayloadResponse(false, "About Required"))
        .status(200)
        .end();
    }

    await createSupplier(supplierName, contacts, emails, address, about);
    
    return res
      .json(customPayloadResponse(true, "Supplier Added"))
      .status(200)
      .end();
  } catch (error) {
    console.log("error", error);
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
};

export const modifySupplier = async (req: Request, res: Response) => {
  try {
    const {
      id,
      supplierName,
      contacts,
      emails,
      address,
      about
    } = req.body;

    const supplierId = id;

    if (!supplierId) {
      return res
        .json(customPayloadResponse(false, "Supplier ID Required"))
        .status(200)
        .end();
    }

    if (!supplierName) {
      return res
        .json(customPayloadResponse(false, "Supplier Name Required"))
        .status(200)
        .end();
    }

    const supplierToModify = await getSingleSupplier(supplierId);

    if (supplierToModify) {
      await updateSupplier(
        supplierId,
        supplierName,
        contacts,
        emails,
        address,
        about
      );

      return res
        .json(customPayloadResponse(true, "Supplier Modified"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Supplier Not Found"))
        .status(200)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
};

export const removeSupplier = async (req: Request, res: Response) => {
  try {
    const supplierId = parseInt(req.params.id);

    if (!supplierId) {
      return res
        .json(customPayloadResponse(false, "Supplier ID Required"))
        .status(200)
        .end();
    }

    const supplierToDelete = await getSingleSupplier(supplierId);

    if (supplierToDelete) {
      await deleteSupplier(supplierId);
      return res
        .json(customPayloadResponse(true, "Supplier Deleted"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Supplier Not Found"))
        .status(400)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
};
