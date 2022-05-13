import * as dotenv from "dotenv";
import * as env from "env-var";

dotenv.config({ path: ".env" });

export const config = {
  server: {
    port: env.get("NODE_PORT").required().asIntPositive(),
  },
  mongodb: {
    dbURI: env.get("DB_CONN_STRING").required().asString(),
  },
  jwt: {
    secretKey: env.get("JWT_SECRET").required().asString(),
    expiration: env.get("JWT_EXPIRATION").required().asIntPositive(),
  },
  smtp: {
    host: env.get("SMTP_HOST").required().asString(),
    port: env.get("SMTP_PORT").required().asPortNumber(),
    user: env.get("SMTP_USER").required().asString(),
    password: env.get("SMTP_PASSWORD").required().asString(),
  },
};
