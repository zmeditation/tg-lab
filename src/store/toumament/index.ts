import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toumament } from "./actions";
import { toumamantState } from "./types";
import { Team } from "../../constant"

const PREFIX = "toumament";

const initialState: toumamantState = {
  teams: JSON.parse(localStorage.getItem("teamInfo") || '{}'),
  scores: JSON.parse(localStorage.getItem("scoreInfo") || '{}'),
};
// const initialState: toumamantState = {
//   teams: [],
//   scores: {},
// };


export const toumamentReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    saveTeamInfo: (state: toumamantState, data: any) => {
      state.teams = [...state.teams, ...data.payload]
      localStorage.setItem("teamInfo", JSON.stringify(state.teams));
      state.teams = JSON.parse(localStorage.getItem("teamInfo") || '{}');
      console.log(state.teams)
    },
    saveTeamScore: (state: toumamantState, data: any) => {
      const score = data.payload;
      state.scores = { ...state.scores, [score.id]: score.value };
      localStorage.setItem("scoreInfo", JSON.stringify(state.scores));
      state.scores = JSON.parse(localStorage.getItem("scoreInfo") || '{}');
      console.log(state.scores)
    },
    setTeamScores: (state: toumamantState, data: any) => {
      const keys = Object.keys(state.scores);
      let played: number[] = []
      let draw: number[] = []
      let lost: number[] = []
      let win: number[] = []
      let points: number[] = []
      for (let i = 0; i < keys.length; i++) {

        for (let j = i + 1; j < keys.length; j++) {
          if (played[+keys[i].split("-")[0]] == undefined) played[+keys[i].split("-")[0]] = 0;
          if (played[+keys[i].split("-")[1]] == undefined) played[+keys[i].split("-")[1]] = 0;
          if (draw[+keys[i].split("-")[0]] == undefined) draw[+keys[i].split("-")[0]] = 0;
          if (draw[+keys[i].split("-")[1]] == undefined) draw[+keys[i].split("-")[1]] = 0;
          if (lost[+keys[i].split("-")[0]] == undefined) lost[+keys[i].split("-")[0]] = 0;
          if (lost[+keys[i].split("-")[1]] == undefined) lost[+keys[i].split("-")[1]] = 0;
          if (win[+keys[i].split("-")[0]] == undefined) win[+keys[i].split("-")[0]] = 0;
          if (win[+keys[i].split("-")[1]] == undefined) win[+keys[i].split("-")[1]] = 0;
          if (points[+keys[i].split("-")[0]] == undefined) points[+keys[i].split("-")[0]] = 0;
          if (points[+keys[i].split("-")[1]] == undefined) points[+keys[i].split("-")[1]] = 0;
          if (keys[i].split("-")[0] == keys[j].split("-")[0] && keys[i].split("-")[1] == keys[j].split("-")[1]) {

            played[+keys[i].split("-")[0]]++;
            played[+keys[i].split("-")[1]]++;

            const score_1 = state.scores[keys[i]]
            const score_2 = state.scores[keys[j]]

            if (score_1 == score_2) {
              draw[+keys[i].split("-")[0]]++;
              draw[+keys[i].split("-")[1]]++;
            }
            else if (score_1 > score_2) {
              win[+keys[i].split("-")[0]]++;
              lost[+keys[i].split("-")[1]]++;
            }
            else {
              lost[+keys[i].split("-")[0]]++;
              win[+keys[i].split("-")[1]]++;
            }
          }
        }
        state.teams[+keys[i].split("-")[0]].played = played[+keys[i].split("-")[0]];
        state.teams[+keys[i].split("-")[1]].played = played[+keys[i].split("-")[1]];
        state.teams[+keys[i].split("-")[0]].draw = draw[+keys[i].split("-")[0]];
        state.teams[+keys[i].split("-")[1]].draw = draw[+keys[i].split("-")[1]];
        state.teams[+keys[i].split("-")[0]].lost = lost[+keys[i].split("-")[0]];
        state.teams[+keys[i].split("-")[1]].lost = lost[+keys[i].split("-")[1]];
        state.teams[+keys[i].split("-")[0]].win = win[+keys[i].split("-")[0]];
        state.teams[+keys[i].split("-")[1]].win = win[+keys[i].split("-")[1]];
        state.teams[+keys[i].split("-")[0]].points = draw[+keys[i].split("-")[0]] + 3 * win[+keys[i].split("-")[0]];
        state.teams[+keys[i].split("-")[1]].points = draw[+keys[i].split("-")[1]] + 3 * win[+keys[i].split("-")[1]];
      }
      localStorage.setItem("teamInfo", JSON.stringify(state.teams));
      state.teams = JSON.parse(localStorage.getItem("teamInfo") || '{}');
    },
  },
});

export const { saveTeamInfo, saveTeamScore, setTeamScores } = toumamentReducer.actions
export default toumamentReducer.reducer;
