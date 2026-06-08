import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { ChatMessage, Product } from "../types";

interface AskFieldAIProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { product: Product; quantity: number }[];
  onAddToCart: (p: Product) => void;
}

const PRESET_PROMPTS = [
  "What ingredients do I need for the Heritage Tomato Panzanella?",
  "How can I pair a drink with Heirloom Pecan Granola?",
  "Tell me about Coast & Field's carbon-neutral commitment",
  "Are Rainier cherries low glycemic index?"
];

export default function AskFieldAI({ isOpen, onClose, cart, onAddToCart }: AskFieldAIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "🌱 **Welcome to Venice's Culinary Guide!** I am **Field AI**, your local companion at Coast & Field.\n\nAsk me anything about our organic crop selection, seasonal recipes, kitchen pairing tips, or how to cook with the ingredients in your pantry. Highlight potential ingredients to instantly add them to your cart!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content
          })),
          currentCart: cart.map((i) => ({
            name: i.product.name,
            qty: i.quantity,
            price: i.product.price
          }))
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            role: "assistant",
            content: data.text,
            timestamp: new Date()
          }
        ]);
      } else {
        throw new Error(data.error || "Could not retrieve culinary advice");
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          role: "assistant",
          content: "☀️ **Note from Coast & Field:** I couldn't reach my local server module. Rest assured, we're on it! Let me know if you would like me to try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: "welcome-fresh",
        role: "assistant",
        content: "🌱 **Hello!** I've refreshed our conversation context. What beautiful recipes are you planning to craft today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-112 md:w-128 bg-[#fbfcfa] shadow-2xl border-l border-[#ecece8] z-50 flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-[#2a3028] text-white flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-[#dfc384] rounded-lg">
            <Sparkles className="w-4 h-4 text-[#2a3028]" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium tracking-tight">Ask Field AI</h3>
            <p className="text-[10px] text-emerald-100 font-light font-mono">CALIFORNIAN CULINARY ASSISTANT</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={clearConversation}
            title="Clear Chat Logs"
            className="p-1.5 hover:bg-emerald-800 text-emerald-100 rounded-md transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-emerald-800 text-white rounded-md transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#f8f8f4]">
        {messages.map((m) => (
          <div 
            key={m.id}
            className={`flex flex-col max-w-[85%] ${
              m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            <span className="text-[9px] text-gray-400 font-mono mb-1">
              {m.role === "user" ? "Shopper" : "Field AI"}
            </span>

            <div 
              className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                m.role === "user" 
                  ? "bg-[#2a3028] text-[#fbfcfa] rounded-tr-none" 
                  : "bg-white text-gray-800 border border-[#ecece8] rounded-tl-none font-sans"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start max-w-[85%]">
            <span className="text-[9px] text-gray-400 font-mono mb-1">Field AI is writing...</span>
            <div className="bg-white border border-[#ecece8] p-4 rounded-2xl rounded-tl-none flex items-center space-x-2 text-gray-500 text-xs">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-800" />
              <span>Matching recipes with local farm crops...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer input with prompts hint */}
      <div className="p-4 bg-white border-t border-[#ecece8] shrink-0">
        {/* Chips for fast interaction */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono mb-2">Try asking:</p>
            <div className="flex flex-col gap-1.5">
              {PRESET_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full text-left font-sans text-xs p-2.5 bg-[#fbfcfa] hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 border border-[#ecece8] rounded-xl transition duration-150 flex items-center justify-between"
                >
                  <span className="truncate">{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-2 text-emerald-800" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input area */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your culinary question here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
            className="flex-1 text-xs border border-gray-200 outline-none rounded-xl px-4 py-3 bg-[#fbfcfa] focus:border-emerald-800 transition duration-200"
            id="chat-text-input"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-[#2a3028] hover:bg-[#394237] disabled:bg-gray-200 text-white rounded-xl transition"
            id="chat-send-btn"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
