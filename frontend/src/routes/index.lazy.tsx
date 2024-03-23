import { createLazyFileRoute } from "@tanstack/react-router";
import { useLoginUser } from "../queries/useLoginUser";
import { useEffect, useState } from "react";
import { useUserStore } from "../zustand/user";
import { useRegisterUser } from "../queries/useRegisterUser";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useUserStore();
  const { login, isLoading, isError, data } = useLoginUser();
  const { register } = useRegisterUser();

  useEffect(() => {
    if (data) {
      setToken(data.token);
    }
  }, [data]);

  const onHandleLogin = async () => {
    login({ username, password });
  };

  const onHandleRegister = async () => {
    register({ username, password });
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={onHandleLogin} disabled={isLoading}>
        Login
      </button>
      <button className="ml-4" onClick={onHandleRegister} disabled={isLoading}>
        Register
      </button>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
