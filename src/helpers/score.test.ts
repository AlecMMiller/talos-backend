import { calculateScore } from "./score";
import { IAllianceScore, IAllianceMeta } from "../interfaces/score";

describe("Scoring function", () => {
  test("It should calculate scores correctly", () => {

    const DummyMeta: IAllianceMeta = {
      Team1Meta:
      {
        teamId: 1,
        dq: false,
        noShow: false
      },
      Team2Meta:
      {
        teamId: 1,
        dq: false,
        noShow: false
      }
    };

    let score: IAllianceScore;

    score = {
      RingsOnNeutralMobileGoalHighBranches: 0,
      RingsOnOtherMobileGoalBranches: 0,
      RingsOnMobileGoalBases: 0,
      MobileGoalsInHomeZone: 0,
      ElevatedRobots: 0,
      ElevatedMobileGoals: 0,
      AwpConditionsMet: false,
      WonAuto: 0,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(0);

    score = {
      RingsOnNeutralMobileGoalHighBranches: 1,
      RingsOnOtherMobileGoalBranches: 0,
      RingsOnMobileGoalBases: 0,
      MobileGoalsInHomeZone: 0,
      ElevatedRobots: 0,
      ElevatedMobileGoals: 0,
      AwpConditionsMet: false,
      WonAuto: 0,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(10);

    score = {
      RingsOnNeutralMobileGoalHighBranches: 0,
      RingsOnOtherMobileGoalBranches: 1,
      RingsOnMobileGoalBases: 0,
      MobileGoalsInHomeZone: 0,
      ElevatedRobots: 0,
      ElevatedMobileGoals: 0,
      AwpConditionsMet: false,
      WonAuto: 0,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(3);

    score = {
      RingsOnNeutralMobileGoalHighBranches: 0,
      RingsOnOtherMobileGoalBranches: 0,
      RingsOnMobileGoalBases: 1,
      MobileGoalsInHomeZone: 0,
      ElevatedRobots: 0,
      ElevatedMobileGoals: 0,
      AwpConditionsMet: false,
      WonAuto: 0,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(1);

    score = {
      RingsOnNeutralMobileGoalHighBranches: 0,
      RingsOnOtherMobileGoalBranches: 0,
      RingsOnMobileGoalBases: 0,
      MobileGoalsInHomeZone: 0,
      ElevatedRobots: 0,
      ElevatedMobileGoals: 0,
      AwpConditionsMet: false,
      WonAuto: 1,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(20);

    score = {
      RingsOnNeutralMobileGoalHighBranches: 0,
      RingsOnOtherMobileGoalBranches: 0,
      RingsOnMobileGoalBases: 0,
      MobileGoalsInHomeZone: 0,
      ElevatedRobots: 1,
      ElevatedMobileGoals: 0,
      AwpConditionsMet: false,
      WonAuto: 0,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(30);

    score = {
      RingsOnNeutralMobileGoalHighBranches: 0,
      RingsOnOtherMobileGoalBranches: 0,
      RingsOnMobileGoalBases: 0,
      MobileGoalsInHomeZone: 0,
      ElevatedRobots: 0,
      ElevatedMobileGoals: 1,
      AwpConditionsMet: false,
      WonAuto: 0,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(40);

    score = {
      RingsOnNeutralMobileGoalHighBranches: 0,
      RingsOnOtherMobileGoalBranches: 0,
      RingsOnMobileGoalBases: 0,
      MobileGoalsInHomeZone: 0,
      ElevatedRobots: 0,
      ElevatedMobileGoals: 0,
      AwpConditionsMet: false,
      WonAuto: 1,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(20);

    score = {
      RingsOnNeutralMobileGoalHighBranches: 0,
      RingsOnOtherMobileGoalBranches: 0,
      RingsOnMobileGoalBases: 0,
      MobileGoalsInHomeZone: 0,
      ElevatedRobots: 0,
      ElevatedMobileGoals: 0,
      AwpConditionsMet: false,
      WonAuto: 0.5,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(10);


    score = {
      RingsOnNeutralMobileGoalHighBranches: 2,
      RingsOnOtherMobileGoalBranches: 3,
      RingsOnMobileGoalBases: 1,
      MobileGoalsInHomeZone: 2,
      ElevatedRobots: 1,
      ElevatedMobileGoals: 1,
      AwpConditionsMet: false,
      WonAuto: 0,
      AllianceMeta: DummyMeta
    };

    expect(calculateScore(score)).toBe(140);

  });
});