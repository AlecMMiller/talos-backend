import { teamId } from "./id";

export interface IMatchResultsSummary {
    WinPoints: number
    AutonmousPoints: number
    StrengthOfSchedule: number
}

export interface IQualificationRanking {
    TeamId: teamId
    AverageWinPoints: number
    AverageAutonomousPoints: number
    AverageStrengthOfSchedule: number
    HighestMatchScore?: number
    SecondHighestMatchScore?: number
    Tiebreaker?: number
    Wins: number
    Losses: number
    Ties: number
}
