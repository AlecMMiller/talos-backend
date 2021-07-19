import { BaseDAO, Database } from "./base";
import { matchId, allianceId } from "../interfaces/id"
import { AllianceTableName } from "./alliance";

export const MatchTableName = 'match';

interface IMatchDao {
    matchId?: matchId
    redAlliance: allianceId
    blueAlliance: allianceId
}

export default class MatchDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, MatchTableName);
    }

    async createTable() {
        console.log(`Creating table ${this.table}`)
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            redAlliance INTEGER,
            blueAlliance INTEGER,
            FOREIGN KEY (redAlliance) REFERENCES ${AllianceTableName}(id),
            FOREIGN KEY (blueAlliance) REFERENCES ${AllianceTableName}(id))`
        await this.run(sql);
    }

    async create(match: IMatchDao){
        const sql = `
        INSERT INTO ${this.table} (redAlliance, blueAlliance)
        VALUES (?, ?)`

        return this.run(sql, [match.redAlliance, match.blueAlliance]);
    }

    async getMatchById(matchId: matchId): Promise<IMatchDao> {
        return this.getById(matchId);
    }
}