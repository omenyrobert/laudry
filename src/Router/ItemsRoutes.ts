import { Router } from "express";

import {
  fetchItems,
  createItem,
  modifyItem,
  removeItem,
} from "../Controllers/ItemsController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import { withActivityLog } from "../Middlewares/ActivityLoggerMiddleware";

export default (router: Router) => {
  const itemPrefix = "/items";

  router.get(
    `${itemPrefix}`,
    JWTAuthMiddleWare,
    fetchItems
  );

  router.post(
    `${itemPrefix}`,
    JWTAuthMiddleWare,
    withActivityLog(
      "Created Item",
      (req) => req.body,
      createItem
    )
  );

  router.put(
    `${itemPrefix}`,
    JWTAuthMiddleWare,
    withActivityLog(
      "Updated Item",
      (req) => req.body,
      modifyItem
    )
  );

  router.post(
    `${itemPrefix}/:id`,
    JWTAuthMiddleWare,
    withActivityLog(
      "Deleted Item",
      (req) => req.body,
      removeItem
    )
  );
};
