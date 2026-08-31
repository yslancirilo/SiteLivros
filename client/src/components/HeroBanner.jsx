import React from "react";
import "./HeroBanner.css";

export default function HeroBanner() {
  return (
    <section className="hero" aria-label="Banner principal">
      <div className="hero-content">
        <h1 className="hero-title">📚 Livros Usados com Qualidade</h1>
        <p className="hero-subtitle">
          Encontre seu próximo livro favorito. Preços acessíveis.
        </p>
        <div className="hero-badges">
          <span className="badge">✅ Livros Revisados</span>
          <span className="badge">💬 Atendimento no WhatsApp</span>
          <span className="badge">🚚 Entrega Rápida</span>
        </div>
      </div>
    </section>
  );
}
