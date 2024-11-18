import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "Lungg" && password === "1234") {
      setUser({ username });
    } else {
      alert("Invalid credentials!");
    }
  };

  const logout = () => setUser(null);

  const isLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
