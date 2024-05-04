import { useGetFixture } from "../../../queries/useGetFixture";
import AdminAddEdit from "../AdminAddEdit";

interface IFixtureAdmin {
  id?: number;
}

const FixtureAdmin = ({ id }: IFixtureAdmin) => {
  const { data: fixture, isLoading } = useGetFixture(id);

  return (
    <AdminAddEdit
      id={id}
      isLoading={isLoading}
      entityIsDefined={!!fixture}
      title="Fixture"
    >
      <div>Hello World</div>
    </AdminAddEdit>
  );
};

export default FixtureAdmin;
