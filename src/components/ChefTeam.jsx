import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { FaStar, FaRegStar } from "react-icons/fa";

const chefs = [
    {
    name: "Kurucumuz Yalçın Zehir",
    image: "/public/images/sefler/yalcin.jpg",
    bio: "Kurucumuz Yalçın ZEHİR .",
    since: 2022,
    stars: 5,
    socials: {
      instagram: "https://www.instagram.com/yalcin.zehir28/"
    },
    reviews: [
      { user: "Doruk", comment: "Disiplini harikadır" }
    ]
  },
  {
   name: "Fronted Developer Ilgın Habibe Yürekçi",
   image: "/public/images/sefler/ilgin.jpg",
   bio: "Gusto Damak Tadında 2024 ten beri Fronted Developer olarak görev yapmaktadır.",
   since: 2024,
   stars: 4,
   socials: {
     instagram: "https://www.instagram.com/ilginyurekci/",
     linkedin: "https://www.linkedin.com/in/ilg%C4%B1n-habibe-y%C3%BCrek%C3%A7i-188ba5279/",
   },
   reviews: [
     { user: "Zehra", comment: "Kullanıcı dostu değil" },
     { user: "Asiye", comment: "Profosyonel olma yolunda" },
  ]
  },   
  {
    name: "Müdürümüz Veysel Guguk",
    image: "/public/images/sefler/veysel.png",
    bio: "Açıldığı Yıldan beridir Gusto Damak Tadı'nda müdürlük yapıyor.",
    since: 2022,
    stars: 5,
    socials: {
      instagram: "https://www.instagram.com/vguguk/"
    },
    reviews: [
      { user: "Mert", comment: "Disiplini harikadır" }
    ]
  },
    {
    name: "Şef Eyüp Güner",
    image: "/public/images/sefler/eyup.png",
    bio: "Açıldığı Yıldan beridir Gusto Damak Tadı'nda şeflik yapıyor.",
    since: 2022,
    stars: 4,
    socials: {
      instagram: "https://www.instagram.com/eyupgunr/"
    },
    reviews: [
      { user: "Zeynep", comment: "Efsane Pastaları!" },
      { user: "Can", comment: "Gerçek bir şef!" },
]
  },   

];

const ChefTeam = () => {
  useEffect(() => {
    ScrollReveal().reveal(".chef-card", {
      origin: "bottom",
      distance: "60px",
      duration: 1500,
      delay: 100,
      reset: true,
      interval: 200
    });
  }, []);
    
  const renderStars = (count) => {
    return (
      <>
        {[...Array(5)].map((_, i) =>
          i < count ? (
            <FaStar key={i} className="text-yellow-400" />
          ) : (
            <FaRegStar key={i} className="text-gray-300" />
          )
        )}
      </>
    );
  };

  return (
    <section className="section bg-white text-black">
      <div className="container">
        <h2 className="headline-2 mb-4">Profesyonel Kadromuz</h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
          {chefs.map((chef, index) => (
            <div
              key={index}
              className="chef-card p-4 rounded-2xl bg-[#fefefe] border shadow-md hover:shadow-lg transition"
            >
              <img
                src={chef.image}
                alt={chef.name}
                className="rounded-xl w-full h-52 object-cover mb-3"
              />
              <h3 className="text-xl font-semibold text-[#e84242]">{chef.name}</h3>
              <p className="text-sm text-zinc-600 mb-2">{chef.bio}</p>
              <p className="text-xs text-zinc-500 mb-1">
                Gusto'da {new Date().getFullYear() - chef.since} yıldır çalışıyor
              </p>

              <div className="flex gap-1 mb-2">{renderStars(chef.stars)}</div>

              <a
                href={chef.socials.instagram}
                className="text-[#01560fb8] text-sm underline"
                target="_blank"
                rel="noreferrer"
              >
                Instagram profili
              </a>
          
              <div className="mt-3">
                <p className="text-sm font-medium text-zinc-700">Yorumlar:</p>
                <ul className="text-sm text-zinc-500 list-disc ml-4 mt-1">
                  {chef.reviews.map((review, i) => (
                    <li key={i}>
                      <strong>{review.user}:</strong> {review.comment}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefTeam;
