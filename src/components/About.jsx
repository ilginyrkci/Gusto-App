import { useEffect } from "react"; // React'ten useEffect hook'unu import ediyoruz
import ScrollReveal from "scrollreveal"; // ScrollReveal kütüphanesini import ediyoruz, scroll animasyonları için

// Hakkımızda bölümünde göstereceğimiz istatistikler
const aboutItems = [
  {
    label: "Sayısız Pasta Yapımı", // İstatistik başlığı
    number: 99, // İstatistik sayısı
  },
  {
    label: "Bu İşi 2022'den beri", // İstatistik başlığı
    number: 3, // İstatistik sayısı (yıl)
  },
];

const About = () => {
  // Bileşen yüklendiğinde çalışacak efekt
  useEffect(() => {
    // ScrollReveal ile sayfa aşağı kaydırıldığında .reveal-up sınıfına sahip elementleri yukarıdan aşağıya animasyonla göster
    ScrollReveal().reveal(".reveal-up", {
      origin: "bottom", // animasyon yönü aşağıdan yukarı
      distance: "80px", // hareket mesafesi
      duration: 2000, // animasyon süresi (ms)
      delay: 200, // animasyon başlangıç gecikmesi
      reset: true, // sayfa scroll yukarı inince animasyonun tekrar oynatılması
    });

    // ScrollReveal ile .about-item sınıfına sahip elementleri soldan sağa animasyonla göster
    ScrollReveal().reveal(".about-item", {
      origin: "left", // animasyon yönü soldan sağa
      distance: "50px", // hareket mesafesi
      duration: 1500, // animasyon süresi (ms)
      delay: 300, // animasyon başlangıç gecikmesi
      reset: true, // animasyonun tekrar oynatılması
      interval: 200, // aynı sınıfa sahip elementlerin animasyonlarının arasındaki gecikme
    });
  }, []); // Boş bağımlılık dizisi, sadece bileşen ilk render olduğunda çalışır

  return (
    <section id="about" className="section py-20 bg-black text-white">
      {/* Ana container - sayfa genişliği sınırlaması için */}
      <div className="container">
        {/* Hakkımızda metni ve istatistiklerin bulunduğu kutu */}
        <div className="bg-[#02521f]/10 border border-white/30 p-6 md:p-12 rounded-2xl reveal-up shadow-xl">
          {/* İçerik flex yapıda, mobilde dikey, masaüstünde yatay */}
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Metin alanı - flex:1 ile alanı kaplar */}
            <div className="flex-1">
              {/* Başlık */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#e84242] mb-6 reveal-up">
                Biz Kimiz?
              </h2>
              {/* Açıklama metni */}
              <p className="text-white text-base md:text-lg leading-relaxed reveal-up">
                2022 yılında <span className="text-[#e84242] font-semibold">Gusto Damak Tadı</span>’nı kurarken tek bir hedefimiz vardı: <br />
                Lezzeti, keyfi ve tarzı tek çatı altında buluşturmak.
                Burası klasik bir restoran ya da sıradan bir kafe değil.
                <br />
                Gusto Damak Tadı; özenle hazırlanmış menüsü, taptaze kahveleri ve samimi ortamıyla, şehrin ortasında farklı bir dünyadır.
                <br />
                Geniş ve deneyimli kadromuzla mutfakta kalite, serviste özen, ortamda samimiyet sunuyoruz.
                <br />
                Sabah kahvaltısından akşam yemeğine, yalnız bir kahveden kalabalık sofralara kadar...
                <br />
                <span className="text-[#e84242] font-semibold">Gusto Damak Tadı’na gelen herkes bilir:</span> <br />
                İyi lezzet, iyi hissin başladığı yerdir.
              </p>
            </div>

            {/* Logo ve altındaki yazı */}
            <div className="flex flex-col items-center justify-center gap-4 about-item">
              {/* Logo görseli */}
              <img
                src="/images/logo.jpg"
                alt="Gusto Logo"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#e84242] shadow-lg"
              />
              {/* Logo altındaki yazı */}
              <p className="text-sm text-[#e84242]">Gusto Damak Tadı</p>
            </div>
          </div>

          {/* İstatistik sayılarının bulunduğu alan */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            {/* aboutItems dizisini map ile dönüp her bir istatistiği göster */}
            {aboutItems.map(({ label, number }, key) => (
              <div key={key} className="text-center about-item">
                {/* Sayı ve artı işareti */}
                <div className="text-4xl md:text-5xl font-bold text-[#e84242]">
                  {number}
                  <span className="text-2xl md:text-4xl">+</span>
                </div>
                {/* İstatistik açıklaması */}
                <p className="text-sm text-white/80 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; // Bileşeni dışarı aktar
