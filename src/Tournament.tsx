import { useState } from "react";
import { Team } from "./constant"
import { TeamRow } from "./TeamRow"
import { ScoreBoard } from "./ScoreBoard"
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { saveTeamInfo } from "./store/toumament";
import { RootState } from "./store/store";

export const Toumament = () => {

  const initialTeams = new Array;
  const [teamName, setTeam] = useState("");
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    setTeam(e.target.value);
  }
  const handleClick = async () => {

    let tempTeams = [];
    let team = {
      name: teamName,
      played: 0,
      win: 0,
      draw: 0,
      lost: 0,
      points: 0,
    } as Team;
    tempTeams.push(team);
    await dispatch(saveTeamInfo(tempTeams));
  };

  return (
    <div className="App">
      <div>
        <input type="text" onChange={handleChange} className="team-input" />
        <button className="team-button" onClick={handleClick}>Add</button>
      </div>
      <div className="mt-20 board">
        <table className="">
          <thead>
            <tr>
              <th>Place</th>
              <th>Team</th>
              <th>Played</th>
              <th>Win</th>
              <th>Draw</th>
              <th>Lost</th>
              <th>Points</th>
            </tr>
          </thead>
          <TeamRow />
        </table>
        <div className="scoreBoard">
          <ScoreBoard />
        </div>
      </div>
    </div>
  )
}

