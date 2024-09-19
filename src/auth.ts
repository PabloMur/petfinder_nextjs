import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { firestore } from "@/lib/FirebaseConn"; // Conexión a Firebase

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // Usar JWT para sesiones
  },
  secret: process.env.JWT_SECRET, // Asegúrate de tener una clave secreta en tu .env
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        console.error("No se encontró el email del usuario.");
        return false;
      }

      const userRef = firestore.collection("users").doc(user.email);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        await userRef.set({
          name: user.name || "Usuario sin nombre",
          email: user.email,
          image: user.image || null,
          createdAt: new Date(),
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      // Cuando se inicia sesión por primera vez, agregar información al token
      if (user) {
        token.id = user.id ? String(user.id) : ""; // Convertir a string si es necesario
        token.email = user.email ? String(user.email) : ""; // Convertir a string
        token.name = user.name ? String(user.name) : ""; // Convertir a string
      }
      return token;
    },
    async session({ session, token }) {
      // Incluir el token en la sesión, asegurándose de que los valores sean strings
      session.user.id = token.id ? String(token.id) : "";
      session.user.email = token.email ? String(token.email) : "";
      session.user.name = token.name ? String(token.name) : "";
      return session;
    },
    async redirect({ baseUrl }) {
      // Redirigir al usuario a /search después de iniciar sesión
      return `${baseUrl}/search`;
    },
  },
});
