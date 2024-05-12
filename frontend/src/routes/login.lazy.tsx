import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useLoginUser } from "../queries/useLoginUser";
import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../zustand/user";
import { useRegisterUser } from "../queries/useRegisterUser";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { setToken } = useUserStore();
  const navigate = useNavigate({ from: "/login" });
  const { login, data: loginData } = useLoginUser();
  const { register, data: registerData } = useRegisterUser();

  useEffect(() => {
    if (loginData && "token" in loginData) {
      setToken(loginData.token);
      navigate({ to: "/dashboard" });
    } else if (registerData && "token" in registerData) {
      setToken(registerData.token);
      navigate({ to: "/dashboard" });
    }
  }, [loginData, registerData]);

  const onHandleLogin = (username: string, password: string) =>
    login({ username, password });

  const onHandleRegister = (username: string, password: string) =>
    register({ username, password });

  const errorMessage = useMemo(() => {
    if (loginData && "error" in loginData) {
      return loginData?.error;
    } else if (registerData && "error" in registerData) {
      return registerData?.error;
    }
    return undefined;
  }, [loginData, registerData]);

  return (
    <LoginForm
      onLogin={onHandleLogin}
      onRegister={onHandleRegister}
      errorMessage={errorMessage}
    />
  );
};

export const Route = createLazyFileRoute("/login")({
  component: Login,
});
