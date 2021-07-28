import { BaseDAO, Database } from "./base";
import { matchId, allianceId } from "../interfaces/id"
import { AllianceTableName } from "./alliance";
import { ITableDef } from "./base";

export const MatchTableName = 'match';

interface IMatchDao {
    matchId?: matchId
    redAlliance: allianceId
    blueAlliance: allianceId
}

const definition: ITableDef = {
    name: MatchTableName,
    columns: [
        { name: "redAlliance", type: "INTEGER", fk: AllianceTableName },
        { name: "blueAlliance", type: "INTEGER", fk: AllianceTableName}
    ]
}

export default class MatchDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, definition);
    }

    async create(match: IMatchDao){
        return this.run(this.createSql, [match.redAlliance, match.blueAlliance]);
    }

    async getMatchById(matchId: matchId): Promise<IMatchDao> {
        return this.getById(matchId);
    }
}