import { BaseDAO, Database } from "./base";
import { matchId, matchScoreId, allianceScoreId } from "../interfaces/id"
import { MatchTableName } from "./match";
import { AllianceScoreTableName } from "./allianceScore";

export const MatchScoreTableName = 'matchScore';

interface IMatchScoreDao {
    scoreId?: matchScoreId
    matchId: matchId
    scoredAt: Date
    redAlliance: allianceScoreId
    blueAlliance: allianceScoreId
}

export class MatchScoreDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, MatchScoreTableName);
    }

    async createTable() {
        console.log(`Creating table ${this.table}`)
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            matchId INTEGER,
            scoredAt INTEGER,
            redAlliance INTEGER,
            blueAlliance INTEGER,
            FOREIGN KEY (matchId) REFERENCES ${MatchTableName}(id)
            FOREIGN KEY (redAlliance) REFERENCES ${AllianceScoreTableName}(id),
            FOREIGN KEY (blueAlliance) REFERENCES ${AllianceScoreTableName}(id))`
        await this.run(sql);
    }

    async create(matchScore: IMatchScoreDao){
        const sql = `
        INSERT INTO ${this.table} (matchId, scoredAt, redAlliance, blueAlliance)
        VALUES (?, ?, ?, ?)`

        return this.run(sql, [matchScore.matchId, matchScore.scoredAt, matchScore.redAlliance, matchScore.blueAlliance]);
    }

    async getMatchScoreById(matchId: matchId): Promise<IMatchScoreDao> {
        return this.getById(matchId);
    }
}