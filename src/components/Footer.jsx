import { useEffect } from "react";
import { FaInstagram, FaFacebookF, FaXTwitter, FaArrowUp } from "react-icons/fa6";

// Sayfa içi bağlantılar
const sitemap = [
  { label: 'Ana Sayfa', href: '#home' },
  { label: 'Biz Kimiz', href: '#about' },
  { label: 'Menümüz', href: '#cake' },
  { label: 'Kadromuz', href: '#kadromuz' },
  { label: 'Bize Ulaşın', href: '#contact' }
];

// Sosyal medya ikonları ve bağlantıları
const socials = [
  { icon: <FaInstagram />, href: 'https://www.instagram.com/gustogiresun/' },
  { icon: <FaFacebookF />, href: 'https://www.facebook.com/profile.php?id=100077483986040' },
  { icon: <FaXTwitter />, href: 'https://x.com/gustogiresun' }
];

const Footer = () => {
  // Sayfanın en üstüne yumuşak kaydırma fonksiyonu
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll durumuna göre yukarı çık butonunun görünürlüğünü kontrol eder
  useEffect(() => {
    const button = document.getElementById("scrollToTop");

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        // 300px aşağı inildiyse butonu göster
        button.classList.remove("opacity-0", "pointer-events-none");
        button.classList.add("opacity-100", "pointer-events-auto");
      } else {
        // Yukarıdaysa butonu gizle
        button.classList.add("opacity-0", "pointer-events-none");
        button.classList.remove("opacity-100", "pointer-events-auto");
      }
    };

    // Scroll event listener ekle
    window.addEventListener("scroll", toggleVisibility);

    // Temizlik: component unmount olduğunda event listener'ı kaldır
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="section relative bg-black text-white pt-10 pb-8 px-4 sm:px-6 lg:px-0">
      <div className="container mx-auto">

        {/* ÜST KISIM - 3 Kolonlu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Site Haritası Bölümü */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Site Haritası</h3>
            <ul>
              {sitemap.map(({ label, href }, index) => (
                <li key={index}>
                  <a
                    href={href}
                    className="block text-sm text-zinc-400 py-1 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosyal Medya İkonları */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
            <div className="flex gap-6 text-2xl">
              {socials.map(({ icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition"
                  aria-label={`Gusto Damak Tadı ${sitemap[index]?.label || 'Sosyal Medya'}`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Google Maps Entegreli Konum */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Konumumuz</h3>
            <div className="w-full h-64 md:h-56 overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.3856371460647!2d38.363341376294976!3d40.90728962563679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40636dfc3a7f4133%3A0x69af20fc537dadc1!2sGusto%20Giresun!5e0!3m2!1str!2str!4v1749941311833!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl w-full h-full"
                title="Gusto Giresun Konumu"
              ></iframe>
            </div>
          </div>
        </div>

        {/* ALT KISIM - Telif Hakkı */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-10 border-t border-white/10 text-center md:text-left gap-3 md:gap-0">
          <p className="text-zinc-500 text-sm">
            &copy; 2025 <span className="text-white font-semibold">Gusto Damak Tadı</span>. Tüm hakları saklıdır.
          </p>
        </div>
      </div>

      {/* Yukarı Çık Butonu */}
      <button
        id="scrollToTop"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-[#e84242] hover:bg-[#c93c3c] text-white p-3 rounded-full shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 z-50"
        aria-label="Yukarı çık"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
