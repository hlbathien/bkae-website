// Server wrapper: fetches Process flow via Payload facade.
import { fetchProcessNodes } from "@/lib/cms-server";
import ProcessClient from "./ProcessClient";

export default async function Process() {
  const nodes = await fetchProcessNodes();
  return <ProcessClient processNodes={nodes} />;
}
