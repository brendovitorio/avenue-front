import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonVariants, pageShellClass } from '../components/ui/variants'
import { cn } from '../lib/cn'
import { getServerStatus } from '../lib/api'
import { useAuth } from '../state/AuthContext'

const PILLARS = [
  { n: '01', title: 'Sua história', body: 'Construa uma identidade, faça escolhas e deixe sua marca na cidade.' },
  { n: '02', title: 'Uma cidade viva', body: 'Encontre oportunidades, conheça pessoas e participe de uma comunidade ativa.' },
  { n: '03', title: 'Roleplay de verdade', body: 'Valorize a interpretação, as consequências e as histórias construídas em conjunto.' },
]

export function Home() {
  const { player } = useAuth()
  const [online, setOnline] = useState<number | null>(null)
  useEffect(() => {
    let active = true
    getServerStatus().then(({ online: count }) => { if (active) setOnline(count) }).catch(() => { if (active) setOnline(null) })
    return () => { active = false }
  }, [])
  return (
    <div className="home-page">
      <section className="relative isolate flex min-h-[720px] items-end overflow-hidden border-b border-line lg:min-h-[calc(100svh-4.5rem)]">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_72%_30%,rgba(168,121,255,.20),transparent_42%),linear-gradient(125deg,#090A10_0%,#111522_55%,#090A10_100%)]" />
        <div className="absolute inset-0 -z-20 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:70px_70px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute -right-20 top-20 -z-10 size-[38rem] rounded-full border border-accent/10 shadow-[0_0_0_50px_rgba(168,121,255,.025),0_0_0_100px_rgba(168,121,255,.018)]" />
        <div className={cn(pageShellClass, 'w-full pb-20 pt-28 sm:pb-28 lg:pb-32')}>
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[.28em] text-accent"><span className="h-px w-10 bg-accent" /> Uma nova vida espera por você</p>
            <h1 className="max-w-[11ch] font-display text-7xl font-bold uppercase leading-[.82] tracking-tight text-white sm:text-8xl lg:text-[7.5rem]">A cidade é <span className="text-accent">sua.</span></h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg">Mais do que entrar em um servidor, é começar uma história. Crie conexões, descubra possibilidades e viva o seu próprio Roleplay.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to={player ? '/whitelist' : '/cadastro'} className={cn(buttonVariants({ size: 'lg' }), 'min-w-48')}>{player ? 'Solicitar whitelist' : 'Entrar com Discord'} <span aria-hidden="true">↗</span></Link>
              <Link to="/regras" className={cn(buttonVariants({ intent: 'outline', size: 'lg' }), 'border-white/30 bg-black/20 text-white hover:bg-white/10')}>Conhecer as regras</Link>
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-xs font-semibold uppercase tracking-[.16em] text-white/65">
              <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-online shadow-[0_0_12px_#22c55e]" /> {online === null ? 'Cidade em preparação' : `${online} jogadores online`}</span>
              <span>Whitelist por entrevista</span><span>Comunidade Discord</span>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-10 right-8 hidden text-right xl:block"><p className="font-display text-8xl font-bold leading-none text-white/10">ROLEPLAY</p><p className="mt-2 text-[.65rem] uppercase tracking-[.35em] text-white/35">Sua história começa aqui</p></div>
      </section>

      <section className={cn(pageShellClass, 'py-20 sm:py-28')}>
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div><p className="text-xs font-bold uppercase tracking-[.25em] text-accent">Bem-vindo à cidade</p><h2 className="mt-4 max-w-md font-display text-5xl font-bold uppercase leading-[.95] text-ink sm:text-6xl">Não existe uma história igual à sua.</h2></div>
          <div className="max-w-2xl self-end"><p className="text-lg leading-8 text-mute">Aqui, cada encontro pode mudar o rumo do seu personagem. Você pode construir uma carreira, empreender, servir à população ou trilhar seu próprio caminho. O que acontece a seguir depende das escolhas que você faz.</p><Link to="/cidade" className="mt-6 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-accent hover:text-ink">Explore a cidade <span>↗</span></Link></div>
        </div>
        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3">
          {PILLARS.map((item) => <article key={item.n} className="bg-panel p-7 sm:p-9"><span className="font-display text-4xl font-bold text-accent/70">{item.n}</span><h3 className="mt-8 font-display text-3xl font-bold uppercase text-ink">{item.title}</h3><p className="mt-3 leading-7 text-mute">{item.body}</p></article>)}
        </div>
      </section>

      <section className="border-y border-line bg-panel/55">
        <div className={cn(pageShellClass, 'grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center')}>
          <div><p className="text-xs font-bold uppercase tracking-[.25em] text-accent">Faça parte</p><h2 className="mt-3 max-w-2xl font-display text-5xl font-bold uppercase leading-none text-ink sm:text-6xl">Sua próxima vida começa com uma conversa.</h2><p className="mt-5 max-w-xl leading-7 text-mute">Conecte seu Discord, leia as regras e solicite sua whitelist. Nossa equipe orientará você sobre a entrevista por voz.</p></div>
          <Link to={player ? '/whitelist' : '/cadastro'} className={cn(buttonVariants({ size: 'lg' }), 'whitespace-nowrap')}>Começar agora <span>↗</span></Link>
        </div>
      </section>
    </div>
  )
}
