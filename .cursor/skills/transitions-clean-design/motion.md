# Especificação de movimento

## Curva e tempo

| Token | Valor | Uso |
| --- | --- | --- |
| `--duration-micro` | 180ms | Hover, foco, cor, sublinhado, troca de rota |
| `--duration-panel` | 420ms | Menu, diálogo, entrada de hero |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entradas e painéis |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover de cor |

Não introduzir spring nem duração acima de 600ms.

## Pares de estado

| Elemento | Repouso | Interação |
| --- | --- | --- |
| Button seal | fundo seal | fundo seal-deep em 180ms |
| Button ghost | borda line | borda ink, fundo paper-raised |
| TextLink | sublinhado ink | cor seal, sublinhado permanece |
| Header | transparente sobre o hero | paper-raised + linha, após 8px de scroll |
| Card de área | sem sombra | seta +4px; borda permanece |
| WhatsApp flutuante | visível | some quando `#contato` cruza 40% da viewport |
| Trilho | scroll manual | autoplay 40s linear, pausa em hover e foco |

## Hero

Um único grupo animado: eyebrow, título, texto, ações. Opacidade 0→1 e `translateY(12px)`→0, 420ms, atraso interno máximo 80ms. Foto ou monograma entra junto, sem escala. Na primeira pintura sem JS, o conteúdo já está visível (`@media (scripting: none)` e conteúdo no HTML do servidor).

## Menu

Overlay ink a 40% de opacidade, painel paper da direita, largura mínima 280px. `transform: translateX(16px)` + opacidade. Trap de foco. `Esc` fecha. Body não recebe `position: fixed` se isso perder a posição de scroll; travar com `overflow: hidden` no `html` só enquanto o painel está aberto e restaurar ao fechar.

## Implementação

```tsx
const reduce = useReducedMotion();
const transition = reduce
  ? { duration: 0 }
  : { duration: 0.42, ease: [0.22, 1, 0.36, 1] };
```

CSS global:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Autoplay do trilho não usa essa regra global como desculpa para continuar: ele consulta a media query e não inicia.
