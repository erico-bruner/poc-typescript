import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
};

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

console.log("Database connection successful!");

export const db = new Pool(configDatabase);
