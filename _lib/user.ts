// import { createClient } from "@supabase/supabase-js";
// import { Database } from "@/_lib/types/supabase";
// import { hashPassword } from "@/lib/utils";
// import { v4 as uuidv4 } from "uuid";

// const supabase = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );
// // console.log(supabase);
// export class UserService {
//   // Create a new user with hashed password
//   static async createUser({
//     email,
//     password,
//     full_name,
//   }: {
//     email: string;
//     password: string;
//     full_name?: string;
//     avatar_url?: string;
//   }) {
//     const password_hash = await hashPassword(password);
//     const id = uuidv4();

//     // Add these logs:
//     console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
//     console.log(
//       "Supabase ANON KEY:",
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//     );
//     console.log("Supabase client:", supabase);
//     console.log("Insert payload:", { id, email, password_hash, full_name });

//     const { data, error } = await supabase
//       .from("profiles")
//       .insert({
//         id,
//         email,
//         password_hash,
//         full_name,
//       })
//       .select()
//       .single();

//     // Log the result:
//     console.log("Insert result:", data, error);

//     if (error) {
//       console.error("Error creating user:", error);
//       throw error;
//     }
//     return data;
//   }
//   // static async createUser({
//   //   email,
//   //   password,
//   //   full_name,
//   // }: // avatar_url,
//   // {
//   //   email: string;
//   //   password: string;
//   //   full_name?: string;
//   //   avatar_url?: string;
//   // }) {
//   //   const password_hash = await hashPassword(password);
//   //   const id = uuidv4();

//   //   const { data, error } = await supabase
//   //     .from("profiles")
//   //     .insert({
//   //       id,
//   //       email,
//   //       password_hash,
//   //       full_name,
//   //     })
//   //     .select()
//   //     .single();
//   //   if (error) {
//   //     console.error("Error creating user:", error);
//   //     throw error;
//   //   }
//   //   return data;
//   // }

//   // Find user by email
//   static async findByEmail(email: string) {
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("email", email)
//       .single();
//     if (error) return null;
//     return data;
//   }

//   // Update user info
//   static async updateUser(
//     id: string,
//     updates: Partial<Database["public"]["Tables"]["profiles"]["Update"]>
//   ) {
//     const { data, error } = await supabase
//       .from("profiles")
//       .update(updates)
//       .eq("id", id)
//       .select()
//       .single();
//     if (error) throw error;
//     return data;
//   }
// }
// import { createClient } from "@supabase/supabase-js";
// import { Database } from "@/_lib/types/supabase";
// import { hashPassword } from "@/lib/utils";
// import { v4 as uuidv4 } from "uuid";

// // Create the Supabase client
// const supabase = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export class UserService {
//   // Create a new user with hashed password
//   static async createUser({
//     email,
//     password,
//     full_name,
//   }: {
//     email: string;
//     password: string;
//     full_name?: string;
//     avatar_url?: string;
//   }) {
//     try {
//       const password_hash = await hashPassword(password);
//       const id = uuidv4();

//       // Log info for debugging
//       console.log("Attempting to insert user with email:", email);

//       // Insert the user directly with explicit columns
//       const { data, error } = await supabase
//         .from("profiles")
//         .insert({
//           id,
//           email,
//           password_hash,
//           full_name,
//           role: "user", // Ensure the role field is set if it's required
//         })
//         .select()
//         .single();

//       if (error) {
//         console.error("Error creating user:", error);
//         throw error;
//       }

//       console.log("User created successfully:", data);
//       return data;
//     } catch (error) {
//       console.error("Exception in createUser:", error);
//       throw error;
//     }
//   }

//   // Find user by email
//   static async findByEmail(email: string) {
//     try {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("email", email)
//         .single();

//       if (error) {
//         if (error.code === "PGRST116") {
//           // No rows found, not an error for our purposes
//           return null;
//         }
//         console.error("Error finding user by email:", error);
//         throw error;
//       }

//       return data;
//     } catch (error) {
//       console.error("Exception in findByEmail:", error);
//       return null;
//     }
//   }

//   // Update user info
//   static async updateUser(
//     id: string,
//     updates: Partial<Database["public"]["Tables"]["profiles"]["Update"]>
//   ) {
//     try {
//       const { data, error } = await supabase
//         .from("profiles")
//         .update(updates)
//         .eq("id", id)
//         .select()
//         .single();

//       if (error) {
//         console.error("Error updating user:", error);
//         throw error;
//       }

//       return data;
//     } catch (error) {
//       console.error("Exception in updateUser:", error);
//       throw error;
//     }
//   }
// }
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/_lib/types/supabase";
import { hashPassword } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

// Create the Supabase client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class UserService {
  // Create a new user with hashed password
  static async createUser({
    email,
    password,
    full_name,
    avatar_url,
  }: {
    email: string;
    password: string;
    full_name?: string;
    avatar_url?: string;
  }) {
    try {
      const password_hash = await hashPassword(password);
      const id = uuidv4();

      // Log info for debugging
      console.log("Attempting to create user with email:", email);

      // Insert the user directly with explicit columns
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          id,
          email,
          password_hash,
          full_name,
          avatar_url,
          role: "user", // Default role
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating user:", error);
        throw error;
      }

      console.log("User created successfully:", data);
      return data;
    } catch (error) {
      console.error("Exception in createUser:", error);
      throw error;
    }
  }

  // Create a user from OAuth (Google, etc.)
  static async createUserFromOAuth({
    id,
    email,
    full_name,
    avatar_url,
    provider,
  }: {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    provider: string;
  }) {
    try {
      console.log(`Creating user from ${provider} OAuth:`, email);

      // Insert the user from OAuth data
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          id,
          email,
          full_name,
          avatar_url,
          role: "user",
          auth_provider: provider,
        })
        .select()
        .single();

      if (error) {
        console.error(`Error creating user from ${provider}:`, error);
        throw error;
      }

      console.log(`User created successfully from ${provider}:`, data);
      return data;
    } catch (error) {
      console.error(`Exception in createUserFromOAuth (${provider}):`, error);
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows found, not an error for our purposes
          return null;
        }
        console.error("Error finding user by email:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Exception in findByEmail:", error);
      return null;
    }
  }

  // Find user by ID
  static async findById(id: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null; // User not found
        }
        console.error("Error finding user by ID:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Exception in findById:", error);
      return null;
    }
  }

  // Update user info
  static async updateUser(
    id: string,
    updates: Partial<Database["public"]["Tables"]["profiles"]["Update"]>
  ) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating user:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Exception in updateUser:", error);
      throw error;
    }
  }
}
