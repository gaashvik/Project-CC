import { createClient, Client } from "@libsql/client";
import { readFileSync } from "fs";
import { loadEnvConfig } from '@next/env';
import {event,trigger} from "./sql_scripts/create"

loadEnvConfig(process.cwd());

let db: Client | null = null;

export const getDatabase = () => {
  if (!db) {
    db = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
  }
  return db;
};

export async function initializeDatabase() {
  const db = getDatabase();

  try {
    await db.execute(event);
    await db.execute(trigger);
    console.log("Database initialized successfully");
  } catch (err) {
    console.error("DB initialization failed:", err);
    throw err;
  }
}

// Helper function to close the connection when needed
export async function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
