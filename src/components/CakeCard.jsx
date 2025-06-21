import PropTypes from "prop-types";
import { useState } from "react";
import { FaShoppingCart, FaCheck } from "react-icons/fa";

const CakeCard = ({ imgSrc, title, tags, cakeLink, classes, price }) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Tıklamanın yukarı tırmanmasını engeller
    e.preventDefault();  // Sayfanın yenilenmesini engeller
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={
        "relative p-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-colors " +
        classes
      }
    >
      <figure className="img-box aspect-square rounded-lg mb-4 relative z-10">
        <img src={imgSrc} alt={title} loading="lazy" className="img-cover" />
      </figure>

      <div className="flex items-center justify-between gap-4 mb-3 relative z-10">
        <div>
          <h3 className="title-1 mb-2">{title}</h3>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {tags.map((label, key) => (
              <span
                key={key}
                className="h-8 text-sm text-zinc-400 bg-zinc-50/5 grid items-center px-3 rounded-lg"
              >
                {label}
              </span>
            ))}
          </div>
          <p className="text-[#e84242] font-semibold text-lg">{price} ₺</p>
        </div>

        <div className="w-11 h-11 rounded-lg grid place-items-center bg-green-800 text-zinc-950 shrink-0">
          <span className="material-symbols-rounded" aria-hidden="true">
            cake
          </span>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={added}
        className={`w-full mt-2 py-2.5 px-4 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 relative z-10
          ${
            added
              ? "bg-green-600 text-white cursor-default"
              : "bg-[#e84242] text-white hover:bg-[#c73030] active:bg-[#b42a2a]"
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

      {/* Arka plan tıklanabilir alan (butonun altına düşürülmüş) */}
      <a
        href={cakeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-0 pointer-events-auto"
        aria-label="Pasta detaylarını görüntüle"
      ></a>
    </div>
  );
};

CakeCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  cakeLink: PropTypes.string,
  classes: PropTypes.string,
  price: PropTypes.number.isRequired,
};

export default CakeCard;
