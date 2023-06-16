// import { createHmac } from "node:crypto";

// Asynchronous
const { randomBytes, createHmac } = await import("node:crypto");

export const randomizer = randomBytes(128, (error, buffer) => {
  if (error) {
    console.log("Authentication helper error: ");
    throw error;
  } else {
    const base64String = buffer.toString("base64");
    console.log("buffer to string", base64String);
    return base64String;
  }
});

export const authentication = (salt: string, password: string) => {
  createHmac("sha256", [salt, password].join("/"))
    .update(process.env.AUTHENTICATION_SECRET)
    .digest();
};
