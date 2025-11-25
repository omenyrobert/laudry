import { Request, Response } from "express";

import {
  getOrders,
  addOrder,
  deleteOrder,
  updateOrder,
  getOrderById,
  updateOrderStatus,
  updateOrderPaidAmount,
} from "../Entities/Order";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    return res.status(200).json(customPayloadResponse(true, orders)).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to fetch orders"))
      .end();
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, amount, paid, date, items } = req.body;

    if (!name) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Customer name required"))
        .end();
    }
    if (!phone) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Customer phone required"))
        .end();
    }
    if (!address) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Customer address required"))
        .end();
    }
    if (amount === undefined || amount === null) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order amount required"))
        .end();
    }
    if (paid === undefined || paid === null) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Paid amount required"))
        .end();
    }
    if (!date) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order date required"))
        .end();
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order items required"))
        .end();
    }

    // items expected like [{ itemId: 1, quantity: 2 }, ...]
    const formattedItems = items.map((i: any) => ({
      itemId: Number(i.itemId),
      quantity: Number(i.quantity) || 1,
    }));

    const createdOrder = await addOrder(
      name,
      phone,
      address,
      Number(amount),
      Number(paid),
      date,
      formattedItems
    );

    if (createdOrder) {
      return res
        .status(200)
        .json(customPayloadResponse(true, "Order Created"))
        .end();
    }

    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to create order"))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to create order"))
      .end();
  }
};

export const modifyOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, name, phone, address, amount, paid, date } = req.body;

    if (!orderId) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order Id required"))
        .end();
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order not found"))
        .end();
    }

    const dataToUpdate: any = {};

    if (name) dataToUpdate.name = name;
    if (phone) dataToUpdate.phone = phone;
    if (address) dataToUpdate.address = address;
    if (amount !== undefined && amount !== null)
      dataToUpdate.amount = Number(amount);
    if (paid !== undefined && paid !== null) dataToUpdate.paid = Number(paid);
    if (date) dataToUpdate.date = date;

    if (Object.keys(dataToUpdate).length === 0) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Nothing to update"))
        .end();
    }

    await updateOrder(orderId, dataToUpdate);

    return res
      .status(200)
      .json(customPayloadResponse(true, "Order Updated"))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to update order"))
      .end();
  }
};

export const removeOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    if (Number.isNaN(orderId)) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Invalid Order Id"))
        .end();
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order not found"))
        .end();
    }

    await deleteOrder(orderId);
    return res
      .status(200)
      .json(customPayloadResponse(true, "Order Deleted"))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to delete order"))
      .end();
  }
};

export const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, orderStatus } = req.body;

    if (!orderId) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order Id required"))
        .end();
    }

    if (!orderStatus) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order status required"))
        .end();
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order not found"))
        .end();
    }

    await updateOrderStatus(orderId, orderStatus);

    return res
      .status(200)
      .json(customPayloadResponse(true, "Order status updated"))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to update order status"))
      .end();
  }
};

export const changeOrderPaid = async (req: Request, res: Response) => {
  try {
    const { orderId, paid } = req.body;

    if (!orderId) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order Id required"))
        .end();
    }

    if (paid === undefined || paid === null) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Paid amount required"))
        .end();
    }

    const updated = await updateOrderPaidAmount(orderId, Number(paid));

    if (!updated) {
      return res
        .status(200)
        .json(customPayloadResponse(false, "Order not found"))
        .end();
    }

    return res
      .status(200)
      .json(
        customPayloadResponse(
          true,
          "Order paid updated (status changed if fully paid)"
        )
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(customPayloadResponse(false, "Failed to update paid amount"))
      .end();
  }
};
