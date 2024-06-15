import pg from "pg";
import env from "dotenv";
//
env.config();
export const db = new pg.Client({
  user: process.env.SESSION_USER,
  host: process.env.SESSION_HOST,
  database: process.env.SESSION_DB,
  password: process.env.SESSION_PASS,
  port: process.env.SESSION_PORT
});
db.connect();


