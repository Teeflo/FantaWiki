import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Flavors from "./pages/Flavors";
import FlavorDetail from "./pages/FlavorDetail";
import Countries from "./pages/Countries";
import { Search, Globe, Zap } from "lucide-react";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans">
        {/* Navbar Neo-brutaliste */}
        <nav className="bg-fanta-blue text-white sticky top-0 z-50 border-b-8 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center gap-2 group hover-solid-push">
                <div className="bg-fanta-orange p-2 rounded-xl border-4 border-black shadow-[4px_4px_0_#000] group-hover:shadow-none group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-all">
                  <Zap className="text-white w-8 h-8" fill="white" />
                </div>
                <span className="text-4xl font-display tracking-widest text-white text-shadow-solid ml-2">
                  FANTAWIKI
                </span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/flavors" className="flex items-center gap-2 font-display text-2xl tracking-wide hover:text-fanta-orange transition-colors">
                  <Search strokeWidth={3} /> SAVEURS
                </Link>
                <Link to="/countries" className="flex items-center gap-2 font-display text-2xl tracking-wide hover:text-fanta-green transition-colors">
                  <Globe strokeWidth={3} /> PAYS
                </Link>
                <div className="bg-fanta-orange text-black px-4 py-2 rounded-xl border-4 border-black text-xl font-display shadow-[4px_4px_0_#fff] rotate-3 hover:rotate-0 transition-transform cursor-default">
                  FAN PROJECT
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow z-10 bg-fanta-light">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavors" element={<Flavors />} />
            <Route path="/flavor/:id" element={<FlavorDetail />} />
            <Route path="/countries" element={<Countries />} />
          </Routes>
        </main>

        {/* Footer Neo-brutaliste */}
        <footer className="bg-black text-white py-16 border-t-8 border-fanta-orange relative overflow-hidden">
          <div className="absolute top-[-50px] right-[10%] text-[200px] opacity-10 font-display">WIKI</div>
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-fanta-green border-4 border-white shadow-solid-white flex items-center justify-center -rotate-6">
                <Zap size={32} fill="white" />
              </div>
            </div>
            <h2 className="text-6xl font-display mb-4 tracking-widest text-fanta-orange text-shadow-solid-white">FANTAWIKI</h2>
            <p className="text-xl font-bold max-w-lg mx-auto mb-8 font-sans">
              L'encyclopédie NON-OFFICIELLE et 100% FUN des saveurs Fanta du monde entier.
            </p>
            <div className="inline-block bg-fanta-blue text-white font-bold border-4 border-white px-6 py-3 rounded-xl shadow-solid-white">
              STAY BOLD, NOT BORING.
            </div>
            <div className="mt-12 text-sm font-bold text-gray-400">
              Ce site est un projet de fan. Fanta est une marque de The Coca-Cola Company.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
