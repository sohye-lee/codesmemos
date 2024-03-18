import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      id: string;
      username: string;
      image: string;
    };
  }
}
