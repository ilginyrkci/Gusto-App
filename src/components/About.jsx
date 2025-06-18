import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

const aboutItems = [
  {
    label: "Sayısız Pasta Yapımı",
    number: 99,
  },
  {
    label: "Bu İşi 2022'den beri",
    number: 3,
  },
];

const About = () => {
  useEffect(() => {
    ScrollReveal().reveal(".reveal-up", {
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      delay: 200,
      reset: true,
    });

    ScrollReveal().reveal(".about-item", {
      origin: "left",
      distance: "50px",
      duration: 1500,
      delay: 300,
      reset: true,
      interval: 200,
    });
  }, []);

  return (
    <section id="about" className="section py-20 bg-black text-white">
      <div className="container">
        <div className="bg-[#02521f]/10 border border-white/30 p-6 md:p-12 rounded-2xl reveal-up shadow-xl">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* METİN ALANI */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#e84242] mb-6 reveal-up">
                Biz Kimiz?
              </h2>
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

            {/* LOGO */}
            <div className="flex flex-col items-center justify-center gap-4 about-item">
              <img
                src="/images/logo.jpg"
                alt="Gusto Logo"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#e84242] shadow-lg"
              />
              <p className="text-sm text-[#e84242]">Gusto Damak Tadı</p>
            </div>
          </div>

          {/* SAYILAR */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            {aboutItems.map(({ label, number }, key) => (
              <div key={key} className="text-center about-item">
                <div className="text-4xl md:text-5xl font-bold text-[#e84242]">
                  {number}
                  <span className="text-2xl md:text-4xl">+</span>
                </div>
                <p className="text-sm text-white/80 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
