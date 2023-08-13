import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Logging from "../logger/log";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let cookie = req.headers.authorization;
    if (!cookie) {
      return res.status(403).json({ message: "Could not authorize token!" });
    } else {
      // remove Bearer if using Bearer Authorization mechanism
      Logging.warn("cookie found");
      cookie.toLowerCase().startsWith("bearer");
      cookie = cookie.slice("bearer".length).trim();
      console.log(cookie);
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
