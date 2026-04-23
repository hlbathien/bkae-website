// Server wrapper: fetches Stats global via Payload facade.
import { fetchStats } from "@/lib/cms-server";
import StatsClient from "./StatsClient";

export default async function Stats() {
  const stats = await fetchStats();
  return <StatsClient stats={stats} />;
}
