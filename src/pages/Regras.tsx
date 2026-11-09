import { useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonVariants, pageShellClass } from '../components/ui/variants'
import { cn } from '../lib/cn'

const sections = [
  { id: 'convivencia', title: 'Convivência e respeito', intro: 'A cidade é construída por pessoas. Respeito e bom senso são indispensáveis dentro e fora do personagem.', rules: [
    ['Respeito entre jogadores', 'Ofensas discriminatórias, assédio, perseguição, ameaças e comportamentos tóxicos não serão tolerados, mesmo quando disfarçados de interpretação.'],
    ['OOC e IC', 'Mantenha assuntos pessoais fora da interpretação. Não use informações obtidas fora do jogo para beneficiar seu personagem.'],
    ['Staff e denúncias', 'Siga as orientações da equipe. Denúncias devem ser feitas pelos canais oficiais, com contexto e provas, sem exposição pública ou caça às bruxas.'],
  ]},
  { id: 'interpretacao', title: 'Interpretação (RP)', intro: 'Priorize a construção de histórias coerentes. Seu personagem não é você e deve agir de acordo com sua personalidade, contexto e limites.', rules: [
    ['Valorize a cena', 'Não interrompa uma cena em andamento sem motivo válido. Dê espaço para que todos os envolvidos possam interpretar.'],
    ['Powergaming', 'Não force ações impossíveis, irreais ou que retirem a possibilidade de reação dos demais jogadores.'],
    ['Metagaming', 'É proibido usar informações externas ao personagem, como lives, streams, Discord ou conversas OOC, para tomar decisões dentro do jogo.'],
    ['Amor à vida', 'Seu personagem deve valorizar a própria vida diante de ameaças plausíveis. Não provoque situações fatais sem considerar as consequências.'],
    ['Combat logging', 'Sair do servidor para evitar abordagem, prisão, consequência ou continuidade de uma cena é proibido.'],
    ['RDM e VDM', 'Matar ou atropelar jogadores sem contexto e desenvolvimento de RP válido não é permitido.'],
  ]},
  { id: 'acoes', title: 'Abordagens e ações', intro: 'Conflitos precisam de contexto, comunicação e oportunidade de resposta.', rules: [
    ['Abordagens', 'Dê tempo para a outra parte compreender a situação e reagir. Não use bugs, comandos ou limitações técnicas para obter vantagem.'],
    ['Sequestros e reféns', 'Ações com reféns devem ter motivação e desenvolvimento coerentes. É proibido criar situações abusivas ou sem possibilidade razoável de negociação.'],
    ['Safe zones', 'Hospitais, áreas de serviço e locais definidos pela administração exigem cuidado especial. Conflitos nessas áreas seguem as restrições publicadas pela equipe.'],
    ['Revenge kill', 'Não retorne imediatamente para se vingar de quem derrubou ou matou seu personagem, nem use memória da cena de forma incompatível com o estado do personagem.'],
  ]},
  { id: 'economia', title: 'Economia e organizações', intro: 'Sistemas, empregos e organizações existem para gerar histórias equilibradas.', rules: [
    ['Exploração de bugs', 'Abusar de falhas, duplicar itens, manipular economia ou explorar sistemas é proibido. Informe a equipe ao encontrar uma falha.'],
    ['Transações externas', 'É proibido comprar, vender ou trocar dinheiro, itens, contas ou vantagens da cidade por dinheiro real fora dos meios oficiais autorizados.'],
    ['Organizações', 'Lideranças devem orientar seus membros e responder por condutas recorrentes da organização. Recrutamento e ações devem seguir as diretrizes específicas.'],
    ['Fraudes e golpes', 'Golpes podem fazer parte do RP quando houver contexto e limites definidos pela cidade; não podem envolver exploração de bugs, OOC ou extorsão real.'],
  ]},
  { id: 'comunicacao', title: 'Comunicação e conteúdo', intro: 'Use os canais corretos e preserve a experiência coletiva.', rules: [
    ['Microfone e áudio', 'Utilize comunicação compreensível e evite sons, músicas ou efeitos que prejudiquem a experiência dos demais.'],
    ['Discord', 'Mantenha respeito nos canais oficiais e não divulgue informações privadas de outros membros.'],
    ['Trapaças e modificações', 'Cheats, macros abusivas, programas que concedam vantagem injusta e tentativas de contornar sistemas de segurança resultam em punição.'],
  ]},
  { id: 'punicoes', title: 'Punições e interpretação', intro: 'A equipe avalia contexto, provas, reincidência e impacto na comunidade.', rules: [
    ['Medidas administrativas', 'As medidas podem incluir orientação, advertência, remoção de cena, suspensão temporária ou banimento, conforme gravidade e reincidência.'],
    ['Revisão', 'Caso discorde de uma decisão, solicite revisão pelos canais oficiais com educação e informações objetivas.'],
    ['Atualizações', 'As regras podem ser atualizadas. É responsabilidade de cada jogador consultar esta página e os comunicados oficiais antes de jogar.'],
  ]},
]

