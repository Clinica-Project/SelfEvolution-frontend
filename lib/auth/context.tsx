import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { login as apiLogin } from "@/lib/api/auth";
import {
  getRole,
  getToken,
  removeToken,
  setRole as persistRole,
  setToken as persistToken,
} from "@/lib/auth/token";
import type { Role } from "@/types/auth";

type AuthContextValue = {
  token: string | null;
  role: Role | null;
  /** true enquanto lê o localStorage no primeiro render do client. */
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<Role>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [role, setRoleState] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTokenState(getToken());
    setRoleState(getRole());
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    const auth = await apiLogin(email, senha);
    persistToken(auth.token);
    persistRole(auth.role);
    setTokenState(auth.token);
    setRoleState(auth.role);
    return auth.role;
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
    setRoleState(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      role,
      isLoading,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, role, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }
  return context;
}
