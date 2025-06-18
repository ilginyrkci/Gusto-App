import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Typed from "typed.js";

const whatsappNumber = "+905527072643";

const Hero = () => {
  useEffect(() => {
    // ScrollReveal ayarları
    ScrollReveal({
      reset: true,
      distance: "80px",
      duration: 2000,
      delay: 200,
    });

    ScrollReveal().reveal(".hero-text", { 
      origin: "left", 
      distance: "100px", 
      duration: 2000,
      delay: 300,
      easing: "ease-in-out",
      opacity: 0,
    });

    ScrollReveal().reveal(".hero-image", { 
      origin: "top", 
      distance: "50px", 
      duration: 2200,
      delay: 500,
      easing: "ease-in-out",
      opacity: 0,
    });

    
    const typed = new Typed(".typed-text", {
      strings: ["En güncel yemekler", "En lezzetli tarifler", "En özel anlar"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      fadeOut: true,
      fadeOutDelay: 500,
    });

    // Temizlik fonksiyonu
    return () => {
      typed.destroy();
    };
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Merhaba, Gusto Damak Tadı hakkında bilgi almak istiyorum.");
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <section id="home" className="pt-28 lg:pt-36">
      <div className="container items-center lg:grid lg:grid-cols-2 lg:gap-10">
        
        {/* Yazı kısmı */}
        <div className="hero-text">
          <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10">
            <span>Gusto Damak Tadı</span> 
          </h2>
          <h2 className="text-2xl mb-5 sm:text-3xl md:text-4xl font-bold text-[#e84242]">
            <span className="typed-text"></span>
          </h2>

          {/* WhatsApp Butonu: "En lezzetli yemekler" yazısının hemen altında */}
          <div className="mt-4">
            <button
              onClick={openWhatsApp}
              className="btn btn-green px-6 py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition"
            >
              📲 WhatsApp'tan Yaz
            </button>
          </div>
        </div>

        {/* Resim kısmı */}
        <div className="hero-image">
          <figure className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[480px] mx-auto bg-gradient-to-t from-rose-500 via-25% via-rose-400/40 to-65% rounded-[30px] lg:rounded-[60px] overflow-hidden hover:scale-105 transition-transform duration-500 ease-in-out">
            <img
              src="public/images/anasayfa.jpg"
              width={656}
              height={800}
              alt="Gusto Damak Tadı"
              className="w-full h-auto"
            />
          </figure>
        </div>
      </div>

      {/* Typed.js imleç rengini CSS ile değiştirmek */}
      <style>{`
        .typed-cursor {
          color: #e84242;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default Hero;
