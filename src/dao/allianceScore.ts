import { BaseDAO, Database } from "./base";
import { matchId, matchScoreId, allianceScoreId, teamScoreMetaId } from "../interfaces/id"
import { IScoringMethods } from "../interfaces/score";
import { TeamScoreMetaTableName } from "./teamScoreMeta";

export const AllianceScoreTableName = 'allianceScore';

interface IAllianceScoreDao extends IScoringMethods {
    scoreId?: allianceScoreId,
    team1Meta: teamScoreMetaId,
    team2Meta: teamScoreMetaId
}

export class AllianceScoreDAO extends BaseDAO{
    constructor(db: Database) {
        super(db, AllianceScoreTableName);
    }

    async createTable() {
        console.log(`Creating table ${this.table}`)
        const sql = `
        CREATE TABLE IF NOT EXISTS ${this.table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            team1Meta INTEGER,
            team2Meta INTEGER,
            WonAuto INTEGER,
            AwpConditionsMet INTEGER,
            RingsOnNeutralMobileGoalHighBranches INTEGER,
            RingsOnOtherMobileGoalBranches INTEGER,
            RingsOnMobileGoalBases INTEGER,
            MobileGoalsInHomeZone INTEGER,
            ElevatedRobots INTEGER,
            ElevatedMobileGoals INTEGER,
            FOREIGN KEY (Team1Meta) REFERENCES ${TeamScoreMetaTableName}(id),
            FOREIGN KEY (Team2Meta) REFERENCES ${TeamScoreMetaTableName}(id))`
        await this.run(sql);
    }

    async create(allianceScore: IAllianceScoreDao){
        const sql = `
        INSERT INTO ${this.table} (Team1Meta, Team2Meta, WonAuto, AwpConditionsMet,
            RingsOnNeutralMobileGoalHighBranches,
            RingsOnOtherMobileGoalBranches,
            RingsOnMobileGoalBases,
            MobileGoalsInHomeZone,
            ElevatedRobots,
            ElevatedMobileGoals)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

        return this.run(sql, [
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