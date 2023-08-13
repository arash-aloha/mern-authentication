import rateLimit from "express-rate-limit";

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
  message:
    "Too many accounts created from this IP, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 'window'
  message: "Too many requests from your IP. Wait 1 hour.",
  standardHeaders: true,
  legacyHeaders: false,
  // store: ... , // Use an external store for more precise rate limiting
});

export default { createAccountLimiter, apiLimiter };
