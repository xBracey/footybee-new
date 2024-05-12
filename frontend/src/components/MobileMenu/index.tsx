import { Link, useRouterState } from "@tanstack/react-router";
import { Football, Home, Pitch, Settings, User } from "../Icons/Icons";
import { useGetMe } from "../../queries/useGetMe";

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

const MobileMenu = () => {
  const { data: user } = useGetMe();

  if (!user) return null;

  const { admin, username } = user;

  return (
    <div
      className={`grid items-center ${
        admin ? "grid-cols-5" : "grid-cols-4"
      } bg-shamrock-800 absolute bottom-0 right-0 left-0 block w-full text-xs text-white md:hidden`}
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
      <MobileItem link={`/user/${username}`} text="Profile">
        <User className="h-6 w-6" />
      </MobileItem>
    </div>
  );
};

export default MobileMenu;
