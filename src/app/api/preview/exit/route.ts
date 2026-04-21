import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

async function disable() {
  const draft = await draftMode();
  draft.disable();
  redirect("/");
}

export const GET = disable;
export const POST = disable;
