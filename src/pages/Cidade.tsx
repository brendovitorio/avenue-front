import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { buttonVariants, pageShellClass } from '../components/ui/variants'
import { cn } from '../lib/cn'

const worlds = [
  ['Serviços públicos','Faça parte das forças que mantêm a cidade funcionando.','POLÍCIA · SAMU · MECÂNICA'],
  ['Empreendedorismo','Construa um negócio, gere oportunidades e movimente a economia.','EMPRESAS · COMÉRCIO · SERVIÇOS'],
  ['Vida civil','Conheça pessoas, encontre seu caminho e desenvolva sua própria rotina.','SOCIAL · EVENTOS · CONQUISTAS'],
  ['Organizações','Crie conexões, desenvolva projetos e construa histórias coletivas.','GRUPOS · PROJETOS · COMUNIDADE'],
]
export function Cidade() {
 return <section className={cn(pageShellClass,'pb-24 pt-14')}>
  <PageHeader title="A Cidade" lede="Um universo de possibilidades para você construir uma vida do seu jeito."/>
  <div className="relative overflow-hidden border border-line bg-[radial-gradient(ellipse_at_80%_20%,rgba(168,121,255,.17),transparent_45%),#12141D] p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[.25em] text-accent">Um lugar para pertencer</p><h2 className="mt-4 max-w-3xl font-display text-5xl font-bold uppercase leading-[.95] text-ink sm:text-7xl">A cidade ganha vida através de você.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-mute">Não existe um único caminho. Cada profissão, amizade, decisão e encontro pode abrir uma nova possibilidade. Entre para viver uma história, não apenas para cumprir uma missão.</p></div>
  <div className="mt-14"><p className="text-xs font-bold uppercase tracking-[.25em] text-accent">Possibilidades</p><h2 className="mt-3 font-display text-4xl font-bold uppercase text-ink">Encontre seu lugar.</h2><div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2">{worlds.map(([title,desc,tags],i)=><article key={title} className="bg-panel p-7 sm:p-9"><span className="font-display text-4xl font-bold text-accent">0{i+1}</span><h3 className="mt-6 font-display text-3xl font-bold uppercase text-ink">{title}</h3><p className="mt-3 leading-7 text-mute">{desc}</p><p className="mt-6 text-[.65rem] font-bold tracking-[.15em] text-accent">{tags}</p></article>)}</div></div>
  <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center"><div><h2 className="font-display text-3xl font-bold uppercase text-ink">Sua história começa agora.</h2><p className="mt-2 text-mute">Leia as regras e prepare sua entrevista de whitelist.</p></div><Link to="/whitelist" className={cn(buttonVariants({size:'lg'}))}>Quero fazer parte ↗</Link></div>
 </section>
}
