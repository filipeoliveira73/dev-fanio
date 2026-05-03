---
title: "Server Actions e o Fim da Separação entre Front e Back-end?"
date: "2026-05-02"
description: "Server Actions do Next.js borram a fronteira entre front-end e back-end. Entenda o que muda, os benefícios reais e os cuidados de segurança necessários."
tags: ["nextjs", "server actions", "full-stack", "react", "typescript"]
---

## O que são Server Actions?

Introduzidas no Next.js 14 e estabilizadas no React 19, **Server Actions** são funções assíncronas que rodam exclusivamente no servidor, mas que podem ser chamadas diretamente de componentes React — sem precisar criar uma rota de API.

```ts
// app/actions.ts
"use server";

export async function salvarContato(data: FormData) {
  await db.contatos.create({ nome: data.get("nome") as string });
}
```

```tsx
// app/contato/page.tsx
import { salvarContato } from "../actions";

export default function ContatoPage() {
  return (
    <form action={salvarContato}>
      <input name="nome" />
      <button type="submit">Salvar</button>
    </form>
  );
}
```

### O que muda na prática

- **Menos código**: sem `fetch`, sem `useEffect`, sem rota `/api/contato`
- **Type-safety ponta a ponta**: o TypeScript valida a chamada sem geração de código extra
- **Progressive Enhancement**: formulários funcionam mesmo sem JavaScript no cliente

### Os cuidados que ninguém pode ignorar

Server Actions são **endpoints HTTP reais** — qualquer um pode chamá-los diretamente. Isso exige:

1. **Autenticação** em toda action que acessa dados sensíveis
2. **Validação rigorosa** de input (use Zod ou Valibot)
3. **Rate limiting** para evitar abuso

### Fim da separação front/back?

Não exatamente. A separação de **responsabilidades** continua existindo — o que muda é o local onde a fronteira é desenhada. Server Actions são ideais para mutações simples; APIs REST ou GraphQL ainda fazem sentido para contratos públicos e consumidores externos.

A tendência é um modelo **híbrido**: Server Actions para a maioria dos casos internos, APIs explícitas apenas onde necessário.
