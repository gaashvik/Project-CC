import Database from "better-sqlite3"
import { error } from "console";
import { readFileSync } from "fs"
import path from 'path';

let db:Database.Database | null = null;

export function getDataBase(){
    if (!db){
        db = new Database(path.join(process.cwd(),'database/sqlite/sqlite.db'),{ verbose: console.log });
        db.pragma('journal_mode=WAL');
    }
    return db;
}

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