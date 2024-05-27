import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Arrow } from "../components/Icons/Icons";

export const Route = createRootRoute({
  component: () => (
    <PullToRefresh
      onRefresh={() =>
        new Promise(() => {
          window.location.reload();
        })
      }
      backgroundColor="#0C5941"
      pullingContent={
        <div className="flex items-center justify-center gap-2 p-4">
          <Arrow className="h-8 w-8 rotate-180 text-white" />
          <p className="text-lg text-white">Pull to refresh</p>
        </div>
      }
      pullDownThreshold={180}
      maxPullDownDistance={220}
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
