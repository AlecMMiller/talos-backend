import { BaseDAO, Database, ITableDef } from "./base";
import { IAlliance } from "../interfaces/match";
import { TeamTableName } from "./team";
import { allianceId } from "../interfaces/id";

export const AllianceTableName = 'alliance'

const definition: ITableDef = {
    name: AllianceTableName,
    columns: [
        { name: 'team1', type: "INTEGER", fk: TeamTableName },
        { name: 'team2', type: "INTEGER", fk: TeamTableName }
    ]
}

export default class AllianceDAO extends BaseDAO {
    constructor(db: Database) {
        super(db, definition);
    }

    async create(alliance: IAlliance): Promise<allianceId> {
        return this.run(this.createSql, [alliance.team1, alliance.team2]);
    }

    async getAllianceById(allianceId: allianceId): Promise<IAlliance> {
        return this.getById(allianceId);
    }
}