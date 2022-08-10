import { useAppDispatch, useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";

export const TeamRow = () => {

  let teams = useAppSelector((state: RootState) => state.toumament.teams);
  const sortedteams = teams.slice().sort((obj1, obj2) => {
    if (obj1.points < obj2.points) {
      return 1;
    }

    if (obj1.points > obj2.points) {
      return -1;
    }

    return 0;
  });


  const listItems = sortedteams.map((team, index) =>
    <tr key={index}>
      <td>{index + 1}</td>
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

