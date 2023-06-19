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
    const { res, email, password, firstName } = req.body;
    if (checkBodyIfNullOrUndefined(res, email, password, firstName)) {
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

export function checkBodyIfNullOrUndefined(
  res: Response,
  email: string,
  password: string,
  firstName: string
) {
  if (!email)
    return res.status(400).send(`something wrong with email: ${email}`);
  if (!password)
    return res.status(400).send(`something wrong with password: ${password}`);
  if (!firstName)
    return res
      .status(400)
      .send(`something wrong with first name: ${firstName}`);
}
