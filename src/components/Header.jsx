import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan tema oku
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      // Eğer hiç tema yoksa veya light ise .dark sınıfını kaldır
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0 dark:from-black dark:to-black/0">
      <div className="max-w-screen-2xl w-full mx-auto px-3 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
        
        {/* Logo */}
        <h1>
          <a href="/" className="logo">
            <img
              src="/images/logo.jpg"
              width={40}
              height={40}
              alt="Gusto Logo"
              className="rounded-full"
            />
          </a>
        </h1>

        {/* Menü ve Navbar */}
        <div className="relative md:justify-self-center">
          <button
            className="menu-btn md:hidden text-white"
            onClick={() => setNavOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-rounded text-3xl">
              {navOpen ? "close" : "menu"}
            </span>
          </button>

          <Navbar navOpen={navOpen} />
        </div>

        {/* Sağ Butonlar */}
        <div className="flex items-center justify-end gap-2">
          {/* Dijital Menü */}
          <a
            href="https://online.pubhtml5.com/dltv/modp/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#e84242] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#d73333] transition"
          >
            Dijital Menü
          </a>

          {/* Tema Değiştirici */}
          <button
            onClick={toggleTheme}
            className="ml-2 bg-zinc-700 dark:bg-zinc-200 text-white dark:text-black p-2 rounded-full transition"
            title="Tema Değiştir"
            aria-pressed={isDark}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
