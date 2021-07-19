import { TeamScoreMetaDAO } from "../dao/teamScoreMeta"
import { AllianceScoreDAO } from "../dao/allianceScore"
import { MatchScoreDAO } from "../dao/matchScore"
import { allianceScoreId, matchScoreId, teamId, teamScoreMetaId } from "../interfaces/id";
import { IAllianceScore, IMatchScore, ITeamMeta, IAllianceMeta } from "../interfaces/score";
import { ITeam } from "../interfaces/team";
import MatchDAO from "../dao/match";
import AllianceDAO from "../dao/alliance";
import { IAlliance } from "../interfaces/match";

export class ScoreDatabase {
    #teamDao: TeamScoreMetaDAO;
    #allianceDao: AllianceScoreDAO;
    #matchDao: MatchScoreDAO
    #matchListDao: MatchDAO
    #allianceListDao: AllianceDAO

    constructor(matchDao: MatchScoreDAO, allianceDAO: AllianceScoreDAO, teamDao: TeamScoreMetaDAO, matchListDao: MatchDAO, allianceListDao: AllianceDAO) {
        this.#teamDao = teamDao;
        this.#allianceDao = allianceDAO;
        this.#matchDao = matchDao;
        this.#matchListDao = matchListDao;
        this.#allianceListDao = allianceListDao;
    }

    async #createTeamMeta(meta: ITeamMeta): Promise<teamScoreMetaId> {
        return this.#teamDao.create({ dq: meta.dq, noShow: meta.noShow });
    }

    async #createAlliance(match: IAllianceScore): Promise<allianceScoreId> {
        const team1Meta = this.#createTeamMeta(match.AllianceMeta.Team1Meta)
        const team2Meta = this.#createTeamMeta(match.AllianceMeta.Team2Meta)

        return this.#allianceDao.create({
            team1Meta: await (team1Meta),
            team2Meta: await (team2Meta),
            WonAuto: match.WonAuto,
            AwpConditionsMet: match.AwpConditionsMet,
            RingsOnMobileGoalBases: match.RingsOnMobileGoalBases,
            RingsOnNeutralMobileGoalHighBranches: match.RingsOnNeutralMobileGoalHighBranches,
            RingsOnOtherMobileGoalBranches: match.RingsOnOtherMobileGoalBranches,
            MobileGoalsInHomeZone: match.MobileGoalsInHomeZone,
            ElevatedRobots: match.ElevatedRobots,
            ElevatedMobileGoals: match.ElevatedMobileGoals
        });
    }

    async createMatch(match: IMatchScore): Promise<matchScoreId> {
        const redId = this.#createAlliance(match.RedAlliance);
        const blueId = this.#createAlliance(match.BlueAlliance);
        const scoredAt = new Date()

        return this.#matchDao.create({ blueAlliance: await (blueId), redAlliance: await (redId), scoredAt: scoredAt, matchId: match.MatchId })
    }

    async #getTeamMeta(metaId: teamScoreMetaId, teamId: teamId): Promise<ITeamMeta> {
        console.log(`Metadata for ${metaId}`)
        const teamData = this.#teamDao.getTeamScoreMetaById(metaId);

        return { dq: (await teamData).dq, noShow: (await teamData).noShow, teamId: teamId };
    }

    async #getAllianceResults(allianceId: allianceScoreId, teams: IAlliance): Promise<IAllianceScore> {
        const allianceData = this.#allianceDao.getAllianceScoreById(allianceId);

        const team1Data = this.#getTeamMeta((await allianceData).team1Meta, teams.team1);
        const team2Data = this.#getTeamMeta((await allianceData).team2Meta, teams.team2);

        const scoreData = await(this.#allianceDao.getAllianceScoreById(allianceId));

        const allianceMeta: IAllianceMeta = {
            Team1Meta: await (team1Data),
            Team2Meta: await (team2Data)
        }

        return{
            AllianceMeta: allianceMeta,
            AwpConditionsMet: scoreData.AwpConditionsMet,
            WonAuto: scoreData.WonAuto,
            MobileGoalsInHomeZone: scoreData.MobileGoalsInHomeZone,
            ElevatedMobileGoals: scoreData.ElevatedMobileGoals,
            ElevatedRobots: scoreData.ElevatedRobots,
            RingsOnOtherMobileGoalBranches: scoreData.RingsOnOtherMobileGoalBranches,
            RingsOnNeutralMobileGoalHighBranches: scoreData.RingsOnNeutralMobileGoalHighBranches,
            RingsOnMobileGoalBases: scoreData.RingsOnMobileGoalBases
        }
    }

    async getMatchResults(matchId: matchScoreId): Promise<IMatchScore> {
        const matchData = this.#matchDao.getMatchScoreById(matchId);
        const allianceData = this.#matchListDao.getMatchById(matchId);

        const redAllianceTeams = this.#allianceListDao.getAllianceById((await allianceData).redAlliance);
        const blueAllianceTeams = this.#allianceListDao.getAllianceById((await allianceData).blueAlliance);

        const redAlliance = this.#getAllianceResults((await matchData).redAlliance, await(redAllianceTeams));
        const blueAlliance = this.#getAllianceResults((await matchData).blueAlliance, await(blueAllianceTeams));

        return { BlueAlliance: await (blueAlliance), RedAlliance: await (redAlliance), MatchId: matchId };
    }
}