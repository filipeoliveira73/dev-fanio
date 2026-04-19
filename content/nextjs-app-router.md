---
title: "App Router do Next.js 14: tudo que você precisa saber"
date: "2026-04-05"
description: "Um guia prático sobre o App Router do Next.js 14: Server Components, layouts aninhados e geração estática com generateStaticParams."
tags: ["nextjs", "app-router", "react"]
---

## O que mudou com o App Router?

O App Router introduzido no Next.js 13 e estabilizado no Next.js 14 traz uma mudança fundamental na forma de pensar a arquitetura de aplicações React.

### Server Components por padrão

Todos os componentes dentro de `app/` são **Server Components** por padrão. Isso significa:

- Zero JavaScript enviado ao cliente para componentes que não precisam de interatividade
- Acesso direto a dados no servidor sem `useEffect` ou `fetch` no cliente
- Melhor performance e menor bundle size

### Layouts aninhados

A pasta `app/` suporta layouts aninhados:

```
app/
  layout.tsx        ← layout raiz (sempre renderizado)
  page.tsx          ← home
  posts/
    layout.tsx      ← layout específico de posts (opcional)
    [slug]/
      page.tsx      ← página do post
```

### generateStaticParams

Para rotas dinâmicas com SSG, use `generateStaticParams`:

```ts
export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}
```

O Next.js pré-renderiza todas as páginas em tempo de build — sem servidor em runtime.
