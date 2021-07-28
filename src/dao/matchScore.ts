import { BaseDAO, Database } from "./base";
import { matchId, matchScoreId, allianceScoreId } from "../interfaces/id";
import { MatchTableName } from "./match";
import { AllianceScoreTableName } from "./allianceScore";
import { ITableDef } from "./base";

export const MatchScoreTableName = "matchScore";

interface IMatchScoreDao {
    scoreId?: matchScoreId
    matchId: matchId
    scoredAt: Date
    redAlliance: allianceScoreId
    blueAlliance: allianceScoreId
}

const definition: ITableDef = {
  name: MatchScoreTableName,
  columns: [
    {name: "matchId", type: "INTEGER", fk: MatchTableName},
    {name: "scoredAt", type: "INTEGER"},
    {name: "redAlliance", type: "INTEGER", fk: AllianceScoreTableName},
    {name: "blueAlliance", type: "INTEGER", fk: AllianceScoreTableName}
  ]
};

export class MatchScoreDAO extends BaseDAO{
  constructor(db: Database) {
    super(db, definition);
  }

  async create(matchScore: IMatchScoreDao){
    return this.run(this.createSql, [matchScore.matchId, matchScore.scoredAt, matchScore.redAlliance, matchScore.blueAlliance]);
  }

  async getMatchScoreById(matchId: matchId): Promise<IMatchScoreDao> {
    return this.getById(matchId);
  }
}