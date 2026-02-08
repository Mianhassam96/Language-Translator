"use client";

import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.scss";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <Link href="/" className="logo">
        <span className="multi">Multi</span>
        <span className="mian">Mian</span>
        <span className="x">X</span>
      </Link> 

      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/translate">Text</Link>
        <Link href="/voice">Voice</Link>
        <Link href="/file">Files</Link>

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
