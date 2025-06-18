import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Typed from "typed.js";

const whatsappNumber = "+905527072643";

const Hero = () => {
  useEffect(() => {
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
    <section id="home" className="pt-20 lg:pt-36 px-4 sm:px-6 lg:px-0">
      <div className="container mx-auto flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        
        {/* Yazı kısmı */}
        <div className="hero-text text-center lg:text-left mb-10 lg:mb-0">
          <h2 className="headline-1 max-w-[20ch] sm:max-w-[30ch] mx-auto lg:mx-0 mt-5 mb-6 lg:mb-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            <span>Gusto Damak Tadı</span> 
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e84242] mb-6">
            <span className="typed-text"></span>
          </h2>

          {/* WhatsApp Butonu */}
          <div>
            <button
              onClick={openWhatsApp}
              className="btn btn-green px-6 py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition inline-flex items-center justify-center mx-auto lg:mx-0"
            >
              📲 WhatsApp'tan Yaz
            </button>
          </div>
        </div>

        {/* Resim kısmı */}
        <div className="hero-image w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[480px] mx-auto bg-gradient-to-t from-rose-500 via-25% via-rose-400/40 to-65% rounded-[30px] lg:rounded-[60px] overflow-hidden hover:scale-105 transition-transform duration-500 ease-in-out">
          <img
            src="/images/anasayfa.jpg"
            alt="Gusto Damak Tadı"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>

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
