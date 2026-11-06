---
name: ferreira-franca-site
description: >-
  Builds and edits the Ferreira & França law-firm website in Next.js (App
  Router, TypeScript, Tailwind). Use when working in franca-adv-site, or when
  the user mentions Ferreira e França, Ferreira & França, o site do escritório,
  páginas institucionais, áreas de atuação, equipe, publicações, contato,
  WhatsApp, OAB, LGPD, or deploying this site. Load before any page, content,
  routing, SEO, or component work, then load ui-ux-specialist,
  design-system-advanced, and transitions-clean-design.
---

# Site Ferreira & França

Site institucional em português do Brasil. A referência de estrutura e ritmo é [Martinhago Advocacia](https://www.martinhagoadv.com.br/). A marca, a paleta, as fotos, os números e os textos são da Ferreira & França. Nunca transplantar conteúdo ou identidade visual da referência.

Antes de desenhar ou codar interface, ler também:

- [ui-ux-specialist](../ui-ux-specialist/SKILL.md)
- [design-system-advanced](../design-system-advanced/SKILL.md)
- [transitions-clean-design](../transitions-clean-design/SKILL.md)
- [copy-publicitario](../copy-publicitario/SKILL.md) ao escrever título, chamada ou CTA

Fatos, rotas e schema: [reference.md](reference.md).

## Stack

- Next.js App Router, TypeScript, React Server Components.
- Tailwind CSS v4. Tokens só pelos nomes do design system. Sem CSS solto de cor, raio ou duração.
- `next/font` (Newsreader + Figtree), as famílias já usadas na marca FrancaAdv. Sem Google Fonts por `<link>`.
- Conteúdo tipado em `src/content/`. Sem CMS até o usuário pedir.
- Componentes de cliente só para menu, consentimento, formulário, trilho e movimento.
- `metadata` e JSON-LD `LegalService` por rota. `lang="pt-BR"`.
- Imagens com `next/image`. Sem Bootstrap, jQuery ou Font Awesome.

## Ordem de construção

1. Tokens e primitivos (`Button`, `Container`, `Eyebrow`, `Heading`, `Prose`).
2. Shell: header, footer, WhatsApp fixo, consentimento LGPD.
3. Home na ordem da arquitetura em `reference.md`.
4. Áreas, equipe, contato, privacidade.
5. Publicações só com texto aprovado. Estado vazio honesto se não houver artigos.

## Conteúdo

- Usar apenas fatos de `reference.md`. Campo desconhecido vira `TODO` visível no código, nunca um número inventado.
- Não reutilizar métricas da referência (clientes, colaboradores, crescimento, seccionais, estados).
- Não prometer resultado, êxito, prazo de ganho ou “análise grátis” se isso não estiver nos fatos.
- Publicidade sóbria, com nome do advogado e número da OAB onde a peça identifica atuação profissional (Provimento CFOAB 205/2021).
- Tom: direto, específico, sem juridiquês ornamental e sem urgência artificial.

## Verificação

Depois de mudança visível, abrir a rota no navegador e percorrer o fluxo (menu, âncora, WhatsApp, área, contato) em desktop e em largura móvel. Confirmar foco visível, contraste e `prefers-reduced-motion`.
