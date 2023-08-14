import { Router } from "express";

import authController from "../controllers/authController";
import usersController from "../controllers/usersController";
import limiter from "../middleware/limiter";

import { verifyToken } from "../middleware/verifyToken";

const UserRoutes: Router = Router();

UserRoutes.post("/auth/login", limiter.apiLimiter, authController.login);

UserRoutes.post(
  "/auth/signup",
  limiter.createAccountLimiter,
  authController.signup
);

UserRoutes.patch("/user/:id", verifyToken, usersController.patchUser);

UserRoutes.delete("/user/:id", verifyToken, usersController.deleteUser);

UserRoutes.get("/user/users", verifyToken, usersController.getAllUsers);

UserRoutes.get("/user/:id", verifyToken, usersController.getUserById);

export default UserRoutes;
