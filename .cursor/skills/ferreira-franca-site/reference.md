# Fatos e mapa do site

Fontes: identidade em FrancaAdv (`src/config/site.ts`, `public/logo-*.png`, `globals.css`) e conteúdo/região de https://adv.grupoferreirafranca.com.br/. Não usar dados de São Luís nem de ferreiraefranca.adv.br. Não inventar OAB, CEP, CNPJ ou foto.

## Identidade

| Campo | Valor |
| --- | --- |
| Nome | Ferreira França Advogados e Associados |
| Nome de marca | Ferreira França Advocacia e Assessoria Empresarial |
| Praça | Itajaí / SC |
| Endereço | Rua Lauro Muller, 853 — Itajaí/SC |
| Telefones | (47) 99134-4933 e (47) 98471-0389 |
| WhatsApp | https://wa.me/5547984710389 |
| E-mail | contato@grupoferreirafranca.com.br |
| Horário | Segunda a sexta, 8h–18h |
| Instagram | https://www.instagram.com/ferreirafrancaadvocacia/ |
| Liderança | Maicon Ferreira França, CEO. Formação em Direito e Administração. |
| Site canônico | https://adv.grupoferreirafranca.com.br |
| Cores | Papel `#ffffff`, tinta `#0a0a0a`, selo `#741b2c`, ouro `#c5a46d` |
| Logos | `public/brand/logo-wordmark.png` e `public/brand/brasao.png` (branco, fundo transparente, header escuro) |
| Tipos | Newsreader (título) e Figtree (interface), via `next/font` |

## Áreas

As áreas do site: civil, imobiliário, família, trabalho, empresarial, contratos, assessoria jurídica empresarial, criminal. Sem a área de franquias. Slugs em `src/content/areas.ts`.

## SEO e performance

- `metadata` com canônico, Open Graph e Twitter em toda rota indexável.
- JSON-LD: `Organization`, `LegalService`, `WebSite`, `Person`, `Service` por área, `BreadcrumbList`.
- `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`.
- Sem analytics, mapa incorporado ou script de terceiro. O H1 não começa em `opacity: 0`.
- Imagens da marca com `next/image`. Header escuro porque o logotipo é branco.
