import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  jwtSecret: process.env.JWT_ACCESS_SECRET,
  jwtExpiresIn: process.env.JWT_ACCESS_EXPIRATION,
  clientUrl: process.env.CLIENT_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};
