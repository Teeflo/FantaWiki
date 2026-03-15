import { useParams, Link, useNavigate } from "react-router-dom";
import { FLAVORS } from "../data/flavors";
import { ArrowLeft, MapPin, Tag, ShieldCheck, Share2, Zap } from "lucide-react";
import FantaCan from "../components/FantaCan";

const FlavorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const flavor = FLAVORS.find((f) => f.id === id);

  if (!flavor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="sticker inline-block p-16 rotate-2">
          <h2 className="text-6xl font-display text-black mb-4">SAVEUR INCONNUE</h2>
          <p className="mb-8 font-bold text-xl text-gray-700">Cette canette semble avoir disparu du frigo...</p>
          <Link to="/flavors" className="bg-fanta-orange text-white px-8 py-4 rounded-xl font-display text-2xl border-4 border-black shadow-solid hover-solid-push inline-block">
            RETOUR AU CATALOGUE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-display text-2xl text-black hover:text-fanta-orange transition-colors mb-12 bg-white px-6 py-3 rounded-xl border-4 border-black shadow-solid hover-solid-push w-max"
      >
        <ArrowLeft strokeWidth={4} /> RETOUR
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visual */}
        <div className="relative group">
          <div 
            className="aspect-square rounded-2xl flex items-center justify-center relative overflow-hidden border-8 border-black shadow-solid bg-white"
          >
            {/* Pop art background */}
            <div 
              className="absolute inset-0 opacity-100"
              style={{ 
                backgroundColor: flavor.color,
                backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', 
                backgroundSize: '24px 24px' 
              }}
            ></div>
            
            <div className="absolute w-[150%] h-40 bg-white/20 -rotate-45 transform origin-center mix-blend-overlay"></div>
            
            <FantaCan 
              color={flavor.color} 
              flavorName={flavor.name} 
              isZero={flavor.isZero} 
              size="xl"
              className="animate-float z-10"
            />
          </div>
          
          {/* Fun floating elements */}
          <div className="absolute -top-8 -right-8 bg-fanta-yellow text-black p-6 rounded-full font-display text-2xl shadow-solid border-4 border-black rotate-12 animate-bounce z-20">
            FANTA-STIC !
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-3 mb-6">
            {flavor.isZero && (
              <span className="bg-black text-white px-4 py-2 rounded-xl font-display text-xl border-4 border-black shadow-solid-sm -rotate-2">ZERO SUCRES</span>
            )}
            {flavor.isLimited && (
              <span className="bg-fanta-orange text-black px-4 py-2 rounded-xl font-display text-xl border-4 border-black shadow-solid-sm rotate-2">ÉDITION LIMITÉE</span>
            )}
          </div>

          <h1 
            className="text-7xl md:text-8xl font-display text-white mb-6 leading-none"
            style={{ textShadow: '4px 4px 0px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000' }}
          >
            {flavor.name}
          </h1>
          
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="sticker px-6 py-3 flex items-center gap-3 -rotate-1">
              <Tag size={24} strokeWidth={3} className="text-fanta-orange" />
              <span className="font-display text-xl text-black">{flavor.category}</span>
            </div>
            <div className="sticker px-6 py-3 flex items-center gap-3 rotate-1">
              <MapPin size={24} strokeWidth={3} className="text-fanta-green" />
              <span className="font-display text-xl text-black">{flavor.region}</span>
            </div>
          </div>

          <div className="sticker p-8 mb-10 bg-fanta-yellow">
            <h3 className="text-3xl font-display text-black mb-4 flex items-center gap-2">
              <Zap fill="black" /> L'HISTOIRE DE CE GOÛT
            </h3>
            <p className="text-2xl font-bold text-black leading-relaxed">
              "{flavor.description}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button className="flex items-center justify-center gap-3 bg-fanta-blue text-white py-5 rounded-xl font-display text-2xl border-4 border-black shadow-solid hover-solid-push">
              <Share2 strokeWidth={3} /> PARTAGER
            </button>
            <button className="flex items-center justify-center gap-3 bg-white text-black py-5 rounded-xl font-display text-2xl border-4 border-black shadow-solid hover-solid-push">
              <ShieldCheck strokeWidth={3} /> FACT-CHECK
            </button>
          </div>
        </div>
      </div>

      {/* Cross-selling / Related */}
      <div className="mt-32 pt-16 relative">
        <div className="absolute top-0 left-0 right-0 h-2 bg-black border-y-4 border-dashed border-white"></div>
        <h2 className="text-5xl font-display text-black mb-12 text-center bg-white border-4 border-black shadow-solid py-4 max-w-2xl mx-auto -mt-24 rotate-1">VOUS AIMEREZ AUSSI...</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {FLAVORS.filter(f => f.category === flavor.category && f.id !== flavor.id).slice(0, 4).map((f, idx) => {
            const rot = idx % 2 === 0 ? "rotate-2" : "-rotate-2";
            return (
              <Link key={f.id} to={`/flavor/${f.id}`} className={`sticker p-6 text-center hover-solid-push flex flex-col items-center ${rot}`}>
                <div className="mb-4">
                  <FantaCan 
                    color={f.color} 
                    flavorName={f.name} 
                    isZero={f.isZero} 
                    size="sm"
                  />
                </div>
                <h4 className="font-display text-2xl text-black leading-tight">{f.name}</h4>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default FlavorDetail;
