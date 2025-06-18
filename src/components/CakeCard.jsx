/**
 * @copyright Gusto Damak Tadı 2025
 * @license Apache-2.0
 */
import PropTypes from "prop-types";

const CakeCard = ({ imgSrc, title, tags, cakeLink, classes, price }) => {
  return (
    <div
      className={
        "relative p-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-colors " +
        classes
      }
    >
      <figure className="img-box aspect-square rounded-lg mb-4">
        <img src={imgSrc} alt={title} loading="lazy" className="img-cover" />
      </figure>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="title-1 mb-3">{title}</h3>

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

          {/* Fiyat */}
          <p className="text-[#e84242] font-semibold text-lg">{price} ₺</p>
        </div>

        <div className="w-11 h-11 rounded-lg grid place-items-center bg-green-800 text-zinc-950 shrink-0">
          <span className="material-symbols-rounded" aria-hidden="true">
            cake
          </span>
        </div>
      </div>

      <a
        href={cakeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
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
