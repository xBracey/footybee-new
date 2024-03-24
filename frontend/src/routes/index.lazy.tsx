import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useUserStore } from "../zustand/user";

const Index = () => {
  const { token } = useUserStore();
  return <Navigate to={token ? "/dashboard" : "/login"} from="/" />;
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
