import { useGetUser } from "../../../queries/useGetUser";
import AdminAddEdit from "../AdminAddEdit";

interface IUserAdmin {
  username?: string;
}

const UserAdmin = ({ username }: IUserAdmin) => {
  const { data: user, isLoading } = useGetUser(username);

  return (
    <AdminAddEdit
      id={username}
      isLoading={isLoading}
      entityIsDefined={!!user}
      title="User"
    >
      <div>Hello World</div>
    </AdminAddEdit>
  );
};

export default UserAdmin;
