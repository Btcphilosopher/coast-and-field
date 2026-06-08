import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // Server-side initialization of Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY_IF_UNDEFINED",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, currentCart } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
      }

      if (!apiKey) {
        return res.json({ 
          text: "🌿 **Field AI Note:** I'm running in preview mode! To connect me to live intelligence, make sure you configure your `GEMINI_API_KEY` in the **Settings > Secrets** panel. \n\nHow can I help you browse our market catalog today?" 
        });
      }

      const systemInstruction = `You are "Field AI", the warm, friendly, and expert culinary and organic living guide for Coast & Field—a premium Californian market offering organic produce, pantry staples, artisanal prepared foods, and sustainable clean living essentials.

Your persona:
- Elegant, enthusiastic, and local to Venice / Coastal California.
- Highly knowledgeable about seasonal recipes, kitchen pairings, clean cooking, and sustainability.
- Conversational, approachable, and responsive.

Market context to use in responses:
- Featured recipes on-site:
  1. Heritage Tomato Panzanella (with crusty sourdough, heirloom tomatoes, fresh basil)
  2. Summer Green Goddess Bowl (packed with seasonal greens, dynamic herb dressing, and avocado)
  3. Strawberry Hibiscus Paletas (refreshing real-fruit popsicles)
- Popular products users love to browse (Trending now):
  - Organic Rainier Cherries ($8.99/lb)
  - De Soi Sparkling NA Apéritif ($3.49)
  - Farmshop Heirloom Granola ($8.50)
  - California Extra Virgin Olive Oil ($24.00)
  - Raaka Chocolate Coconut Milk ($6.50)
  - Suntegrity Natural Sunscreen SPF 30 ($22.00)

User Context:
- The user's active shopping cart currently has: ${JSON.stringify(currentCart || [])}.
- Refer naturally to their cart if they ask about ingredients, cooking ideas, or what else they need for their recipe!

Formatting Constraints:
- Use markdown for readability (bullet points, clear sections, bold headers).
- Keep descriptions concise but incredibly rich and appetizing.
- Sparingly use nice farm, food, and eco emojis (🌱, ☀️, 🍅, 🥑) to match the Coast & Field style. Do not use generic computer output style.`;

      // Prepare history formatted appropriately for generateContent
      const contents = messages.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.status(500).json({ error: err.message || "Failed to communicate with Field AI" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving from built files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Coast & Field Server booted and running on http://localhost:${PORT}`);
  });
}

startServer();
