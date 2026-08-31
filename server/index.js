require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { query, validationResult } = require("express-validator");
const path = require("path");
const books = require("./books");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Security: Helmet (sets HTTP security headers) ───────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "blob:"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false, // needed for images
  })
);

// ─── Security: CORS ───────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CORS_ORIGIN || "http://localhost:5173",
  "http://localhost:4173", // vite preview
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (same-origin, Postman in dev)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET"],
    optionsSuccessStatus: 200,
  })
);

// ─── Security: Rate Limiting ──────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,                  // max 200 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas requisições. Tente novamente em alguns minutos." },
});
app.use("/api/", apiLimiter);

// ─── Prevent clickjacking via X-Frame-Options (helmet does this but explicit) ─
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  next();
});

// ─── Serve book images securely ───────────────────────────────────────────────
// Only .jpeg files, no directory traversal
app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;

  // Validate: only allow safe filenames (no path traversal)
  if (!/^[\w\s\-\.áàãâéêíóôõúüçÁÀÃÂÉÊÍÓÔÕÚÜÇ]+\.jpe?g$/i.test(filename)) {
    return res.status(400).json({ error: "Nome de arquivo inválido." });
  }

  const imagePath = path.join(
    "C:\\Users\\yslan\\Desktop\\siteLivros\\imgLivros",
    filename
  );

  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ error: "Imagem não encontrada." });
    }
  });
});

// ─── GET /api/books — list all books with optional search & category filter ───
app.get(
  "/api/books",
  [
    query("search")
      .optional()
      .trim()
      .escape()
      .isLength({ max: 100 })
      .withMessage("Pesquisa muito longa."),
    query("category")
      .optional()
      .trim()
      .escape()
      .isLength({ max: 60 })
      .withMessage("Categoria inválida."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let result = [...books];

    const { search, category } = req.query;

    if (category && category !== "Todos") {
      result = result.filter(
        (b) => b.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(term) ||
          b.category.toLowerCase().includes(term) ||
          b.description.toLowerCase().includes(term)
      );
    }

    res.json(result);
  }
);

// ─── GET /api/books/:id — single book detail ─────────────────────────────────
app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "ID inválido." });
  }
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Livro não encontrado." });
  }
  res.json(book);
});

// ─── GET /api/categories — unique category list ───────────────────────────────
app.get("/api/categories", (req, res) => {
  const categories = [...new Set(books.map((b) => b.category))].sort();
  res.json(categories);
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});
