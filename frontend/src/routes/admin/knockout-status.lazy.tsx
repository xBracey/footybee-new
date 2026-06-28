import { createLazyFileRoute } from "@tanstack/react-router";
import KnockoutStatusPage from "../../components/Admin/KnockoutStatus/KnockoutStatusPage";

export const Route = createLazyFileRoute("/admin/knockout-status")({
  component: KnockoutStatusPage,
});
