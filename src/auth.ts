import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser } from "@/controllers/UserController"; // Importar el controlador para crear usuario
import { firestore } from "@/lib/FirebaseConn"; // Conexión a Firebase
import { User } from "@/models/UserModel"; // Importar el modelo de User

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

      try {
        // Realizar una consulta en la colección "users" para verificar si existe un usuario con ese email
        const usersRef = firestore.collection("users");
        console.log(user.email);
        const query = usersRef.where("email", "==", user.email).limit(1);
        const querySnapshot = await query.get();

        let userId = ""; // Variable para almacenar el ID del usuario

        // Si no se encontró ningún usuario con ese email, crear uno nuevo
        if (querySnapshot.empty) {
          console.log("Usuario no existe, creando uno nuevo.");

          const newUser = new User(
            user.name || "Usuario sin nombre", // Nombre del usuario
            user.email, // Email del usuario
            user.image || "", // Imagen de perfil
            [], // Lista vacía de mascotas
            "", //Phone
            "" // Address
          );

          // Crear el usuario en Firestore
          const createdUser = (await createUser(newUser)) as any;
          userId = createdUser.id; // Obtener el ID generado por Firebase
        } else {
          // Si el usuario ya existe, obtener el ID del documento existente
          const existingUserDoc = querySnapshot.docs[0];
          userId = existingUserDoc.id;
          console.log(
            "Usuario ya existe, continuando con el inicio de sesión."
          );
        }

        // Asignar el ID del usuario al token JWT
        user.id = userId;

        return true; // Continuar con el flujo de inicio de sesión normal
      } catch (error) {
        console.error("Error durante el proceso de inicio de sesión:", error);
        return false; // Si hay un error, el inicio de sesión falla
      }
    },
    async jwt({ token, user }) {
      // Si el usuario es nuevo, agregar el ID al token JWT
      if (user) {
        token.id = user.id ? String(user.id) : ""; // Asignar el ID del usuario a token
        token.email = user.email ? String(user.email) : ""; // Asegurar el email
        token.name = user.name ? String(user.name) : ""; // Asegurar el nombre
      }
      return token;
    },
    async session({ session, token }) {
      // Incluir el token en la sesión, asegurándonos de que los valores sean strings
      session.user.id = token.id ? String(token.id) : "";
      session.user.email = token.email ? String(token.email) : "";
      session.user.name = token.name ? String(token.name) : "";
      return session;
    },
  },
  pages: {
    signOut: "/",
  },
});
