import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface JWT {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
  }
}
