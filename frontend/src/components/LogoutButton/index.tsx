import { useUserStore } from "../../zustand/user";

const LogoutButton = () => {
  const { token, setToken } = useUserStore();

  const onHandleLogout = () => {
    setToken("");
  };

  if (token)
    return (
      <button type="button" onClick={onHandleLogout}>
        Logout
      </button>
    );

  return null;
};

export default LogoutButton;
