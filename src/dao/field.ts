import { BaseDAO, Database, ITableDef } from "./base";
import { IField } from "../interfaces/field";
import { FieldPoolTableName } from "./field-pool"; 

export const FieldTableName = 'field';

const definition: ITableDef = {
    name: FieldTableName,
    columns: [
        {name: "poolId", type: "INTEGER", fk: FieldPoolTableName},
        {name: "name", type: "TEXT"}
    ]
}

export class FieldDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, definition);
    }

    async create(field: IField){
        return this.run(this.createSql, [field.poolId, field.name]);
    }

    async getFieldById(id: number): Promise<IField>{
        return this.getById(id);
    }

    async getFieldList(): Promise<IField[]>{
        return this.list();
    }
}