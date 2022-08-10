import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toumament } from "./actions";
import { toumamantState } from "./types";
import { Team } from "../../constant"

const PREFIX = "toumament";

const initialState: toumamantState = {
  teams: [],
  scores: {},
};


export const toumamentReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    saveTeamInfo: (state: toumamantState, data: any) => {
      state.teams = [...state.teams, ...data.payload]
      console.log(state.teams)
    },
  },
});

export const { saveTeamInfo } = toumamentReducer.actions
export default toumamentReducer.reducer;
