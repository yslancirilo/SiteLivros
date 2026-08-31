import React, { useRef } from "react";
import "./Header.css";

export default function Header({ searchTerm, onSearch }) {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    inputRef.current?.blur();
  };


  const handleChange = (e) => {
    const raw = e.target.value;

    const clean = raw.replace(/[<>]/g, "").slice(0, 100);
    onSearch(clean);
  };

  return (
    <header className="header" role="banner">
      {/* Top bar */}
      <div className="header-top">
        {/* Logo */}
        <a href="/" className="header-logo" aria-label="SiteLivros - Página inicial">
          <span className="logo-icon">📚</span>
          <span className="logo-text">
            Site<strong>Livros</strong>
          </span>
        </a>

        {/* Search bar */}
        <form
          className="header-search"
          onSubmit={handleSubmit}
          role="search"
          aria-label="Pesquisar livros"
        >
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="Pesquisar livros, autores, categorias..."
            value={searchTerm}
            onChange={handleChange}
            aria-label="Campo de pesquisa"
            maxLength={100}
            autoComplete="off"
          />
          <button type="submit" className="search-btn" aria-label="Buscar">
            🔍
          </button>
        </form>

        {/* Tagline */}
        <div className="header-tagline">
          <span></span>
        </div>
      </div>

      {/* Sub-nav */}
      <div className="header-subnav" aria-label="Navegação secundária">
        <span> Livros Usados</span>
        <span> Melhores Preços</span>
        <span> Qualidade Garantida</span>
        <span> Atendimento via WhatsApp</span>
      </div>
    </header>
  );
}
