import { Request, Response } from "express";
//models
import UserModel, {
  IUser,
  IUserDocument,
  IUserInput,
} from "../models/UserModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName } = req.body;
  } catch (error) {
    return res.status(500).send({ "Register error": error });
  }
};
