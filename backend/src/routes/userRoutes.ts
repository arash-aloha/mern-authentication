import { Request, Response, Router } from "express";
import { signupNewUser } from "../controllers/authentication";

const UserRoutes: Router = Router();

UserRoutes.post("/login");

UserRoutes.post("/signup", signupNewUser);

UserRoutes.get("/", (req: Request, res: Response) => {
  res.send({ res: "GET all users" });
});

UserRoutes.get("/:id", (req: Request, res: Response) => {
  res.send({ res: "Get single user" });
});

UserRoutes.post("/", (req: Request, res: Response) => {
  res.send({ res: "Add a new user" });
});

UserRoutes.patch("/:id", (req: Request, res: Response) => {
  res.send({ res: "Change user detail" });
});

UserRoutes.delete("/:id", (req: Request, res: Response) => {
  res.send({ res: "Delete user" });
});

export default UserRoutes;
