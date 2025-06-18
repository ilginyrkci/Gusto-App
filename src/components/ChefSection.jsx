
import ChefCard from "./ChefCard";
import chefs from "./ChefData";

const ChefSection = () => {
  return (
    <section className="section container">
      <h2 className="headline-2 text-[#e84242] mb-6">Profesyonel Şef Kadromuz</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {chefs.map((chef) => (
          <ChefCard key={chef.id} {...chef} />
        ))}
      </div>
    </section>
  );
};

export default ChefSection;
