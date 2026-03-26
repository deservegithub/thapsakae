import { NextResponse } from "next/server";
import { getPusherServer } from "@/lib/pusher";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const authResponse = getPusherServer().authorizeChannel(
    decodeURIComponent(socketId),
    decodeURIComponent(channelName),
    {
      user_id: (session.user as any).id,
      user_info: {
        name: session.user.name,
        email: session.user.email,
      },
    }
  );

  return NextResponse.json(authResponse);
}
