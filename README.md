# ✨ LUMEN ATELIER — Fine Art & Cinematografia 4K ProRAW

<div align="center">
  <h3>Atelier Europeu de Fotografia Documental, Casamentos de Alto Padrão & Personal Branding</h3>
  <p><b>Direção Criativa & Acervo Autoral:</b> Maria Clara &nbsp;•&nbsp; <b>Desenvolvimento & Engenharia de Software:</b> Vinicius Strack</p>

  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js_Express_5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![SQLite & MongoDB](https://img.shields.io/badge/SQLite_%2F_MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Google OAuth 2.0](https://img.shields.io/badge/Google_OAuth_2.0-4285F4?style=for-the-badge&logo=google&logoColor=white)
  ![LGPD Compliant](https://img.shields.io/badge/LGPD_%26_GDPR-Compliant-success?style=for-the-badge)
</div>

---

## 🏛️ Sobre o Projeto

O **LUMEN ATELIER** é uma plataforma web full-stack de nível empresarial concebida para redefinir a experiência digital de uma empresa de fotografia de luxo. Afastando-se de interfaces genéricas, o sistema adota a estética **Luminous Gourmet Atelier**, inspirada em galerias de arte europeias e publicações editoriais de alta costura (*Vogue*, *Kinfolk*).

A arquitetura foi projetada para oferecer **autonomia total à fotógrafa e diretora criativa Maria Clara**, permitindo que ela gerencie seu portfólio, agenda solar e contratos sem necessidade de programação, com blindagem de dados e autenticação via Google Identity.

---

## ✨ Principais Destaques & Funcionalidades

### 👑 1. Autonomia Sem Código para Maria Clara (Gestão Visual de Portfólio)
* **Gerenciador Visual no Painel Admin:** Aba exclusiva onde Maria Clara publica novas obras, edita títulos, categorias, especificações EXIF (*Sony A1*, *Leica M11*, *f/1.4*) e altera fotos em destaque com pré-visualização em tempo real.
* **Sincronização Imediata:** Alterações são persistidas automaticamente no banco de dados e refletidas instantaneamente na vitrine pública do site.

### 🛡️ 2. Blindagem de Segurança & Privacidade (Conformidade LGPD)
* **Autenticação Google OAuth 2.0:** Clientes e administradores fazem login através de seus perfis Google, eliminando o armazenamento de senhas no servidor.
* **Ocultação Administrativa Total:** Nenhum link ou botão de gestão é visível para clientes normais.
* **Reconhecimento de Cargo ao Vivo:** Ao autenticar com e-mails oficiais (`maria.clara@lumenatelier.com` ou `viniciuvstrack@gmail.com`), o sistema identifica o cargo de **Fotógrafo Administrador** e libera o botão dourado exclusivo **"Painel Fotógrafo 🔒"**.
* **Route Guards & Preenchimento Automático:** Proteção de rotas internas contra acessos não autorizados e preenchimento automático de contratos autoriais para clientes logados.

### 💎 3. Ferramentas Interativas de Alto Preço & Conversão
* **☀️ Simulador Solar & Clima Satélite (Open-Meteo API):** Conexão ao vivo com satélite meteorológico sem chaves de API. Calcula temperatura, vento, nuvens e horário exato da *Golden Hour* em locações como *Noronha*, *Carneiros*, *Recife Antigo*, *São Paulo* e *Europa*, fornecendo recomendação técnica de iluminação da equipe.
* **🖼️ Simulador 3D de Molduras Fine Art (`FrameSimulator`):** Visualizador interativo onde clientes escolhem fotos do acervo, testam acabamentos em madeira maciça (*Carvalho*, *Mogno Italiano*, *Preto Fosco*, *Canvas*) sobre diferentes cores de parede e encomendam o quadro direto no WhatsApp.
* **🧮 Calculadora de Orçamento Sob Medida (`CustomQuoteBuilder`):** Ferramenta onde clientes personalizam horas de cobertura, fotógrafos seniores, drone 8K e álbuns em couro italiano, com cálculo de abatimento de 5% no PIX e geração de proposta comercial exportável em `.txt`/`.pdf`.
* **🎞️ Comparador Antes vs. Depois (`BeforeAfterSlider`):** Slider interativo demonstrando a evolução da imagem bruta (*Câmera Flat RAW*) para o tratamento autoral de cor em 16 bits (*Kodak Portra 400*).
* **📜 Leitor Digital de Contrato Autoral LGPD (`ContractModal`):** Apresentação das cláusulas contratuais de prestígio, sigilo e política de reagendamento sem custo em caso de chuva.

### 📲 4. Integração Direta e Preenchida com WhatsApp
* Ao concluir a solicitação de reserva no site, o cliente é direcionado para o WhatsApp oficial da equipe com uma **mensagem 100% preenchida** (resumo do módulo, data, condição solar, adicionais extras e cálculo financeiro), pronta para atendimento humanizado e envio da chave PIX.

### 🤖 5. Inteligência Artificial: "Lumen AI • Consultor Virtual"
* Assistente flutuante treinado com mais de **15 categorias de conhecimento fotográfico** (preços, luz natural, prazos express em 48h, regras de figurino, drone, viagens internacionais e casamentos).
* Suporta **envio livre de texto** via teclado ou clique, transição animada de digitação e botão integrado para transferir o papo para atendimento humano no WhatsApp a qualquer momento.

---

## 🏛️ Arquitetura Técnica & Banco de Dados

```text
lumen-atelier/
├── .env.example             # Exemplo de configuração de variáveis de ambiente
├── package.json             # Scripts de automação (npm run server / dev:all)
├── data/
│   └── lumen_studio.sqlite  # 👈 Banco SQLite persistente (auto-gerado e auto-populado)
├── server/
│   ├── index.ts             # Servidor Node.js + Express 5, CORS, middlewares e rotas
│   ├── db/
│   │   ├── database.ts      # Engine SQLite WebAssembly (sql.js) com persistência em disco
│   │   ├── mongodb.ts       # Adaptador Mongoose / MongoDB Atlas para deploy em nuvem
│   │   ├── schema.ts        # Criação relacional de 11 tabelas SQL e índices
│   │   └── seeder.ts        # População inicial de fotos fine art, pacotes e lembretes
│   ├── controllers/         # Controladores modulares (Fotos, Reservas, Pagamentos, Portal, IA)
│   ├── middleware/          # Tratamento global de erros e validações Zod
│   └── routes/              # Mapeamento RESTful (/api/photos, /api/bookings, /api/ai/chat...)
└── src/
    ├── services/api.ts      # 👈 Camada HTTP no Front-End com Fail-Safe/Fallback automático
    ├── components/          # Componentes modulares UI (Navbar, AuthModal, WeatherWidget...)
    └── pages/               # Páginas do website (Início, Portfólio, O Atelier, Serviços, Admin...)
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js** v18+ ou v20+
* **npm** ou **pnpm** / **yarn**

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/lumen-atelier.git
   cd lumen-atelier
   ```

2. Instale as dependências:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Execute o modo **Full-Stack Concorrente** (Servidor API na porta `3001` + Front-End Vite na `5173`):
   ```bash
   npm run dev:all
   ```
   *O navegador abrirá automaticamente em `http://localhost:5173`.*

---

## ☁️ Guia de Deploy e Hospedagem em Nuvem

### 1. Subindo o Banco de Dados para o MongoDB Atlas (Opcional)
Por padrão, o projeto roda com SQLite local. Para rodar em nuvem com MongoDB:
1. Crie um cluster gratuito "M0 Free" em [mongodb.com](https://www.mongodb.com/cloud/atlas).
2. Copie a string de conexão (`MONGODB_URI`).

### 2. Hospedando o Back-End no Render.com ou Railway
1. Conecte seu repositório GitHub no [Render.com](https://render.com) e crie um novo **Web Service**.
2. **Build Command:** `npm install --legacy-peer-deps`
3. **Start Command:** `npm run server`
4. Nas variáveis de ambiente, adicione:
   ```env
   PORT=3001
   MONGODB_URI=mongodb+srv://viniciuvstrack:<senha>@cluster0.mongodb.net/lumen_atelier?retryWrites=true&w=majority
   ```
   *(Se não usar MongoDB, adicione um **Persistent Disk** montado em `/data` no Render para o SQLite).*

### 3. Hospedando o Front-End na Vercel ou Netlify
1. Conecte o repositório na [Vercel](https://vercel.com) ou **Netlify**.
2. Adicione a variável de ambiente apontando para o seu back-end hospedado no Render:
   ```env
   VITE_API_URL=https://seu-servidor-backend.onrender.com/api
   ```
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`

O front-end passará a consumir sua API na nuvem automaticamente!

---

## 📄 Licença & Direitos Autorais
Este software e identidade visual foram desenvolvidos sob encomenda exclusiva para **Maria Clara** e **Vinicius Strack** (Lumen Atelier). Todos os direitos reservados © 2026.
