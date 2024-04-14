import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

sqlite3.verbose();
const DATABASE_FILE = './database.db';


// init database
export const database = await open({
  filename: DATABASE_FILE,
  driver: sqlite3.Database,
});

// const IS_PROD = process.env.NODE_ENV === 'production'

// if(!IS_PROD){
//   const projects = await database.all(`SELECT * FROM projects`)
//   if (projects.length === 0)
//     await database.exec(`
//   -- Insert projects
//   INSERT INTO projects (id, name, participants, currency)
//   VALUES ('pro_123', 'Suka makan', '["francois", "kaille"]', 'IDR')
//   ON CONFLICT (id) DO NOTHING;

//   -- Insert lines
//   INSERT INTO lines (id, created_at, name, amount, currency, paid, project_id, split)
//   VALUES ('lin_2', '2024-01-03T00:00', 'Grab', 133024, 'IDR', 'francois', 'pro_123', '[{"participant": "francois", "amount": 66512}, {"participant": "kaille", "amount": 66512}]')
//   ON CONFLICT (id, project_id) DO NOTHING;

//   INSERT INTO lines (id, created_at, name, amount, currency, paid, project_id, split)
//   VALUES ('lin_3', '2024-01-02T00:12', 'Beers', 429762, 'IDR', 'francois', 'pro_123', '[{"participant": "francois", "amount": 214881}, {"participant": "kaille", "amount": 214881}]')
//   ON CONFLICT (id, project_id) DO NOTHING;

//   INSERT INTO lines (id, created_at, name, amount, currency, paid, project_id, split)
//   VALUES ('lin_4', '2024-01-01T00:43', 'Weekend camille', 170730, 'IDR', 'kaille', 'pro_123', '[{"participant": "francois", "amount": 85365}, {"participant": "kaille", "amount": 85365}]')
//   ON CONFLICT (id, project_id) DO NOTHING;

//   INSERT INTO lines (id, created_at, name, amount, currency, paid, project_id, split)
//   VALUES ('lin_5', '2024-01-01T00:43', 'Weekend camille', 170730, 'IDR', 'kaille', 'pro_123', '[{"participant": "francois", "amount": 85365}, {"participant": "kaille", "amount": 85365}]')
//   ON CONFLICT (id, project_id) DO NOTHING;

//   INSERT INTO lines (id, created_at, name, amount, currency, paid, project_id, split)
//   VALUES ('lin_6', '2024-01-01T00:43', 'Weekend camille', 170730, 'IDR', 'kaille', 'pro_123', '[{"participant": "francois", "amount": 85365}, {"participant": "kaille", "amount": 85365}]')
//   ON CONFLICT (id, project_id) DO NOTHING;

//   INSERT INTO lines (id, created_at, name, amount, currency, paid, project_id, split)
//   VALUES ('lin_7', '2024-01-01T00:43', 'Weekend camille', 170730, 'IDR', 'kaille', 'pro_123', '[{"participant": "francois", "amount": 85365}, {"participant": "kaille", "amount": 85365}]')
//   ON CONFLICT (id, project_id) DO NOTHING;
//   `)
  
// }

export default database