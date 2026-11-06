---
name: ui-ux-specialist
description: >-
  Designs UX and UI for the Ferreira & França Next.js site: information
  architecture, hierarchy, conversion, trust, mobile, accessibility, and
  institutional copy. Use when creating or changing pages, sections, navigation,
  forms, WhatsApp calls to action, empty states, or layout. Use together with
  ferreira-franca-site, design-system-advanced, and transitions-clean-design.
---

# UI/UX — advocacia institucional

O visitante chega com um problema concreto (condomínio, cobrança, imóvel ou trabalho) e precisa saber em segundos três coisas: se este escritório trata daquilo, quem assina, e como falar. Sofisticação visual não substitui essa resposta.

Padrões de seção: [patterns.md](patterns.md).

## Hierarquia

- Uma ideia por dobra. O hero não lista todas as áreas; o trilho faz isso.
- Um verbo primário por tela: falar no WhatsApp. O segundo caminho é explorar a área. Nunca dois botões com o mesmo peso.
- Título diz o trabalho do escritório (consultoria e contencioso para empresas e pessoas), sem prometer resultado.
- Subtítulo em até 2 linhas, com a praça real: Itajaí/SC.
- Prova é específica (OAB, formação, livro, comissão). Sem selos genéricos de “excelência”.

## Navegação

- Header enxuto. No móvel, menu em painel com as mesmas rotas, foco preso e fechar por Escape.
- WhatsApp permanece alcançável sem cobrir conteúdo nem o menu. Alvo de toque mínimo 44px.
- Âncoras da home não substituem rotas: área, equipe e contato têm URL própria.
- Estado atual visível na navegação. Link visitado não muda de cor para um terceiro acento.

## Confiança

- Nome de Maicon Ferreira França na equipe. O número da OAB só entra quando estiver na fonte.
- Endereço completo e telefone fixo ao lado do WhatsApp. Escritório só de chat parece informal demais para esta marca.
- Linguagem de análise, não de garantia. “Avaliamos documentos e prazos” cabe. “Ganhamos a sua causa” não cabe.
- Depoimento, logo de cliente, número de processos ou percentual só com autorização e dado real.

## Leitura e forma

- Coluna de texto até 62 caracteres. Título de seção alinhado à mesma grade do parágrafo.
- Listas curtas com rótulo, não grades de 8 ícones.
- Foto grande só se for do escritório, do sócio ou de São Luís com licença. Sem aperto de mão de banco de imagem.
- Formulário curto: nome, telefone, área, mensagem. WhatsApp continua sendo o caminho rápido. Erro ao lado do campo, em texto.

## Acessibilidade

- Contraste de texto AA sobre o papel e sobre o ink.
- Foco visível em link, botão e campo. Ordem de tabulação igual à ordem visual.
- Menu, diálogo de privacidade e trilho têm nome acessível. Carrossel não é a única forma de ver as áreas: a página `/areas` lista todas.
- Não depender de cor para estado. Hover não é o único sinal de clique.

## Mobile

- Hero legível sem rolar o título para fora da tela.
- Trilho horizontal com scroll nativo, indício de continuação e alternativa em lista.
- Telefone e WhatsApp são links `tel:` e `https://wa.me/5547984710389`.
- Sem `overflow-x: clip` no `html` em viewport estreita: isso bloqueia o scroll por toque.

## Critério de aceite de uma tela

1. Dá para dizer a especialidade sem ler o rodapé.
2. Há um próximo passo óbvio.
3. Nenhum fato fora de `ferreira-franca-site/reference.md`.
4. Cabe em 390px sem corte de texto e em 1280px sem faixas vazias sem função.
