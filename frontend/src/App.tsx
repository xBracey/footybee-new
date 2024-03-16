import { useGetUsers } from "./queries/useGetUsers";

function App() {
  const users = useGetUsers();

  return <div className="text-center">{`Count: ${users?.length}`}</div>;
}

export default App;
