import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showOrders, setShowOrders] = useState(false); // Sipariş butonu için

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

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
    <>
      <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0 dark:from-black dark:to-black/0">
        <div className="max-w-screen-2xl w-full mx-auto px-3 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="/images/logo.jpg"
              width={40}
              height={40}
              alt="Gusto Logo"
              className="rounded-full"
            />
            <span className="text-white text-lg font-bold hidden sm:inline">Gusto</span>
          </a>

          {/* Menü */}
          <div className="relative md:justify-self-center">
            <button
              className="menu-btn md:hidden text-white"
              onClick={() => setNavOpen((prev) => !prev)}
              aria-label="Menüyü Aç/Kapat"
            >
              <span className="material-symbols-rounded text-3xl">
                {navOpen ? "close" : "menu"}
              </span>
            </button>
            <Navbar navOpen={navOpen} />
          </div>

          {/* Sağ Butonlar */}
          <div className="flex items-center justify-end gap-2">
            {/* Siparişler */}
            <button
              onClick={() => setShowOrders(true)}
              className="relative p-2 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white rounded-full hover:scale-105 transition"
              title="Siparişlerim"
            >
              <span className="material-symbols-rounded text-xl">shopping_bag</span>
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
                3
              </span>
            </button>

            {/* Dijital Menü */}
            <a
              href="https://online.pubhtml5.com/dltv/modp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#e84242] hover:bg-[#d73333] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md transition-all duration-300"
            >
              <span className="material-symbols-rounded text-base">menu_book</span>
              Dijital Menü
            </a>

            {/* Tema Butonu */}
            <button
              onClick={toggleTheme}
              className="bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white p-2 rounded-full transition hover:rotate-12"
              title="Tema Değiştir"
              aria-pressed={isDark}
            >
              <span className="text-xl">{isDark ? "☀️" : "🌙"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Siparişler Popup */}
      {showOrders && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl max-w-md w-full text-center">
            <h2 className="text-lg font-bold mb-4 text-zinc-800 dark:text-white">Siparişlerim</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Henüz bu alana bir ürün eklenmedi eklemek için  🎉
            </p>
            <button
              onClick={() => setShowOrders(false)}
              className="mt-4 px-4 py-2 rounded-xl bg-[#e84242] hover:bg-[#d73333] text-white text-sm"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
