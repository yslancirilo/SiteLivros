import React from "react";
import BookCard from "./BookCard.jsx";
import "./BookGrid.css";

export default function BookGrid({ books, loading, onBuyClick, onBookClick }) {
  if (loading) {
    return (
      <div className="grid-status" aria-live="polite" aria-busy="true">
        <div className="skeleton-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton-card" aria-hidden="true">
              <div className="skeleton-img" />
              <div className="skeleton-line long" />
              <div className="skeleton-line short" />
              <div className="skeleton-line medium" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="grid-status empty" role="status">
        <span className="empty-icon">🔍</span>
        <p>Nenhum livro encontrado.</p>
        <p className="empty-hint">Tente outra pesquisa ou selecione uma categoria diferente.</p>
      </div>
    );
  }

  return (
    <section aria-label={`${books.length} livros encontrados`}>
      <div className="book-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBuyClick={onBuyClick}
            onBookClick={onBookClick}
          />
        ))}
      </div>
    </section>
  );
}
