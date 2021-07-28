import { teamId, matchId } from "./id";

export interface ITeamMeta {
    teamId?: teamId
    dq: boolean
    noShow: boolean
}

export interface IAllianceMeta {
    Team1Meta: ITeamMeta
    Team2Meta: ITeamMeta
}

export interface IPointValues {
    RingsOnNeutralMobileGoalHighBranches: number
    RingsOnOtherMobileGoalBranches: number
    RingsOnMobileGoalBases: number
    MobileGoalsInHomeZone: number
    ElevatedRobots: number
    ElevatedMobileGoals: number
    WonAuto: number
}

export interface IAllianceScore extends IScoringMethods {
    AllianceMeta: IAllianceMeta
}

export interface IScoringMethods {
    RingsOnNeutralMobileGoalHighBranches: number
    RingsOnOtherMobileGoalBranches: number
    RingsOnMobileGoalBases: number
    MobileGoalsInHomeZone: number
    ElevatedRobots: number
    ElevatedMobileGoals: number
    AwpConditionsMet: boolean
    WonAuto: number
}

export interface IMatchScore {
    MatchId: matchId
    RedAlliance: IAllianceScore
    BlueAlliance: IAllianceScore
}
