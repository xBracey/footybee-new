import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-shamrock-500 relative min-h-screen">
      <Header />
      <div
        className={`absolute inset-0 bottom-14 top-14 overflow-auto p-2 md:bottom-0 md:top-24 md:p-4`}
      >
        <Outlet />
      </div>
      <span className="hidden md:block">
        <TanStackRouterDevtools />
      </span>
      <MobileMenu />
    </div>
  ),
});
