import React, { useEffect, useRef, useState } from "react";
import "./BookModal.css";

export default function BookModal({ book, onClose, onBuyClick }) {
  const [imgError, setImgError] = useState(false);
  const closeRef = useRef(null);
  const overlayRef = useRef(null);

  // Focus trap + close on Escape
  useEffect(() => {
    closeRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const formattedPrice = book.price.toFixed(2).replace(".", ",");

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        {/* Close button */}
        <button
          ref={closeRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar detalhes do livro"
        >
          ✕
        </button>

        <div className="modal-body">
          {/* Image */}
          <div className="modal-img-wrap">
            {imgError ? (
              <div className="modal-img-fallback" aria-hidden="true">📖</div>
            ) : (
              <img
                src={`/images/${encodeURIComponent(book.image)}`}
                alt={`Capa do livro ${book.title}`}
                className="modal-img"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Details */}
          <div className="modal-details">
            <p className="modal-category">{book.category}</p>
            <h2 id="modal-title" className="modal-title">{book.title}</h2>

            <div className="modal-stars" aria-label="Avaliação: 5 estrelas">
              ★★★★★
            </div>

            <hr className="modal-divider" />

            <div className="modal-price-section">
              <span className="modal-price-label">Preço:</span>
              <div className="modal-price">
                <span className="modal-currency">R$</span>
                <span className="modal-amount">{formattedPrice}</span>
              </div>
              <p className="modal-shipping">Frete a combinar via WhatsApp</p>
            </div>

            <hr className="modal-divider" />

            <div className="modal-info">
              <p><strong>Estado:</strong> {book.condition}</p>
              <p><strong>Descrição:</strong> {book.description}</p>
            </div>

            <hr className="modal-divider" />

            {/* WhatsApp CTA */}
            <div className="modal-actions">
              <button
                className="modal-btn-whatsapp"
                onClick={() => {
                  onClose();
                  onBuyClick(book);
                }}
                aria-label={`Comprar ${book.title} pelo WhatsApp`}
              >
                <WhatsAppIcon />
                Comprar pelo WhatsApp
              </button>
              <p className="modal-wpp-hint">
                Clique para abrir o WhatsApp e falar com o vendedor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
