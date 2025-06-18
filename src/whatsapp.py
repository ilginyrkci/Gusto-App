from flask import Flask, request, session
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Session için gerekli

@app.route("/whatsapp", methods=["POST"])
def whatsapp_reply():
    incoming_msg = request.values.get("Body", "").strip().lower()
    resp = MessagingResponse()
    msg = resp.message()

    # Session ile basit state tutma (sipariş aşaması vs.)
    user_state = session.get('state', 'main_menu')

    if user_state == 'main_menu':
        if incoming_msg in ['1', 'menü', 'menu']:
            msg.body("Menümüze buradan bakabilirsiniz: www.gustodamaktadi.com/menu\nBaşka bir şey için 0 yazabilirsiniz.")
        elif incoming_msg in ['2', 'sipariş', 'siparis']:
            session['state'] = 'ordering'
            msg.body("Sipariş moduna girdiniz. Lütfen sipariş detaylarınızı yazın. İptal için 0 yazabilirsiniz.")
        elif incoming_msg in ['3', 'çalışma saatleri', 'calisma saatleri']:
            msg.body("Çalışma saatlerimiz:\nPzt-Cum: 09:00 - 22:00\nCmt-Paz: 10:00 - 23:00\nBaşka bir soru için 0 yazabilirsiniz.")
        elif incoming_msg in ['4', 'iletişim', 'iletisim']:
            msg.body("İletişim için:\nTel: +90 555 270 26 43\nEmail: info@gustodamaktadi.com\nBaşka bir şey için 0 yazabilirsiniz.")
        elif incoming_msg == '0':
            msg.body("Hoş geldiniz! Size nasıl yardımcı olabiliriz?\n1️⃣ Menü\n2️⃣ Sipariş\n3️⃣ Çalışma Saatleri\n4️⃣ İletişim")
        else:
            msg.body("Merhaba! Lütfen aşağıdaki seçeneklerden birini seçin:\n1️⃣ Menü\n2️⃣ Sipariş\n3️⃣ Çalışma Saatleri\n4️⃣ İletişim")
    elif user_state == 'ordering':
        if incoming_msg == '0':
            session['state'] = 'main_menu'
            msg.body("Sipariş modundan çıktınız. Ana menüye döndünüz.\n1️⃣ Menü\n2️⃣ Sipariş\n3️⃣ Çalışma Saatleri\n4️⃣ İletişim")
        else:
            # Burada gerçek sipariş işlemi yapılabilir, örneğin kaydetme vs.
            msg.body(f"Siparişiniz alındı: \"{incoming_msg}\".\nTeşekkürler! Başka sipariş için devam edin veya 0 ile iptal edin.")

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
# Bu kod, Flask ve Twilio kullanarak WhatsApp üzerinden basit bir sipariş sistemi sağlar.
# Kullanıcılar menü, sipariş, çalışma saatleri ve iletişim bilgilerine eriş