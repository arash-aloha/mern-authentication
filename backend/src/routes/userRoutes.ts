import { Router } from "express";
import { signupController } from "../controllers/controller.signup";
import { loginController } from "../controllers/controller.login";
import { patchController } from "../controllers/controller.patch";
import { deleteController } from "../controllers/controller.delete";
import { getUserByIdController } from "../controllers/controller.getUserById";
import { getAllUsersController } from "../controllers/controller.getAllUsers";

const UserRoutes: Router = Router();

UserRoutes.post("/login", loginController);

UserRoutes.post("/signup", signupController);

UserRoutes.patch("/:id", patchController);

UserRoutes.delete("/:id", deleteController);

UserRoutes.get("/", getAllUsersController);

UserRoutes.get("/:id", getUserByIdController);

export default UserRoutes;
