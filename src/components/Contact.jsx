import { useEffect, useRef, useState } from "react";
import ScrollReveal from "scrollreveal";
import { db } from "../data/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import SuccessPopup from "./SuccessPopup"; // Başarılı gönderim popup bileşeni

const whatsappNumber = "+905527072643"; // WhatsApp numarası

const Contact = () => {
  // input ve textarea referansları
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // popup gösterimi için state
  const [showPopup, setShowPopup] = useState(false);

  // ScrollReveal animasyonlarını başlatır
  useEffect(() => {
    ScrollReveal().reveal(".reveal-up", {
      duration: 800,
      origin: "left",
      distance: "50px",
      easing: "ease-in-out",
      reset: false,
    });
  }, []);

  // WhatsApp mesaj penceresini açan fonksiyon
  const openWhatsApp = () => {
    const message = encodeURIComponent("Merhaba, Gusto Damak Tadı ile iletişime geçmek istiyorum.");
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`;
    window.open(url, "_blank");
  };

  // Form gönderim işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kontrol edilecek inputlar ve isimleri
    const fields = [
      { ref: nameRef, name: "Adınız" },
      { ref: emailRef, name: "E-posta" },
      { ref: messageRef, name: "Mesaj" },
    ];

    let valid = true;

    // Boş inputları kontrol et ve hatalıysa animasyon ve kırmızı border uygula
    fields.forEach(({ ref }) => {
      if (!ref.current.value.trim()) {
        valid = false;
        ref.current.classList.add("shake", "border-red-500");
        setTimeout(() => {
          ref.current.classList.remove("shake", "border-red-500");
        }, 600);
      }
    });

    // Eğer form geçerli değilse gönderimi durdur
    if (!valid) return;

    try {
      // Firestore'a mesajı kaydet
      await addDoc(collection(db, "contactMessages"), {
        name: nameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        message: messageRef.current.value.trim(),
        createdAt: serverTimestamp(),
      });

      // Başarılı popup göster, formu temizle
      setShowPopup(true);
      fields.forEach(({ ref }) => (ref.current.value = ""));
    } catch (error) {
      alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Firestore Hatası:", error);
    }
  };

  return (
    // Ana section alanı
    <section id="contact" className="section py-20">
      <div className="container grid lg:grid-cols-2 gap-12 items-start">

        {/* Sol taraf - başlık, açıklama, WhatsApp butonu */}
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

        {/* Sağ taraf - iletişim formu */}
        <div className="xl:pl-10 2xl:pl-20 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4 reveal-up">
              <p className="text-sm text-zinc-500">Formu doldurarak bize mesaj gönderebilirsiniz.</p>
            </div>

            {/* İsim ve e-posta alanları */}
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

            {/* Mesaj alanı */}
            <div className="mb-4">
              <label htmlFor="message" className="label reveal-up">Mesaj</label>
              <textarea
                id="message"
                ref={messageRef}
                placeholder="Önerileriniz!"
                className="text-field resize-y min-h-32 max-h-80 reveal-up"
              />
            </div>

            {/* Gönder butonu */}
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
