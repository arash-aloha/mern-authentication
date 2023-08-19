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

UserRoutes.post("/auth/logout", authController.logout);

UserRoutes.patch("/users/:id", verifyToken, usersController.patchUser);

UserRoutes.delete("/users/:id", verifyToken, usersController.deleteUser);

UserRoutes.get("/users/all", verifyToken, usersController.getAllUsers);

UserRoutes.get("/users/:id", verifyToken, usersController.getUserById);

export default UserRoutes;
