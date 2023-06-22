import { randomBytes, pbkdf2Sync } from "node:crypto";

export async function setPassword(password: string): Promise<{
  salt: string;
  hashedPassword: string;
}> {
  const salt = randomBytes(128).toString("hex");
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

  return {
    salt: salt,
    hashedPassword: hash,
  };
}

export async function validatePassword(password: string, salt: string) {
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash;
}
