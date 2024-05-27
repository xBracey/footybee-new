import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PullToRefresh from "react-simple-pull-to-refresh";

export const Route = createRootRoute({
  component: () => (
    <PullToRefresh
      onRefresh={() =>
        new Promise(() => {
          window.location.reload();
        })
      }
      backgroundColor="#0C5941"
      className="text-white"
    >
      <div
        className="bg-shamrock-500 relative overflow-auto text-gray-900"
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
    </PullToRefresh>
  ),
});
