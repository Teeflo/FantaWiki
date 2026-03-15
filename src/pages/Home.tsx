import { Link } from "react-router-dom";
import { CATEGORIES, FLAVORS } from "../data/flavors";
import { ArrowRight, Star, Zap } from "lucide-react";
import FantaCan from "../components/FantaCan";

const Home = () => {
  const featuredFlavors = FLAVORS.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-fanta-orange py-24 px-4 overflow-hidden border-b-8 border-black">
        {/* Background shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-fanta-yellow border-4 border-black rounded-none rotate-12 shadow-solid animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-fanta-green border-4 border-black rounded-full shadow-solid animate-float-fast"></div>
        <div className="absolute top-20 right-32 w-16 h-16 bg-fanta-blue border-4 border-white rotate-45 animate-float"></div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl text-xl font-display mb-8 shadow-solid-white -rotate-2">
            <Star fill="white" size={20} /> LA RÉFÉRENCE ULTIME
          </div>
          <h1 className="text-7xl md:text-9xl font-display text-white mb-6 text-shadow-solid-white leading-none">
            EXPLOREZ <br />
            <span className="text-fanta-blue text-shadow-solid">LE FUN !</span>
          </h1>
          <p className="text-2xl md:text-3xl text-black font-black max-w-3xl mb-12 bg-white p-4 border-4 border-black shadow-solid rotate-1">
            L'encyclopédie la plus cool et colorée répertoriant toutes les saveurs Fanta du monde entier.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            <Link to="/flavors" className="bg-fanta-blue text-white px-10 py-5 rounded-2xl font-display text-3xl flex items-center gap-3 border-4 border-black shadow-solid hover-solid-push">
              VOIR TOUT <ArrowRight strokeWidth={4} />
            </Link>
            <Link to="/countries" className="bg-fanta-green text-black px-10 py-5 rounded-2xl font-display text-3xl flex items-center gap-3 border-4 border-black shadow-solid hover-solid-push">
              PAR PAYS <GlobeIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-center mb-16 relative">
          <h2 className="text-6xl font-display text-fanta-blue text-shadow-solid relative z-10 bg-fanta-light px-8">
            CATÉGORIES
          </h2>
          <div className="absolute left-0 right-0 h-2 bg-black top-1/2 -translate-y-1/2 z-0"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => {
            const rotation = idx % 2 === 0 ? "rotate-2" : "-rotate-2";
            return (
              <Link 
                key={cat} 
                to={`/flavors?category=${cat}`}
                className={`sticker p-8 ${rotation} hover:rotate-0 transition-transform flex flex-col items-center text-center`}
              >
                <div className="w-20 h-20 bg-fanta-orange rounded-full border-4 border-black shadow-solid flex items-center justify-center mb-6">
                  <Zap className="text-white w-10 h-10" fill="white" />
                </div>
                <h3 className="text-3xl font-display text-black mb-2">{cat}</h3>
                <p className="text-fanta-blue font-bold text-lg">
                  Découvrez la sélection !
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Flavors */}
      <section className="bg-fanta-blue py-24 px-4 border-t-8 border-black relative overflow-hidden">
        {/* Background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-display text-white/5 whitespace-nowrap pointer-events-none">
          TOP SAVEURS
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-7xl font-display text-fanta-yellow text-shadow-solid-white mb-6">À NE PAS MANQUER</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredFlavors.map((flavor) => (
              <Link 
                key={flavor.id} 
                to={`/flavor/${flavor.id}`}
                className="bg-white rounded-2xl p-6 border-4 border-black shadow-solid-white hover-solid-push flex flex-col"
              >
                <div className="mb-6 flex justify-center h-64 items-center">
                  <FantaCan 
                    color={flavor.color} 
                    flavorName={flavor.name} 
                    isZero={flavor.isZero} 
                    size="md"
                    className="animate-float"
                  />
                </div>
                
                <h3 className="text-3xl font-display text-black mb-2 leading-none">{flavor.name}</h3>
                <div className="mt-auto pt-4 flex items-center justify-between border-t-4 border-black">
                  <span className="text-lg font-black text-fanta-blue uppercase tracking-widest">{flavor.region}</span>
                  {flavor.isZero && (
                    <span className="bg-black text-white px-3 py-1 rounded-md font-display text-lg">ZERO</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);

export default Home;
