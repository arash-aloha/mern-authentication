import { Request, Response } from "express";

import { getUserByEmail } from "./actions";

export const signupNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName } = req.body;
    const validationError = validateBody(email, password, firstName);
    if (validationError) {
      console.log(validateBody);
      return res.status(400).send(validationError);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(409);
    }
    console.log("user does not exist");
  } catch (error) {
    console.log("ERROR: ", error.message);
    // return res.status(500).send({ "Register error": error });
  }
};

export function validateBody(
  email: string,
  password: string,
  firstName: string
) {
  if (!email) return `Something wrong with email: ${email}`;
  if (!password) return `Something wrong with password: ${password}`;
  if (!firstName) return `something wrong with first name: ${firstName}`;
}
