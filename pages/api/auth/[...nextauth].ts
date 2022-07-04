import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.id = token.sub;
      return session;
    },
  },
});
