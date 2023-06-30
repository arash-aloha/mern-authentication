import { Request, Response, Router } from "express";
import { signupController } from "../controllers/controller.signup";
import { loginController } from "../controllers/controller.login";
import { patchController } from "../controllers/controller.patch";

const UserRoutes: Router = Router();

UserRoutes.post("/login", loginController);

UserRoutes.post("/signup", signupController);

UserRoutes.patch("/:id", patchController);

UserRoutes.get("/", (req: Request, res: Response) => {
  res.send({ res: "GET all users" });
});

UserRoutes.get("/:id", (req: Request, res: Response) => {
  res.send({ res: "Get single user" });
});

UserRoutes.delete("/:id", (req: Request, res: Response) => {
  res.send({ res: "Delete user" });
});

export default UserRoutes;
