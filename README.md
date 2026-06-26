# 🎵 SpotiStats — Análise do Seu Spotify

> Projeto Final da disciplina **Linguagem de Programação para Internet**  
> UNIUBE - 2026 · Aluno: Samuel Souza

## 📌 Descrição

**SpotiStats** é uma Single Page Application (SPA) desenvolvida em **React + Vite** que simula um painel de análise de hábitos musicais inspirado no Spotify Wrapped e no Stats.fm.

O projeto exibe dados mockados de músicas, artistas e playlists favoritas com visualizações interativas, filtros dinâmicos e animações fluidas.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| **React 18** | Biblioteca principal de UI |
| **Vite** | Bundler e servidor de desenvolvimento |
| **React Router DOM v6** | Roteamento SPA e navegação entre páginas |
| **CSS Modules** | Estilização escopada por componente |
| **SVG puro** | Gráficos do MoodWheel (componente criativo) |
| **JavaScript (ES6+)** | Lógica da aplicação |

---

## 📂 Estrutura do Projeto

```
spotify-stats/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar/          # Barra de navegação com NavLink ativo
│   │   ├── SongCard/        # Card de música com barra de plays e humor
│   │   ├── ArtistCard/      # Card de artista com hover overlay e tags de gênero
│   │   ├── StatBar/         # Barra de progresso animada para gêneros
│   │   └── MoodWheel/       # 🎭 Componente criativo: gráfico SVG de humor musical
│   ├── data/
│   │   ├── songs.js         # Top 10 músicas mockadas
│   │   ├── artists.js       # Top 6 artistas mockados
│   │   └── stats.js         # Perfil, estatísticas, playlists e dados de humor
│   ├── pages/
│   │   ├── Home/            # Página inicial com perfil e stats
│   │   ├── TopTracks/       # Top músicas com filtro por período
│   │   ├── TopArtists/      # Artistas com filtro por gênero
│   │   ├── Playlists/       # Playlists expansíveis
│   │   └── Insights/        # Análises e MoodWheel
│   ├── App.jsx              # Configuração das rotas
│   ├── main.jsx             # Ponto de entrada
│   └── index.css            # Design tokens globais e animações
└── index.html
```

---

## ▶️ Como Executar

```bash
# 1. Entrar na pasta do projeto
cd spotify-stats

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev

# 4. Abrir no navegador
# http://localhost:5173
```

---

## 📄 Páginas da Aplicação

### 🏠 Home
Exibe o perfil do usuário (avatar, nome, seguidores), quatro cards de estatísticas rápidas (horas ouvidas, músicas salvas, artistas seguidos, playlists criadas), destaque do álbum/música do mês e um insight sobre horário favorito de escuta.

Implementa `useNavigate` para o botão "Ver Top Músicas".

### 🎵 Top Tracks
Lista as 10 músicas mais reproduzidas com filtro por período (**Último Mês**, **6 Meses**, **Último Ano**).

**Lift State Up:** O estado do filtro de período é gerenciado no componente pai `TopTracks` e passado via `prop` para o filho `SongCard`, que utiliza esse valor para exibir as contagens corretas.

### 🎤 Top Artistas
Grid de cards dos artistas favoritos com filtro por gênero musical. Hover nos cards revela biografia. Clicar nas tags de gênero dentro dos cards ativa o filtro.

### 📋 Playlists
Grade de 6 playlists com capa, descrição e badge de humor. Ao clicar, a playlist **expande** exibindo as músicas em destaque usando o componente `SongCard` reutilizado.

### 💡 Insights
- **Gêneros Favoritos:** Barras animadas via `StatBar`
- **Seus Números:** Cards com streak, horário favorito, gênero top e minutos ouvidos
- **Horário de Escuta:** Gráfico de barras manual com CSS
- **🎭 MoodWheel (Componente Criativo):** Roda de humor interativa em SVG

---

## 🎭 Componente Criativo - MoodWheel

O **MoodWheel** é um gráfico de rosca (*donut chart*) implementado com **SVG puro** (sem bibliotecas externas) que visualiza a distribuição de humor das músicas favoritas do usuário.

**Funcionalidades:**
- Cada fatia representa um humor musical (Energetic, Chill, Happy, Melancholic, Focus)
- **Hover** → fatia cresce com brilho e exibe tooltip com descrição
- **Click** → filtra e exibe a lista de músicas daquele humor abaixo da roda
- Click duplo numa fatia ativa/desativa o filtro
- Animação de entrada com rotação suave
- Centro dinâmico com emoji e percentual do humor selecionado

---

## ✅ Requisitos Técnicos Atendidos

| Requisito | Implementado |
|---|---|
| React + Vite | ✅ |
| React Router DOM (SPA) | ✅ `<BrowserRouter>`, `<Routes>`, `<Route>` |
| NavLink com classe ativa | ✅ Navbar usa `NavLink` com classe `active` |
| useNavigate | ✅ Botão CTA na Home |
| ≥ 4 páginas | ✅ 5 páginas |
| ≥ 5 componentes | ✅ Navbar, SongCard, ArtistCard, StatBar, MoodWheel |
| Props desestruturadas | ✅ Em todos os componentes |
| Lift State Up | ✅ Filtro de período em TopTracks |
| Dados mockados | ✅ 3 arquivos em `/data` |
| Renderização condicional | ✅ Filtros, playlists expandidas, estado vazio |
| Eventos (click/hover) | ✅ MoodWheel, filtros, playlists |
| CSS Modules | ✅ Todos os componentes e páginas |
| Componente criativo | ✅ MoodWheel — SVG interativo |
| README completo | ✅ Este arquivo |

---

## 👤 Autor: Samuel Souza
