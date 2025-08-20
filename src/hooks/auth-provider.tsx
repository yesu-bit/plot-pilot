// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect, useState } from "react"
// // import { supabase } from "@/lib/supabase"

// interface User {
//   id: string
//   // email: string
//   name: string
// }

// interface AuthContextType {
//   user: User | null
//   signIn: (email: string, password: string) => Promise<{ error: string | null }>
//   signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>
//   signOut: () => Promise<void>
//   updateUser: (userData: Partial<User>) => void
//   isLoading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const supabase =

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       if (session?.user) {
//         setUser({
//           id: session.user.id,
//           email: session.user.email,
//           name: session.user.user_metadata.name,
//         })
//       } else {
//         setUser(null)
//       }
//       setIsLoading(false)
//     })

//     return () => subscription.unsubscribe()
//   }, [])

//   const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
//     setIsLoading(true)

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     setIsLoading(false)

//     if (error) {
//       return { error: error.message }
//     }

//     return { error: null }
//   }

//   const signUp = async (email: string, password: string, name: string): Promise<{ error: string | null }> => {
//     setIsLoading(true)

//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { name },
//       },
//     })

//     setIsLoading(false)

//     if (error) {
//       return { error: error.message }
//     }

//     return { error: null }
//   }

//   const signOut = async () => {
//     await supabase.auth.signOut()
//   }

//   const updateUser = (userData: Partial<User>) => {
//     if (user) {
//       const updatedUser = { ...user, ...userData }
//       setUser(updatedUser)
//       // Update localStorage session for mock implementation
//       const savedSession = localStorage.getItem("storyforge-session")
//       if (savedSession) {
//         const session = JSON.parse(savedSession)
//         session.user.user_metadata.name = updatedUser.name
//         localStorage.setItem("storyforge-session", JSON.stringify(session))
//       }
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateUser, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
