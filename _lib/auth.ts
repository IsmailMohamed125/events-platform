// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import { UserService } from "@/_lib/user";
// import { comparePassword } from "@/lib/utils";

// console.log(process.env.AUTH_GOOGLE_ID);
// const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID || "",
//       clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
//     }),
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "jsmith@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;
//         const user = await UserService.findByEmail(credentials.email as string);
//         if (!user || !user.password_hash) return null;
//         const isValid = await comparePassword(
//           credentials.password as string,
//           user.password_hash
//         );
//         if (!isValid) return null;
//         // Return user object (omit sensitive info)
//         return {
//           id: user.id,
//           email: user.email,
//           name: user.full_name,
//           image: user.avatar_url,
//         };
//       },
//     }),
//   ],
// };

// export const {
//   auth,
//   handlers: { GET, POST },
// } = NextAuth(authConfig);
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { UserService } from "@/_lib/user";
import { comparePassword } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

console.log("Auth config loaded with Google ID:", process.env.AUTH_GOOGLE_ID);

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
      profile(profile) {
        // Customize the user profile data
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await UserService.findByEmail(credentials.email as string);
        if (!user || !user.password_hash) return null;
        const isValid = await comparePassword(
          credentials.password as string,
          user.password_hash
        );
        if (!isValid) return null;
        // Return user object (omit sensitive info)
        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
          image: user.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For Google sign-in
      if (account?.provider === "google" && profile?.email) {
        try {
          // Check if user already exists
          const existingUser = await UserService.findByEmail(profile.email);

          if (!existingUser) {
            // Create a new user in our database
            console.log(
              "Creating new user from Google sign-in:",
              profile.email
            );
            await UserService.createUserFromOAuth({
              id: user.id || uuidv4(), // Use OAuth ID or generate new UUID
              email: profile.email,
              full_name: profile.name,
              avatar_url: profile.picture,
              provider: "google",
            });
          } else {
            console.log("User already exists in database:", profile.email);
            // Optionally update user info from Google
            if (
              existingUser.avatar_url !== profile.picture ||
              existingUser.full_name !== profile.name
            ) {
              await UserService.updateUser(existingUser.id, {
                avatar_url: profile.picture,
                full_name: profile.name,
              });
            }
          }
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to events page after login
      return `${baseUrl}/events`;
    },
    async session({ session, token }) {
      // Add user ID to session
      if (session?.user) {
        session.user.id = token.sub || "";
      }
      return session;
    },
    async jwt({ token, user }) {
      // Pass user ID to token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
