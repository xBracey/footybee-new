import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../queries/useGetMe";
import { useUserStore } from "../zustand/user";

const Dashboard = () => {
  const { token } = useUserStore();
  const { data: user } = useGetMe();

  if (!token) {
    return <Navigate to="/login" from="/dashboard" />;
  }

  if (!user) {
    return <div className="p-4">Loading</div>;
  }

  return (
    <div className="p-4">
      <h2>Hello {user.username}</h2>
    </div>
  );
};

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});
