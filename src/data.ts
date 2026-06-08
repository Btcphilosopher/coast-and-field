import { Product, Category, Recipe } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "produce",
    name: "Produce",
    subtitle: "Fresh & seasonal",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "pantry",
    name: "Pantry",
    subtitle: "Essentials & staples",
    imageUrl: "https://images.unsplash.com/photo-1590311825124-73ec5233bc0b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "prepared-foods",
    name: "Prepared Foods",
    subtitle: "Chef made, daily",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "beverages",
    name: "Beverages",
    subtitle: "Refreshing & natural",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "wellness",
    name: "Wellness",
    subtitle: "Vitamins & self care",
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "home-body",
    name: "Home & Body",
    subtitle: "Clean & conscious",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "cherries",
    name: "Organic Rainier Cherries",
    brand: "Coastal Farms",
    price: 8.99,
    unit: "lb",
    imageUrl: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&q=80&w=600",
    category: "produce",
    tag: "Local",
    description: "Sweet, juicy California rainier cherries with an elegant golden blush and honeyed flavour profile."
  },
  {
    id: "desoi",
    name: "Golden Hour Sparkling Non-Alcoholic Apéritif",
    brand: "De Soi",
    price: 3.49,
    unit: "can",
    imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600",
    category: "beverages",
    tag: "New",
    description: "Bright and snappy sparkler flavored with key botanicals: lemongrass, lemon balm, and pear."
  },
  {
    id: "granola",
    name: "Heirloom Pecan & Maple Granola",
    brand: "Farmshop",
    price: 8.50,
    unit: "bag",
    imageUrl: "https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&q=80&w=600",
    category: "pantry",
    tag: "Local",
    description: "Hand-toasted heirloom oats infused with high-altitude organic maple syrup and crunchy local pecans."
  },
  {
    id: "olive-oil",
    name: "Extra Virgin Olive Oil",
    brand: "California Olive Co.",
    price: 24.00,
    unit: "bottle",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
    category: "pantry",
    tag: "Bestseller",
    description: "Cold-pressed extra virgin olive oil made from hand-picked olives grown on California hillsides. Rich in antioxidants."
  },
  {
    id: "raaka",
    name: "Coconut Milk Unroasted Chocolate Bar",
    brand: "Raaka",
    price: 6.50,
    unit: "bar",
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92ca813b72?auto=format&fit=crop&q=80&w=600",
    category: "pantry",
    tag: "New",
    description: "Creamy stoneground coconut milk combined with premium single-origin cacao beans from cooperative farms."
  },
  {
    id: "sunscreen",
    name: "Natural Sunscreen SPF 30",
    brand: "Suntegrity",
    price: 22.00,
    unit: "tube",
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
    category: "wellness",
    tag: "Clean",
    description: "Non-nano zinc-oxide lotion protecting from both UVA & UVB rays, combined with skin-softening marine botanicals."
  },
  
  // Extra high-grade details for shopping interaction
  {
    id: "heirloom-tomatoes",
    name: "Heirloom Summer Tomatoes",
    brand: "Ojai Organics",
    price: 5.99,
    unit: "lb",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600",
    category: "produce",
    tag: "Local",
    description: "Vibrant, vine-ripened multi-color heirloom tomatoes overflowing with robust, legacy summer sweetness."
  },
  {
    id: "avocado",
    name: "Organic Haas Avocados",
    brand: "Carpinteria Groves",
    price: 1.99,
    unit: "each",
    imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600",
    category: "produce",
    tag: "Bestseller",
    description: "Perfectly buttery, premium-grade local Haas avocados with high oil content and superb flavor."
  },
  {
    id: "coldbrew-bottle",
    name: "Coast & Field Cold Brew Concentrate",
    brand: "Coast & Field",
    price: 11.00,
    unit: "bottle",
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    category: "beverages",
    tag: "New",
    description: "Bold, organic cold brew concentrate made from smooth dark roast coffee beans steeped for 16 hours."
  },
  {
    id: "sesame-noodles",
    name: "Chef's Summer Grains Sesame Salad",
    brand: "Market Kitchen",
    price: 12.50,
    unit: "bowl",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
    category: "prepared-foods",
    tag: "Clean",
    description: "Whole farro, heirloom cherry tomatoes, snappy cucumbers and roasted almonds on a bed of fresh watercress."
  },
  {
    id: "rosewater-mist",
    name: "Botanical Hydrosol Face Mist",
    brand: "Rose & Vine",
    price: 18.00,
    unit: "bottle",
    imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600",
    category: "home-body",
    tag: "Clean",
    description: "Pure steam-distilled organic rosewater and white tea leaf extract for instant skin hydration."
  }
];

