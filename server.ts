import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock Products API
  const products = [
    {
      id: "1",
      name: "Nike Air Max 270",
      price: 150,
      description: "Legendary Air. The first ever Max Air unit created specifically for Nike Sportswear.",
      category: "Running",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
      colors: ["Red", "Black", "White"],
      sizes: [7, 8, 9, 10, 11, 12],
      modelUrl: "https://raw.githubusercontent.com/pmndrs/drei-assets/master/shoe.glb"
    },
    {
      id: "2",
      name: "Nike Air Force 1 '07",
      price: 110,
      description: "The radiance lives on in the Nike Air Force 1 '07, the basketball b-ball icon that puts a fresh spin on what you know best.",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1000",
      colors: ["White", "Black"],
      sizes: [6, 7, 8, 9, 10, 11],
      modelUrl: "https://raw.githubusercontent.com/pmndrs/drei-assets/master/shoe.glb"
    },
    {
      id: "3",
      name: "Nike ZoomX Vaporfly",
      price: 250,
      description: "The fastest shoe for your fastest performance. Reimagined to push you towards your marathon goals.",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000",
      colors: ["Neon Green", "Pink"],
      sizes: [8, 9, 10, 11],
      modelUrl: "https://raw.githubusercontent.com/pmndrs/drei-assets/master/shoe.glb"
    }
  ];

  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
