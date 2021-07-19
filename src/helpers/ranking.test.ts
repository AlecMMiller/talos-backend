import { getMatchSummary } from "./ranking"
import { IMatchScore, IAllianceScore, IAllianceMeta, ITeamMeta } from "../interfaces/score";
import * as score from "./score"
import exp from "constants";

describe("Match Summary", () => {

    const scoreMock = jest.spyOn(score, "calculateScore");

    const dummyMeta: IAllianceMeta = {
        Team1Meta:
        {
            teamId: 2,
            dq: false,
            noShow: false
        },
        Team2Meta:
        {
            teamId: 2,
            dq: false,
            noShow: false
        }
    }

    const dummyAlliance: IAllianceScore = {
        RingsOnNeutralMobileGoalHighBranches: 0,
        RingsOnOtherMobileGoalBranches: 0,
        RingsOnMobileGoalBases: 0,
        MobileGoalsInHomeZone: 0,
        ElevatedRobots: 0,
        ElevatedMobileGoals: 0,
        AwpConditionsMet: false,
        WonAuto: 0,
        AllianceMeta: dummyMeta
    }

    const dummyScore: IMatchScore = {
        RedAlliance: dummyAlliance,
        BlueAlliance: dummyAlliance,
        MatchId: 1
    }

    let matchScore: IMatchScore;

    beforeEach(() => {
        matchScore = JSON.parse(JSON.stringify(dummyScore));
    });

    afterEach(() => {
        scoreMock.mockClear();
    });

    afterAll(() => {
        scoreMock.mockReset();
    })

    test("It should correctly identify a DQ", () => {
        matchScore.RedAlliance.AllianceMeta.Team1Meta.dq = true;
        matchScore.RedAlliance.AllianceMeta.Team1Meta.teamId = 1;
        expect(getMatchSummary(matchScore, 1)).toEqual({
            WinPoints: 0,
            AutonmousPoints: 0,
            StrengthOfSchedule: 0
        })
        matchScore = JSON.parse(JSON.stringify(dummyScore));

        matchScore.RedAlliance.AllianceMeta.Team2Meta.dq = true;
        matchScore.RedAlliance.AllianceMeta.Team2Meta.teamId = 1;
        expect(getMatchSummary(matchScore, 1)).toEqual({
            WinPoints: 0,
            AutonmousPoints: 0,
            StrengthOfSchedule: 0
        })
        matchScore = JSON.parse(JSON.stringify(dummyScore));

        matchScore.BlueAlliance.AllianceMeta.Team1Meta.dq = true;
        matchScore.BlueAlliance.AllianceMeta.Team1Meta.teamId = 1;
        expect(getMatchSummary(matchScore, 1)).toEqual({
            WinPoints: 0,
            AutonmousPoints: 0,
            StrengthOfSchedule: 0
        })
        matchScore = JSON.parse(JSON.stringify(dummyScore));

        matchScore.BlueAlliance.AllianceMeta.Team2Meta.dq = true;
        matchScore.BlueAlliance.AllianceMeta.Team2Meta.teamId = 1;
        expect(getMatchSummary(matchScore, 1)).toEqual({
            WinPoints: 0,
            AutonmousPoints: 0,
            StrengthOfSchedule: 0
        })
        matchScore = JSON.parse(JSON.stringify(dummyScore));
    });

    test("It should correctly identify a no-show", () => {
        matchScore.RedAlliance.AllianceMeta.Team1Meta.noShow = true;
        matchScore.RedAlliance.AllianceMeta.Team1Meta.teamId = 1;
        expect(getMatchSummary(matchScore, 1)).toEqual({
            WinPoints: 0,
            AutonmousPoints: 0,
            StrengthOfSchedule: 0
        })
        matchScore = JSON.parse(JSON.stringify(dummyScore));

        matchScore.RedAlliance.AllianceMeta.Team2Meta.noShow = true;
        matchScore.RedAlliance.AllianceMeta.Team2Meta.teamId = 1;
        expect(getMatchSummary(matchScore, 1)).toEqual({
            WinPoints: 0,
            AutonmousPoints: 0,
            StrengthOfSchedule: 0
        })
        matchScore = JSON.parse(JSON.stringify(dummyScore));

        matchScore.BlueAlliance.AllianceMeta.Team1Meta.noShow = true;
        matchScore.BlueAlliance.AllianceMeta.Team1Meta.teamId = 1;
        expect(getMatchSummary(matchScore, 1)).toEqual({
            WinPoints: 0,
            AutonmousPoints: 0,
            StrengthOfSchedule: 0
        })
        matchScore = JSON.parse(JSON.stringify(dummyScore));

        matchScore.BlueAlliance.AllianceMeta.Team2Meta.noShow = true;
        matchScore.BlueAlliance.AllianceMeta.Team2Meta.teamId = 1;
        expect(getMatchSummary(matchScore, 1)).toEqual({
            WinPoints: 0,
            AutonmousPoints: 0,
            StrengthOfSchedule: 0
        })
        matchScore = JSON.parse(JSON.stringify(dummyScore));
    });

    test("It should correctly identify a tie", () => {

        scoreMock.mockImplementation(() => (1))
        matchScore.RedAlliance.AllianceMeta.Team1Meta.teamId = 1;
        let results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(1);
        expect(results.AutonmousPoints).toBe(0);
        scoreMock.mockClear();

        matchScore = JSON.parse(JSON.stringify(dummyScore));
        matchScore.BlueAlliance.AllianceMeta.Team2Meta.teamId = 1;
        results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(1);
        expect(results.AutonmousPoints).toBe(0);
    });

    test("It should correctly identify a win", () => {

        scoreMock
            .mockImplementationOnce(() => (2))
            .mockImplementationOnce(() => (1))
        matchScore.RedAlliance.AllianceMeta.Team1Meta.teamId = 1;
        let results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(2);
        expect(results.AutonmousPoints).toBe(0);
        scoreMock.mockClear();

        matchScore = JSON.parse(JSON.stringify(dummyScore));
        scoreMock
            .mockImplementationOnce(() => (2))
            .mockImplementationOnce(() => (1))
        matchScore.BlueAlliance.AllianceMeta.Team1Meta.teamId = 1;
        results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(2);
        expect(results.AutonmousPoints).toBe(0);
    });

    test("It should correctly identify a loss", () => {

        scoreMock
            .mockImplementationOnce(() => (1))
            .mockImplementationOnce(() => (2))
        matchScore.RedAlliance.AllianceMeta.Team1Meta.teamId = 1;
        let results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(0);
        expect(results.AutonmousPoints).toBe(0);
        scoreMock.mockClear();

        matchScore = JSON.parse(JSON.stringify(dummyScore));
        scoreMock
            .mockImplementationOnce(() => (1))
            .mockImplementationOnce(() => (2))
        matchScore.BlueAlliance.AllianceMeta.Team1Meta.teamId = 1;
        results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(0);
        expect(results.AutonmousPoints).toBe(0);
    });

    test("It should correctly handle AWP", () => {

        scoreMock
            .mockImplementationOnce(() => (2))
            .mockImplementationOnce(() => (1))
        matchScore.RedAlliance.AllianceMeta.Team1Meta.teamId = 1;
        matchScore.RedAlliance.AwpConditionsMet = true;
        let results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(3);
        expect(results.AutonmousPoints).toBe(0);
        scoreMock.mockClear();

        matchScore = JSON.parse(JSON.stringify(dummyScore));
        scoreMock
            .mockImplementationOnce(() => (1))
            .mockImplementationOnce(() => (2))
        matchScore.BlueAlliance.AllianceMeta.Team1Meta.teamId = 1;
        matchScore.BlueAlliance.AwpConditionsMet = true
        results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(1);
        expect(results.AutonmousPoints).toBe(0);
    });

    test("It should correctly handle the autonomous bonus", () => {

        scoreMock
            .mockImplementationOnce(() => (2))
            .mockImplementationOnce(() => (1))
        matchScore.RedAlliance.AllianceMeta.Team1Meta.teamId = 1;
        matchScore.RedAlliance.WonAuto = 0.5;
        let results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(2);
        expect(results.AutonmousPoints).toBe(10);
        scoreMock.mockClear();

        matchScore = JSON.parse(JSON.stringify(dummyScore));
        scoreMock
            .mockImplementationOnce(() => (1))
            .mockImplementationOnce(() => (2))
        matchScore.BlueAlliance.AllianceMeta.Team1Meta.teamId = 1;
        matchScore.BlueAlliance.WonAuto = 1;
        results = getMatchSummary(matchScore, 1);
        expect(score.calculateScore).toHaveBeenCalledTimes(2)
        expect(results.StrengthOfSchedule).toBe(1);
        expect(results.WinPoints).toBe(0);
        expect(results.AutonmousPoints).toBe(20);
    });

    test("It should throw an error if no matching team ID is found", () =>{
        function container(){
            getMatchSummary(matchScore, 1);
        }
        expect(container).toThrow('Match 1 has no match for team ID 1');
    });
});