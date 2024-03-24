import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useLoginUser } from "../queries/useLoginUser";
import { useEffect, useState } from "react";
import { useUserStore } from "../zustand/user";
import { useRegisterUser } from "../queries/useRegisterUser";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { token, setToken } = useUserStore();
  const navigate = useNavigate({ from: "/login" });
  const { login, data: loginData } = useLoginUser();
  const { register, data: registerData } = useRegisterUser();

  useEffect(() => {
    if (loginData) {
      setToken(loginData.token);
      navigate({ to: "/dashboard" });
    } else if (registerData) {
      setToken(registerData.token);
      navigate({ to: "/dashboard" });
    }
  }, [loginData, registerData]);

  const onHandleLogin = async (username: string, password: string) => {
    login({ username, password });
  };

  const onHandleRegister = async (username: string, password: string) => {
    register({ username, password });
  };

  return (
    <div className="p-4">
      <LoginForm onLogin={onHandleLogin} onRegister={onHandleRegister} />
    </div>
  );
};

export const Route = createLazyFileRoute("/login")({
  component: Login,
});
