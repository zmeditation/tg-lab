import { useAppDispatch, useAppSelector } from "./store/hooks";
import { saveTeamInfo } from "./store/toumament";
import { RootState } from "./store/store";

export const TeamRow = () => {

  const teams = useAppSelector((state: RootState) => state.toumament.teams);

  const listItems = teams.map((team, index) =>
    <tr key={index}>
      <td>{index}</td>
      <td>{team.name}</td>
      <td>{team.played}</td>
      <td>{team.win}</td>
      <td>{team.draw}</td>
      <td>{team.lost}</td>
      <td>{team.points}</td>
    </tr>
  );
  return (
    <tbody>{listItems}</tbody>
  );
}

