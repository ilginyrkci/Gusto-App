import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-gray-800 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/public/images/anasayfa.jpg')` }} // Arka plan resmi
    >
      {/* Karartma katmanı */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* İçerik alanı (tam ortalanmış) */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 pb-10">
        {/* Başlık */}
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Gusto Damak Tadı
        </h1>

        {/* Alt açıklama */}
        <p className="text-lg sm:text-xl text-white mb-4 max-w-xl">
          Geleneksel tarifler, modern dokunuşlarla buluşuyor. Gusto ile lezzeti yeniden keşfedin.
        </p>

        {/* CTA Mesajı */}
        <p className="text-lg sm:text-xl text-white mb-4 font-medium">
          Lezzeti hemen keşfetmek için bizimle iletişime geç!
        </p>

        {/* Buton */}
        <a
          href="#contact"
          className="bg-[#02521f] text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300 animate-heartbeat"
        >
          Bizimle İletişime Geç
        </a>

        {/* Sosyal medya ikonları */}
        <div className="flex justify-center gap-4 mt-6">
          <a href="https://instagram.com/gusto" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl text-[#e84242] hover:scale-110 transition-transform" />
          </a>
          <a href="https://facebook.com/gusto" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-2xl text-white hover:scale-110 transition-transform" />
          </a>
          <a href="https://twitter.com/gusto" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-2xl text-white hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
