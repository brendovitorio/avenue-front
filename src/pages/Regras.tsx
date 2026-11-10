import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonVariants, pageShellClass } from '../components/ui/variants'
import { cn } from '../lib/cn'

type Rule = { title: string; body: string }
type RuleSection = { id: string; title: string; intro: string; rules: Rule[]; externalLinks?: { title: string; url: string; description: string }[] }

const sections: RuleSection[] = [
  {
    id: 'fundamentos', title: 'Fundamentos do roleplay', intro: 'Estas diretrizes formam a base de toda interação. Antes de qualquer regra específica, lembre-se: você está construindo uma história coletiva com outras pessoas.',
    rules: [
      { title: 'In Character (IC) e Out of Character (OOC)', body: 'IC é tudo o que seu personagem sabe, fala e faz dentro da interpretação. OOC são assuntos externos ao personagem. Não misture os dois contextos nem use conversas externas para interferir em uma cena.' },
      { title: 'Powergaming', body: 'É proibido realizar ações impossíveis, irreais ou forçar resultados sem dar oportunidade de reação aos envolvidos. Descreva apenas o que seu personagem tenta fazer; não determine unilateralmente o resultado da ação de outro jogador.' },
      { title: 'Metagaming', body: 'É proibido utilizar informações que seu personagem não obteve dentro do jogo. Informações de transmissões, lives, Discord, mensagens privadas, outros personagens ou conversas OOC não podem orientar decisões IC.' },
      { title: 'Fear RP / amor à vida', body: 'Seu personagem deve demonstrar medo diante de ameaças reais e plausíveis. Não confronte alguém armado em clara desvantagem, não aja como se a vida do personagem não tivesse valor e não provoque situações fatais sem considerar o risco.' },
      { title: 'Fail RP', body: 'É qualquer conduta que quebra a lógica ou a imersão da interpretação, como ignorar consequências evidentes, agir sem coerência com a situação ou utilizar mecânicas do jogo para escapar de uma cena.' },
      { title: 'Valorize a interpretação', body: 'Priorize a construção da cena em vez de vencer uma discussão ou confronto. Respeite o tempo de resposta dos demais, não interrompa ações sem motivo e aceite consequências coerentes para seu personagem.' },
      { title: 'Interpretação de personagem', body: 'Mantenha personalidade, histórico, capacidades e decisões coerentes. A história do personagem não justifica comportamento abusivo com jogadores reais nem autoriza ignorar as regras da cidade.' },
      { title: 'Abuso de mecânicas', body: 'Não use animações, bugs, inventário, menus, comandos, física ou limitações técnicas para obter vantagem indevida, escapar de abordagens ou alterar o resultado de uma cena.' },
    ],
  },
  {
    id: 'conduta', title: 'Conduta e convivência', intro: 'A experiência depende de respeito entre pessoas reais. A interpretação nunca deve ser usada como justificativa para assédio, discriminação ou perseguição.',
    rules: [
      { title: 'Respeito entre jogadores', body: 'Não são permitidos racismo, discriminação, homofobia, xenofobia, misoginia, ameaças reais, assédio, perseguição ou ataques direcionados a características pessoais.' },
      { title: 'Separação entre IC e OOC', body: 'Conflitos entre personagens devem permanecer no jogo. Não leve rivalidades para mensagens privadas, redes sociais, Discord ou vida pessoal de outros membros.' },
      { title: 'Assédio e conteúdo sensível', body: 'É proibido pressionar outros jogadores a participar de cenas sexuais, humilhantes, discriminatórias ou que envolvam temas sensíveis sem consentimento. Interrompa a cena e procure a equipe quando necessário.' },
      { title: 'Microfone e comunicação', body: 'Use áudio compreensível e mantenha volume adequado. Não utilize soundboards, gritos, ruídos, músicas ou efeitos para atrapalhar conversas, abordagens ou cenas.' },
      { title: 'Nomes e identidade', body: 'Escolha nomes adequados ao universo da cidade. Não utilize nomes ofensivos, discriminatórios, de figuras públicas para causar confusão ou que imitem deliberadamente a identidade de outro jogador.' },
      { title: 'Uso dos canais oficiais', body: 'Respeite as regras do Discord e os canais de atendimento. Não publique dados pessoais, conversas privadas, denúncias ou acusações para incentivar exposição ou perseguição.' },
    ],
  },
  {
    id: 'cenas', title: 'Cenas, conflitos e memória', intro: 'Toda ação precisa de contexto, desenvolvimento e possibilidade de resposta. Conflitos não são uma autorização para ignorar a experiência dos demais.',
    rules: [
      { title: 'RDM — Random Deathmatch', body: 'É proibido agredir ou matar outro personagem sem contexto, motivação e desenvolvimento de RP que sustentem a ação. Discussões banais ou provocações isoladas não justificam violência letal.' },
      { title: 'VDM — Vehicle Deathmatch', body: 'É proibido utilizar veículos como armas para atropelar, ferir ou matar sem contexto válido de interpretação. Colisões acidentais devem ser interpretadas de forma coerente.' },
      { title: 'Revenge Kill (RK)', body: 'Não retorne a uma cena com a intenção de se vingar após ser abatido ou morto. Respeite as consequências da situação e as limitações de memória estabelecidas para o personagem.' },
      { title: 'Combat logging', body: 'É proibido desconectar, fechar o jogo, trocar de personagem ou provocar queda intencional para evitar abordagem, prisão, perda, consequência ou continuidade de uma cena. Se houver desconexão involuntária, retorne e procure os envolvidos ou a equipe.' },
      { title: 'Ghosting e informação externa', body: 'Não utilize informações de espectadores, amigos fora da cena ou jogadores que não participam da ação para localizar pessoas, antecipar movimentos ou obter vantagem.' },
      { title: 'Interferência de terceiros', body: 'Não entre em uma ação em andamento sem contexto ou vínculo plausível. A participação de terceiros deve fazer sentido para a história e respeitar as regras específicas de cada tipo de ação.' },
      { title: 'Continuidade da cena', body: 'Não abandone uma interação apenas porque o resultado não foi favorável. Se ocorrer falha técnica, problema de conexão ou situação excepcional, comunique os envolvidos e a equipe.' },
      { title: 'Uso de /me e /do', body: 'Quando disponíveis, utilize os comandos para esclarecer ações, estados e informações que não podem ser representados pela mecânica. Não use esses comandos para impor resultados ou mentir sobre fatos verificáveis da cena.' },
    ],
  },
  {
    id: 'abordagens', title: 'Abordagens e procedimentos', intro: 'Abordagens policiais, médicas, civis e criminais devem preservar a lógica da situação e permitir que todos interpretem suas ações.',
    rules: [
      { title: 'Abordagens em geral', body: 'Dê tempo razoável para que a pessoa compreenda a abordagem e responda. Não utilize pausas, menus ou comandos para impedir a reação de outro jogador.' },
      { title: 'Obediência e reação', body: 'Considere o contexto, as ameaças e a personalidade do personagem. Não force uma resposta impossível e não ignore uma ameaça clara apenas para provocar confronto.' },
      { title: 'Revista e apreensão', body: 'Revistas, apreensões e procedimentos devem possuir justificativa dentro da cena e seguir os sistemas e orientações oficiais da cidade. Não invente permissões ou poderes que seu personagem não possui.' },
      { title: 'Perseguições', body: 'Conduza perseguições de forma plausível. Evite manobras impossíveis, colisões intencionais sem contexto, uso abusivo de obstáculos e exploração de falhas de mapa ou física.' },
      { title: 'Reféns', body: 'A utilização de reféns exige contexto e interpretação. Não crie reféns fictícios, não utilize amigos em combinação para simular uma negociação e não prolongue a situação apenas para impedir o encerramento da cena.' },
      { title: 'Negociação', body: 'Permita comunicação e propostas coerentes. Não utilize reféns como escudo para ações sem possibilidade de resposta e não imponha exigências irreais apenas para inviabilizar a negociação.' },
      { title: 'Sequestros', body: 'Sequestros devem ter motivação de RP e desenvolvimento. É proibido sequestrar repetidamente a mesma pessoa sem contexto novo, utilizar a ação para assédio ou manter alguém preso sem oferecer continuidade razoável.' },
    ],
  },
  {
    id: 'crimes', title: 'Crimes e organizações', intro: 'Atividades ilegais podem fazer parte do roleplay, mas precisam respeitar limites, equilíbrio e as regras específicas publicadas pela administração.',
    rules: [
      { title: 'Motivação criminal', body: 'Ações criminosas devem ter motivação dentro da história. Não inicie crimes apenas para procurar combate, acumular itens ou prejudicar a experiência de outros jogadores.' },
      { title: 'Ações em grupo', body: 'Organize ações de forma coerente e respeite os limites de participantes, alianças e conflitos que a administração definir. Não combine informações externas para obter vantagem.' },
      { title: 'Recrutamento e organizações', body: 'Lideranças são responsáveis por orientar seus membros. Recrutamento, hierarquia, alianças, guerras e desligamentos devem seguir as diretrizes oficiais da cidade.' },
      { title: 'Ações com reféns', body: 'Não utilize reféns como ferramenta para forçar vantagens sem relação com a cena. A integridade do personagem, a negociação e a continuidade do RP devem ser consideradas por todos os lados.' },
      { title: 'Acampamento e repetição de ações', body: 'Não fique aguardando em locais de atividade apenas para abordar repetidamente quem chega ou sai. Evite repetir a mesma ação contra os mesmos jogadores sem desenvolvimento narrativo.' },
      { title: 'Uso de itens e equipamentos', body: 'Não duplique, transfira ou esconda itens explorando falhas. Equipamentos e recursos devem ser utilizados conforme sua finalidade e as regras dos sistemas ativos.' },
    ],
  },
  {
    id: 'servicos', title: 'Serviços públicos e profissões', intro: 'Os serviços da cidade existem para gerar histórias e atender à comunidade. O uso de cargos, veículos e ferramentas deve ser responsável.',
    rules: [
      { title: 'Uso de veículos oficiais', body: 'Veículos, uniformes, armamentos e equipamentos de serviço devem ser utilizados somente em situações compatíveis com a função e com as normas da cidade.' },
      { title: 'Abuso de autoridade', body: 'Nenhum cargo autoriza humilhação, perseguição OOC, vantagem pessoal ou uso arbitrário de recursos públicos. Procedimentos devem possuir justificativa e coerência.' },
      { title: 'Atendimento médico', body: 'Respeite o papel dos profissionais de saúde e permita a interpretação do atendimento. Não utilize o serviço médico para interromper deliberadamente cenas ou apagar consequências sem justificativa.' },
      { title: 'Corrupção e desvios', body: 'Interpretações envolvendo corrupção, desvio de recursos ou abuso de função dependem das permissões e regras específicas da administração. Não presuma autorização automática.' },
      { title: 'Ausência de profissionais', body: 'Quando um serviço não estiver disponível, siga os procedimentos alternativos divulgados pela equipe. Não force ações ou resultados que dependam de um profissional ausente.' },
    ],
  },
  {
    id: 'veiculos', title: 'Veículos e trânsito', intro: 'Veículos fazem parte da interpretação e devem ser conduzidos de maneira compatível com o cenário, as condições da via e a segurança da cena.',
    rules: [
      { title: 'Direção realista', body: 'Conduza de acordo com o tipo de veículo, terreno, clima e situação. Evite velocidades ou manobras incompatíveis com o veículo e com as condições apresentadas.' },
      { title: 'Uso de veículos como arma', body: 'Não utilize carros, motos, aeronaves ou embarcações para causar dano sem contexto válido. A regra de VDM também se aplica a colisões provocadas intencionalmente.' },
      { title: 'Saltos e manobras irreais', body: 'Não utilize rampas, obstáculos ou desníveis para realizar manobras que seriam incompatíveis com o veículo, nem abuse da física do jogo para escapar de perseguições.' },
      { title: 'Abandono de veículo', body: 'Não abandone veículos em locais ou situações com o único objetivo de bloquear passagens, impedir uma cena, ocultar provas ou causar prejuízo a outros jogadores.' },
      { title: 'Veículos de serviço', body: 'Não utilize veículos de emergência, policiais ou de trabalho sem possuir autorização e contexto IC para isso. Não se aproprie de equipamentos oficiais para obter vantagem.' },
      { title: 'Roubo e furto de veículos', body: 'A apropriação de veículos deve seguir os sistemas e as regras de interpretação da cidade. Não utilize bugs, menus ou falhas para obter veículos ou escapar de consequências.' },
      { title: 'Aeronaves e embarcações', body: 'Utilize aeronaves e embarcações apenas quando o personagem tiver acesso e contexto compatíveis. Pousos, decolagens e manobras devem respeitar a lógica do ambiente.' },
    ],
  },
  {
    id: 'combate', title: 'Combate e uso de armas', intro: 'Confrontos armados precisam de contexto, progressão e coerência. A mecânica de combate não deve substituir a interpretação.',
    rules: [
      { title: 'Início de confronto', body: 'Não inicie um tiroteio sem motivação e desenvolvimento de RP. Dê oportunidade de compreensão e reação quando a situação permitir.' },
      { title: 'Spawn kill', body: 'É proibido atacar jogadores em pontos de nascimento, retorno ou entrada na cidade, assim como aproveitar momentos em que não tenham controle efetivo do personagem.' },
      { title: 'Forçar combate', body: 'Não provoque repetidamente outros jogadores com o único objetivo de gerar confronto. Ameaças e conflitos devem ter desenvolvimento narrativo.' },
      { title: 'Armas e equipamentos', body: 'Utilize apenas armas e equipamentos obtidos de forma legítima e permitidos ao personagem. Não explore falhas de inventário, animações ou troca de equipamentos durante o combate.' },
      { title: 'Cobertura e movimentação', body: 'Respeite obstáculos, ferimentos e limitações físicas. Não utilize movimentos impossíveis, desync intencional ou falhas de colisão para evitar disparos.' },
      { title: 'Drive-by', body: 'Disparos a partir de veículos devem seguir as regras operacionais específicas da cidade e manter contexto de interpretação. Não use o veículo para obter vantagem impossível ou atacar sem justificativa.' },
      { title: 'Terceiros no confronto', body: 'Não entre em confronto de terceiros sem vínculo ou motivação IC. Ajudar amigos apenas por comunicação externa caracteriza metagaming.' },
    ],
  },
  {
    id: 'zonas', title: 'Áreas seguras e eventos', intro: 'Alguns locais e atividades podem ter proteção ou regras especiais para garantir acesso a serviços e experiências comunitárias.',
    rules: [
      { title: 'Áreas seguras (Safe Zones)', body: 'Respeite as áreas seguras oficialmente definidas e divulgadas pela administração. Não inicie conflitos, ameaças, sequestros ou ações criminosas dentro dessas áreas.' },
      { title: 'Fuga para área segura', body: 'Não utilize uma área segura para interromper artificialmente uma perseguição, escapar de consequências ou obter proteção depois de iniciar uma ação em local diferente.' },
      { title: 'Início de ação próximo a áreas seguras', body: 'Não provoque ou prepare uma ação com o objetivo de atingir jogadores que estejam entrando ou saindo de uma área protegida. A equipe poderá avaliar o contexto e a intenção.' },
      { title: 'Hospitais e pontos de serviço', body: 'Preserve o funcionamento de hospitais, garagens, concessionárias, empregos e demais locais de serviço. Restrições específicas desses locais devem ser respeitadas.' },
      { title: 'Eventos oficiais', body: 'Siga as instruções dos organizadores, respeite áreas delimitadas e não utilize eventos para iniciar conflitos sem autorização. Não atrapalhe atividades comunitárias de propósito.' },
      { title: 'Exploração de eventos', body: 'Não abuse de recompensas, inscrições, reinícios ou falhas de eventos para receber benefícios indevidos. Reporte erros à equipe.' },
    ],
  },
  {
    id: 'economia', title: 'Economia, propriedades e comércio', intro: 'A economia precisa ser justa e sustentável. Toda transação deve acontecer pelos meios permitidos e sem exploração de sistemas.',
    rules: [
      { title: 'Exploração de bugs e duplicação', body: 'É proibido duplicar dinheiro, itens, veículos ou propriedades, explorar erros de preço, recompensas, inventário ou qualquer falha econômica. Informe a equipe ao encontrar um problema.' },
      { title: 'Fraudes e golpes IC', body: 'Golpes podem existir como interpretação somente dentro dos limites definidos pela cidade. Nunca envolva dinheiro real, dados pessoais, contas ou ameaças fora do jogo.' },
      { title: 'Comércio e transferências', body: 'Negociações devem respeitar os limites e sistemas oficiais. Não transfira bens para contornar punições, limites de propriedade ou restrições de personagem.' },
      { title: 'Venda por dinheiro real', body: 'É proibido comercializar dinheiro, itens, contas, veículos, vantagens ou serviços da cidade por dinheiro real fora de mecanismos expressamente autorizados pela administração.' },
      { title: 'Propriedades e empresas', body: 'Utilize propriedades, empresas e estoques conforme sua finalidade. Não mantenha negócios apenas para bloquear conteúdo, monopolizar sistemas ou obter vantagens indevidas.' },
      { title: 'Abuso de reembolso', body: 'Não solicite reembolsos duplicados, não omita informações relevantes e não tente transformar falhas técnicas em benefício. Solicitações devem apresentar contexto e provas.' },
    ],
  },
  {
    id: 'seguranca', title: 'Segurança, trapaças e bugs', intro: 'A integridade do servidor e a igualdade entre jogadores são indispensáveis. Vantagens externas ou exploração deliberada comprometem toda a comunidade.',
    rules: [
      { title: 'Cheats e programas externos', body: 'É proibido utilizar cheats, injetores, scripts, macros abusivas, modificações ou ferramentas que concedam vantagem injusta, revelem informações ocultas ou interfiram no funcionamento do servidor.' },
      { title: 'Exploração de falhas', body: 'Não explore bugs de mapa, animação, física, inventário, economia, veículos, empregos ou permissões. Interrompa o abuso e reporte a falha à equipe.' },
      { title: 'Compartilhamento de contas', body: 'Não compartilhe contas ou credenciais quando isso comprometer a segurança, a identificação ou a responsabilidade individual. Nunca solicite senha ou código de autenticação de outro jogador.' },
      { title: 'Tentativas de invasão', body: 'É proibido tentar acessar contas, sistemas, painéis, bancos de dados, canais privados ou recursos administrativos sem autorização.' },
      { title: 'Denúncia de vulnerabilidades', body: 'Reporte falhas de forma privada pelos canais oficiais, incluindo passos para reproduzir e evidências. Não divulgue publicamente métodos que permitam abuso.' },
    ],
  },
  {
    id: 'discord', title: 'Discord e comunidade', intro: 'O Discord é parte da comunidade Avenue. As mesmas expectativas de respeito e segurança se aplicam aos canais oficiais.',
    rules: [
      { title: 'Respeito nos canais', body: 'Siga as orientações de cada canal, evite spam, flood, provocações persistentes e conteúdo impróprio. Não marque membros ou a equipe repetidamente para pressionar por respostas.' },
      { title: 'Divulgação e links', body: 'Não divulgue outros servidores, serviços, convites ou conteúdos comerciais sem autorização. Links suspeitos, golpes e arquivos maliciosos serão removidos.' },
      { title: 'Privacidade', body: 'Não publique dados pessoais, endereços, documentos, conversas privadas ou gravações de terceiros sem autorização. Denúncias devem ser encaminhadas à equipe.' },
      { title: 'Entrevistas de whitelist', body: 'A entrevista deve ser realizada com respeito e honestidade. Não grave, transmita ou compartilhe a conversa sem autorização dos participantes.' },
      { title: 'Impersonação', body: 'Não se passe por membro da equipe, criador de conteúdo, parceiro ou outro jogador. Não utilize nomes, avatares ou cargos para induzir pessoas ao erro.' },
    ],
  },
  {
    id: 'staff', title: 'Equipe, denúncias e punições', intro: 'A equipe atua para preservar a experiência coletiva. Decisões devem considerar contexto, evidências, gravidade e reincidência.',
    rules: [
      { title: 'Orientações da equipe', body: 'Durante um atendimento ou análise, mantenha a calma e siga as orientações. Se discordar de uma decisão, utilize o canal de revisão em vez de interromper cenas ou iniciar discussões públicas.' },
      { title: 'Como abrir uma denúncia', body: 'Apresente data aproximada, identificação dos envolvidos, descrição objetiva e evidências completas. Não edite materiais de forma a alterar o contexto e não provoque o outro jogador para obter uma reação.' },
      { title: 'Provas e gravações', body: 'Preserve o material original e o contexto anterior e posterior ao ocorrido. Capturas isoladas podem não demonstrar toda a situação; a equipe poderá solicitar informações adicionais.' },
      { title: 'Medidas administrativas', body: 'Conforme a gravidade, a equipe poderá orientar, advertir, encerrar uma cena, remover benefícios obtidos irregularmente, suspender ou banir contas. Medidas podem variar conforme reincidência e impacto.' },
      { title: 'Revisão de punição', body: 'Solicite revisão pelos canais oficiais, com respeito e informações objetivas. Ameaças, exposição pública ou insistência fora dos canais apropriados não aceleram a análise.' },
      { title: 'Responsabilidade individual', body: 'Cada jogador responde por suas ações e pelo uso de sua conta. Alegar desconhecimento das regras não elimina a responsabilidade por descumpri-las.' },
    ],
  },
  {
    id: 'acoes', title: 'Regras de ações', intro: 'Consulte as regras específicas para cada modalidade de ação. Os documentos oficiais detalham requisitos, participantes, procedimentos e condições de cada atividade.', rules: [],
    externalLinks: [
      { title: 'Invasão à Favela', url: 'https://avenue-5.gitbook.io/avenue/regras-acoes/invasao-favela', description: 'Incursões, invasões, operações policiais, pacificação e regras gerais.' },
      { title: 'Regras de Ações', url: 'https://avenue-5.gitbook.io/avenue/regras-acoes/regras-acoes', description: 'Tempos de espera, negociações, fuga limpa e regras de sequestro.' },
      { title: 'Ações Comuns', url: 'https://avenue-5.gitbook.io/avenue/regras-acoes/acoes-comuns', description: 'Air Drop, ações na fuga, caixa eletrônico, corrida ilegal e tráfico.' },
      { title: 'Ações Pequenas', url: 'https://avenue-5.gitbook.io/avenue/regras-acoes/acoes-pequenas', description: 'Ammunation, Samir, Cemitério, Yellow Jack, Comedy, Planet, McDonald’s e Estábulo.' },
      { title: 'Ações Médias', url: 'https://avenue-5.gitbook.io/avenue/regras-acoes/acoes-medias', description: 'Açougue, Galinheiro, Carro-Forte (Bobcat), Maze Bank e Joalheria.' },
      { title: 'Ações Grandes', url: 'https://avenue-5.gitbook.io/avenue/regras-acoes/acoes-grandes', description: 'Banco Central, Banco Paleto, Nióbio, Flecca e Hotel Rosa.' },
    ],
  },
]

