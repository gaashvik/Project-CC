import {initializeDataBase} from "../db";
import path from 'path';

const sqlPath = path.join(process.cwd(),'database/sql_scripts/create.sql');

try{
initializeDataBase(sqlPath)
}
catch(err){
    console.error("DB initialization failed:",err);
    process.exit(1);
}