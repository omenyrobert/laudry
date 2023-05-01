import { Router } from "express";

import {
  fetchStreams,
  addStream,
  modifyStream,
  removeStream,
} from "../Controllers/StreamsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const streamPrefix = "/streams";
  router.get(`${streamPrefix}`, JWTAuthMiddleWare, fetchStreams);
  router.post(`${streamPrefix}`, JWTAuthMiddleWare, addStream);
  router.put(`${streamPrefix}`, JWTAuthMiddleWare, modifyStream);
  router.delete(`${streamPrefix}/:id`, JWTAuthMiddleWare, removeStream);
};
