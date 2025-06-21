import PropTypes from 'prop-types'; // PropTypes ile bileşen propslarının türlerini kontrol etmek için import

// Birincil buton bileşeni - dolu kırmızı arka planlı, beyaz yazılı buton
const ButtonPrimary = ({
  href,           // Butonun tıklanınca yönlendireceği link (opsiyonel)
  target = '_self',// Link hedefi (yeni sekme, aynı sayfa vb.) varsayılan: aynı sekme
  label,          // Buton üzerinde gösterilecek yazı (zorunlu)
  icon,           // Buton yanında gösterilecek ikon metni (Material Symbols için)
  classes         // Ekstra Tailwind CSS sınıfları (opsiyonel)
}) => {
  // Butonun temel CSS sınıfları - inline-flex, arka plan, renkler, gölge, yuvarlaklık, geçiş animasyonları vb.
  const baseClasses = `inline-flex items-center gap-2 px-6 py-2 rounded-2xl font-medium 
    bg-[#e84242] text-white hover:bg-[#c73434] transition-colors duration-300 shadow-lg
    ${classes || ''}`;

  // Eğer href verilmişse <a> etiketi olarak render et, aksi halde <button> olarak render et
  if (href) {
    return (
      <a href={href} target={target} className={baseClasses}>
        {label} {/* Buton yazısı */}
        {icon &&  // Eğer icon varsa ikon span'ı göster
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            {icon}
          </span>
        }
      </a>
    );
  } else {
    return (
      <button className={baseClasses}>
        {label} {/* Buton yazısı */}
        {icon &&  // İkon varsa göster
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            {icon}
          </span>
        }
      </button>
    );
  }
};

// ButtonPrimary bileşeninin propslarının tip kontrolü (doğru tipte veri alıp almadığını kontrol eder)
ButtonPrimary.propTypes = {
  label: PropTypes.string.isRequired, // label zorunlu ve string olmalı
  href: PropTypes.string,              // href opsiyonel string
  target: PropTypes.string,            // target opsiyonel string
  icon: PropTypes.string,              // icon opsiyonel string
  classes: PropTypes.string            // classes opsiyonel string
};

// İkinci buton bileşeni - outline (kenarlıklı), şeffaf arka planlı, hover'da kırmızı yazı ve beyaz arka plan
const ButtonOutline = ({
  href,           // Butonun linki (opsiyonel)
  target = '_self',// Link hedefi varsayılan aynı sayfa
  label,          // Buton yazısı (zorunlu)
  icon,           // Buton ikonu (opsiyonel)
  classes         // Ek CSS sınıfları (opsiyonel)
}) => {
  // Temel CSS sınıfları - inline-flex, border, renkler, hover efektleri, gölge, geçiş animasyonu vb.
  const baseClasses = `inline-flex items-center gap-2 px-6 py-2 rounded-2xl font-medium 
    border border-white/40 text-white hover:bg-white hover:text-[#e84242] 
    transition-all duration-300 shadow-md
    ${classes || ''}`;

  // href varsa <a>, yoksa <button> olarak render et
  if (href) {
    return (
      <a href={href} target={target} className={baseClasses}>
        {label} {/* Buton yazısı */}
        {icon &&  // İkon varsa göster
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            {icon}
          </span>
        }
      </a>
    );
  } else {
    return (
      <button className={baseClasses}>
        {label} {/* Buton yazısı */}
        {icon &&  // İkon varsa göster
          <span className="material-symbols-rounded text-xl" aria-hidden="true">
            {icon}
          </span>
        }
      </button>
    );
  }
};

// ButtonOutline bileşeni için props tipi kontrolleri
ButtonOutline.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string
};

// Her iki bileşeni dışa aktar
export {
  ButtonPrimary,
  ButtonOutline
};
