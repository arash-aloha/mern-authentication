import { Request, Response } from "express";
//models
import UserModel, {
  IUser,
  IUserDocument,
  IUserInput,
} from "../models/UserModel";
import { getUserByEmail } from "./actions";

export const signupNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName } = req.body;
    if (checkBodyIfNullOrUndefined(email, password, firstName)) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(409);
    }
    console.log("user does not exist");
  } catch (error) {
    return res.status(500).send({ "Register error": error });
  }
};

export function checkBodyIfNullOrUndefined(email, password, firstName) {
  if (!email) return `something wrong with email: ${email}`;
  if (!password) return `something wrong with email: ${password}`;
  if (!firstName) return `something wrong with firstName: ${firstName}`;
}
