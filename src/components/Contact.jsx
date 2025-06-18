import { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";
import { db } from "../data/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import SuccessPopup from "./SuccessPopup"; // Bileşeni oluşturduysan yolu doğru olmalı

const whatsappNumber = "+905527072643";

const Contact = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    ScrollReveal().reveal(".reveal-up", {
      duration: 800,
      origin: "left",
      distance: "50px",
      easing: "ease-in-out",
      reset: false,
    });
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Merhaba, Gusto Damak Tadı ile iletişime geçmek istiyorum.");
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = [
      { ref: nameRef, name: "Adınız" },
      { ref: emailRef, name: "E-posta" },
      { ref: messageRef, name: "Mesaj" },
    ];

    let valid = true;

    fields.forEach(({ ref }) => {
      if (!ref.current.value.trim()) {
        valid = false;
        ref.current.classList.add("shake", "border-red-500");
        setTimeout(() => {
          ref.current.classList.remove("shake", "border-red-500");
        }, 600);
      }
    });

    if (!valid) return;

    try {
      await addDoc(collection(db, "contactMessages"), {
        name: nameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        message: messageRef.current.value.trim(),
        createdAt: serverTimestamp(),
      });

      setShowPopup(true);
      fields.forEach(({ ref }) => (ref.current.value = ""));
    } catch (error) {
      alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Firestore Hatası:", error);
    }
  };

  return (
    <section id="contact" className="section py-20">
      <div className="container grid lg:grid-cols-2 gap-12 items-start">

        {/* SOL TARAF */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="headline-2 lg:max-w-[12ch] reveal-up relative inline-block after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-1 after:bg-red-500">
              Bize Ulaşın!
            </h2>
            <p className="text-zinc-400 mt-4 mb-10 max-w-[50ch] lg:max-w-[30ch] reveal-up">
              Düşlediğiniz lezzetleri, atmosferi ve deneyimi birlikte tasarlayalım. İletişime geçin, farkı hissedin.
            </p>
            <button
              onClick={openWhatsApp}
              className="btn btn-secondary mt-4 reveal-up"
              type="button"
            >
              📱 WhatsApp'tan Yaz
            </button>
          </div>
        </div>

        {/* SAĞ TARAF - FORM */}
        <div className="xl:pl-10 2xl:pl-20 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4 reveal-up">
              <p className="text-sm text-zinc-500">Formu doldurarak bize mesaj gönderebilirsiniz.</p>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="label reveal-up">Adınız Soyadınız</label>
                <input
                  type="text"
                  id="name"
                  ref={nameRef}
                  placeholder="Gusto Damak Tadı"
                  className="text-field reveal-up"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="label reveal-up">E-Posta</label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  placeholder="kullanici@example.com"
                  className="text-field reveal-up"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="label reveal-up">Mesaj</label>
              <textarea
                id="message"
                ref={messageRef}
                placeholder="Önerileriniz!"
                className="text-field resize-y min-h-32 max-h-80 reveal-up"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full justify-center reveal-up">
              📩 Gönder
            </button>
          </form>
        </div>
      </div>

      {/* Başarılı gönderim popup */}
      {showPopup && (
        <SuccessPopup
          message="Mesajınız başarıyla gönderildi 🎉"
          onClose={() => setShowPopup(false)}
        />
      )}
    </section>
  );
};

export default Contact;
