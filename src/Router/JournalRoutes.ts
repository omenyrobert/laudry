import { Router } from "express";

import {
  fetchJournals,
  addJournal,
  modifyJournal,
  removeJournal,
} from "../Controllers/JournalsController";

import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const journalPrefix = "/journals";
  router.get(`${journalPrefix}`, JWTAuthMiddleWare, fetchJournals);
  router.post(`${journalPrefix}`, JWTAuthMiddleWare, addJournal);
  router.put(`${journalPrefix}`, JWTAuthMiddleWare, modifyJournal);
  router.delete(`${journalPrefix}/:id`, JWTAuthMiddleWare, removeJournal);
};
