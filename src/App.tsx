import { useState, useMemo } from "react";
import { 
  ArrowRight, 
  Plus, 
  Minus, 
  Sparkles, 
  Eye, 
  Clock, 
  Activity, 
  MapPin, 
  ThumbsUp, 
  ChevronRight, 
  AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, CATEGORIES, RECIPES, VALUES } from "./data";
import { Product, Recipe } from "./types";
import Header from "./components/Header";
import AskFieldAI from "./components/AskFieldAI";

export default function App() {
  // State managers
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [isFieldAIOpen, setIsFieldAIOpen] = useState<boolean>(false);
  const [membershipJoined, setMembershipJoined] = useState<boolean>(false);

  // Filtered Products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) => 
      prev.map((item) => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#fbfcfa] flex flex-col font-sans select-none relative" id="main-container">
      
      {/* Dynamic Navigation Header */}
      <Header
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenAI={() => setIsFieldAIOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative w-full bg-[#eef1ed] overflow-hidden" id="hero-banner">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600" 
            alt="Coast & Field fresh produce table"
            className="w-full h-full object-cover opacity-90 object-center mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-start justify-center z-10 text-white">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#dfc384] mb-3">
            ROOTED IN CALIFORNIA
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight max-w-2xl tracking-tight mb-2">
            Good food. <br />
            <span className="italic font-light text-[#dfc384]">Better</span> world.
          </h2>
          <p className="text-sm sm:text-base font-light text-slate-200 max-w-md mb-8 leading-relaxed">
            Thoughtfully sourced. Responsibly made. <br />
            Delivered with care right to your dock.
          </p>
          
          <button 
            onClick={() => { setSelectedCategory("all"); document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3.5 bg-[#dfc384] hover:bg-[#cfb478] text-[#1e241e] rounded-full text-xs font-semibold uppercase tracking-widest transition duration-300"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Sustainable Values Badge Grid */}
      <section className="w-full bg-[#fbfbf8] border-b border-[#ecece8] py-8 sm:py-12" id="values-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => (
              <div 
                key={val.id} 
                className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-[#f0f0eb] hover:shadow-sm transition"
              >
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-800 shrink-0">
                  {idx === 0 && <span className="text-lg">🍃</span>}
                  {idx === 1 && <span className="text-lg">☀️</span>}
                  {idx === 2 && <span className="text-lg">🧪</span>}
                  {idx === 3 && <span className="text-lg">📦</span>}
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#212a21]">{val.title}</h4>
                  <p className="text-xs text-gray-500 font-light mt-1">{val.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Category Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" id="categories-section">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1e241e]">Shop by category</h3>
            <p className="text-xs text-gray-400 font-light mt-1">Sourced from direct partner-organic growers</p>
          </div>
          <button 
            onClick={() => { setSelectedCategory("all"); }}
            className="text-xs text-[#2a3028] hover:text-emerald-800 font-semibold tracking-wide flex items-center space-x-1"
          >
            <span>View all</span>
            <span>➔</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`group cursor-pointer rounded-2xl overflow-hidden border transition duration-300 bg-white ${
                selectedCategory === cat.id ? "border-emerald-800 shadow-md ring-1 ring-emerald-800" : "border-[#ecece8] hover:shadow-md"
              }`}
            >
              <div className="h-28 overflow-hidden relative">
                <img 
                  src={cat.imageUrl} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-3 text-center bg-white">
                <h4 className="font-serif text-xs font-semibold text-gray-800 uppercase tracking-wider">{cat.name}</h4>
                <p className="text-[10px] text-gray-400 font-light mt-0.5">{cat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Double Side-grid Promos (For Summer Days & Membership Rewards & Cold Brew) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full" id="promo-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: For Summer Days */}
          <div className="lg:col-span-5 bg-[#f5e3d7] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden h-80">
            <div className="z-10 max-w-xs">
              <span className="text-[9px] uppercase tracking-[0.2em] text-amber-900 font-semibold font-mono">FOR SUMMER DAYS</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-amber-950 mt-3 mb-2 leading-tight">
                Bright, fresh <br />&amp; in season
              </h3>
              <button 
                onClick={() => { setSelectedCategory("produce"); document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-xs text-amber-950 hover:text-emerald-850 font-bold underline flex items-center space-x-1 mt-4"
              >
                <span>Shop Produce</span>
                <span>➔</span>
              </button>
            </div>
            {/* Decent fruit decoration */}
            <img 
              src="https://images.unsplash.com/photo-1522851613955-46f906471e46?auto=format&fit=crop&q=80&w=400" 
              alt="peaches decoration"
              className="absolute right-0 bottom-0 w-44 sm:w-56 h-44 sm:h-56 object-cover rounded-tl-full opacity-90 border-l border-t border-amber-200"
            />
          </div>

          {/* Card 2: Membership Rewards */}
          <div className="lg:col-span-4 bg-[#233524] text-[#fbfcfa] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden h-80">
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-300 font-light font-mono">MEMBER REWARDS</span>
              <h3 className="font-serif text-2xl font-light mt-3 mb-2">
                Good goes <br />further
              </h3>
              <p className="text-xs text-emerald-100 opacity-80 mt-2 max-w-xs leading-relaxed font-light">
                Earn points, get member prices, and enjoy exclusive carbon-neutral perks.
              </p>
            </div>
            
            <div className="flex items-center justify-between z-10">
              <button 
                onClick={() => { setMembershipJoined(true); }}
                className="px-5 py-2.5 bg-[#dfc384] hover:bg-[#cfb478] text-[#1e241e] text-xs font-semibold rounded-full uppercase tracking-wider transition"
              >
                {membershipJoined ? "Joined! Welcome" : "Join for free"}
              </button>
              
              <div className="w-14 h-14 rounded-full border border-emerald-400 border-dashed flex items-center justify-center animate-spin-slow">
                <span className="text-[10px] font-mono text-emerald-200 uppercase font-light">Good</span>
              </div>
            </div>
          </div>

          {/* Card 3: Cold Brew Specialty */}
          <div className="lg:col-span-3 bg-[#ebebe6] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden h-80">
            <div className="z-10">
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold font-mono">NEW EXCLUSIVE</span>
              <h3 className="font-serif text-xl text-[#1e241e] mt-3 mb-1">
                Coast &amp; Field <br />Cold Brew
              </h3>
              <p className="text-[11px] text-gray-400 mt-1">Organic. Smooth.</p>
              <button 
                onClick={() => { setSelectedCategory("beverages"); document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-xs text-gray-800 hover:text-emerald-800 font-semibold underline mt-6 block"
              >
                Shop Now
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400" 
              alt="Cold brew glass bottle" 
              className="absolute right-2 bottom-0 w-28 h-40 object-contain"
            />
          </div>

        </div>
      </section>

      {/* Main Catalog & Filtered list output */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" id="catalog-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#ecece8] mb-8 gap-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1e241e]">
              {selectedCategory === "all" ? "Trending now in California" : `Featured in ${selectedCategory}`}
            </h3>
            <p className="text-xs text-gray-400 font-light mt-1">
              Showing {filteredProducts.length} premium organic goods
            </p>
          </div>

          {/* Quick Active Search Indicator */}
          {searchQuery && (
            <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-full">
              <span>Search: <strong>"{searchQuery}"</strong></span>
              <button 
                onClick={() => setSearchQuery("")}
                className="font-bold hover:text-emerald-950 ml-1.5"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#ecece8] max-w-lg mx-auto">
            <span className="text-3xl">🧺</span>
            <h4 className="font-serif text-lg text-gray-700 mt-4">No matching goods found</h4>
            <p className="text-xs text-gray-400 mt-2">
              Try clarifying your keywords or switching your active category.
            </p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="mt-6 px-6 py-2.5 bg-[#2a3028] text-white text-xs font-semibold rounded-full font-mono uppercase tracking-widest text-[10px]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div 
                key={p.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#f0f0eb] hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                id={`product-${p.id}`}
              >
                {/* Image and Tag Container */}
                <div className="h-64 overflow-hidden relative bg-gray-50 shrink-0">
                  <img 
                    src={p.imageUrl} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  
                  {/* Tag Indicator */}
                  {p.tag && (
                    <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-wider font-sans px-2.5 py-1 rounded-full font-bold shadow-sm ${
                      p.tag === "Local" ? "bg-emerald-800 text-white" :
                      p.tag === "New" ? "bg-[#dfc384] text-gray-900" :
                      p.tag === "Bestseller" ? "bg-amber-800 text-white" :
                      "bg-[#233524] text-white"
                    }`}>
                      {p.tag}
                    </span>
                  )}

                  {/* Detail Hover Eye */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedDetailProduct(p)}
                      className="p-3 bg-white hover:bg-emerald-50 text-emerald-900 rounded-full shadow-lg transition duration-150 transform translate-y-2 group-hover:translate-y-0"
                      title="Inspect Crop"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">
                      {p.brand || "Coast Organic Grower"}
                    </span>
                    <h4 
                      onClick={() => setSelectedDetailProduct(p)}
                      className="font-serif text-base font-semibold text-[#1c241c] mt-1 hover:text-emerald-800 transition cursor-pointer"
                    >
                      {p.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed truncate-2-lines">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#f4f4f0]">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">Estimated Price</span>
                      <div className="flex items-baseline space-x-1">
                        <span className="font-serif text-lg font-bold text-[#1c241c]">${p.price.toFixed(2)}</span>
                        <span className="text-xs text-gray-400 font-light">/ {p.unit || "unit"}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(p)}
                      className="p-2.5 bg-[#2a3028] hover:bg-emerald-800 text-white rounded-xl transition duration-150 flex items-center space-x-1 group/btn"
                      id={`add-to-cart-btn-${p.id}`}
                    >
                      <Plus className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] font-mono uppercase tracking-wider px-1 font-bold">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Under Section: Recipes ("From our table") */}
      <section className="bg-[#f4f4ef] py-16" id="recipes-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#869584] font-semibold">FROM OUR TABLE</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#1e241e] mt-2 mb-4 leading-tight">
                Simple recipes, <br />seasonal ingredients
              </h3>
              <p className="text-xs text-gray-500 font-light max-w-sm leading-relaxed mb-6">
                Fresh meals created directly by our Californian market kitchen chefs. Simple to craft, delicious, and fully carbon-neutral.
              </p>
              
              <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start space-x-3.5">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-800">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-gray-800">Catering / Prep Assist</h4>
                  <p className="text-xs text-gray-500 font-light mt-1 leading-relaxed">
                    Tap any of our seasonal recipes below to view full ingredients and instantly gather what you need!
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {RECIPES.map((recipe) => (
                <div 
                  key={recipe.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-200 cursor-pointer flex flex-col h-full"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="h-44 overflow-hidden relative">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider text-gray-700">
                      {recipe.time}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="font-serif text-base text-[#1c241c] font-semibold leading-snug">{recipe.title}</h4>
                      <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed truncate-2-lines">{recipe.subtitle}</p>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-[#f4f4f0] flex justify-between items-center text-[10px] uppercase tracking-wider text-[#2a3028] font-bold">
                      <span>Explore Recipe</span>
                      <span>➔</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Ask Field AI Bottom Drawer Bar */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFieldAIOpen(!isFieldAIOpen)}
          className="bg-[#2a3028] hover:bg-[#3d453b] text-white p-4 rounded-full shadow-2xl flex items-center space-x-3 transition transform hover:scale-105 active:scale-95"
          id="ask-field-ai-trigger"
        >
          <div className="relative">
            <span className="absolute -top-1 -right-1 bg-emerald-400 w-2.5 h-2.5 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 bg-emerald-500 w-2.5 h-2.5 rounded-full"></span>
            <Sparkles className="w-5 h-5 text-[#dfc384]" />
          </div>
          <span className="text-xs uppercase tracking-widest font-mono pr-2">Ask Field AI</span>
        </button>
      </div>

      {/* Ask Field AI Chat Canvas */}
      <AskFieldAI
        isOpen={isFieldAIOpen}
        onClose={() => setIsFieldAIOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
      />

      {/* Footer Section */}
      <footer className="bg-[#1e241e] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-emerald-990 mt-auto shrink-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h1 className="font-serif text-lg uppercase tracking-tight text-[#dfc384]">COAST &amp; FIELD</h1>
            <p className="text-[11px] text-gray-400 font-light mt-3 leading-relaxed">
              Thoughtfully sourced, organic, carbon neutral grocer serving Coastal Venice beaches. Certified B-Corporation.
            </p>
            <div className="text-xs text-emerald-200 mt-4">
              📍 1210 Abbot Kinney Blvd, Venice, CA
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-gray-300">Browse Menu</h4>
            <ul className="text-xs text-gray-400 font-light space-y-2 mt-3">
              <li><button onClick={() => { setSelectedCategory("produce"); }} className="hover:text-white transition">Fresh Vegetables</button></li>
              <li><button onClick={() => { setSelectedCategory("pantry"); }} className="hover:text-white transition">Heirloom Grain Essentials</button></li>
              <li><button onClick={() => { setSelectedCategory("prepared-foods"); }} className="hover:text-white transition">Chef prepared meals</button></li>
              <li><button onClick={() => { setSelectedCategory("beverages"); }} className="hover:text-white transition">Artisanal soda &amp; cider</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-gray-300">Support &amp; Location</h4>
            <ul className="text-xs text-gray-400 font-light space-y-2 mt-3">
              <li>Contact Venice Departs</li>
              <li>Refund Terms &amp; Organic Assurance</li>
              <li>Carbon Neutral Metrics</li>
              <li>California Farm Partners (850+)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-gray-300">Ask Field AI Advisor</h4>
            <p className="text-xs text-gray-400 font-light mt-3 leading-relaxed">
              Ask our custom Gemini AI system for immediate recipes based on your active cart components.
            </p>
            <button
              onClick={() => setIsFieldAIOpen(true)}
              className="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-xs text-white rounded-lg transition text-[10px] font-mono tracking-wider"
            >
              Start Quick Dialog
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between text-xs text-gray-500 font-light">
          <p>© 2026 Coast &amp; Field. Carbon Neutral Delivery System. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#rules" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Details Modals */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRecipe(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#2a3028] bg-emerald-50 px-2.5 py-1 rounded-full font-bold">SEASONAL RECIPE</span>
                  <h3 className="font-serif text-2xl text-[#1e241e] font-semibold mt-2">{selectedRecipe.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="p-1 px-[7.5px] hover:bg-gray-100 rounded-full text-gray-500 font-mono text-xs font-semibold"
                >
                  ✕
                </button>
              </div>

              <div className="h-56 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={selectedRecipe.imageUrl} 
                  alt={selectedRecipe.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 bg-gray-50 rounded-xl mb-6 text-center text-xs">
                <div>
                  <span className="text-gray-400 font-light block">Preparation Time</span>
                  <strong className="text-gray-700 font-medium">{selectedRecipe.time}</strong>
                </div>
                <div>
                  <span className="text-gray-400 font-light block">Difficulty</span>
                  <strong className="text-gray-700 font-medium">{selectedRecipe.difficulty}</strong>
                </div>
                <div>
                  <span className="text-gray-400 font-light block">Estimated Yield</span>
                  <strong className="text-gray-700 font-medium">{selectedRecipe.servings} Servings</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-serif font-semibold text-gray-800 mb-2 border-b pb-1">Ingredients List</h4>
                  <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-emerald-700 mr-2">✔</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      // Attempt to add matching items to cart
                      const itemsToAdd = PRODUCTS.filter(p => 
                        selectedRecipe.ingredients.some(ing => ing.toLowerCase().includes(p.name.toLowerCase().split(" ")[0]))
                      );
                      itemsToAdd.forEach(item => handleAddToCart(item));
                      // Open AI Helper
                      setIsFieldAIOpen(true);
                      setSelectedRecipe(null);
                    }}
                    className="mt-6 w-full py-2.5 bg-[#2a3028] hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#dfc384]" />
                    <span>Gather Ingredients with Field AI</span>
                  </button>
                </div>

                <div>
                  <h4 className="font-serif font-semibold text-gray-800 mb-2 border-b pb-1">Instructions</h4>
                  <ol className="space-y-3 text-xs text-gray-600 font-light">
                    {selectedRecipe.instructions.map((inst, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-mono text-emerald-800 font-bold">{i+1}.</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedDetailProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDetailProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#2a3028] bg-amber-50 px-2 py-0.5 rounded-full font-bold">PRODUCT BRIEF</span>
                  <h3 className="font-serif text-xl text-[#1e241e] font-semibold mt-1">{selectedDetailProduct.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedDetailProduct(null)}
                  className="p-1 px-[7px] hover:bg-gray-100 rounded-full text-gray-400 font-mono text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="h-56 rounded-2xl overflow-hidden mb-4">
                <img 
                  src={selectedDetailProduct.imageUrl} 
                  alt={selectedDetailProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  {selectedDetailProduct.description}
                </p>

                <div className="flex items-center space-x-2 text-[11px] text-gray-600 font-light bg-gray-50 p-2.5 rounded-xl">
                  <span className="text-emerald-700">✓</span>
                  <span>Carbon neutral transportation and handling offsets complete.</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#f4f4f0]">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono">Retail Price</span>
                    <p className="text-lg font-serif font-bold text-gray-900">${selectedDetailProduct.price.toFixed(2)} / {selectedDetailProduct.unit}</p>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedDetailProduct);
                      setSelectedDetailProduct(null);
                    }}
                    className="px-6 py-2.5 bg-[#2a3028] hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
