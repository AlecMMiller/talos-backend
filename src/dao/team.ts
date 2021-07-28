import { BaseDAO, Database, ITableDef } from "./base";
import { ITeam } from "../interfaces/team";

export const TeamTableName = 'team';

const definition: ITableDef = {
    name: TeamTableName,
    columns: [
        { name: 'number', type: "INTEGER", constraints: "UNIQUE" },
        { name: 'name', type: 'TEXT' },
        { name: 'tiebreaker', type: 'TEXT', constraints: 'UNIQUE' }
    ]
}

export default class TeamDAO extends BaseDAO {

    constructor(db: Database) {
        super(db, definition);
    }

    async create(team: ITeam) {
        return this.run(this.createSql, [team.number, team.name, team.tiebreaker]);
    }

    async getTeamById(id: number): Promise<ITeam> {
        return this.getById(id);
    }

    async getTeamList(): Promise<ITeam[]> {
        return this.list();
    }
}