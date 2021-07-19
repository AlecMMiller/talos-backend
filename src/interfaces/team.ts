import { teamId } from "./id";

export interface ITeam {
    id?: teamId;
    number: string;
    name: string;
    tiebreaker: string;
}