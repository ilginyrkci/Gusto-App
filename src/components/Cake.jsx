import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import CakeCard from "./CakeCard";
import { useSearchParams } from "react-router-dom";
import cakes from "../data/CakeData";


const Cake = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  // Sayfa açıldığında URL ve localStorage’dan arama bilgisini al
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const savedSearch = localStorage.getItem("cakeSearch") || "";
    setSearch(urlSearch || savedSearch);
  }, []);

  // ScrollReveal animasyonları
  useEffect(() => {
    ScrollReveal().reveal(".reveal-up", {
      origin: "bottom",
      distance: "60px",
      duration: 2000,
      delay: 200,
      reset: true,
    });

    ScrollReveal().reveal(".cake-item", {
      origin: "left",
      distance: "50px",
      duration: 1500,
      delay: 200,
      reset: true,
      interval: 150,
    });
  }, []);

  // search değişince URL ve localStorage güncelle
  useEffect(() => {
    const params = {};
    if (search.trim() !== "") params.search = search.trim();

    setSearchParams(params);
    localStorage.setItem("cakeSearch", search.trim());
  }, [search, setSearchParams]);

  // Sadece arama ile filtrele
  const filteredCakes = cakes.filter((cake) =>
    cake.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="cake" className="section bg-[#000000] text-white py-16">
      <div className="container">
        <h2 className="headline-2 mb-8 text-[#e84242] reveal-up">Menümüz</h2>

        {/* Arama kutusu */}
        <div className="mb-6 reveal-up">
          <input
            type="text"
            placeholder="Menüde ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 text-black rounded-xl"
          />
        </div>

        {/* Tag filtre butonları kaldırıldı */}

        {/* Filtrelenmiş ürünler */}
        {filteredCakes.length === 0 ? (
          <p className="text-center text-white/70">Filtrene uygun pasta bulunamadı.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {filteredCakes.map((cake, i) => (
              <CakeCard
                key={i}
                imgSrc={cake.imgSrc}
                title={cake.title}
                tags={cake.tags}
                cakeLink={cake.cakeLink}
                price={cake.price}
                classes="cake-item"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Cake;