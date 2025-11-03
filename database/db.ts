import Database from "better-sqlite3"
import { error } from "console";
import { readFileSync } from "fs"
import path from 'path';

let db:Database.Database | null = null;

export const getDataBase = () => {
  if (!db) {
    const dbPath = path.join(process.cwd(), "database", "sqlite.db");
    db = new Database(dbPath);
  }
  return db;
};
export function initializeDataBase(sqlScriptPath: string){
    const db = getDataBase();


    try{
        const sqlScript = readFileSync(sqlScriptPath,'utf-8');
        db.exec(sqlScript);
        console.log('Database initialized successfully');
    }
    catch(err){
        console.log("DB intialization failed:",err);
        throw error;
    }
}