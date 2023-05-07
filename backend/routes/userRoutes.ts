import { Request, Response, Router } from "express";
import User from "../models/UserModel";

const UserRoutes: Router = Router();

UserRoutes.get("/", (req: Request, res: Response) => {
  res.send({ res: "GET all users" });
});

UserRoutes.get("/login", (req: Request, res: Response) => {
  // const newUser = new User({
  //   username: "aloha",
  //   email: "test@123.se",
  //   password: "pwd123",
  // });
  // const userFound = User.findOne({ email: req.body.email });
  // if (userFound) return res.status(400).send({ message: "User already exists."})
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
