import { Request, Response } from "express";
import { validateBody } from "../helpers/helper.validateRequestBody";
import { loginService } from "../services/service.login";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Determine the field (username | email on the FE) used for login
    const loginField = username ? "username" : "email";
    const loginValue = username ? username : email;

    if (!username && !email) {
      return res.status(400).json({
        message: "Please provide either username or email for login.",
      });
    }
    const validationError = validateBody({
      [loginField]: loginValue,
      password,
    });

    if (validationError) {
      console.log("Something went wrong when validating request body.");
      return res
        .status(validationError.statusCode)
        .json({ message: validationError.message });
    }

    // log in
    const user = await loginService(email, password);
    return user
      ? res.status(user.statusCode).json({ message: user.message })
      : res.status(user.statusCode).json({ message: user.message });
  } catch (error) {
    console.log("ERROR in Login controller", error);
  }
};
