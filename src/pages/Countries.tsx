import { FLAVORS } from "../data/flavors";
import { Link } from "react-router-dom";
import { Globe2, ArrowRight } from "lucide-react";
import FantaCan from "../components/FantaCan";

const Countries = () => {
  // Group flavors by region
  const regions = FLAVORS.reduce((acc, flavor) => {
    if (!acc[flavor.region]) {
      acc[flavor.region] = [];
    }
    acc[flavor.region].push(flavor);
    return acc;
  }, {} as Record<string, typeof FLAVORS>);

  const regionList = Object.entries(regions).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-20 text-center">
        <div className="inline-flex p-6 bg-fanta-blue text-white border-4 border-black shadow-solid mb-8 -rotate-3 hover:rotate-0 transition-transform">
          <Globe2 size={64} />
        </div>
        <h1 className="text-6xl md:text-8xl font-display text-black uppercase tracking-tighter mb-4">
          LE TOUR DU <br />
          <span className="text-fanta-green text-shadow-solid">MONDE</span>
        </h1>
        <p className="text-black font-bold text-2xl bg-fanta-yellow inline-block px-6 py-2 border-4 border-black shadow-solid-sm rotate-2 mt-4">
          DÉCOUVREZ LES SPÉCIALITÉS LOCALES
        </p>
      </div>

      <div className="space-y-16">
        {regionList.map(([region, flavors], index) => {
          const rotationClass = index % 2 === 0 ? "rotate-1" : "-rotate-1";
          
          return (
            <div key={region} className={`sticker overflow-hidden ${rotationClass} hover:rotate-0 transition-transform duration-300`}>
              <div className="bg-fanta-orange p-8 flex items-center justify-between border-b-4 border-black relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-5xl font-display text-white text-shadow-solid-white uppercase tracking-widest">{region}</h2>
                  <div className="inline-block bg-black text-white px-4 py-1 mt-2 font-bold text-lg rounded-md border-2 border-black">
                    {flavors.length} SAVEURS
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 text-[10rem] opacity-20 pointer-events-none">
                  🌍
                </div>
              </div>
              
              <div className="p-8 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {flavors.map(f => (
                    <Link 
                      key={f.id} 
                      to={`/flavor/${f.id}`}
                      className="group flex items-center gap-4 p-4 rounded-xl border-4 border-transparent hover:border-black hover:bg-fanta-light transition-all hover:shadow-solid-sm"
                    >
                      <div className="flex-shrink-0">
                        <FantaCan 
                          color={f.color} 
                          flavorName={f.name} 
                          isZero={f.isZero} 
                          size="sm"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display text-2xl text-black uppercase truncate leading-tight">{f.name}</h4>
                        <p className="text-xs font-black text-fanta-blue uppercase tracking-widest mt-1">{f.category}</p>
                      </div>
                      <ArrowRight strokeWidth={4} size={20} className="ml-auto text-fanta-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fun fact section */}
      <div className="mt-24 sticker p-12 text-center relative overflow-hidden bg-fanta-blue">
        <div className="relative z-10">
          <div className="inline-block bg-fanta-yellow text-black font-display text-3xl px-6 py-2 border-4 border-black shadow-solid-sm rotate-2 mb-8">
            LE SAVIEZ-VOUS ?
          </div>
          <p className="text-white text-2xl font-bold max-w-3xl mx-auto leading-relaxed text-shadow-solid-white">
            Le Japon possède le plus grand nombre de saveurs limitées et saisonnières au monde. 
            Certaines éditions ne restent en rayon que <span className="bg-fanta-orange text-black px-2 py-1 mx-1 border-2 border-black">quelques semaines</span> !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countries;
