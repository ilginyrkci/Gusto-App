import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { db } from "../data/firebase"; // Burayı kendi dosya yapına göre ayarla
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const whatsappNumber = "+905527072643";

const Contact = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

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

    // Basit validasyon ve hata animasyonu
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
      // Firestore'a gönderme
      await addDoc(collection(db, "contactMessages"), {
        name: nameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        message: messageRef.current.value.trim(),
        createdAt: serverTimestamp(),
      });

      alert("Mesajınız başarıyla gönderildi!");
      
      // Formu temizle
      fields.forEach(({ ref }) => (ref.current.value = ""));
    } catch (error) {
      alert("Mesaj gönderilirken hata oluştu. Lütfen tekrar deneyin.");
      console.error("Firestore gönderim hatası:", error);
    }
  };

  return (
    <section id="contact" className="section py-20">
      <div className="container grid lg:grid-cols-2 gap-12 items-start">
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

        <div className="xl:pl-10 2xl:pl-20 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4 reveal-up">
              <p className="text-sm text-zinc-500">Formu doldurarak bize mesaj gönderebilirsiniz.</p>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="label reveal-up">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Gusto Damak Tadı"
                  ref={nameRef}
                  className="text-field reveal-up"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="label reveal-up">
                  E-Posta
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="kullanici@example.com"
                  ref={emailRef}
                  className="text-field reveal-up"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="label reveal-up">
                Mesaj
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Önerileriniz!"
                ref={messageRef}
                className="text-field resize-y min-h-32 max-h-80 reveal-up"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full justify-center reveal-up"
            >
              📩 Gönder
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
