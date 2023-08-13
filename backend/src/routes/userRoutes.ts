import { Router } from "express";
import { signupController } from "../controllers/signup";
import { loginController } from "../controllers/login";
import { patchController } from "../controllers/patch";
import { deleteController } from "../controllers/delete";
import { getUserByIdController } from "../controllers/getUserById";
import { getAllUsersController } from "../controllers/getAllUsers";

import limiter from "../middleware/limiter";
import { verifyToken } from "../middleware/verifyToken";

const UserRoutes: Router = Router();

UserRoutes.post("/login", limiter.apiLimiter, loginController);

UserRoutes.post("/signup", limiter.createAccountLimiter, signupController);

UserRoutes.patch("/:id", verifyToken, patchController);

UserRoutes.delete("/:id", verifyToken, deleteController);

UserRoutes.get("/", verifyToken, getAllUsersController);

UserRoutes.get("/:id", verifyToken, getUserByIdController);

export default UserRoutes;
