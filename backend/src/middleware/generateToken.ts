import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });

const config = process.env;

export function generateAccessToken(username: string) {
  return jwt.sign({ username }, config.ACCESS_TOKEN, { expiresIn: "1h" });
}
