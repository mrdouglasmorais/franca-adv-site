---
name: transitions-clean-design
description: >-
  Applies restrained motion and clean layout to the Ferreira & França Next.js
  site: duration, easing, hover, reveal, marquee, menus, page transitions, and
  prefers-reduced-motion. Use when adding animation, transition, hover, scroll
  effects, carousels, mobile menus, or visual polish. Use with
  design-system-advanced and ui-ux-specialist.
---

# Transições e desenho limpo

Movimento confirma uma ação ou revela hierarquia. Não decora. O site deve parecer quieto em repouso: papel contínuo, uma coluna clara, linhas finas, muito ar.

Especificação: [motion.md](motion.md).

## Desenho limpo

- Fundo de leitura `--color-paper`. Header e footer ficam em `--color-ink`: o logotipo é branco. A faixa final de contato usa o mesmo preto.
- Separar seções com espaço (`--space-9`) ou uma `Rule`. Não com faixa colorida alternada.
- Alinhar título, texto e ação na mesma coluna. Evitar bloco de texto centralizado em seção longa; centralizar só o hero e a faixa final.
- Número ou norma em Fraunces grande, legenda curta embaixo. Sem caixa com ícone.
- Foto, quando houver, sangra até a margem da página ou ocupa meia coluna. Sem moldura grossa nem sombra de cartão.
- Cantos quase retos. O único círculo é o botão WhatsApp.
- Cada tela usa o selo terracota em poucos pontos. Se tudo é destaque, nada é.

## Movimento

- CSS para hover, foco, header e sublinhado. Biblioteca `motion` só no menu, no consentimento e na entrada orquestrada do hero.
- Propriedades animáveis: `opacity`, `transform`, `color`, `background-color`, `border-color`. Sem animar `height`, `top`, `margin` ou `box-shadow` em lista.
- O título principal não começa em `opacity: 0`. Isso atrasa o LCP e tira a página da zona verde. Hover e menu podem animar.
- Hover de link e botão: 180ms. Seta de “Ver área” desloca 4px. Card não levanta nem ganha sombra.
- Menu móvel: painel 420ms. Foco no primeiro item ao abrir; devolve o foco ao botão ao fechar.
- Trilho: scroll nativo. Autoplay só se `prefers-reduced-motion: no-preference` e pausa no hover, no foco e quando fora da tela.
- Troca de rota: opacidade 180ms se a View Transition API existir. Sem cortina, slide de página ou loading artificial.
- Proibido: parallax, scroll hijacking, contador que corre, texto que digita, partículas, bounce, `transition: all`.

## Reduced motion

Em `prefers-reduced-motion: reduce`: translação vira opacidade instantânea ou 1ms, trilho não anda sozinho, menu apenas aparece. A informação continua toda visível.

## Scroll

O documento rola no viewport. Não aplicar `overflow-x: clip` ou `hidden` no `html` abaixo de 768px. Corte horizontal, se preciso no desktop, fica em um wrapper interno que não seja o elemento raiz.
