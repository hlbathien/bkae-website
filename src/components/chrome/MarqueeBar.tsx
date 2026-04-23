// Server wrapper: fetches Announcements via Payload facade.
import { fetchAnnouncements } from "@/lib/cms-server";
import MarqueeBarClient from "./MarqueeBarClient";

export default async function MarqueeBar() {
  const announcements = await fetchAnnouncements();
  return <MarqueeBarClient announcements={announcements} />;
}
