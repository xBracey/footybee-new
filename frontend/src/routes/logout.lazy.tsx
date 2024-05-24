import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useUserStore } from "../zustand/user";
import { Loader } from "@mantine/core";

export const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useUserStore();

  useEffect(() => {
    setToken("");
    navigate({ to: "/" });
  }, []);

  return <Loader />;
};

export const Route = createLazyFileRoute("/logout")({
  component: Logout,
});
