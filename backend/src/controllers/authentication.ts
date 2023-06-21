import { Request, Response } from "express";

import { createUser, getUserByEmail } from "./actions";
import { hashPassword, generateSalt } from "../helpers/authenticationHelper";

export const signupNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;
    const validationError = validateBody({
      email,
      password,
      firstName,
      lastName,
      username,
    });

    if (validationError) {
      console.log(validationError);
      return res
        .status(validationError.statusCode)
        .send({ message: validationError.message });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log("existing user", existingUser);
      return res.sendStatus(409);
    }

    const salt = await generateSalt();

    const newUser = await createUser({
      email,
      firstName,
      lastName,
      username,
      authentication: {
        salt,
        hashedPassword: await hashPassword(salt, password),
      },
    });
    if (!newUser) {
      console.log("Failed to create a new user.");
      return res.status(500).send({
        message: "Failed to create a new user.",
      });
    }
    return res
      .status(200)
      .json({ message: "New user has been created.", newUser });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export function validateBody(userInput: Object): {
  statusCode: number;
  message: string;
} | null {
  const requiredFields = {
    email: "email",
    password: "password",
    firstName: "first name",
    lastName: "last name",
    username: "username",
  };

  for (const field in requiredFields) {
    if (!userInput[field]) {
      return createErrorResponse(requiredFields[field], userInput[field]);
    }
  }

  return null; //validation successful
}

function createErrorResponse(
  fieldName: string,
  value: string
): { statusCode: number; message: string } {
  return {
    statusCode: 400,
    message: `Something wrong with ${fieldName}: ${value}`,
  };
}
