import { useAppDispatch, useAppSelector } from "./store/hooks";
import { saveTeamInfo } from "./store/toumament";
import { RootState } from "./store/store";
import React from 'react';
import ReactDOM from 'react-dom';

export const ScoreBoard = () => {

  const teams = useAppSelector((state: RootState) => state.toumament.teams);
  const scores = useAppSelector((state: RootState) => state.toumament.scores);
  const dispatch = useAppDispatch();

  const handlescore = async (e: any) => {
    const id = e.target.id;
    const value = e.target.value;
    await dispatch(saveTeamScore(e.target));
    let otherId = "";
    if (id.split('-')[2] == "0")
      otherId = id.split('-')[0] + "-" + id.split('-')[1] + "-" + "1";
    else
      otherId = id.split('-')[0] + "-" + id.split('-')[1] + "-" + "0";
    console.log(otherId);

  };

  const listItems = teams.map((team, i) =>
    teams.map((team, j) =>
      j > i ?
        <div key={`${i}-${j}`} className="score-row mt-20">
          <div className="sub-board-left">
            {teams[i].name}
            <input type="text" className="scoreInput" id={`${i}-${j}-0`} onBlur={handlescore} />
            &#8758;
          </div>
          <div className="sub-board-right">
            <input type="text" className="scoreInput" id={`${i}-${j}-1`} onBlur={handlescore} />
            {teams[j].name}
          </div>
        </div> : ''
    )
  );
  return (
    <div>{listItems}</div>
  );
}

function saveTeamScore(target: any): any {
  throw new Error("Function not implemented.");
}

