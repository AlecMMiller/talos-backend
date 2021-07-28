const sqlite3 = require("sqlite3");
//import sqlite3 = require("sqlite3")

interface IColumnDef {
  name: string
  type: string
  constraints?: string
  fk?: string
}

export interface ITableDef {
  name: string
  columns: IColumnDef[]
}

function generateCreate(definition: ITableDef): string {
  let sql = `INSERT INTO ${definition.name} (`;
  definition.columns.forEach(column => {
    sql += `${column.name}, `;
  });
  sql = sql.slice(0, -2);
  const questionMarks = "?, ".repeat(definition.columns.length).slice(0, -2);
  sql += `)\nVALUES (${questionMarks})`;
  return sql;
}

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
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          //@ts-ignore
          resolve(this.lastID);
        }
      });
    });
  }

  async getById(id: number, table: string): Promise<any> {
    const sql = `SELECT * FROM ${table} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.db.get(sql, [id], (err: Error, result: any) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getMultiple(sql: string, params = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err: Error, result: any[]) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

export class BaseDAO {
  #db: Database;
  table: string;
  #definition: ITableDef;
  createSql: string;

  constructor(db: Database, definition: any) {
    console.log(`Creating database instance for ${definition.name}`);
    this.table = definition.name;
    this.#definition = definition;
    this.#db = db;
    this.createSql = generateCreate(definition);
  }

  async createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS ${this.table} (\n\tid INTEGER PRIMARY KEY AUTOINCREMENT,\n`;
    this.#definition.columns.forEach(column => {
      sql += `\t${column.name} ${column.type}`;
      if (column.constraints) {
        sql += ` ${column.constraints}`;
      }
      sql += ",\n";
    });

    this.#definition.columns.forEach(column => {
      if (column.fk) {
        sql += `\tFOREIGN KEY (${column.name}) REFERENCES ${column.fk}(id),\n`;
      }
    });
    sql = sql.slice(0, -2);
    sql += "\n)";

    await this.run(sql);
  }

  async drop() {
    const sql = `DROP TABLE IF EXISTS ${this.table}`;
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