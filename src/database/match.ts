import MatchDAO from "../dao/match";
import AllianceDAO from "../dao/alliance";
import { IMatch } from "../interfaces/match";
import { matchId } from "../interfaces/id";

export class MatchDatabase{
    #matchDao: MatchDAO;
    #allianceDao: AllianceDAO;

    constructor(matchDAO: MatchDAO, allianceDAO: AllianceDAO){
        this.#matchDao = matchDAO;
        this.#allianceDao = allianceDAO;
    }

    async createMatch( match: IMatch ){
        const redId = this.#allianceDao.create(match.RedAlliance);
        const blueId = this.#allianceDao.create(match.BlueAlliance);
        return this.#matchDao.create({redAlliance: await(redId), blueAlliance: await(blueId)})
    }

    async getMatch( matchId: matchId): Promise<IMatch> {
        const matchData = await this.#matchDao.getMatchById(matchId);

        const redInfo = this.#allianceDao.getById(matchData.redAlliance);
        const blueInfo = this.#allianceDao.getById(matchData.blueAlliance);

        return {MatchId: matchId, RedAlliance: await(redInfo), BlueAlliance: await(blueInfo)};
    }
}