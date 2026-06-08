export interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  unit?: string;
  imageUrl: string;
  category: string;
  tag?: "Local" | "New" | "Bestseller" | "Clean" | null;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  imageUrl: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  time: string;
  difficulty: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
