import { Link } from "@tanstack/react-router";
import Logo from "../Logo";
import LogoutButton from "../LogoutButton";
import { useUserStore } from "../../zustand/user";

const Header = () => {
  const { token } = useUserStore();

  return (
    <div className="bg-shamrock-800 flex h-24 gap-2 p-6 text-white">
      <div className="mx-auto flex w-full max-w-3xl items-center">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>

          <Link to="/fixtures" className="[&.active]:font-bold">
            Fixtures
          </Link>

          {token && (
            <Link to="/predictions" className="[&.active]:font-bold">
              Predictions
            </Link>
          )}

          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