export const RECIPES: Recipe[] = [
  {
    id: "panzanella",
    title: "Heritage Tomato Panzanella",
    subtitle: "A rustic Tuscan summer classic highlighting juicy vine-ripened tomatoes, torn sourdough, and fresh basil.",
    imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600",
    time: "20 mins",
    difficulty: "Easy",
    servings: "4",
    ingredients: [
      "2 lbs ripe Heirloom Tomatoes, chopped in chunks",
      "4 cups old sourdough bread, hand-torn in bite sized pieces",
      "3 tbsp California Extra Virgin Olive Oil",
      "1 small red onion, thinly sliced",
      "1 cup fresh sweet basil leaves",
      "2 tbsp red wine vinegar",
      "1 tsp Maldon flaky sea salt"
    ],
    instructions: [
      "Toss the torn sourdough pieces with 1 tablespoon of olive oil and toast at 375°F until golden crisp (about 8-10 minutes).",
      "Place tomatoes in a large colander over a bowl, sprinkle with salt, and let stand for 10 minutes to drain their natural juices.",
      "In the bowl with tomato juice, whisk in red wine vinegar, remaining olive oil, and some freshly cracked black pepper to make the dynamic dressing.",
      "Combine toasted sourdough croutons, tomatoes, sliced onions, and basil in the salad bowl. Pour dressing over other components.",
      "Toss well and allow the bread to marinade in juices for 15 minutes before serving at room temperature."
    ]
  },
  {
    id: "green-bowl",
    title: "Summer Green Goddess Bowl",
    subtitle: "Packed with seasonal green veggies, avocados, crunchy roasted active seeds, and herby sesame oil glaze.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
    time: "15 mins",
    difficulty: "Easy",
    servings: "2",
    ingredients: [
      "2 cups organic baby watercress or spinach",
      "1 ripe Haas Avocado, sliced",
      "1 cup steamed snap peas or broccolini",
      "1/2 cup organic quinoa, cooked",
      "1/4 cup mixed seeds (pumpkin, flax, sunflower)",
      "3 tbsp Greek yogurt or tahini based dressing",
      "1 tbsp freshly squeezed lime juice"
    ],
    instructions: [
      "Arrange the organic baby greens as a clean foundational layer in two elegant wooden bowls.",
      "Divide cooked quinoa, steamed snap peas, and avocado fan slices evenly across key serving quadrants.",
      "Heat a dry skillet under low flame and toast mixed seeds slightly until they click and release fragrant aroma.",
      "Drizzle dynamic lime juice and thick herby tahini dressing across veggies.",
      "Garnish with toasted seeds and serve immediately while cold."
    ]
  },
  {
    id: "hibiscus-paletas",
    title: "Strawberry Hibiscus Paletas",
    subtitle: "Refreshing, naturally sweet fruit ice pops infused with vibrant wild hibiscus tea and seasonal strawberries.",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
    time: "4 hours",
    difficulty: "Moderate",
    servings: "6",
    ingredients: [
      "3 cups sweet California Strawberries, hulled",
      "2 cups brewed organic Hibiscus tea (cooled)",
      "3 tbsp floral wildflower honey or maple syrup",
      "1 tbsp fresh lemon juice",
      "A pinch of citrus sea salt"
    ],
    instructions: [
      "Gently brew hibiscus leaves in boiling water for 10 minutes, strain, and stir in wildflower honey and lemon juice until dissolved, then cool completely.",
      "Combine California strawberries and 1/2 cup of the hibiscus tea infusion in a blender; puree until smooth.",
      "Combine the smooth puree with the rest of the sweet hibiscus infusion and a tiny pinch of salt.",
      "Pour into local reusable popsicle molds, insert wooden holders, and freeze for at least 4 hours.",
      "Dip the frozen molds briefly in warm water to release the beautiful, deep-hued paletas easily."
    ]
  }
];

export const VALUES = [
  {
    id: "neutral",
    title: "Carbon neutral",
    subtitle: "We offset 100% of deliveries and operations."
  },
  {
    id: "local",
    title: "California local",
    subtitle: "Partnering with 850+ local farms and makers."
  },
  {
    id: "nasties",
    title: "No nasties",
    subtitle: "No artificial colors, flavors or preservatives."
  },
  {
    id: "packaging",
    title: "Better packaging",
    subtitle: "100% reusable, recyclable or compostable."
  }
];
