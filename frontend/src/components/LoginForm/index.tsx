import { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(username, password);
    } else {
      onRegister(username, password);
    }
  };

  return (
    <form
      className="border-shamrock-700 mx-auto max-w-md rounded-lg border-4 bg-white p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-6 text-2xl font-bold">
        {isLogin ? "Login" : "Register"}
      </h2>
      <div className="mb-4">
        <label htmlFor="username" className="mb-2 block">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full rounded border border-gray-300 px-3 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="mb-2 block">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full rounded border border-gray-300 px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600"
      >
        {isLogin ? "Login" : "Register"}
      </button>
      <p className="mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="text-blue-500 transition-all hover:text-blue-700"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
