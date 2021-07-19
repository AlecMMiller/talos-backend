import { BaseDAO, Database } from "./base";
import { IField } from "../interfaces/field";
import { IFieldPool } from "../interfaces/field-pool";
import { fieldPoolId } from "../interfaces/id";

export const FieldPoolTableName = 'fieldPool';

export class FieldPoolDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, FieldPoolTableName);
    }

    async createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT)`

        await this.run(sql);
    }

    async create(pool: IFieldPool): Promise<fieldPoolId>{
        console.log(`Creating entry for field pool ${pool.name}`)
        const sql = `
        INSERT INTO ${this.table} (name)
        VALUES (?)`

        return this.run(sql, [pool.name]);
    }

    async getPoolById(id: number): Promise<IFieldPool>{
        return this.getById(id);
    }

    async getPoolList(): Promise<IFieldPool[]>{
        return this.list();
    }
}