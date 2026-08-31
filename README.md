# 📚 SiteLivros

Site para venda de livros usados com atendimento via WhatsApp.

---

## ⚙️ Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- npm (vem com o Node.js)

---

## 🚀 Como rodar

### 1. Configure o número do WhatsApp

Abra o arquivo `client/src/App.jsx` e troque a linha:

```js
const WHATSAPP_NUMBER = "5511999999999";
```

Coloque o número real com código do país (55 = Brasil) e DDD, sem espaços ou símbolos.
Exemplo: `"5521987654321"` para Rio de Janeiro.

---

### 2. Instale as dependências do servidor

```
cd server
npm install
```

### 3. Instale as dependências do frontend

```
cd ../client
npm install
```

---

### 4. Rode o servidor (terminal 1)

```
cd server
npm start
```

O servidor vai rodar em **http://localhost:3001**

---

### 5. Rode o frontend (terminal 2)

```
cd client
npm run dev
```

O site vai abrir em **http://localhost:5173**

---

## 🔒 Segurança implementada

| Camada | O que faz |
|--------|-----------|
| **Helmet.js** | Define cabeçalhos HTTP de segurança (CSP, HSTS, etc.) |
| **CORS** | Só aceita requisições da origem do frontend |
| **Rate Limiting** | Máximo 200 req/15min por IP — protege contra bots e scraping |
| **Input Validation** | Parâmetros de busca são validados e sanitizados (express-validator) |
| **Path Traversal** | Imagens só são servidas se o nome do arquivo for seguro (regex) |
| **X-Frame-Options** | Previne clickjacking |
| **X-Content-Type-Options** | Evita MIME sniffing |
| **Referrer-Policy** | Controla informações enviadas em requisições externas |
| **Permissions-Policy** | Bloqueia acesso à câmera, microfone e GPS |
| **Client Sanitization** | Input do usuário tem `<>` removidos antes de enviar ao servidor |

---

## 📁 Estrutura de arquivos

```
siteLivros/
├── imgLivros/          ← Imagens dos livros
├── server/
│   ├── index.js        ← Servidor Express com todas as camadas de segurança
│   ├── books.js        ← Catálogo completo dos livros
│   ├── .env            ← Configurações (porta, WhatsApp, CORS)
│   └── package.json
└── client/
    ├── src/
    │   ├── App.jsx         ← Componente principal
    │   └── components/     ← Header, Cards, Modal, Footer...
    ├── index.html
    ├── vite.config.js
    └── package.json
```
