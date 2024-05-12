import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../queries/useGetMe";
import { useUserStore } from "../zustand/user";
import Loading from "../components/Loading";

const Dashboard = () => {
  const { token } = useUserStore();
  const { data: user } = useGetMe();

  if (!token) {
    return <Navigate to="/login" from="/dashboard" />;
  }

  if (!user) {
    return <Loading />;
  }

  return <h2>Hello {user.username}</h2>;
};

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});
