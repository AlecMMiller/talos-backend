import { teamId } from "../interfaces/id";
import { IMatchResultsSummary } from "../interfaces/rankings";
import { IAllianceScore, IMatchScore, IAllianceMeta, ITeamMeta } from "../interfaces/score";
import { calculateScore } from "./score";

function checkTeamMeta(teamMeta: ITeamMeta, teamId: teamId): number{
  if(teamMeta.teamId == teamId){
    if(teamMeta.noShow || teamMeta.dq){
      return -1;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

function checkAllianceMeta(allianceMeta: IAllianceMeta, teamId: teamId){
  const match1 = checkTeamMeta(allianceMeta.Team1Meta, teamId);
  if(match1 != 0){
    return match1;
  }
  return checkTeamMeta(allianceMeta.Team2Meta, teamId);
}

function getNormalized(results: IMatchScore, teamId: teamId): {teamAlliance: IAllianceScore, opponentAlliance: IAllianceScore}|null {
  const RedMeta = results.RedAlliance.AllianceMeta;

  const matchRed = checkAllianceMeta(RedMeta, teamId);
  if(matchRed != 0){
    if(matchRed == 1){
      return {"teamAlliance": results.RedAlliance, "opponentAlliance": results.BlueAlliance};
    } else {
      return null;
    }
  }

  const BlueMeta= results.BlueAlliance.AllianceMeta;
  const matchBlue = checkAllianceMeta(BlueMeta, teamId);
  if(matchBlue != 0){
    if(matchBlue == 1){
      return {"teamAlliance": results.BlueAlliance, "opponentAlliance": results.RedAlliance};
    } else {
      return null;
    }
  }

  throw new Error(`Match ${results.MatchId} has no match for team ID ${teamId}`);
}

export function getMatchSummary(results: IMatchScore, teamId: teamId): IMatchResultsSummary {
  const normalizedTeams = getNormalized(results, teamId);

  if(normalizedTeams == null) {
    return {AutonmousPoints: 0, WinPoints: 0, StrengthOfSchedule: 0};
  }

  const teamAlliance = normalizedTeams.teamAlliance;
  const opponentAlliance = normalizedTeams.opponentAlliance;

  const teamScore = calculateScore(teamAlliance);
  const opponentScore = calculateScore(opponentAlliance);

    
  const matchResults: IMatchResultsSummary = {
    WinPoints: 0,
    AutonmousPoints: teamAlliance.WonAuto * 20,
    StrengthOfSchedule: 0
  };

  if(teamAlliance.AwpConditionsMet){
    matchResults.WinPoints = 1;
  }

  if(teamScore == opponentScore){
    matchResults.WinPoints += 1;
    matchResults.StrengthOfSchedule = opponentScore;
  } else if(teamScore > opponentScore){
    matchResults.WinPoints += 2;
    matchResults.StrengthOfSchedule = opponentScore;
  } else {
    matchResults.StrengthOfSchedule = teamScore;
  }

  return matchResults;
}
