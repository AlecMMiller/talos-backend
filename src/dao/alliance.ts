import { BaseDAO, Database } from "./base";
import { IAlliance } from "../interfaces/match";
import { TeamTableName } from "./team";
import { allianceId } from "../interfaces/id";

export const AllianceTableName = 'alliance'

export default class AllianceDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, AllianceTableName);
    }

    async createTable() {
        console.log(`Creating table ${this.table}`)
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            team1 INTEGER,
            team2 INTEGER,
            FOREIGN KEY (team1) REFERENCES ${TeamTableName}(id),
            FOREIGN KEY (team2) REFERENCES ${TeamTableName}(id))`
        await this.run(sql);
    }

    async create(alliance: IAlliance): Promise<allianceId>{
        const sql = `
        INSERT INTO ${this.table} (team1, team2)
        VALUES (?, ?)`

        return this.run(sql, [alliance.team1, alliance.team2]);
    }

    async getAllianceById(allianceId: allianceId): Promise<IAlliance>{
        return this.getById(allianceId);
    }
}