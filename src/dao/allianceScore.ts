import { BaseDAO, Database, ITableDef } from "./base";
import { matchId, matchScoreId, allianceScoreId, teamScoreMetaId } from "../interfaces/id"
import { IScoringMethods } from "../interfaces/score";
import { TeamScoreMetaTableName } from "./teamScoreMeta";

export const AllianceScoreTableName = 'allianceScore';

interface IAllianceScoreDao extends IScoringMethods {
    scoreId?: allianceScoreId,
    team1Meta: teamScoreMetaId,
    team2Meta: teamScoreMetaId
}

const ringsOn = "RingsOn"
const neutral = "Neutral"
const goal = "Goal"
const mobileGoal = "Mobile" + goal
const otherGoal = "Other" + goal
const branches = "Branches"
const highBranches = "High" + branches
const neutralMobileGoals = neutral + mobileGoal
const bases = "Bases"
const inHomeZone = "InHomeZone"
const elevated = "Elevated"
const robots = "Robots"

const definition: ITableDef = {
    name: AllianceScoreTableName,
    columns: [
        {name: "team1Meta", type: "INTEGER", fk: TeamScoreMetaTableName},
        {name: "team2Meta", type: "INTEGER", fk: TeamScoreMetaTableName},
        {name: "wonAuto", type: "INTEGER"},
        {name: "awpConditionsMet", type: "INTEGER"},
        {name: ringsOn + neutralMobileGoals + highBranches, type: "INTEGER"},
        {name: ringsOn + neutralMobileGoals + branches, type: "INTEGER"},
        {name: ringsOn + otherGoal + branches, type: "INTEGER"},
        {name: ringsOn + mobileGoal + bases, type: "INTEGER"},
        {name: mobileGoal + inHomeZone, type: "INTEGER"},
        {name: elevated + robots, type: "INTEGER"},
        {name: elevated + mobileGoal, type: "INTEGER"}
    ]
}

export class AllianceScoreDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, definition);
    }

    async create(allianceScore: IAllianceScoreDao){
        return this.run(this.createSql, [
            allianceScore.team1Meta,
            allianceScore.team2Meta,
            allianceScore.WonAuto,
            allianceScore.AwpConditionsMet,
            allianceScore.RingsOnNeutralMobileGoalHighBranches,
            allianceScore.RingsOnOtherMobileGoalBranches,
            allianceScore.RingsOnMobileGoalBases,
            allianceScore.MobileGoalsInHomeZone,
            allianceScore.ElevatedRobots,
            allianceScore.ElevatedMobileGoals
        ]);
    }

    async getAllianceScoreById(matchId: matchId): Promise<IAllianceScoreDao> {
        return this.getById(matchId);
    }
}