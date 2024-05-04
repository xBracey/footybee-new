import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../../../queries/useGetMe";
import TeamAdmin from "../../../components/Admin/TeamAdmin";
import FixtureAdmin from "../../../components/Admin/FixtureAdmin";
import UserAdmin from "../../../components/Admin/UserAdmin";
import Loading from "../../../components/Loading";
import { z } from "zod";

const Admin = () => {
  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { entity } = Route.useParams();
  const { id } = Route.useSearch();

  if (userIsLoading) {
    return <Loading />;
  }

  if (!user || !user?.admin) {
    return <Navigate to="/" />;
  }

  switch (entity) {
    case "teams":
      return <TeamAdmin id={id as number} />;
    case "fixtures":
      return <FixtureAdmin id={id as number} />;
    case "users":
      return <UserAdmin username={id as string} />;
  }

  return <Navigate to="/" />;
};

const searchSchema = z.object({
  id: z.string().optional().or(z.number().optional()),
});

export const Route = createFileRoute("/admin/$entity/")({
  component: Admin,
  validateSearch: searchSchema,
});
