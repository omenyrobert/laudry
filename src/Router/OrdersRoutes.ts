import { Router } from "express";

import {
  fetchOrders,
  createOrder,
  modifyOrder,
  removeOrder,
  changeOrderStatus,
  changeOrderPaid,
} from "../Controllers/OrdersController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import { withActivityLog } from "../Middlewares/ActivityLoggerMiddleware";
import { fetchCardsStats } from "../Controllers/DashboardController";

export default (router: Router) => {
  const orderPrefix = "/orders";

  router.get(`${orderPrefix}`, JWTAuthMiddleWare, fetchOrders);
  router.get(`${orderPrefix}/dashboard`, JWTAuthMiddleWare, fetchCardsStats);
  router.post(
    `${orderPrefix}`,
    JWTAuthMiddleWare,
    withActivityLog("Created Order", (req) => req.body, createOrder)
  );

  router.put(
    `${orderPrefix}`,
    JWTAuthMiddleWare,
    withActivityLog("Updated Order", (req) => req.body, modifyOrder)
  );

  router.post(
    `${orderPrefix}/:id`,
    JWTAuthMiddleWare,
    withActivityLog("Deleted Order", (req) => req.body, removeOrder)
  );

  // change only status
  router.put(
    `${orderPrefix}/status`,
    JWTAuthMiddleWare,
    withActivityLog(
      "Changed Order Status",
      (req) => req.body,
      changeOrderStatus
    )
  );

  // change only paid (and auto-status when fully paid)
  router.put(
    `${orderPrefix}/paid`,
    JWTAuthMiddleWare,
    withActivityLog("Changed Order Paid", (req) => req.body, changeOrderPaid)
  );
};
