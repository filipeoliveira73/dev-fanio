# Documentação da Implementação — Blog SSR

> Gerado por IA (Claude Sonnet 4.6) em 07/04/2026  
> Referência: [ADR-001.md](../ADR-001.md)

---

## Visão Geral

Blog estático de alta performance construído com **Next.js 14 (App Router)**, **Styled Components 6** e **Contentlayer**. Todo o conteúdo é pré-renderizado em tempo de build (SSG), sem dependência de APIs ou banco de dados em runtime. Fases implementadas: 1, 2 e 3.

---

## Stack Utilizada

| Tecnologia        | Versão   | Função                              |
| :---------------- | :------- | :---------------------------------- |
| Next.js           | 14.2.35  | Framework core (App Router + SSG)   |
| TypeScript        | 5.x      | Tipagem estática                    |
| Styled Components | 6.3.x    | CSS-in-JS com SSR registry          |
| Contentlayer      | 0.3.4    | Parser de Markdown → JSON tipado    |
| next-contentlayer | 0.3.4    | Integração Contentlayer + Next.js   |
| date-fns          | 3.6.x    | Formatação de datas (pt-BR)         |
| Inter (Google)    | —        | Fonte web via `next/font`           |

---

## Estrutura de Arquivos

```
blog-ssr/
├── ia/
│   └── documentacao.md          ← este arquivo
│
├── app/
│   ├── layout.tsx                ← Root layout: Metadata, SSR registry, Header, Footer
│   ├── page.tsx                  ← Home: listagem de posts ordenada por data
│   ├── sitemap.ts                ← Gera /sitemap.xml via Metadata API
│   ├── robots.ts                 ← Gera /robots.txt via Metadata API
│   └── posts/
│       └── [slug]/
│           └── page.tsx          ← Página do post: SSG + JSON-LD + Open Graph
│
├── components/
│   ├── Header.tsx                ← <header> semântico com navegação
│   ├── Footer.tsx                ← <footer> semântico com copyright
│   ├── PostCard.tsx              ← <article> card de preview na listagem
│   └── PostBody.tsx              ← <article> corpo completo do post
│
├── content/
│   ├── hello-world.md            ← Post de exemplo #1
│   └── nextjs-app-router.md      ← Post de exemplo #2
│
├── lib/
│   └── registry.tsx              ← SSR Registry do Styled Components ('use client')
│
├── contentlayer.config.ts        ← Schema de documentos (Post)
├── next.config.mjs               ← withContentlayer + compiler.styledComponents
├── tsconfig.json                 ← paths: contentlayer/generated → .contentlayer/generated
└── package.json
```

---

## Fase 1 — Setup Estrutural

### Inicialização

Projeto criado com `create-next-app@14` com flags:
- `--typescript` — TypeScript habilitado
- `--app` — App Router (não Pages Router)
- `--no-src-dir` — arquivos na raiz, sem pasta `src/`
- `--import-alias "@/*"` — alias para imports absolutos

### next.config.mjs

```js
import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  compiler: {
    styledComponents: true,   // transpila SC no servidor, habilita SSR
  },
}

export default withContentlayer(nextConfig)
```

**Decisão:** `next.config.ts` não é suportado no Next.js 14 — usado `.mjs`.

### lib/registry.tsx — SSR Registry

Ponto crítico para **zero CLS (Cumulative Layout Shift)**. Sem este arquivo, os estilos do Styled Components chegam após o HTML, causando salto visual.

**Funcionamento:**
1. `ServerStyleSheet` coleta todos os estilos gerados durante o render no servidor.
2. `useServerInsertedHTML` injeta esses estilos no `<head>` antes de enviar o HTML ao cliente.
3. No cliente (`typeof window !== 'undefined'`), o componente retorna os children diretamente — o SC hidrata normalmente.

```tsx
'use client'
// Deve ser 'use client' para usar hooks (useState, useServerInsertedHTML)
// mas executa a coleta de estilos no servidor
```

### contentlayer.config.ts — Schema de Post

```ts
fields: {
  title:       { type: 'string', required: true },
  date:        { type: 'date',   required: true },
  description: { type: 'string', required: true },  // obrigatório: protege o SEO
  tags:        { type: 'list',   required: false },
  image:       { type: 'string', required: false },
}
```

**Comportamento de segurança:** Se qualquer post omitir um campo `required: true`, o `npm run build` falha com erro de TypeScript. Isso evita posts sem meta-description no ar.

**Campos computados:**
- `slug` — extraído de `_raw.flattenedPath` (ex: `hello-world`)
- `url` — `/posts/hello-world`

### tsconfig.json — Path Alias crítico

```json
"paths": {
  "@/*": ["./*"],
  "contentlayer/generated": ["./.contentlayer/generated"]
}
```

