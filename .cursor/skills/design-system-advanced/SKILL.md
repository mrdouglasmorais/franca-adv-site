---
name: design-system-advanced
description: >-
  Implements the Ferreira & França design system: color, type, spacing, radius,
  elevation, and UI primitives in Tailwind CSS v4. Use when adding or changing
  visual styles, tokens, buttons, type, layout primitives, or Tailwind theme
  for this Next.js law-firm site. Use with ferreira-franca-site,
  ui-ux-specialist, and transitions-clean-design.
---

# Design system

Sistema fechado. Componente novo consome token; não cria cor, sombra ou raio local. Valores canônicos: [tokens.md](tokens.md). Contratos: [components.md](components.md).

A paleta é a da marca Ferreira França, extraída do FrancaAdv: papel branco, tinta preta, selo vinho `#741b2c` e ouro `#c5a46d` só sobre fundo escuro. Não usar o creme, o dourado ou o teal da Martinhago.

## Regras

1. Cor semântica (`--color-paper`, `--color-ink`, `--color-seal`) no `@theme`, nunca hex no JSX.
2. Duas famílias da marca: Newsreader para título, Figtree para interface e texto. Peso 500 no título, 400 no corpo, 600 em rótulo. Sem black (900) e sem itálico decorativo.
3. Escala de espaço: 4, 8, 12, 16, 24, 32, 48, 72, 96, 128. Seção usa 96 no desktop e 64 abaixo de 768px.
4. Raio 2px em superfície. Pílula (`999px`) só no botão WhatsApp e no chip de área.
5. Elevação: nenhuma em card editorial. Sombra só no header fixo, no painel do menu e no WhatsApp flutuante, usando `--shadow-float`.
6. Linha de 1px `--color-line` separa blocos. Não empilhar card dentro de card.
7. Largura de conteúdo 1120px. Prosa 62ch. Respiro lateral 24px no mobile, 32px no desktop.
8. Ícone, se existir, é traço de 1.5px, herda a cor do texto, e não senta em círculo colorido.
9. Estado de foco: anel de 2px `--color-seal` com offset 2px. Não remover outline sem substituir.
10. Modo escuro: não criar até o usuário pedir. O papel claro é a marca.

## Onde vive

`src/styles/tokens.css` importa no layout global. Primitivos em `src/components/ui/`. Seção de página compõe primitivos e não redefine tipografia.

## Nome de componente

`Button`, `TextLink`, `Container`, `Eyebrow`, `Heading`, `Prose`, `Rule`, `AreaChip`, `IconArrow`. Variantes por prop (`tone="seal" | "ink" | "ghost"`), não por classe copiada na página.
