const sqlite3 = require('sqlite3').verbose();

export class Database {
  db: any;

  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err: Error) => {
      if (err) {
        console.error(err.message);
      }
    });

    this.db.get("PRAGMA foreign_keys = ON");
  }

  async run(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err: Error) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          //@ts-ignore
          resolve(this.lastID);
        }
      })
    })
  }

  async getById(id: number, table: string): Promise<any> {
    const sql = `SELECT * FROM ${table} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.db.get(sql, [id], (err: Error, result: any) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  async getMultiple(sql: string, params = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err: Error, result: any[]) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

export class BaseDAO {
  #db: Database;
  table: string

  constructor(db: Database, table: string) {
    console.log(`Creating database instance for ${table}`)
    this.table = table;
    this.#db = db;
  }

  async drop() {
    const sql = `DROP TABLE IF EXISTS ${this.table}`
    await this.run(sql);
  }

  async run(sql: string, params: any[] = []): Promise<any> {
    return this.#db.run(sql, params);
  }

  async getMultiple(sql: string, params = []): Promise<any[]> {
    return this.#db.getMultiple(sql, params);
  }

  async getById(id: number): Promise<any> {
    return this.#db.getById(id, this.table);
  }

  async list(): Promise<any[]> {
    const sql = `SELECT * from ${this.table}`;
    return this.getMultiple(sql);
  }
}