Sem este alias, o webpack não encontra o pacote `contentlayer/generated` (não exportado no `exports` do `package.json` do contentlayer). O Contentlayer gera os arquivos em `.contentlayer/generated/` e o alias redireciona o import.

---

## Fase 2 — Desenvolvimento de UI e SEO

### app/layout.tsx — Root Layout

```tsx
export const metadata: Metadata = {
  title: { template: '%s | Meu Blog', default: 'Meu Blog' },
  description: 'Blog sobre tecnologia e desenvolvimento de software.',
  openGraph: { type: 'website' },
}
```

O `template` do título faz com que páginas filhas apenas definam sua parte (`'Meu Post'` → `'Meu Post | Meu Blog'`), sem duplicar a marca.

**Ordem de renderização no servidor:**
```
RootLayout
  └── StyledComponentsRegistry    ← coleta estilos
        ├── Header                ← styled component
        ├── main > {children}     ← styled components das páginas
        └── Footer                ← styled component
```

### Componentes Semânticos

| Componente   | Elemento HTML | Responsabilidade                        |
| :----------- | :------------ | :-------------------------------------- |
| `Header`     | `<header>`    | Logo + navegação                        |
| `Footer`     | `<footer>`    | Copyright dinâmico com ano atual        |
| `PostCard`   | `<article>`   | Preview: data, título, descrição, tags  |
| `PostBody`   | `<article>`   | Título, meta, conteúdo HTML do post     |

Todos os componentes usam **Styled Components** diretamente — sem arquivo CSS separado.

### app/sitemap.ts e robots.ts

Gerados automaticamente pelo Next.js via Metadata API. Acessíveis em:
- `/sitemap.xml` — indexa home + todos os posts com `lastModified` e `priority`
- `/robots.txt` — permite todos os user-agents, aponta para o sitemap

---

## Fase 3 — Pipeline de Conteúdo

### Frontmatter dos Posts Markdown

```yaml
---
title: "Título do Post"          # obrigatório
date: "2026-04-07"               # obrigatório — formato ISO 8601
description: "Descrição SEO."    # obrigatório — máx ~155 caracteres
tags: ["nextjs", "typescript"]   # opcional
---
```

### app/posts/[slug]/page.tsx

**`generateStaticParams`** — executa em build time, retorna todos os slugs para pré-renderização:

```ts
export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}
```

**`generateMetadata`** — gera `<title>`, `<meta description>` e tags Open Graph por post:

```ts
openGraph: {
  type: 'article',
  publishedTime: post.date,   // usado pelo Facebook/LinkedIn para artigos
}
```

**JSON-LD (Schema Markup)** — injetado no `<head>` via `<script type="application/ld+json">`:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "datePublished": "..."
}
```

O Google usa esse dado estruturado para exibir rich results nas buscas.

---

## Problemas Encontrados e Soluções

| Problema | Causa | Solução |
| :--- | :--- | :--- |
| `create-next-app` rejeitou o diretório | `ADR-001.md` já existia | Gerado em `/tmp`, copiado para o projeto |
| `next.config.ts` não suportado | Next.js 14 aceita apenas `.js` ou `.mjs` | Renomeado para `next.config.mjs` |
| `contentlayer/generated` não encontrado | Não está no `exports` do pacote `contentlayer` | Path alias no `tsconfig.json` apontando para `.contentlayer/generated` |
| `next-contentlayer` peer dep conflict | Pede Next.js ≤ 14.1, projeto usa 14.2 | Instalado com `--legacy-peer-deps` |

---

## Resultado do Build

```
Route (app)                    Size      First Load JS
┌ ○ /                          175 B     96.2 kB
├ ○ /_not-found                873 B     88.2 kB
├ ● /posts/[slug]              138 B     87.5 kB
├   ├ /posts/hello-world
├   └ /posts/nextjs-app-router
├ ○ /robots.txt                0 B       0 B
└ ○ /sitemap.xml               0 B       0 B

○  Static   — HTML puro, sem JS
●  SSG      — pré-renderizado em build time
```

- **Todas as rotas são estáticas** — zero execução de servidor em runtime.
- `robots.txt` e `sitemap.xml` têm **0 B de JS** — servidos como arquivos estáticos puros.

---

## Como Adicionar um Novo Post

1. Criar arquivo em `content/meu-post.md` com frontmatter completo.
2. Executar `npm run build` — o Contentlayer valida e processa o arquivo.
3. O post aparece automaticamente na home e gera `/posts/meu-post`.

---

## Como Executar Localmente

```bash
npm run dev     # servidor de desenvolvimento em http://localhost:3000
npm run build   # build de produção (valida TypeScript + Contentlayer)
npm run start   # serve o build de produção
```
