import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

sqlite3.verbose();
const DATABASE_FILE = './database.db';


// init database
export const database = await open({
  filename: DATABASE_FILE,
  driver: sqlite3.Database,
});
 
// database.exec()

export default database