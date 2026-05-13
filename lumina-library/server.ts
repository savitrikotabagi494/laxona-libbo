import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Book, Role } from "./src/types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Database
  let books: Book[] = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      category: "Classic",
      available: true,
      coverImage: "/src/assets/images/regenerated_image_1778568789573.webp",
      description: "A novel set in the Roaring Twenties, chronicling the love story of Jay Gatsby and Daisy Buchanan.",
      publisher: "Scribner",
      pages: 180
    },
    {
      id: "2",
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "9780132350884",
      category: "Technology",
      available: false,
      coverImage: "/src/assets/images/regenerated_image_1778568883140.png",
      description: "A handbook of agile software craftsmanship, teaching the principles and practices of writing code that is easy to maintain.",
      publisher: "Prentice Hall",
      pages: 464
    },
    {
      id: "3",
      title: "Atomic Habits",
      author: "James Clear",
      isbn: "9780735211292",
      category: "Non-Fiction",
      available: true,
      coverImage: "/src/assets/images/regenerated_image_1778568887746.jpg",
      description: "An easy and proven way to build good habits and break bad ones, focused on tiny changes with big results.",
      publisher: "Avery",
      pages: 320
    },
    {
      id: "4",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      isbn: "9781250301697",
      category: "Thriller",
      available: true,
      coverImage: "/src/assets/images/regenerated_image_1778571024585.webp",
      description: "A woman shoots her husband five times in the face and then never speaks another word.",
      publisher: "Celadon Books",
      pages: 336
    },
    {
      id: "5",
      title: "The Midnight Library",
      author: "Matt Haig",
      isbn: "9780525559474",
      category: "Fiction",
      available: true,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      description: "Between life and death there is a library, and within that library, the shelves go on forever.",
      publisher: "Viking",
      pages: 304
    },
    {
      id: "6",
      title: "Dune",
      author: "Frank Herbert",
      isbn: "9780441013593",
      category: "Sci-Fi",
      available: true,
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
      description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib.",
      publisher: "Chilton Books",
      pages: 412
    },
    {
      id: "7",
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
      category: "Dystopian",
      available: true,
      coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
      description: "A dystopian social science fiction novel and cautionary tale about ubiquitous government surveillance.",
      publisher: "Secker & Warburg",
      pages: 328
    },
    {
      id: "8",
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      isbn: "9781585424337",
      category: "Self-Help",
      available: true,
      coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400",
      description: "A classic personal development and self-help book that explores the psychological power of thought.",
      publisher: "Ralston Society",
      pages: 238
    },
    {
      id: "9",
      title: "The Alchemist",
      author: "Paulo Coelho",
      isbn: "9780062315007",
      category: "Adventure",
      available: true,
      coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400",
      description: "A fable about following your dream, following Santiago, an Andalusian shepherd boy who yearns to travel in search of worldly treasure.",
      publisher: "HarperTorch",
      pages: 208
    },
    {
      id: "10",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      isbn: "9780062316097",
      category: "History",
      available: true,
      coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400",
      description: "A brief history of humankind, exploring how biology and history have defined us and enhanced our understanding of what it means to be human.",
      publisher: "Harper",
      pages: 443
    },
    {
      id: "11",
      title: "Deep Work",
      author: "Cal Newport",
      isbn: "9781455586691",
      category: "Productivity",
      available: true,
      coverImage: "/src/assets/images/regenerated_image_1778579472330.jpg",
      description: "Rules for focused success in a distracted world, arguing that the ability to focus without distraction on a cognitively demanding task is a superpower.",
      publisher: "Grand Central Publishing",
      pages: 304
    },
    {
      id: "12",
      title: "Educated",
      author: "Tara Westover",
      isbn: "9780399588679",
      category: "Memoir",
      available: true,
      coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
      description: "A memoir about a young woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
      publisher: "Random House",
      pages: 334
    }
  ];

  // API Routes
  app.get("/api/books", (req, res) => {
    res.json(books);
  });

  app.post("/api/books", (req, res) => {
    const newBook: Book = { ...req.body, id: Math.random().toString(36).substr(2, 9) };
    books.push(newBook);
    res.status(201).json(newBook);
  });

  app.put("/api/books/:id", (req, res) => {
    const { id } = req.params;
    books = books.map(b => b.id === id ? { ...b, ...req.body } : b);
    res.json({ message: "Book updated" });
  });

  app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id !== id);
    res.json({ message: "Book deleted" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
