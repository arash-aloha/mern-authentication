import { Router } from "express";
import { signupController } from "../controllers/signup";
import { loginController } from "../controllers/login";
import { patchController } from "../controllers/patch";
import { deleteController } from "../controllers/delete";
import { getUserByIdController } from "../controllers/getUserById";
import { getAllUsersController } from "../controllers/getAllUsers";

const UserRoutes: Router = Router();

UserRoutes.post("/login", loginController);

UserRoutes.post("/signup", signupController);

UserRoutes.patch("/:id", patchController);

UserRoutes.delete("/:id", deleteController);

UserRoutes.get("/", getAllUsersController);

UserRoutes.get("/:id", getUserByIdController);

export default UserRoutes;
