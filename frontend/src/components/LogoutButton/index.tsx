import { Button } from "@mantine/core";
import { useUserStore } from "../../zustand/user";
import { useNavigate } from "@tanstack/react-router";

const LogoutButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const { token } = useUserStore();

  const onHandleLogout = () => {
    navigate({ to: "/logout" });
  };

  if (token)
    return (
      <Button
        type="button"
        onClick={onHandleLogout}
        color="red"
        className={className}
      >
        Logout
      </Button>
    );

  return null;
};

export default LogoutButton;
