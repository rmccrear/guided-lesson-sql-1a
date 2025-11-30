import { DB_SEED_SQL } from '../constants';
import { SqlResult } from '../types';

let db: any = null;

export const initDatabase = async (): Promise<boolean> => {
  try {
    if (typeof window.initSqlJs !== 'function') {
      console.error("SQL.js not loaded");
      return false;
    }

    const SQL = await window.initSqlJs({
      locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });

    db = new SQL.Database();
    db.run(DB_SEED_SQL);
    return true;
  } catch (e) {
    console.error("Failed to initialize database", e);
    return false;
  }
};

export const executeQuery = (query: string): SqlResult => {
  if (!db) {
    return { columns: [], values: [], error: "Database not initialized" };
  }

  try {
    const res = db.exec(query);
    if (!res || res.length === 0) {
      return { columns: [], values: [] }; // Successful execution but no rows returned (e.g. UPDATE)
    }
    return {
      columns: res[0].columns,
      values: res[0].values,
    };
  } catch (err: any) {
    return {
      columns: [],
      values: [],
      error: err.message,
    };
  }
};

export const resetDatabase = () => {
    if(db) {
        db.close();
    }
    return initDatabase();
}
