import { BaseDAO, Database } from "./base";
import { ITeam } from "../interfaces/team";

export const TeamTableName = 'team';

export default class TeamDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, TeamTableName);
    }

    async createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            number TEXT UNIQUE,
            name TEXT,
            tiebreaker TEXT UNIQUE)`

        await this.run(sql);
    }

    async create(team: ITeam){
        console.log(`Creating entry for team ${team.number}`)
        const sql = `
        INSERT INTO ${this.table} (number, name, tiebreaker)
        VALUES (?, ?, ?)`

        return this.run(sql, [team.number, team.name, team.tiebreaker]);
    }

    async getTeamById(id: number): Promise<ITeam>{
        return this.getById(id);
    }

    async getTeamList(): Promise<ITeam[]>{
        return this.list();
    }
}