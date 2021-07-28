import { BaseDAO, Database, ITableDef } from "./base";
import { teamScoreMetaId } from "../interfaces/id";

export const TeamScoreMetaTableName = "teamScoreMeta";

interface ITeamScoreMetaDao {
    scoreId?: teamScoreMetaId
    dq: boolean,
    noShow: boolean
}

const definition: ITableDef = {
  name: TeamScoreMetaTableName,
  columns: [
    {name: "dq", type: "INTEGER"},
    {name: "noShow", type: "INTEGER"}
  ]
};

export class TeamScoreMetaDAO extends BaseDAO{
  constructor(db: Database) {
    super(db, definition);
  }

  async create(teamScoreMeta: ITeamScoreMetaDao){
    return this.run(this.createSql, [teamScoreMeta.dq, teamScoreMeta.noShow]);
  }

  async getTeamScoreMetaById(teamScoreMetaId: teamScoreMetaId): Promise<ITeamScoreMetaDao> {
    return this.getById(teamScoreMetaId);
  }
}