import { BaseDAO, Database } from "./base";
import { IField } from "../interfaces/field";
import { FieldPoolTableName } from "./field-pool"; 

export const FieldTableName = 'field';

export class FieldDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, FieldTableName);
    }

    async createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            poolId INTEGER,
            name TEXT,
            FOREIGN KEY (poolID) REFERENCES ${FieldPoolTableName})`
        await this.run(sql);
    }

    async create(field: IField){
        console.log(`Creating entry for team ${field.name}`)
        const sql = `
        INSERT INTO ${this.table} (name, poolId)
        VALUES (?, ?)`

        return this.run(sql, [field.name, field.poolId]);
    }

    async getFieldById(id: number): Promise<IField>{
        return this.getById(id);
    }

    async getFieldList(): Promise<IField[]>{
        return this.list();
    }
}