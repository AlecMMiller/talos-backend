import { BaseDAO, Database, ITableDef } from "./base";
import { IField } from "../interfaces/field";
import { IFieldPool } from "../interfaces/field-pool";
import { fieldPoolId } from "../interfaces/id";

export const FieldPoolTableName = 'fieldPool';

const definition: ITableDef = {
    name: FieldPoolTableName,
    columns: [
        {name: "name", type: "TEXT"}
    ]
}

export class FieldPoolDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, definition);
    }

    async create(pool: IFieldPool): Promise<fieldPoolId>{
        return this.run(this.createSql, [pool.name]);
    }

    async getPoolById(id: number): Promise<IFieldPool>{
        return this.getById(id);
    }

    async getPoolList(): Promise<IFieldPool[]>{
        return this.list();
    }
}