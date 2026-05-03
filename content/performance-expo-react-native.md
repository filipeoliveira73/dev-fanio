---
title: "Otimização de Performance em Apps Mobile com Expo e React Native"
date: "2026-05-02"
description: "Guia prático de otimização de performance para apps React Native com Expo: renderização, imagens, listas e New Architecture."
tags: ["react native", "expo", "performance", "mobile", "javascript"]
---

## Por que performance mobile é diferente

Dispositivos móveis têm CPU, memória e bateria limitados. Um app lento não é só uma má experiência — ele é desinstalado. Otimizar React Native exige entender onde os gargalos realmente estão.

### 1. Evite re-renders desnecessários

O principal vilão de performance em React é renderizar componentes sem necessidade.

```tsx
// Ruim: cria nova referência a cada render
<FlatList renderItem={({ item }) => <Card item={item} />} />

// Bom: componente estável com memo
const CardItem = memo(({ item }: { item: Item }) => <Card item={item} />);
<FlatList renderItem={({ item }) => <CardItem item={item} />} />
```

Use `useMemo` e `useCallback` apenas onde há custo real de computação — não indiscriminadamente.

### 2. Listas com FlatList e FlashList

Para listas longas, prefira **FlashList** (Shopify) ao `FlatList` nativo — ela recicla células de forma mais eficiente e reduz o tempo de primeiro render em até 10x.

```bash
npx expo install @shopify/flash-list
```

### 3. Imagens otimizadas

- Use `expo-image` no lugar de `<Image />` do React Native: suporta cache agressivo, blurhash e formatos modernos (WebP, AVIF)
- Sempre defina `width` e `height` explícitos para evitar layout shift

### 4. New Architecture (JSI + Fabric)

O Expo SDK 50+ habilita a **New Architecture** por padrão. Com ela, a comunicação JS↔Native deixa de passar pela bridge assíncrona e passa a usar JSI (JavaScript Interface), eliminando serialização e reduzindo latência em operações intensivas.

Ative no `app.json`:

```json
{
  "expo": {
    "newArchEnabled": true
  }
}
```

### 5. Profiling com Flashlight

O **Flashlight** (anteriormente PerfDog open-source) mede FPS, uso de CPU e memória diretamente no dispositivo — essencial para identificar gargalos reais antes de otimizar às cegas.

### Checklist rápido

- [ ] `memo` nos componentes de lista
- [ ] `FlashList` para listas com mais de 50 itens
- [ ] `expo-image` para todas as imagens
- [ ] New Architecture habilitada
- [ ] Hermes engine ativo (padrão no Expo SDK 48+)
- [ ] Bundle analisado com `npx expo export --dump-sourcemap`
