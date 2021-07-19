import { IAllianceScore } from "../interfaces/score";
import { pointValues } from "../constants/points"

export function calculateScore(results: IAllianceScore) {
    let score = results.RingsOnNeutralMobileGoalHighBranches * pointValues.RingsOnNeutralMobileGoalHighBranches +
    results.RingsOnOtherMobileGoalBranches * pointValues.RingsOnOtherMobileGoalBranches +
    results.RingsOnMobileGoalBases * pointValues.RingsOnMobileGoalBases +
    results.MobileGoalsInHomeZone * pointValues.MobileGoalsInHomeZone +
    results.ElevatedRobots * pointValues.ElevatedRobots +
    results.ElevatedMobileGoals * pointValues.ElevatedMobileGoals +
    results.WonAuto * pointValues.WonAuto;

    return score;
}
