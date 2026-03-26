import PusherServer from "pusher";
import PusherClient from "pusher-js";

let _pusherServer: PusherServer | null = null;

export function getPusherServer() {
  if (!_pusherServer) {
    _pusherServer = new PusherServer({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      useTLS: true,
    });
  }
  return _pusherServer;
}

let _pusherClient: PusherClient | null = null;

export function getPusherClient() {
  if (!_pusherClient) {
    _pusherClient = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        authEndpoint: "/api/pusher/auth",
      }
    );
  }
  return _pusherClient;
}
