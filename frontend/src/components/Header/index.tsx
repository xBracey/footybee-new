import { Link } from "@tanstack/react-router";
import Logo from "../Logo";
import { useGetMe } from "../../queries/useGetMe";
import { Fragment, useEffect, useState } from "react";
import InstallModal from "../InstallModal";
import { Burger } from "@mantine/core";

const HeaderLink = ({
  to,
  children,
  closeMenu,
}: {
  to: string;
  children: React.ReactNode;
  closeMenu: () => void;
}) => {
  return (
    <button onClick={closeMenu}>
      <Link
        to={to}
        className="[&.active]:font-bold [&.active]:underline hover:text-shamrock-300 p-2 text-xl transition-colors duration-200 md:text-base"
      >
        {children}
      </Link>
    </button>
  );
};

const Header = ({ scrollToTop }: { scrollToTop: () => void }) => {
  const [isInPwa, setIsInPwa] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(true);
  const [menuOpened, setMenuOpened] = useState(false);

  const { data: user } = useGetMe();

  const closeMenu = () => {
    setMenuOpened(false);
    scrollToTop();
  };

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInPwa(true);
    }
  }, []);

  return (
    <div className="bg-shamrock-800 flex h-14 items-center gap-2 px-6 text-white md:h-24">
      <div className="md:justify-normal relative mx-auto flex w-full max-w-3xl items-center justify-center">
        <Link to="/">
          <Logo />
        </Link>
        <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
          {user && user.admin && (
            <HeaderLink to="/admin" closeMenu={closeMenu}>
              Admin
            </HeaderLink>
          )}

          <HeaderLink to="/fixtures" closeMenu={closeMenu}>
            Fixtures
          </HeaderLink>

          {user && (
            <Fragment>
              <HeaderLink to="/round-predictions" closeMenu={closeMenu}>
                Predictions
              </HeaderLink>
              <HeaderLink
                to={`/profile/${user.username}`}
                closeMenu={closeMenu}
              >
                Profile
              </HeaderLink>
            </Fragment>
          )}
        </div>

        <div className="absolute right-0 top-1/2 block -translate-y-1/2 transform md:hidden">
          <Burger
            opened={menuOpened}
            onClick={() => setMenuOpened(!menuOpened)}
            color="white"
          />
        </div>

        <div
          className={`bg-shamrock-800 fixed top-14 left-0 bottom-0 z-50 w-screen ${
            menuOpened ? "left-[0vw]" : "left-[100vw]"
          } flex flex-col items-center gap-8 p-2 transition-all duration-500 md:hidden`}
        >
          <HeaderLink to="/dashboard" closeMenu={closeMenu}>
            Home
          </HeaderLink>
          <HeaderLink to="/rules" closeMenu={closeMenu}>
            Rules
          </HeaderLink>
          <HeaderLink to="/about" closeMenu={closeMenu}>
            About
          </HeaderLink>
          <HeaderLink to="/leaderboard" closeMenu={closeMenu}>
            Global Leaderboard
          </HeaderLink>
          {user ? (
            <HeaderLink to="/logout" closeMenu={closeMenu}>
              Logout
            </HeaderLink>
          ) : (
            <HeaderLink to="/login" closeMenu={closeMenu}>
              Login
            </HeaderLink>
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
