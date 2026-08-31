import React from "react";
import "./CategoryBar.css";

export default function CategoryBar({ categories, active, onSelect }) {
  const allCats = ["Todos", ...categories];

  return (
    <nav className="category-bar" aria-label="Filtro por categoria">
      <div className="category-scroll">
        {allCats.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${active === cat ? "active" : ""}`}
            onClick={() => onSelect(cat)}
            aria-pressed={active === cat}
            aria-label={`Filtrar por ${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </nav>
  );
}
