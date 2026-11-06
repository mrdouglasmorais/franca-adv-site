# Contratos dos primitivos

Server Components, salvo observação. Classe Tailwind aponta para token (`bg-paper`, `text-ink`), não para valor arbitrário.

## Button

```tsx
type ButtonProps = {
  tone?: "seal" | "ink" | "ghost";
  href: string;
  children: React.ReactNode;
};
```

- `seal`: fundo `--color-seal`, texto `--color-on-seal`, hover `--color-seal-deep`.
- `ink`: fundo `--color-ink`, texto paper.
- `ghost`: transparente, borda `--color-line`, texto ink, hover fundo paper-raised.
- Altura 48px, padding horizontal 22px, raio 2px, tipo Outfit 15px.
- WhatsApp usa `tone="seal"` e raio pílula. Um por região visível, mais o flutuante.

## TextLink

Outfit, ink, sublinhado 1px deslocado 3px. Hover: cor seal. Sem seta, exceto “Ver área”.

## Container

`max-width: var(--page)`, margem automática, padding lateral 24px / 32px.

## Eyebrow

Rótulo 12px, tracking 0.14em, maiúsculas, cor ink-soft. Sempre acima de um Heading, nunca solto.

## Heading

`level` 1–3 mapeia display, título de seção ou título de card. Uma `h1` por rota.

## Prose

17px, medida 62ch, parágrafos com 16px entre si. Listas com marcador discreto em ink, não em selo.

## Rule

`<hr>` de 1px `--color-line`, sem margem extra além do espaço da seção.

## AreaChip

Pílula ghost dentro do trilho: nome da área. Não usar como única navegação.

## WhatsAppFloat

Link fixo com nome acessível “Falar no WhatsApp”. Sombra `--shadow-float`. Escondido quando o footer de contato está visível, para não duplicar a ação na última dobra. `target` não abre janela nova em `tel:`; em `wa.me`, `target="_blank"` com `rel="noopener noreferrer"`.

## Campo

Altura 48px, fundo paper-raised, borda line, raio 2px, rótulo visível (sem placeholder como rótulo). Erro em ink-soft mais texto, com `aria-invalid`.
