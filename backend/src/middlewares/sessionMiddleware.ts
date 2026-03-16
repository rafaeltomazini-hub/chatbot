import { NextFunction, Request, Response } from "express";

export const validateSessionData = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log("Session middleware is running");
  return next();
};
