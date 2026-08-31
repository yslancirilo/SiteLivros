import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <div className="footer-col">
          <h3>SiteLivros</h3>
          <p>Seu destino para livros usados com qualidade e preços acessíveis.</p>
        </div>
        <div className="footer-col">
          <h3>Categorias</h3>
          <ul>
            <li>Ficção / Aventura</li>
            <li>Literatura Brasileira</li>
            <li>Culinária</li>
            <li>Referência / Educação</li>
            <li>Autoajuda</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contato</h3>
          <p> Atendimento exclusivo pelo WhatsApp</p>
          <p>Clique no botão verde de qualquer livro para entrar em contato com o vendedor.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SiteLivros — Todos os direitos reservados.</p>
        <p className="footer-disclaimer">
          Site seguro · Conexão protegida · Seus dados são privados
        </p>
      </div>
    </footer>
  );
}
