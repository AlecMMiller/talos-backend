import TeamDAO from "./dao/team";
import AllianceDao from "./dao/alliance";
import MatchDAO from "./dao/match";
import { Database } from "./dao/base";
import { IAlliance, IMatch } from "./interfaces/match";
import { MatchDatabase } from "./repo/match";
import { ScoreDatabase } from "./repo/score";
import { MatchScoreDAO } from "./dao/matchScore";
import { AllianceScoreDAO } from "./dao/allianceScore";
import { TeamScoreMetaDAO } from "./dao/teamScoreMeta";
import { FieldDAO } from "./dao/field";
import { IMatchScore, IAllianceScore, IAllianceMeta, ITeamMeta } from "./interfaces/score";
import { getMatchSummary } from "./helpers/ranking";
import { FieldPoolDAO } from "./dao/field-pool";
import { FieldDatabase } from "./repo/field";
import fs = require("fs")

const db_name = "test.db";

fs.writeFile(db_name, "", function(){console.log("Deleted");});

const database = new Database(db_name);

const teamDao = new TeamDAO(database);
const allianceDao = new AllianceDao(database);
const matchDao = new MatchDAO(database);
const matchScoreDao = new MatchScoreDAO(database);
const allianceScoreDAO = new AllianceScoreDAO(database);
const teamScoreMetaDAO = new TeamScoreMetaDAO(database);
const fieldDAO = new FieldDAO(database);
const fieldPoolDao = new FieldPoolDAO(database);

async function test(){
  const fieldDatabase = new FieldDatabase(fieldDAO, fieldPoolDao);
  fieldDatabase.createPool("Match Fields", ["Copper Field", "Turquoise Field"]);

  const team1 = teamDao.create({number: "127C", name: "Lemon Bots", tiebreaker: "1"});
  const team2 = teamDao.create({number: "2W", name: "Wallbot", tiebreaker: "2"});
  const team3 = teamDao.create({number: "5090X", name: "Microchip", tiebreaker: "3"});
  const team4 = teamDao.create({number: "6030J", name: "ACP People", tiebreaker: "4"});

  const matchDatabase = new MatchDatabase(matchDao, allianceDao);
  const scoreDatabase = new ScoreDatabase(matchScoreDao, allianceScoreDAO, teamScoreMetaDAO, matchDao, allianceDao);

  const redAlliance: IAlliance = {
    team1: await(team1),
    team2: await(team2)
  };

  const blueAlliance: IAlliance = {
    team1: await(team3),
    team2: await(team4)
  };

  const match: IMatch = {
    RedAlliance: redAlliance,
    BlueAlliance: blueAlliance
  };
    
  const match1 = matchDatabase.createMatch(match);

  const teamMeta: ITeamMeta = {
    dq: false,
    noShow: false
  };

  const allianceMeta: IAllianceMeta = {
    Team1Meta: teamMeta,
    Team2Meta: teamMeta
  };

  const allianceScore: IAllianceScore = {
    AllianceMeta: allianceMeta,
    RingsOnMobileGoalBases: 1,
    RingsOnNeutralMobileGoalHighBranches: 2,
    RingsOnOtherMobileGoalBranches: 3,
    MobileGoalsInHomeZone: 2,
    ElevatedRobots: 1,
    ElevatedMobileGoals: 1,
    AwpConditionsMet: false,
    WonAuto: 0.5
  };

  const matchScore: IMatchScore = {
    MatchId: await(match1),
    RedAlliance: allianceScore,
    BlueAlliance: allianceScore
  };

  const match1ScoreId = scoreDatabase.createMatch(matchScore);

  const match1Score = scoreDatabase.getMatchResults(await(match1ScoreId));
    
}

teamDao.createTable()
  .then(() => allianceDao.createTable())
  .then(() => matchDao.createTable())
  .then(() => teamScoreMetaDAO.createTable())
  .then(() => allianceScoreDAO.createTable())
  .then(() => matchScoreDao.createTable())
  .then(() => fieldPoolDao.createTable())
  .then(() => fieldDAO.createTable())
  .then(() => test());