import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import CategoryBar from "./components/CategoryBar.jsx";
import BookGrid from "./components/BookGrid.jsx";
import BookModal from "./components/BookModal.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

const WHATSAPP_NUMBER = "5531998092239"; 

export default function App() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch categories once
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao carregar categorias");
        return r.json();
      })
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Fetch books when search or category changes
  const fetchBooks = useCallback(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (activeCategory !== "Todos") params.set("category", activeCategory);

    fetch(`/api/books?${params.toString()}`)
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao carregar livros");
        return r.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    const timer = setTimeout(fetchBooks, 300); // debounce search
    return () => clearTimeout(timer);
  }, [fetchBooks]);

  const openWhatsApp = (book) => {
    const message = `Olá! Tenho interesse no livro: *${book.title}* (R$ ${book.price.toFixed(2).replace(".", ",")}). Ainda está disponível?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="app">
      <Header searchTerm={searchTerm} onSearch={setSearchTerm} />
      <HeroBanner />
      <CategoryBar
        categories={categories}
        active={activeCategory}
        onSelect={(cat) => {
          setActiveCategory(cat);
          setSearchTerm("");
        }}
      />

      <main className="main-content">
        {searchTerm && (
          <p className="search-info">
            Resultados para <strong>"{searchTerm}"</strong> — {books.length} livro(s) encontrado(s)
          </p>
        )}

        {error && (
          <div className="error-banner" role="alert">
            ⚠️ {error}. Verifique se o servidor está rodando.
          </div>
        )}

        <BookGrid
          books={books}
          loading={loading}
          onBuyClick={openWhatsApp}
          onBookClick={setSelectedBook}
        />
      </main>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onBuyClick={openWhatsApp}
        />
      )}

      <Footer />
    </div>
  );
}
