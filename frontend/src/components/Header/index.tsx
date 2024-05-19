import { Link } from "@tanstack/react-router";
import Logo from "../Logo";
import LogoutButton from "../LogoutButton";
import { useGetMe } from "../../queries/useGetMe";
import { Fragment, useEffect, useState } from "react";
import InstallModal from "../InstallModal";

const Header = () => {
  const [isInPwa, setIsInPwa] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(true);

  const { data: user } = useGetMe();

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInPwa(true);
    }
  }, []);

  return (
    <div className="bg-shamrock-800 flex h-14 items-center gap-2 px-6 text-white md:h-24">
      <div className="md:justify-normal mx-auto flex w-full max-w-3xl items-center justify-center">
        <Link to="/">
          <Logo />
        </Link>
        <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
          {user && user.admin && (
            <Link to="/admin" className="[&.active]:font-bold">
              Admin
            </Link>
          )}

          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>

          <Link to="/fixtures" className="[&.active]:font-bold">
            Fixtures
          </Link>

          {user && (
            <Fragment>
              <Link to="/predictions" className="[&.active]:font-bold">
                Predictions
              </Link>

              <Link
                to={`/profile/${user.username}`}
                className="[&.active]:font-bold"
              >
                Profile
              </Link>
            </Fragment>
          )}
        </div>
      </div>

      <InstallModal
        open={showInstallModal && !isInPwa}
        setOpen={setShowInstallModal}
      />
    </div>
  );
};

export default Header;
