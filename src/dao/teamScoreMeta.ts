import { BaseDAO, Database } from "./base";
import { teamScoreMetaId } from "../interfaces/id"

export const TeamScoreMetaTableName = 'teamScoreMeta';

interface ITeamScoreMetaDao {
    scoreId?: teamScoreMetaId
    dq: boolean,
    noShow: boolean
}

export class TeamScoreMetaDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, TeamScoreMetaTableName);
    }

    async createTable() {
        console.log(`Creating table ${this.table}`)
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dq INTEGER,
            noShow INTEGER)`
        await this.run(sql);
    }

    async create(teamScoreMeta: ITeamScoreMetaDao){
        const sql = `
        INSERT INTO ${this.table} (dq, noShow)
        VALUES (?, ?)`

        return this.run(sql, [teamScoreMeta.dq, teamScoreMeta.noShow]);
    }

    async getTeamScoreMetaById(teamScoreMetaId: teamScoreMetaId): Promise<ITeamScoreMetaDao> {
        return this.getById(teamScoreMetaId);
    }
}