import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../queries/useGetMe";

const Admin = () => {
  const { data: user } = useGetMe();

  if (!user || !user.admin) {
    return <Navigate to="/" />;
  }

  return <div className="p-4"></div>;
};

export const Route = createLazyFileRoute("/admin")({
  component: Admin,
});
