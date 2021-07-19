import { matchId, allianceId, teamId } from "./id";

export interface IAlliance{
    allianceId?: allianceId
    team1: teamId
    team2: teamId
}

export interface IMatch{
    MatchId?: matchId
    RedAlliance: IAlliance
    BlueAlliance: IAlliance
}
