import { useAppDispatch, useAppSelector } from "./store/hooks";
import { saveTeamScore, setTeamScores } from "./store/toumament";
import { RootState } from "./store/store";

export const ScoreBoard = () => {

  const teams = useAppSelector((state: RootState) => state.toumament.teams);
  const scores = useAppSelector((state: RootState) => state.toumament.scores);
  const dispatch = useAppDispatch();

  const handlescore = async (e: any) => {
    const id: string = e.target.id;
    const value = e.target.value;
    const score = { id: id, value: value };
    await dispatch(saveTeamScore(score));
    let otherId: string = "";
    if (id.split('-')[2] === "0")
      otherId = id.split('-')[0] + "-" + id.split('-')[1] + "-" + 1;
    else
      otherId = id.split('-')[0] + "-" + id.split('-')[1] + "-" + 0;
    if (Object.keys(scores).includes(otherId)) {
      const ids = { id: id, otherId: otherId }
      await dispatch(setTeamScores(ids));
    }

  };
  const handleKeyPress = (evt: any) => {
    evt.target.value = evt.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

  }


  const listItems = teams.map((team, i) =>
    teams.map((team, j) =>
      j > i ?
        <div key={`${i}-${j}`} className="score-row mt-20">
          <div className="sub-board-left">
            {teams[i].name}
            &nbsp;
            <input type="text" onInput={handleKeyPress} className="scoreInput" id={`${i}-${j}-0`} onBlur={handlescore} defaultValue={scores[`${i}-${j}-0`]} />
            &#8758;
          </div>
          <div className="sub-board-right">
            <input type="text" onInput={handleKeyPress} className="scoreInput" id={`${i}-${j}-1`} onBlur={handlescore} defaultValue={scores[`${i}-${j}-1`]} />
            &nbsp;
            {teams[j].name}
          </div>
        </div> : ''
    )
  );
  return (
    <div>{listItems}</div>
  );
}


