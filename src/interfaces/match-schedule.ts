import { matchId, matchScheduleId } from "./id";

export interface IMatchSchedule{
    matchScheduleId: matchScheduleId
    matchId: matchId
    isReplay: boolean
    state: "PENDING" | "PLAYED" | "SCORED"
    scheduledStart: Date
}