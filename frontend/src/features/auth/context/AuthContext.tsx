// import { createContext, useContext, useState, type ReactNode } from "react";
// import type { AuthUser } from "../types/auth.types";

// interface AuthContextValue {
//   user: AuthUser | null;
//   accessToken: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   setAuth: (user: AuthUser, accessToken: string) => void;
//   clearAuth: () => void;
//   setIsLoading: (value: boolean) => void;
// }

// export const AuthContext = createContext<AuthContextValue | null>(null);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<AuthUser | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const setAuth = (nextUser: AuthUser, token: string) => {
//     setUser(nextUser);
//     setAccessToken(token);
//   };

//   const clearAuth = () => {
//     setUser(null);
//     setAccessToken(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         accessToken,
//         isAuthenticated: Boolean(user && accessToken),
//         isLoading,
//         setAuth,
//         clearAuth,
//         setIsLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
// }
