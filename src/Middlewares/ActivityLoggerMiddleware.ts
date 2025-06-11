import { ActivityLog } from "../Entities/ActivityLogs";

export const ActivityLoggerMiddleware = async (req, res, next) => {
  const userId = req.user?.id || 0; // use auth middleware to set `req.user`
  const action = `${req.method} ${req.originalUrl}`;
  await ActivityLog(userId, action, "Route accessed");
  next();
};