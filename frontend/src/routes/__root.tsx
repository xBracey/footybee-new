import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Logo from "../components/Logo";
import LogoutButton from "../components/LogoutButton";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-shamrock-500 min-h-screen">
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

            <LogoutButton />
          </div>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
