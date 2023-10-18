import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers";
import { getCustomers, createCustomer, deleteCustomer, updateCustomer } from "../Entities/Customer";


export const createCustomerController = async (req: Request, res: Response) => {
  try {
    const { name, email, location, phone } = req.body;
    if (!name || !email || !location || !phone) {
      return res
        .json(customPayloadResponse(false, "All fields are required"))
        .status(200)
        .end();
    }

    const customer = await createCustomer(name, email, location, phone);
    return res.json(customPayloadResponse(true, customer)).status(200).end();
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}

export const getCustomersController = async (req: Request, res: Response) => {
  try {
    const customers = await getCustomers();
    return res.json(customPayloadResponse(true, customers)).status(200).end();
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}


export const deleteCustomerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .json(customPayloadResponse(false, "Customer id is required"))
        .status(200)
        .end();
    }

    const customer = await deleteCustomer(
      parseInt(id)
    );
    return res.json(customPayloadResponse(true, customer)).status(200).end();
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}

export const updateCustomerController = async (req: Request, res: Response) => {
  try {
    const { name, email, location, phone, id } = req.body;
    if (!id || !name || !email || !location || !phone) {
      return res
        .json(customPayloadResponse(false, "All fields are required"))
        .status(200)
        .end();
    }

    const customer = await updateCustomer(
      parseInt(id),
      name,
      email,
      location,
      phone
    );
    return res.json(customPayloadResponse(true, customer)).status(200).end();
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}