export function Regras() {
  const [active, setActive] = useState('convivencia')
  const current = sections.find((section) => section.id === active) ?? sections[0]
  return <section className={cn(pageShellClass, 'pb-24 pt-14')}>
    <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-accent">Manual da cidade</p><h1 className="mt-4 font-display text-6xl font-bold uppercase leading-none text-ink sm:text-7xl">Regras de <span className="text-accent">Roleplay.</span></h1><p className="mt-6 text-lg leading-8 text-mute">Este é o guia oficial de convivência e interpretação. Leia com atenção antes de solicitar sua whitelist. O objetivo das regras é proteger a experiência e garantir espaço para boas histórias.</p></div>
    <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit border border-line bg-panel p-3"><p className="px-3 py-3 text-[.65rem] font-bold uppercase tracking-[.2em] text-mute">Navegar pelas regras</p>{sections.map((section) => <button key={section.id} onClick={() => setActive(section.id)} className={cn('flex w-full items-center justify-between px-3 py-3 text-left text-sm transition-colors', active === section.id ? 'bg-accent/10 font-bold text-accent' : 'text-mute hover:bg-white/5 hover:text-ink')}><span>{section.title}</span><span>→</span></button>)}</aside>
      <article className="min-w-0"><p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Diretrizes / {String(sections.findIndex((s) => s.id === active) + 1).padStart(2, '0')}</p><h2 className="mt-3 font-display text-4xl font-bold uppercase text-ink sm:text-5xl">{current.title}</h2><p className="mt-4 border-b border-line pb-7 leading-7 text-mute">{current.intro}</p><div className="divide-y divide-line">{current.rules.map(([title, body], index) => <section key={title} className="py-6"><div className="flex gap-4"><span className="font-display text-xl font-bold text-accent/70">{String(index + 1).padStart(2, '0')}</span><div><h3 className="font-display text-2xl font-bold uppercase text-ink">{title}</h3><p className="mt-2 leading-7 text-mute">{body}</p></div></div></section>)}</div>
      <div className="mt-8 border border-line bg-panel p-6"><p className="font-display text-xl font-bold uppercase text-ink">Está pronto para começar?</p><p className="mt-2 text-sm leading-6 text-mute">Depois de ler as regras, conecte seu Discord e solicite uma entrevista de whitelist.</p><Link to="/whitelist" className={cn(buttonVariants(), 'mt-5 inline-flex')}>Solicitar whitelist ↗</Link></div>
    </article></div>
    <p className="mt-10 text-xs leading-6 text-mute/70">Documento-base de regras da comunidade. A administração deve revisar e ajustar limites específicos (safe zones, tempos, quantidade de participantes e regras de organizações) de acordo com os sistemas efetivamente ativos na cidade.</p>
  </section>
}
