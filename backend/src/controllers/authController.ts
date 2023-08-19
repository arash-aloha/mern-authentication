import { Request, Response } from "express";
import {
  idTypeUsernameOrEmail,
  idValueUsernameOrEmail,
  validateRequestBodyForLogin,
} from "../helpers/validateRequestBody";
import authService from "../services/authService";
import { getUserByEmail } from "../helpers/serviceUtils";
import { validateRequestBody } from "../helpers/validateRequestBody";
import Logging from "../logger/log";

/*************
  @desc: login user
  @route /auth/login
  @access public
**************/

const login = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(400).json({
        message: "Please provide either username or email for login.",
      });
    }

    // Determine the field (username | email on the FE) used for login
    const userIdType = idTypeUsernameOrEmail(username);
    const userIdValue = idValueUsernameOrEmail(username, email);

    const validationError = validateRequestBodyForLogin({
      userIdType,
      password,
    });

    if (validationError) {
      console.error("Something went wrong when validating request body.");
      return res
        .status(validationError.statusCode)
        .json({ message: validationError.message });
    }

    // log in
    const user = await authService.login(userIdValue, password);
    return user
      ? res
          .status(user.statusCode)
          .cookie("playtoken", user.sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
          })
          .json({ message: user.message, data: user.data })
      : res.status(404).json({ message: user.message });
  } catch (error) {
    Logging.error("error in login controller: ");
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export interface ResponseObject {
  data: UserObject | null;
  message: string;
  statusCode: number;
}

export interface UserObject {
  user: {
    firstName: string;
    email: string;
    authentication: {
      sessionToken: string;
    };
  };
}

/*************
  @desc: create a new user
  @route /auth/signup
  @access public
**************/

const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;
    // validatebody function needs to be refactored
    const validationError = validateRequestBody({
      email,
      password,
      firstName,
      lastName,
      username,
    });

    if (validationError) {
      return res
        .status(validationError.statusCode)
        .json({ message: validationError.message });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const newUser = await authService.signup({
      email,
      firstName,
      lastName,
      username,
      password,
    });

    return newUser
      ? res.json({ message: newUser.message }).status(newUser.statusCode)
      : res.status(400).json({ message: newUser.message });
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/************** 
@desc Logout
@route POST /auth/logout
@access Public - just to clear cookie if exists
***************/
const logout = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.playtoken) return res.sendStatus(204); //No content
  res.clearCookie("playtoken", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
  res.json({ message: "Cookie cleared" });
};

export default { login, signup, logout };
