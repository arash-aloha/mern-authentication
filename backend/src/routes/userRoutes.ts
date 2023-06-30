import { Request, Response, Router } from "express";
import { signupController } from "../controllers/controller.signup";
import { loginController } from "../controllers/controller.login";
import { patchController } from "../controllers/controller.patch";
import { deleteController } from "../controllers/controller.delete";

const UserRoutes: Router = Router();

UserRoutes.post("/login", loginController);

UserRoutes.post("/signup", signupController);

UserRoutes.patch("/:id", patchController);

UserRoutes.delete("/:id", deleteController);

UserRoutes.get("/", (req: Request, res: Response) => {
  res.send({ res: "GET all users" });
});

UserRoutes.get("/:id", (req: Request, res: Response) => {
  res.send({ res: "Get single user" });
});

export default UserRoutes;
