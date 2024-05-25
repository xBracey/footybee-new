import { Link, useRouterState } from "@tanstack/react-router";
import { Football, Home, Pitch, Settings, User } from "../Icons/Icons";
import { useGetMe } from "../../queries/useGetMe";
import Logo from "../Logo";

const MobileItem = ({
  children,
  link,
  text,
}: {
  children: React.ReactNode;
  link: string;
  text: string;
}) => {
  const router = useRouterState();
  const isActive = router.location.pathname === link;

  return (
    <Link to={link}>
      <div
        className={`flex h-14 flex-col items-center justify-center ${
          isActive ? "text-shamrock-300" : ""
        }`}
      >
        {children}
        {text}
      </div>
    </Link>
  );
};

const DesktopItem = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => (
  <Link
    className="hover:text-shamrock-300 p-2 transition-colors duration-200"
    to={link}
  >
    {children}
  </Link>
);

const Footer = () => {
  const { data: user } = useGetMe();

  if (!user)
    return (
      <div>
        <div
          className={`bg-shamrock-800 absolute bottom-0 right-0 left-0 grid w-full grid-cols-2 items-center text-xs text-white md:hidden`}
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 1rem) - 1rem)",
          }}
        >
          <MobileItem link="/dashboard" text="Home">
            <Home className="h-6 w-6" />
          </MobileItem>
          <MobileItem link="/fixtures" text="Fixtures">
            <Pitch className="h-6 w-6" />
          </MobileItem>
        </div>

        <div className="bg-shamrock-950 absolute bottom-0 right-0 left-0 z-50 hidden h-12 w-full items-center text-xs text-white md:flex">
          <div className="mx-auto flex w-full max-w-xl items-center justify-between">
            <DesktopItem link="/dashboard">Home</DesktopItem>
            <DesktopItem link="/rules">Rules</DesktopItem>
            <DesktopItem link="/about">About</DesktopItem>
            <DesktopItem link="/leaderboard">Global Leaderboard</DesktopItem>
          </div>
        </div>
      </div>
    );

  const { admin, username } = user;

  return (
    <div>
      <div
        className={`grid items-center ${
          admin ? "grid-cols-5" : "grid-cols-4"
        } bg-shamrock-800 absolute bottom-0 right-0 left-0 w-full text-xs text-white md:hidden`}
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 1rem) - 1rem)",
        }}
      >
        <MobileItem link="/dashboard" text="Home">
          <Home className="h-6 w-6" />
        </MobileItem>

        {admin && (
          <MobileItem link="/admin" text="Admin">
            <Settings className="h-6 w-6" />
          </MobileItem>
        )}

        <MobileItem link="/fixtures" text="Fixtures">
          <Pitch className="h-6 w-6" />
        </MobileItem>
        <MobileItem link="/predictions" text="Predict">
          <Football className="h-6 w-6" />
        </MobileItem>
        <MobileItem link={`/profile/${username}`} text="Profile">
          <User className="h-6 w-6" />
        </MobileItem>
      </div>

      <div className="bg-shamrock-950 absolute bottom-0 right-0 left-0 z-50 hidden h-12 w-full items-center text-xs text-white md:flex">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between">
          <DesktopItem link="/dashboard">Home</DesktopItem>
          <DesktopItem link="/rules">Rules</DesktopItem>
          <DesktopItem link="/about">About</DesktopItem>
          <DesktopItem link="/leaderboard">Global Leaderboard</DesktopItem>
          <DesktopItem link="/logout">Logout</DesktopItem>
        </div>
      </div>
    </div>
  );
};

export default Footer;
