# Tokens

Registrar em `src/styles/tokens.css` com `@theme` do Tailwind v4. Nomes estáveis.

## Cor

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-paper` | `#ffffff` | Fundo da página |
| `--color-mist` | `#f3f0f1` | Superfície elevada clara |
| `--color-ink` | `#0a0a0a` | Texto, header e footer |
| `--color-ink-soft` | `#5e5e5e` | Apoio, meta, legenda |
| `--color-line` | `rgb(10 10 10 / 0.12)` | Divisores no papel |
| `--color-seal` | `#741b2c` | Ação primária, foco, monograma |
| `--color-seal-deep` | `#5c1420` | Hover da ação primária |
| `--color-on-seal` | `#ffffff` | Texto sobre o selo |
| `--color-gold` | `#c5a46d` | Fio e rótulo sobre fundo escuro |
| `--color-gold-soft` | `#e8d9b5` | Texto de apoio no header e no footer |

`--color-seal` aparece poucas vezes por tela: botão primário, foco e um fio sob o título. Link no corpo é `--color-ink` sublinhado, não selo em todo texto.

Contraste mínimo: ink sobre paper, on-seal sobre seal, on-tide sobre tide.

## Tipo

| Papel | Família | Tamanho | Entrelinha | Tracking |
| --- | --- | --- | --- | --- |
| Display | Newsreader | clamp(40px, 5vw, 68px) | 1.05 | -0.03em |
| Título de seção | Newsreader | clamp(32px, 3vw, 44px) | 1.12 | -0.02em |
| Título de card | Newsreader | 22px | 1.25 | -0.01em |
| Corpo | Figtree | 17px | 1.6 | 0 |
| Rótulo | Figtree | 12px | 1.3 | 0.14em, maiúsculas |
| Meta | Figtree | 14px | 1.4 | 0 |

## Espaço, raio, sombra, medida

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 72px;
--space-9: 96px;
--space-10: 128px;
--radius-surface: 2px;
--radius-pill: 999px;
--shadow-float: 0 12px 40px rgb(23 32 51 / 0.12);
--measure: 62ch;
--page: 1120px;
```

## Movimento

Durações e curvas canônicas estão em `transitions-clean-design`. O tema só expõe:

```css
--duration-micro: 180ms;
--duration-panel: 420ms;
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```
