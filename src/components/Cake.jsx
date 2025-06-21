import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import CakeCard from "./CakeCard";
import { useSearchParams } from "react-router-dom";
import cakes from "../data/CakeData";

const ITEMS_PER_PAGE = 6; // Her sayfada gösterilecek öğe sayısı

const Cake = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Aktif sayfa numarası

  // Sayfa açıldığında URL ve localStorage’dan arama ve sayfa bilgisini al
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlPage = parseInt(searchParams.get("page")) || 1;
    const savedSearch = localStorage.getItem("cakeSearch") || "";

    setSearch(urlSearch || savedSearch);
    setCurrentPage(urlPage);
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

  // search veya currentPage değişince URL ve localStorage güncelle
  useEffect(() => {
    const params = {};
    if (search.trim() !== "") params.search = search.trim();
    if (currentPage > 1) params.page = currentPage;

    setSearchParams(params);
    localStorage.setItem("cakeSearch", search.trim());
  }, [search, currentPage, setSearchParams]);

  // Arama ile filtrelenmiş pastalar
  const filteredCakes = cakes.filter((cake) =>
    cake.title.toLowerCase().includes(search.toLowerCase())
  );

  // Toplam sayfa sayısı
  const totalPages = Math.ceil(filteredCakes.length / ITEMS_PER_PAGE);

  // Geçerli sayfadaki pastalar (slice ile)
  const cakesToShow = filteredCakes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Sayfa değiştir fonksiyonu
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Yeni aramada sayfa 1'e dön
            }}
            className="w-full max-w-md px-4 py-2 text-black rounded-xl"
          />
        </div>

        {/* Filtrelenmiş ve sayfalama yapılmış pasta kartları */}
        {cakesToShow.length === 0 ? (
          <p className="text-center text-white/70">Filtrene uygun pasta bulunamadı.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {cakesToShow.map((cake, i) => (
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

        {/* Sayfalama butonları */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#e84242] rounded-xl disabled:opacity-50"
            >
              Önceki
            </button>

            {/* Sayfa numaraları */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded-xl ${
                  page === currentPage
                    ? "bg-[#c73434] font-bold"
                    : "bg-[#e84242] hover:bg-[#c73434]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#e84242] rounded-xl disabled:opacity-50"
            >
              Sonraki
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cake;
