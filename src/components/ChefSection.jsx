import PropTypes from "prop-types";          // PropTypes ile props tipi kontrolü
import { useState } from "react";            // React state kullanımı için
import { FaShoppingCart, FaCheck } from "react-icons/fa"; // Sepet ve onay ikonları

const CakeCard = ({ imgSrc, title, tags, cakeLink, classes, price }) => {
  const [added, setAdded] = useState(false); // Sepete eklenme durumunu tutan state

  // Sepete ekle butonuna basıldığında çalışır
  const handleAddToCart = (e) => {
    e.stopPropagation();                      // Olayın üst elemanlara geçmesini engelle
    e.preventDefault();                       // Linkin varsayılan davranışını engelle
    setAdded(true);                          // Sepete eklendi durumuna geçir
    setTimeout(() => setAdded(false), 2000); // 2 saniye sonra durumu eski haline getir
  };

  return (
    <div
      className={
        // Kartın temel görünümü (padding, yuvarlak köşe, arka plan, hover/active renkleri, kenarlık)
        "relative p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 " +
        classes                              // Ekstra CSS sınıfları (opsiyonel)
      }
    >
      {/* Pasta görseli */}
      <figure className="img-box aspect-square rounded-lg mb-3 relative z-10">
        <img src={imgSrc} alt={title} loading="lazy" className="img-cover" />
      </figure>

      {/* Başlık, etiketler ve fiyat */}
      <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
        <div>
          {/* Pasta başlığı */}
          <h3 className="title-2 mb-1">{title}</h3>
          {/* Etiketler */}
          <div className="flex flex-wrap items-center gap-1 mb-1">
            {tags.map((label, key) => (
              <span
                key={key}
                className="h-6 text-xs text-zinc-400 bg-zinc-50/5 grid items-center px-2 rounded-lg"
              >
                {label}
              </span>
            ))}
          </div>
          {/* Fiyat */}
          <p className="text-[#e84242] font-semibold text-base">{price} ₺</p>
        </div>

        {/* Pasta ikonu kutusu */}
        <div className="w-9 h-9 rounded-lg grid place-items-center bg-green-800 text-zinc-950 shrink-0">
          <span className="material-symbols-rounded" aria-hidden="true">
            cake
          </span>
        </div>
      </div>

      {/* Sepete ekle butonu */}
      <button
        onClick={handleAddToCart}              // Tıklanınca sepete ekleme işlemi
        disabled={added}                       // Eklendiyse butonu pasifleştir
        className={`w-full mt-1.5 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 relative z-10
          ${
            added
              ? "bg-green-600 text-white cursor-default" // Eklendi durumu için renkler
              : "bg-[#e84242] text-white hover:bg-[#c73030] active:bg-[#b42a2a]" // Normal durum ve hover renkleri
          }`}
      >
        {added ? (
          <>
            <FaCheck className="text-white" /> Sepete Eklendi
          </>
        ) : (
          <>
            <FaShoppingCart /> Sepete Ekle
          </>
        )}
      </button>

      {/* Kartın tamamını kaplayan görünmez link (pasta detay sayfasına gider) */}
      <a
        href={cakeLink}                       // Pasta detay sayfası linki
        target="_blank"                      // Yeni sekmede aç
        rel="noopener noreferrer"            // Güvenlik için
        className="absolute inset-0 z-0 pointer-events-auto" // Tam kaplama, ama alt katmanda
        aria-label="Pasta detaylarını görüntüle"            // Erişilebilirlik açıklaması
      ></a>
    </div>
  );
};

CakeCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,     // Pasta resmi zorunlu
  title: PropTypes.string.isRequired,      // Pasta başlığı zorunlu
  tags: PropTypes.array.isRequired,        // Etiketler dizisi zorunlu
  cakeLink: PropTypes.string,               // Detay linki opsiyonel
  classes: PropTypes.string,                // Ek CSS sınıfları opsiyonel
  price: PropTypes.number.isRequired,      // Pasta fiyatı zorunlu
};

export default CakeCard;
