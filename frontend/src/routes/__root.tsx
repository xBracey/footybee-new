import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createRootRoute({
  component: () => (
    <div
      className="bg-shamrock-500 relative overflow-auto"
      style={{ minHeight: "100dvh" }}
    >
      <Header />
      <div
        className={`absolute inset-0 bottom-14 top-14 overflow-auto p-2 pb-[calc(env(safe-area-inset-bottom,1rem)+0.5rem)] md:bottom-12 md:top-24 md:p-4 md:pb-6`}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});
