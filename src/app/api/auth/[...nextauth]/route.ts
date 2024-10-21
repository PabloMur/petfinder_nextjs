import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser } from "@/controllers/UserController";
import { firestore } from "@/lib/FirebaseConn";
import { User } from "@/models/UserModel";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Configuración de opciones de autenticación
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user }: { user: any }): Promise<boolean> {
      if (!user.email) {
        console.error("No se encontró el email del usuario.");
        return false;
      }

      try {
        const usersRef = firestore.collection("users");
        const query = usersRef.where("email", "==", user.email).limit(1);
        const querySnapshot = await query.get();

        let userId = "";

        if (querySnapshot.empty) {
          console.log("Usuario no existe, creando uno nuevo.");
          const newUser = new User(
            user.name || "Usuario sin nombre",
            user.email,
            user.image || "",
            [], // Lista vacía de mascotas
            "", // Phone
            "" // Address
          );

          const createdUser = (await createUser(newUser)) as any;
          userId = createdUser.id;
        } else {
          const existingUserDoc = querySnapshot.docs[0];
          userId = existingUserDoc.id;
          console.log(
            "Usuario ya existe, continuando con el inicio de sesión."
          );
        }

        user.id = userId;
        return true;
      } catch (error) {
        console.error("Error durante el proceso de inicio de sesión:", error);
        return false;
      }
    },
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id ? String(user.id) : "";
        token.email = user.email ? String(user.email) : "";
        token.name = user.name ? String(user.name) : "";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.email = token.email ? String(token.email) : "";
        session.user.name = token.name ? String(token.name) : "";
      }
      return session;
    },
  },
  pages: {
    signOut: "/",
  },
};

// Exporta los métodos HTTP
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
