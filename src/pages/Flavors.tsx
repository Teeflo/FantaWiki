import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FLAVORS, CATEGORIES } from "../data/flavors";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import FantaCan from "../components/FantaCan";

const Flavors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  const categoryFilter = searchParams.get("category") || "Toutes";
  const statusFilter = searchParams.get("status") || "Tous";

  const filteredFlavors = useMemo(() => {
    return FLAVORS.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           f.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "Toutes" || f.category === categoryFilter;
      const matchesStatus = statusFilter === "Tous" || 
                           (statusFilter === "Zero" && f.isZero) ||
                           (statusFilter === "Limited" && f.isLimited);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const handleCategoryChange = (cat: string) => {
    setSearchParams({ category: cat, status: statusFilter });
  };

  const handleStatusChange = (status: string) => {
    setSearchParams({ category: categoryFilter, status: status });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="text-6xl md:text-8xl font-display text-fanta-orange text-shadow-solid mb-6">
          LE CATALOGUE
        </h1>
        <div className="inline-block bg-black text-white px-6 py-2 border-4 border-black shadow-solid-sm font-bold text-xl -rotate-1">
          {FLAVORS.length} VARIÉTÉS PÉTILLANTES
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-solid p-6 mb-16 border-4 border-black">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="flex-grow relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-black" strokeWidth={3} size={24} />
            <input 
              type="text"
              placeholder="Rechercher une saveur..."
              className="w-full pl-14 pr-4 py-4 rounded-xl bg-fanta-light border-4 border-black focus:outline-none focus:bg-white font-bold text-xl transition-colors placeholder:text-black/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Select */}
          <div className="flex items-center gap-2">
            <div className="bg-fanta-orange p-4 border-4 border-black rounded-xl">
              <Filter size={24} strokeWidth={3} className="text-white" />
            </div>
            <select 
              className="bg-fanta-light px-4 py-4 rounded-xl font-display text-xl text-black border-4 border-black focus:outline-none focus:bg-white cursor-pointer"
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="Toutes">TOUTES CATÉGORIES</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
            </select>
          </div>

          {/* Status Select */}
          <select 
            className="bg-fanta-light px-4 py-4 rounded-xl font-display text-xl text-black border-4 border-black focus:outline-none focus:bg-white cursor-pointer"
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Tous">TOUS LES TYPES</option>
            <option value="Zero">GAMME ZERO</option>
            <option value="Limited">ÉDITIONS LIMITÉES</option>
          </select>

          {(searchTerm || categoryFilter !== "Toutes" || statusFilter !== "Tous") && (
            <button 
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 bg-black text-white font-display text-xl px-6 py-4 rounded-xl hover:bg-fanta-orange transition-colors border-4 border-black hover-solid-push"
            >
              <X strokeWidth={3} /> RESET
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredFlavors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFlavors.map((f, idx) => {
            const rotation = idx % 3 === 0 ? "rotate-1" : idx % 2 === 0 ? "-rotate-1" : "rotate-0";
            return (
            <Link 
              key={f.id} 
              to={`/flavor/${f.id}`}
              className={`bg-white rounded-xl p-6 border-4 border-black shadow-solid hover-solid-push flex flex-col ${rotation}`}
            >
              <div className="mb-6 flex justify-center h-64 items-center">
                <FantaCan 
                  color={f.color} 
                  flavorName={f.name} 
                  isZero={f.isZero} 
                  size="md"
                />
              </div>
              
              <h3 className="text-3xl font-display text-black mb-1 leading-none uppercase">
                {f.name}
              </h3>
              <p className="text-sm font-black text-fanta-blue mb-4 uppercase tracking-widest">{f.category}</p>
              
              <p className="text-gray-700 text-base font-bold mb-6 flex-grow">
                {f.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t-4 border-black">
                <span className="text-lg font-display text-black uppercase tracking-widest">{f.region}</span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-fanta-orange text-white border-2 border-black shadow-[2px_2px_0_#000]">
                  <ArrowRightSmall />
                </div>
              </div>
            </Link>
            )
          })}
        </div>
      ) : (
        <div className="py-32 text-center bg-white border-4 border-black border-dashed rounded-3xl">
          <div className="text-9xl mb-6 grayscale opacity-50">🥤?</div>
          <h3 className="text-5xl font-display text-black mb-4">OUPS ! AUCUNE SAVEUR ICI</h3>
          <p className="text-xl font-bold text-gray-600">Modifiez vos filtres ou votre recherche pour trouver la pépite.</p>
        </div>
      )}
    </div>
  );
};

const ArrowRightSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default Flavors;
