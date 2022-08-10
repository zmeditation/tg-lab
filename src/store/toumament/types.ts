import { Team } from "../../constant";

interface toumamantState {
  teams: Team[],
  scores: { [propName: string]: string },
}

export type { toumamantState };
