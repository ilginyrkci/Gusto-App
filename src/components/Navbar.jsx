/**
 * @copyright Gusto Damak Tadı 2025
 * @license Apache-2.0
 */

import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Navbar bileşeni, sayfa içinde sekmeler (linkler) ile gezinmeyi sağlar.
 * - Aktif linkin altını çizen dinamik bir kutu ("active-box") vardır.
 * - Scroll ile sayfa bölümleri görünür oldukça ilgili link aktif hale gelir.
 * - Menü açılıp kapanabilir (mobil için).
 */
const Navbar = ({ navOpen }) => {
  // Son aktif link elemanı tutulur
  const lastActiveLink = useRef(null);
  // Aktif link altındaki hareketli kutu DOM referansı
  const activeBox = useRef(null);
  // Sayfadaki her bölümün DOM referansı tutulur
  const sectionRefs = useRef({});

  /**
   * Aktif link altındaki kutuyu aktif linkin konum ve boyutlarına göre ayarlar.
   * requestAnimationFrame ile animasyon/performans optimizasyonu yapılır.
   */
  const initActiveBox = () => {
    if (lastActiveLink.current && activeBox.current) {
      requestAnimationFrame(() => {
        activeBox.current.style.top = `${lastActiveLink.current.offsetTop}px`;
        activeBox.current.style.left = `${lastActiveLink.current.offsetLeft}px`;
        activeBox.current.style.width = `${lastActiveLink.current.offsetWidth}px`;
        activeBox.current.style.height = `${lastActiveLink.current.offsetHeight}px`;
      });
    }
  };

  useEffect(() => {
    /**
     * navItems dizisindeki her linkin bağlı olduğu sayfa bölümünü DOM'dan bulup kaydeder.
     */
    const updateSections = () => {
      navItems.forEach(({ link }) => {
        const sectionId = link.substring(1);
        const section = document.getElementById(sectionId);
        if (section) sectionRefs.current[sectionId] = section;
      });
    };

    /**
     * IntersectionObserver'dan gelen gözlemlerle,
     * görünürlük oranı en yüksek olan (sayfanın o kısmı) bölümü belirler.
     * Ve ona karşılık gelen linki aktif yapar.
     */
    const handleIntersection = (entries) => {
      let mostVisibleSection = null;
      let maxIntersectionRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
          mostVisibleSection = entry.target;
          maxIntersectionRatio = entry.intersectionRatio;
        }
      });

      if (mostVisibleSection) {
        const activeLink = document.querySelector(`a[href="#${mostVisibleSection.id}"]`);
        if (activeLink && lastActiveLink.current !== activeLink) {
          lastActiveLink.current?.classList.remove("active");
          activeLink.classList.add("active");
          lastActiveLink.current = activeLink;
          setTimeout(initActiveBox, 50); // Kutuyu güncelle
        }
      }
    };

    // Bölümleri DOM'dan al
    updateSections();

    // IntersectionObserver oluştur, %30 görünürlükte aktiflik tetikle
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.3],
    });

    // Her bölüm gözlemleniyor
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    // Pencere yeniden boyutlandırıldığında aktif kutuyu güncelle
    window.addEventListener("resize", initActiveBox);

    // Temizlik
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", initActiveBox);
    };
  }, []);

  /**
   * Linke tıklandığında sayfa kaydırmasını yönetir.
   * - Default davranışı engeller
   * - Scroll davranışı smooth yapılır
   * - Aktif link sınıfı ayarlanır
   */
  const activeCurrentLink = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60, // Header yüksekliği kadar offset bırak
        behavior: "smooth",
      });

      // Tüm linklerden aktif sınıfı kaldır
      document.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("active"));
      // Tıklanan linke aktif sınıfını ekle
      event.target.classList.add("active");
      lastActiveLink.current = event.target;
      setTimeout(initActiveBox, 50); // Kutuyu güncelle
    }
  };

  // Navigasyon linkleri ve her biri için className atanır
  const navItems = [
    { label: "Ana Sayfa", link: "#home", className: "nav-link" },
    { label: "Biz Kimiz", link: "#about", className: "nav-link" },
    { label: "Kadromuz", link: "#kadromuz", className: "nav-link" },
    { label: "Menümüz", link: "#cakes", className: "nav-link" },
    { label: "Bize Ulaşın", link: "#contact", className: "nav-link" },
  ];

  // Bileşen yüklendiğinde bölümleri güncelle (başka useEffect ile)
  useEffect(() => {
    navItems.forEach(({ link }) => {
      const sectionId = link.substring(1);
      sectionRefs.current[sectionId] = document.getElementById(sectionId);
    });
  }, []);

  return (
    <nav className={"navbar " + (navOpen ? "active" : "")}>
      {/* Navigasyon linkleri */}
      {navItems.map(({ label, link, className }, key) => (
        <a href={link} key={key} className={className} onClick={activeCurrentLink}>
          {label}
        </a>
      ))}

      {/* Aktif link altındaki kutu */}
      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

// PropTypes ile navOpen zorunlu ve boolean olarak belirlenir
Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;
