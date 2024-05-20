import { Link } from "@tanstack/react-router";
import Logo from "../Logo";
import { useGetMe } from "../../queries/useGetMe";
import { Fragment, useEffect, useState } from "react";
import InstallModal from "../InstallModal";

const HeaderLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link to={to} className="[&.active]:font-bold [&.active]:underline">
      {children}
    </Link>
  );
};

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
          {user && user.admin && <HeaderLink to="/admin">Admin</HeaderLink>}

          <HeaderLink to="/">Home</HeaderLink>

          <HeaderLink to="/fixtures">Fixtures</HeaderLink>

          {user && (
            <Fragment>
              <HeaderLink to="/predictions">Predictions</HeaderLink>
              <HeaderLink to={`/profile/${user.username}`}>Profile</HeaderLink>
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
