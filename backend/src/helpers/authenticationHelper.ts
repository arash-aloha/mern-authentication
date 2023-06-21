import { randomBytes, pbkdf2Sync } from "node:crypto";

export async function generateSalt(): Promise<string> {
  return randomBytes(128).toString("hex");
}

export async function hashPassword(salt: string, password: string) {
  return pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export async function validatePassword(password, salt) {
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash;
}
