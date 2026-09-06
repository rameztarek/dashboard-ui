// @ts-check
import { module } from "@prisma/composer";
import lamaDevNextDashboardService from "./service.mjs";

export default module("lama-dev-next-dashboard", ({ provision }) => {
  provision(lamaDevNextDashboardService, { id: "lamadevnextdashboard" });
});
