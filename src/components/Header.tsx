import { useState } from "react";
import { Search, User, Heart, ShoppingBag, X, Trash2, CheckCircle2 } from "lucide-react";
import { Product } from "../types";

interface HeaderProps {
  cart: { product: Product; quantity: number }[];
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, qty: number) => void;
  onClearCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenAI: () => void;
}

export default function Header({
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenAI
}: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      setIsCartOpen(false);
    }, 2800);
  };

  return (
    <header className="w-full bg-[#fbfcfa] z-40 relative">
      {/* Top Alert Bar */}
      <div className="w-full bg-[#2a3028] text-white py-2 px-4 sm:px-6 md:px-8 text-xs flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 tracking-wide font-sans font-light">
        <div className="flex items-center space-x-1 hover:text-emerald-100 transition duration-150 cursor-pointer">
          <span className="inline-block">🌱</span>
          <span>Free carbon-neutral delivery on orders over $65 </span>
          <span className="text-emerald-300 font-normal">➔</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 text-emerald-100">
            <span className="inline-block text-[#dfc384]">☀️</span>
            <span className="font-medium">Venice, CA</span>
            <span className="opacity-70 font-light">72°F</span>
          </div>
          <a href="#stores" className="hover:opacity-100 opacity-80 transition">Stores</a>
          <a href="#events" className="hover:opacity-100 opacity-80 transition">Events</a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#ecece8]">
        {/* Brand Logo & Slogan */}
        <div 
          onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }} 
          className="flex items-center space-x-4 cursor-pointer group"
          id="brand-logo"
        >
          <div className="flex flex-col text-[#1e241e]">
            <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight uppercase leading-none">
              Coast &amp; Field
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-gray-400 font-light leading-none">Good Food</span>
              <span className="text-gray-300 text-[10px] font-thin">|</span>
              <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-emerald-800 font-medium leading-none">Pure &amp; Simple</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:max-w-xl relative">
          <input
            type="text"
            placeholder="Search for organic produce, pantry staples, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f4f4f0] border-0 outline-none text-sm rounded-full py-3 pl-5 pr-12 text-[#1c241c] placeholder-gray-400 focus:bg-[#ebebe5] transition duration-200"
            id="search-input"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <Search className="w-4 h-4 text-[#2a3028]" />
          </div>
        </div>

        {/* Utility Links */}
        <div className="flex items-center space-x-6 text-sm text-[#2a3028] font-sans font-medium">
          {/* Ask AI Trigger Shortcut */}
          <button 
            onClick={onOpenAI}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-full text-xs transition duration-200"
          >
            <span className="animate-pulse w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>Ask AI Guide</span>
          </button>

          <button className="flex items-center space-x-2 hover:text-[#52634d] transition duration-150 py-1" id="account-btn">
            <User className="w-4.5 h-4.5 stroke-[1.6]" />
            <span className="hidden lg:inline text-xs font-light">Account</span>
          </button>

          <button className="flex items-center space-x-2 hover:text-[#52634d] transition duration-150 py-1 relative" id="lists-btn">
            <Heart className="w-4.5 h-4.5 stroke-[1.6]" />
            <span className="hidden lg:inline text-xs font-light">Lists</span>
          </button>

          {/* Shopping Bag Trigger with Panel */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="flex items-center space-x-2 hover:text-[#52634d] transition duration-150 py-1"
              id="cart-trigger-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-4.5 h-4.5 stroke-[1.6]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-800 text-white text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-light">Cart</span>
              <span className="text-xs bg-[#e9e9e4] rounded px-1.5 py-0.5 text-[#2a3028] font-mono text-[10px]">
                {totalItems}
              </span>
            </button>

            {/* Micro Cart Slide-down Dropdown */}
            {isCartOpen && (
              <div 
                className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#fbfcfa] border border-[#ecece8] shadow-2xl rounded-2xl p-5 z-50 text-left"
                id="cart-overlay-dropdown"
              >
                <div className="flex justify-between items-center pb-3 border-b border-[#ecece8] mb-4">
                  <h3 className="font-serif text-lg text-[#1e241e] font-medium">Your Shopping Bag</h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 hover:bg-[#f4f4f0] rounded-full transition"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {checkoutComplete ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
                    <div>
                      <h4 className="font-serif text-lg text-emerald-800 font-medium">Order Placed!</h4>
                      <p className="text-xs text-gray-500 mt-1">Thank you for choosing Coast &amp; Field carbon neutral dispatch.</p>
                    </div>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 space-y-3">
                    <span className="text-2xl">🌱</span>
                    <p className="text-xs font-light">Your shopping bag is completely empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-2 text-xs text-emerald-800 hover:underline font-medium"
                    >
                      Start adding local produce
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Cart Items List */}
                    <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-3 justify-between items-start text-xs border-b border-[#ecece8] pb-3">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded bg-gray-50"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] text-gray-400 font-mono tracking-wide uppercase">{item.product.brand || "Local crop"}</span>
                            <h4 className="font-serif text-[#1e241e] truncate">{item.product.name}</h4>
                            <p className="text-gray-500 font-mono text-[10px] mt-0.5">${item.product.price.toFixed(2)} / {item.product.unit || "unit"}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2 border border-[#ecece8] rounded px-1.5 py-0.5 bg-white">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="px-1 font-mono font-bold hover:text-emerald-800 text-gray-500"
                              >
                                -
                              </button>
                              <span className="font-mono text-[10px] font-medium">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="px-1 font-mono font-bold hover:text-emerald-800 text-gray-500"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => onRemoveFromCart(item.product.id)}
                              className="text-gray-400 hover:text-red-500 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pricing details */}
                    <div className="pt-3 font-sans border-t border-[#ecece8] text-xs space-y-2">
                      <div className="flex justify-between text-gray-500">
                        <span>Delivery Offset Fees</span>
                        <span className="text-emerald-700 font-medium">FREE</span>
                      </div>
                      <div className="flex justify-between text-base font-serif text-[#192119] font-medium">
                        <span>Estimated Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {subtotal < 65 && (
                        <div className="text-[10px] text-amber-700 bg-amber-50 rounded-lg p-2 font-sans font-light">
                          Add <strong className="font-semibold">${(65 - subtotal).toFixed(2)}</strong> more to save on delivery carbon footprint offsets!
                        </div>
                      )}
                    </div>

                    {/* Checkout Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={onClearCart}
                        className="w-full font-sans text-xs py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
                      >
                        Clear Bag
                      </button>
                      <button
                        onClick={handleCheckout}
                        className="w-full font-sans text-xs py-2 bg-[#2a3028] hover:bg-[#394237] text-white rounded-lg font-medium transition text-center"
                      >
                        Checkout Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subcategory Navigation */}
      <nav className="w-full bg-[#fbfcfa] border-b border-[#ecece8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start sm:justify-center overflow-x-auto py-3 space-x-6 md:space-x-8 text-xs font-sans tracking-widest font-normal text-gray-600 no-scrollbar select-none uppercase">
            <li className="shrink-0">
              <button
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className={`pb-1 border-b-2 hover:text-[#1c241c] hover:border-emerald-800 transition ${
                  selectedCategory === "all" ? "text-[#1c241c] border-emerald-800 font-semibold" : "border-transparent"
                }`}
              >
                Shop All
              </button>
            </li>
            <li className="shrink-0">
              <button
                onClick={() => { setSelectedCategory("produce"); setSearchQuery(""); }}
                className={`pb-1 border-b-2 hover:text-[#1c241c] hover:border-emerald-800 transition ${
                  selectedCategory === "produce" ? "text-[#1c241c] border-emerald-800 font-semibold" : "border-transparent"
                }`}
              >
                Produce
              </button>
            </li>
            <li className="shrink-0">
              <button
                onClick={() => { setSelectedCategory("pantry"); setSearchQuery(""); }}
                className={`pb-1 border-b-2 hover:text-[#1c241c] hover:border-emerald-800 transition ${
                  selectedCategory === "pantry" ? "text-[#1c241c] border-emerald-800 font-semibold" : "border-transparent"
                }`}
              >
                Pantry
              </button>
            </li>
            <li className="shrink-0">
              <button
                onClick={() => { setSelectedCategory("prepared-foods"); setSearchQuery(""); }}
                className={`pb-1 border-b-2 hover:text-[#1c241c] hover:border-emerald-800 transition ${
                  selectedCategory === "prepared-foods" ? "text-[#1c241c] border-emerald-800 font-semibold" : "border-transparent"
                }`}
              >
                Prepared Foods
              </button>
            </li>
            <li className="shrink-0">
              <button
                onClick={() => { setSelectedCategory("beverages"); setSearchQuery(""); }}
                className={`pb-1 border-b-2 hover:text-[#1c241c] hover:border-emerald-800 transition ${
                  selectedCategory === "beverages" ? "text-[#1c241c] border-emerald-800 font-semibold" : "border-transparent"
                }`}
              >
                Beverages
              </button>
            </li>
            <li className="shrink-0">
              <button
                onClick={() => { setSelectedCategory("wellness"); setSearchQuery(""); }}
                className={`pb-1 border-b-2 hover:text-[#1c241c] hover:border-emerald-800 transition ${
                  selectedCategory === "wellness" ? "text-[#1c241c] border-emerald-800 font-semibold" : "border-transparent"
                }`}
              >
                Wellness
              </button>
            </li>
            <li className="shrink-0">
              <button
                onClick={() => { setSelectedCategory("home-body"); setSearchQuery(""); }}
                className={`pb-1 border-b-2 hover:text-[#1c241c] hover:border-emerald-800 transition ${
                  selectedCategory === "home-body" ? "text-[#1c241c] border-emerald-800 font-semibold" : "border-transparent"
                }`}
              >
                Home &amp; Body
              </button>
            </li>
            <li className="shrink-0">
              <span className="text-gray-300">|</span>
            </li>
            <li className="shrink-0 text-[#a94442]">
              <button className="pb-1 border-b-2 border-transparent hover:border-red-600 hover:text-red-800 transition">
                Sale
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
