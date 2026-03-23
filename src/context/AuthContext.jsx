import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("omnifood_token"));

  useEffect(() => {
    const savedName = localStorage.getItem("omnifood_name");
    const savedPhoto = localStorage.getItem("omnifood_photo");
    const savedToken = localStorage.getItem("omnifood_token");

    if (savedToken) {
      setUser({ name: savedName, photo: savedPhoto });
      setToken(savedToken);
    }

    // Google OAuth redirect handle karo
    const urlParams = new URLSearchParams(window.location.search);
    const googleToken = urlParams.get("token");
    const googleName = urlParams.get("name");
    const googlePhoto = urlParams.get("photo");

    if (googleToken) {
      localStorage.setItem("omnifood_token", googleToken);
      localStorage.setItem("omnifood_name", decodeURIComponent(googleName || ""));
      localStorage.setItem("omnifood_photo", decodeURIComponent(googlePhoto || ""));
      setToken(googleToken);
      setUser({ name: decodeURIComponent(googleName), photo: decodeURIComponent(googlePhoto) });
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("omnifood_token", data.token);
    localStorage.setItem("omnifood_name", data.fullName);
    if (data.photo) localStorage.setItem("omnifood_photo", data.photo);
    setToken(data.token);
    setUser({ name: data.fullName, photo: data.photo });
  };

  const logout = () => {
    localStorage.removeItem("omnifood_token");
    localStorage.removeItem("omnifood_name");
    localStorage.removeItem("omnifood_photo");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);