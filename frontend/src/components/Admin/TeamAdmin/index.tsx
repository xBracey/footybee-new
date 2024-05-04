import { useGetTeam } from "../../../queries/useGetTeam";
import AdminAddEdit from "../AdminAddEdit";

interface ITeamAdmin {
  id?: number;
}

const TeamAdmin = ({ id }: ITeamAdmin) => {
  const { data: team, isLoading } = useGetTeam(id);

  return (
    <AdminAddEdit
      id={id}
      isLoading={isLoading}
      entityIsDefined={!!team}
      title="Team"
    >
      <div>Hello World</div>
    </AdminAddEdit>
  );
};

export default TeamAdmin;
