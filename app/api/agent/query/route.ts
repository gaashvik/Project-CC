import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export const POST = async (req: Request) => {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // console.log(session.user)

  const { prompt } = await req.json();


  const res = await fetch(`${process.env.AGENT_API_URL}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id:session.user.sub, prompt }),
  });

  const data = await res.json();
  return NextResponse.json(data);
};