export function Regras() {
  const [active, setActive] = useState('fundamentos')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const current = sections.find((section) => section.id === active) ?? sections[0]
  const filteredRules = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('pt-BR')
    if (!term) return current.rules
    return current.rules.filter((rule) => `${rule.title} ${rule.body}`.toLocaleLowerCase('pt-BR').includes(term))
  }, [current, search])
  const totalRules = sections.reduce((total, section) => total + section.rules.length, 0)

  return (
    <main className="cinema-rules">
      <section className="cinema-rules__hero">
        <div className="cinema-container relative z-10 py-24 sm:py-32">
          <p className="cinema-eyebrow">AVENUE ROLEPLAY / MANUAL OFICIAL</p>
          <h1 className="cinema-heading max-w-5xl">Uma cidade.<br /><em>Regras para todos.</em></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/65">Este manual orienta a convivência, a interpretação e o funcionamento da comunidade. Leia antes de entrar na cidade: uma boa história só existe quando todos respeitam o mesmo universo.</p>
          <div className="mt-10 flex flex-wrap gap-8 border-t border-white/15 pt-6">
            <div><strong className="font-display text-3xl text-[#e8d2a6]">{String(sections.length).padStart(2, '0')}</strong><span className="ml-3 text-[.6rem] font-bold uppercase tracking-[.2em] text-white/45">Categorias</span></div>
            <div><strong className="font-display text-3xl text-[#e8d2a6]">{totalRules}</strong><span className="ml-3 text-[.6rem] font-bold uppercase tracking-[.2em] text-white/45">Diretrizes</span></div>
            <div><strong className="font-display text-3xl text-[#e8d2a6]">01</strong><span className="ml-3 text-[.6rem] font-bold uppercase tracking-[.2em] text-white/45">Comunidade</span></div>
          </div>
        </div>
      </section>

      <section className={cn(pageShellClass, 'cinema-rules__body pb-24 pt-14')}>
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><p className="cinema-eyebrow">Consulte o manual</p><h2 className="mt-4 font-display text-4xl font-bold uppercase text-white sm:text-5xl">Conheça as <span className="text-[#c6a66b]">diretrizes.</span></h2></div>
          <label className="cinema-rules__search"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar uma regra..." aria-label="Buscar uma regra"/></label>
        </div>

        <div className="grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)]">
          <aside className="cinema-rules__sidebar">
            <p className="px-4 pb-3 pt-2 text-[.6rem] font-bold uppercase tracking-[.22em] text-white/40">Índice do manual</p>
            {sections.map((section, index) => <button type="button" key={section.id} onClick={() => { setActive(section.id); setSearch(''); setExpanded(null) }} className={cn('cinema-rules__tab', active === section.id && 'is-active')}><span>{String(index + 1).padStart(2, '0')}</span><strong>{section.title}</strong><small>{section.externalLinks?.length ?? section.rules.length}</small></button>)}
          </aside>

          <article className="cinema-rules__content">
            <div className="border-b border-white/10 pb-7">
              <p className="cinema-eyebrow">CAPÍTULO {String(sections.findIndex((section) => section.id === active) + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-display text-4xl font-bold uppercase text-white sm:text-5xl">{current.title}</h3>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/55">{current.intro}</p>
              <p className="mt-5 text-[.6rem] font-bold uppercase tracking-[.18em] text-[#c6a66b]">{current.externalLinks ? current.externalLinks.filter((item) => !search.trim() || `${item.title} ${item.description}`.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR'))).length + ' categorias disponíveis' : `${filteredRules.length} ${filteredRules.length === 1 ? 'regra encontrada' : 'regras encontradas'}`}</p>
            </div>
            {current.externalLinks ? <div className="cinema-action-links">
              {current.externalLinks.filter((item) => !search.trim() || `${item.title} ${item.description}`.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR'))).map((item, index) => <a className="cinema-action-link" href={item.url} target="_blank" rel="noreferrer" key={item.url}>
                <span className="cinema-action-link__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="cinema-action-link__copy"><strong>{item.title}</strong><small>{item.description}</small></span>
                <span className="cinema-action-link__arrow" aria-hidden="true">↗</span>
              </a>)}
              {current.externalLinks.filter((item) => !search.trim() || `${item.title} ${item.description}`.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR'))).length === 0 && <p className="py-12 text-center text-sm text-white/45">Nenhuma categoria encontrada para esta busca.</p>}
            </div> : <div className="divide-y divide-white/10">
              {filteredRules.map((rule, index) => {
                const isExpanded = expanded === rule.title
                return <section key={rule.title} className="cinema-rule-item">
                  <button type="button" aria-expanded={isExpanded} onClick={() => setExpanded(isExpanded ? null : rule.title)} className="cinema-rule-item__trigger">
                    <span>{String(index + 1).padStart(2, '0')}</span><strong>{rule.title}</strong><b>{isExpanded ? '−' : '+'}</b>
                  </button>
                  {isExpanded && <p className="cinema-rule-item__body">{rule.body}</p>}
                </section>
              })}
              {filteredRules.length === 0 && <div className="py-12 text-center"><p className="font-display text-2xl font-bold uppercase text-white">Nenhuma regra encontrada.</p><p className="mt-2 text-sm text-white/45">Tente outro termo ou selecione outra categoria.</p><button type="button" onClick={() => setSearch('')} className="mt-5 text-xs font-bold uppercase tracking-widest text-[#c6a66b]">Limpar busca</button></div>}
            </div>}
            <div className="mt-10 border border-[#c6a66b]/25 bg-[#131313] p-6 sm:p-8">
              <p className="text-[.6rem] font-bold uppercase tracking-[.22em] text-[#c6a66b]">Próximo passo</p>
              <h3 className="mt-3 font-display text-2xl font-bold uppercase text-white">Pronto para fazer parte?</h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-white/55">Depois de ler o manual, conecte seu Discord e siga as orientações para participar da entrevista de whitelist.</p>
              <Link to="/whitelist" className={cn(buttonVariants(), 'mt-6 inline-flex')}>Solicitar whitelist ↗</Link>
            </div>
          </article>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-6 text-white/35">A administração poderá atualizar este manual. Regras operacionais específicas — como limites de participantes, prazos, áreas seguras, valores, tempos de ação e procedimentos de facções — devem ser publicadas em comunicados oficiais antes de sua aplicação. Em caso de dúvida, procure a equipe pelos canais oficiais.</p>
      </section>
    </main>
  )
}
