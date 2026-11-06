export type AreaTopic = {
  title: string;
  detail: string;
};

export type PracticeArea = {
  slug: string;
  name: string;
  summary: string;
  lead: string;
  context: string;
  reading: string;
  problems: readonly AreaTopic[];
  documents: readonly string[];
  norm?: string;
  seoTitle: string;
  seoDescription: string;
};

/** Textos de área. Sem promessa de resultado e sem número que o escritório não publicou. */
export const practiceAreas: readonly PracticeArea[] = [
  {
    slug: "direito-civil",
    name: "Direito Civil",
    summary: "Conflitos de patrimônio, responsabilidade, posse e obrigações.",
    lead: "O caso chega com um bem, um dano ou um contrato que não se cumpriu.",
    context:
      "A pessoa ou a empresa traz o que aconteceu e os papéis que já existem. O escritório separa o fato, a prova e o prazo. A orientação pode encerrar o conflito fora do processo. O processo entra quando a disputa já está posta.",
    reading: "Não há previsão de resultado. Cada caso depende do documento e do que ainda pode ser pedido.",
    problems: [
      {
        title: "Patrimônio",
        detail: "Disputa sobre bem, dívida ou cobrança que não é matéria de família.",
      },
      {
        title: "Responsabilidade",
        detail: "Dano e o vínculo com quem o causou, inclusive quando há contrato no meio.",
      },
      {
        title: "Posse e propriedade",
        detail: "Quem usa, quem é dono e o que o título ou o contrato realmente diz.",
      },
    ],
    documents: [
      "Contrato, notificação ou cobrança",
      "Comprovantes de pagamento",
      "Fotos, laudos ou mensagens que descrevem o fato",
    ],
    seoTitle: "Direito Civil em Itajaí",
    seoDescription:
      "Direito Civil em Itajaí/SC: patrimônio, responsabilidade civil, posse, propriedade e obrigações.",
  },
  {
    slug: "direito-de-familia",
    name: "Direito de Família",
    summary: "Divórcio, guarda, alimentos, visitas, união estável e inventário.",
    lead: "Divórcio, guarda, alimentos e inventário, com os documentos da família.",
    context:
      "O escritório organiza o que já foi decidido, o que está em aberto e o prazo de cada pedido. Guarda e visitas partem da rotina da criança. Inventário e pensão partem dos bens e da renda que dá para comprovar.",
    reading: "A análise não antecipa a sentença. O caminho pode ser acordo ou processo, conforme os fatos.",
    problems: [
      {
        title: "Divórcio e união estável",
        detail: "Partilha, nome e o que o casal já tinha combinado por escrito.",
      },
      {
        title: "Guarda e visitas",
        detail: "A rotina de quem fica com a criança e o que precisa ficar decidido.",
      },
      {
        title: "Alimentos e inventário",
        detail: "Pensão, bens deixados e o prazo para abrir o inventário.",
      },
    ],
    documents: [
      "Certidões de casamento, nascimento ou óbito",
      "Acordos e decisões anteriores",
      "Comprovantes de renda, quando o tema é pensão",
    ],
    seoTitle: "Direito de Família em Itajaí",
    seoDescription:
      "Direito de Família em Itajaí/SC: divórcio, guarda, pensão alimentícia, união estável e inventário.",
  },
  {
    slug: "direito-do-trabalho",
    name: "Direito do Trabalho",
    summary: "Ações, rescisões, acidentes e passivos de quem emprega e de quem é empregado.",
    lead: "Ação, rescisão ou acidente, para empregado e para empregador.",
    context:
      "O escritório lê o contrato, os recibos e a data da saída ou do acidente. Atende os dois lados da relação de emprego. O caminho pode ser acordo ou reclamação, conforme o prazo e o que já foi pago.",
    reading: "O resultado não se promete. A leitura começa pelo que está no papel e na data do fato.",
    problems: [
      {
        title: "Ações trabalhistas",
        detail: "Reclamação já ajuizada ou demanda que ainda está no prazo.",
      },
      {
        title: "Rescisões e passivos",
        detail: "Verbas, aviso prévio e o que a empresa já pagou na saída.",
      },
      {
        title: "Acidentes de trabalho",
        detail: "Afastamento, comunicação do acidente e o vínculo com o serviço.",
      },
    ],
    documents: [
      "Contrato, recibos e termo de rescisão",
      "Aviso, reclamação ou citação",
      "Comunicação de acidente e atestados, se houver",
    ],
    seoTitle: "Direito do Trabalho em Itajaí",
    seoDescription:
      "Direito do Trabalho em Itajaí/SC para empregados e empregadores: ações, rescisões e acidentes.",
  },
  {
    slug: "direito-empresarial",
    name: "Direito Empresarial",
    summary: "Abertura, operação, expansão e reestruturação de sociedades.",
    lead: "Abertura, operação, expansão ou reestruturação da sociedade.",
    context:
      "A consulta olha o contrato social, as alterações e a decisão que a empresa precisa tomar agora. Serve para quem abre, para quem já opera e para quem precisa reorganizar sócios ou encerrar uma etapa.",
    reading: "O escritório aponta o que o ato societário precisa dizer. Não substitui o registro na Junta nem promete o desenho societário antes de ver os atos.",
    problems: [
      {
        title: "Abertura e estruturação",
        detail: "Tipo societário e as regras entre sócios no contrato inicial.",
      },
      {
        title: "Operação e expansão",
        detail: "Filial, entrada de sócio e obrigações do dia a dia da empresa.",
      },
      {
        title: "Reestruturação",
        detail: "Saída de sócio, cisão, transformação ou encerramento.",
      },
    ],
    documents: [
      "Contrato social e alterações",
      "Atas e acordo de sócios",
      "A decisão que a empresa precisa tomar",
    ],
    seoTitle: "Direito Empresarial em Itajaí",
    seoDescription:
      "Direito Empresarial em Itajaí/SC: abertura, operação, expansão e reestruturação de empresas.",
  },
  {
    slug: "direito-das-franquias",
    name: "Direito das Franquias e dos Franqueados",
    summary: "Circular de oferta, contrato e conflito de rede, para franqueador e franqueado.",
    lead: "Circular de oferta e contrato, para quem franqueia e para quem é franqueado.",
    context:
      "A Lei 13.966/2019 exige a Circular de Oferta de Franquia, em português, antes da assinatura, do pré-contrato ou do pagamento de taxa ao franqueador. O escritório lê essa circular, o contrato e o que já foi cobrado ou descumprido.",
    reading:
      "A análise separa o que a rede informou na oferta, o que o contrato impõe e o conflito que já existe: taxa, fornecimento, território ou saída. Não há promessa de resultado.",
    problems: [
      {
        title: "Circular de oferta",
        detail: "Se a circular existiu, o que ela informou e se veio antes do pagamento.",
      },
      {
        title: "Contrato de franquia",
        detail: "Território, taxa, compra obrigatória, prazo e condições de saída.",
      },
      {
        title: "Conflito de rede",
        detail: "Cobrança, rescisão e cláusula de não concorrência já discutidas.",
      },
    ],
    documents: [
      "Circular de oferta de franquia",
      "Contrato, pré-contrato e aditivos",
      "Comprovantes de taxa, fundo de propaganda e compras",
      "Mensagens sobre inadimplemento ou rescisão",
    ],
    norm: "Lei nº 13.966/2019. A circular de oferta antecede a assinatura, o pré-contrato ou o pagamento de taxa.",
    seoTitle: "Direito das Franquias",
    seoDescription:
      "Direito das Franquias em Itajaí/SC: circular de oferta, contrato e conflito de rede para franqueador e franqueado.",
  },
  {
    slug: "contratos",
    name: "Contratos",
    summary: "Elaboração, revisão e negociação de contratos civis e empresariais.",
    lead: "Minuta, revisão e negociação, antes que o conflito exista.",
    context:
      "O escritório compara a minuta com o negócio que as partes descreveram. O foco é a cláusula que cria risco: prazo, multa, rescisão, garantia e foro. A revisão não garante que a outra parte vá cumprir.",
    reading: "O que ainda pode ser negociado fica separado do que já foi aceito por escrito.",
    problems: [
      {
        title: "Elaboração",
        detail: "O contrato nasce do combinado, com as obrigações dos dois lados.",
      },
      {
        title: "Revisão",
        detail: "Prazo, multa, rescisão, garantia e o foro da minuta recebida.",
      },
      {
        title: "Negociação",
        detail: "O ponto que ainda pode mudar antes da assinatura.",
      },
    ],
    documents: [
      "Minuta e a versão anterior, se houver",
      "Descrição curta do negócio",
      "Mensagens que já fixaram preço, prazo ou escopo",
    ],
    seoTitle: "Contratos civis e empresariais",
    seoDescription:
      "Elaboração, revisão e negociação de contratos civis e empresariais em Itajaí/SC.",
  },
  {
    slug: "assessoria-juridica-empresarial",
    name: "Assessoria Jurídica Empresarial",
    summary: "Prevenção e contencioso para a operação da empresa.",
    lead: "Acompanhamento da operação, na prevenção e no processo.",
    context:
      "A empresa traz a decisão da semana ou o processo que chegou. O escritório diz se cabe orientar agora ou responder em juízo. O acompanhamento é contínuo: a mesma demanda não recomeça do zero a cada consulta.",
    reading: "A resposta depende do documento e do prazo. Não é uma garantia sobre o desfecho do processo.",
    problems: [
      {
        title: "Assessoria preventiva",
        detail: "Consulta antes da assinatura, da demissão ou da expansão.",
      },
      {
        title: "Contencioso empresarial",
        detail: "Defesa ou propositura quando o conflito já existe.",
      },
      {
        title: "Acompanhamento contínuo",
        detail: "A operação segue com a mesma equipe e o histórico do caso.",
      },
    ],
    documents: [
      "A pergunta e o prazo real",
      "Contratos e notificações do tema",
      "Citação ou intimação, se o processo já corre",
    ],
    seoTitle: "Assessoria Jurídica Empresarial",
    seoDescription:
      "Assessoria jurídica empresarial preventiva e contenciosa para empresas em Itajaí/SC.",
  },
  {
    slug: "direito-criminal",
    name: "Direito Criminal",
    summary: "Defesa a partir dos autos e do prazo da intimação.",
    lead: "Defesa a partir dos autos e do prazo da intimação.",
    context:
      "O escritório lê o que está no inquérito ou no processo e a data para se manifestar. A estratégia sai dos fatos e da prova já juntada, não de uma tese genérica.",
    reading: "Não há promessa de resultado. A defesa acompanha o ato seguinte: resposta, audiência ou recurso, conforme o prazo aberto.",
    problems: [
      {
        title: "Defesa criminal",
        detail: "A resposta ao que foi imputado, no prazo da intimação.",
      },
      {
        title: "Leitura dos autos",
        detail: "Inquérito, denúncia ou decisão e o que já ficou documentado.",
      },
      {
        title: "Acompanhamento do processo",
        detail: "O ato que vem a seguir e quem precisa comparecer.",
      },
    ],
    documents: [
      "Intimação, citação ou mandado",
      "Boletim, denúncia ou decisão",
      "Procuração anterior, se já houver advogado no feito",
    ],
    seoTitle: "Direito Criminal em Itajaí",
    seoDescription:
      "Defesa em Direito Criminal em Itajaí/SC, com leitura dos autos e do prazo da intimação.",
  },
] as const;

export function getPracticeArea(slug: string) {
  return practiceAreas.find((area) => area.slug === slug);
}
