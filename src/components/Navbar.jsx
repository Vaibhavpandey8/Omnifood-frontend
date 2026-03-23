import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { gsap } from "gsap";

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (savedDarkMode) {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }

    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);

    setTimeout(() => {
      const navLinks = document.querySelectorAll(".main-nav-link");
      navLinks.forEach((link) => {
        const text = link.textContent;
        link.innerHTML = text.split("").map((char) =>
          char === " "
            ? '<span style="display:inline-block">&nbsp;</span>'
            : `<span class="bounce-letter" style="display:inline-block; transition: transform 0.2s ease, color 0.2s ease; color: inherit;">${char}</span>`
        ).join("");

        link.addEventListener("mouseenter", () => {
          link.querySelectorAll(".bounce-letter").forEach((letter, i) => {
            gsap.to(letter, { y: -5, color: "#e67e22", duration: 0.15, delay: i * 0.02 });
          });
        });

        link.addEventListener("mouseleave", () => {
          link.querySelectorAll(".bounce-letter").forEach((letter) => {
            gsap.to(letter, { y: 0, color: "inherit", duration: 0.15 });
          });
        });
      });
    }, 500);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        setLoginOpen(false);
        setLoginData({ email: "", password: "" });
      } else {
        setError(data.message || "Login failed!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="logo" alt="Omnifood logo" src="/img/omnifood-logo.png" />
      </Link>

      <div className="auth-boxes">
        <div className="login-box">
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="profile"
                  width="36"
                  height="36"
                  referrerPolicy="no-referrer"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#e67e22",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: "1.4rem", fontWeight: 500 }}>
                {user.name}
              </span>
              <Link to="/profile" style={{
                fontSize: "1.4rem",
                color: "#e67e22",
                textDecoration: "none",
                fontWeight: 500,
                padding: "0.6rem 1.2rem",
                border: "1px solid #e67e22",
                borderRadius: "9px",
                transition: "all 0.3s",
              }}>
                Profile
              </Link>
              <Link to="/orders" style={{
                fontSize: "1.4rem",
                color: "#e67e22",
                textDecoration: "none",
                fontWeight: 500,
                padding: "0.6rem 1.2rem",
                border: "1px solid #e67e22",
                borderRadius: "9px",
                transition: "all 0.3s",
              }}>
                My Orders
              </Link>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="btn-login" onClick={() => setLoginOpen(!loginOpen)}>
                Login
              </button>
              <a href="http://localhost:5000/api/auth/google" className="btn-google">
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  width="18"
                  height="18"
                  alt="Google"
                />
                Sign in with Google
              </a>
              {loginOpen && (
                <form className="login-form" onSubmit={handleLogin}>
                  {error && (
                    <p style={{ color: "red", fontSize: "1.2rem" }}>{error}</p>
                  )}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Submit"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      <nav className="main-nav">
        <ul className="main-nav-list">
          <li><Link className="main-nav-link" to="/#how">How it works</Link></li>
          <li><Link className="main-nav-link" to="/#meals">Meals</Link></li>
          <li><Link className="main-nav-link" to="/#testimonials">Testimonials</Link></li>
          <li><Link className="main-nav-link" to="/#pricing">Pricing</Link></li>
          <li><Link className="main-nav-link" to="/menu">Menu</Link></li>
          <li><Link className="main-nav-link nav-cta" to="/#cta">Try for free</Link></li>
        </ul>
      </nav>

      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <button className="btn-mobile-nav">
        <ion-icon className="icon-mobile-nav" name="menu-outline"></ion-icon>
        <ion-icon className="icon-mobile-nav" name="close-outline"></ion-icon>
      </button>
    </header>
  );
};

export default Navbar;