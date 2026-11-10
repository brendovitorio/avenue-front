import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../components/ui/variants'
import { cn } from '../lib/cn'
import { getServerStatus } from '../lib/api'
import { useAuth } from '../state/AuthContext'

const DISCORD_INVITE = import.meta.env.VITE_DISCORD_INVITE ?? 'https://discord.com/'
const SERVER_CONNECT = import.meta.env.VITE_FIVEM_CONNECT_URL ?? ''

const moments = [
  { number: '01', title: 'Construa seu caminho', copy: 'Uma carreira, um negócio, uma vocação. Na Avenue, suas escolhas definem o rumo da sua história.', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=90', alt: 'Arranha-céus de uma metrópole ao entardecer' },
  { number: '02', title: 'Encontre sua comunidade', copy: 'Conheça pessoas, forme alianças e faça parte de uma cidade que ganha vida a cada encontro.', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=90', alt: 'Avenida urbana com prédios e luzes noturnas' },
  { number: '03', title: 'Deixe sua marca', copy: 'Cada decisão cria consequências. Cada noite pode se tornar uma história inesquecível.', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=90', alt: 'Paisagem urbana cinematográfica ao anoitecer' },
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
    <div className="home-page overflow-hidden">
      <section className="cinema-hero relative isolate flex min-h-[min(900px,calc(100svh-4.5rem))] items-end overflow-hidden">
        <video className="cinema-hero__video" autoPlay muted loop playsInline preload="metadata" poster="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=90" aria-hidden="true">
          <source src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="cinema-hero__overlay" />
        <div className="cinema-hero__grain" />
        <div className="cinema-hero__content mx-auto w-full max-w-[1500px] px-5 pb-20 pt-36 sm:px-10 sm:pb-28 lg:px-16">
          <div className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[.42em] text-[#e8d2a6] sm:text-xs"><span className="h-px w-12 bg-[#c6a66b]" /> Uma cidade. Mil histórias.</div>
          <p className="cinema-wordmark" aria-label="Avenue">AVENUE</p>
          <div className="mt-2 flex flex-col justify-between gap-8 border-t border-white/25 pt-6 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="font-display text-xl font-semibold uppercase tracking-[.18em] text-white sm:text-2xl">Sua próxima vida começa aqui.</p>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base">Entre em uma cidade onde cada escolha tem peso, cada encontro pode mudar tudo e cada história é escrita por você.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={SERVER_CONNECT || '#jogar-agora'} onClick={!SERVER_CONNECT ? (e) => { e.preventDefault(); document.getElementById('jogar-agora')?.scrollIntoView({ behavior: 'smooth' }) } : undefined} className="cinema-button cinema-button--gold">Jogue agora <span>↗</span></a>
              <Link to="/cidade" className="cinema-button cinema-button--glass">Conheça a cidade <span>↓</span></Link>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/65">
            <span className="flex items-center gap-3"><i className="size-2 rounded-full bg-[#79c69b] shadow-[0_0_12px_#79c69b]" />{online === null ? 'Uma nova cidade espera por você' : `${online} jogadores online`}</span>
            <span>Whitelist por entrevista</span><span>FiveM Roleplay</span>
          </div>
        </div>
        <span className="cinema-hero__index">01 — 04 / AVENUE ROLEPLAY</span>
        <span className="cinema-hero__scroll">Role para descobrir <i /></span>
      </section>

      <section className="cinema-intro section-luxury">
        <div className="cinema-container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div><p className="cinema-eyebrow">01 / Bem-vindo à Avenue</p><h2 className="cinema-heading">Mais que uma cidade.<br /><em>Um novo mundo.</em></h2></div>
          <div className="self-end"><p className="max-w-2xl text-lg leading-9 text-white/65">A Avenue foi pensada para quem procura mais do que entrar em um servidor. Aqui, você encontra espaço para criar, crescer, se conectar e viver experiências que continuam além de uma sessão de jogo.</p><Link to="/cidade" className="cinema-text-link mt-8">Descubra a experiência <span>↗</span></Link></div>
        </div>
        <div className="cinema-container mt-16 grid gap-4 md:grid-cols-3">
          {moments.map((item) => <article key={item.number} className="cinema-story-card group"><div className="cinema-story-card__image" style={{ backgroundImage: `url("${item.image}")` }} role="img" aria-label={item.alt} /><div className="cinema-story-card__shade" /><div className="cinema-story-card__body"><span>{item.number} / EXPERIÊNCIA</span><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}
        </div>
      </section>

      <section className="cinema-reel relative isolate overflow-hidden" aria-label="A Avenue em movimento">
        <video className="cinema-reel__video" autoPlay muted loop playsInline preload="none" poster="https://images.pexels.com/videos/35280387/above-city-active-city-busy-city-city-35280387.jpeg?auto=compress&w=1920">
          <source src="https://videos.pexels.com/video-files/35280387/35280387-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="cinema-reel__shade" />
        <div className="cinema-container relative flex min-h-[520px] flex-col justify-end py-16 sm:min-h-[650px] sm:py-24">
          <p className="cinema-eyebrow">02 / Sinta o ritmo da cidade</p>
          <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="cinema-reel__title">A cidade<br /><em>nunca para.</em></h2>
            <p className="max-w-sm text-sm leading-7 text-white/70">Ruas movimentadas, encontros inesperados e oportunidades em cada esquina. Na Avenue, sempre existe algo acontecendo.</p>
          </div>
          <div className="cinema-reel__meta"><span>AVENUE ROLEPLAY</span><span>UMA EXPERIÊNCIA EM CONSTANTE MOVIMENTO</span></div>
        </div>
      </section>

      <section className="cinema-statement relative isolate flex min-h-[580px] items-center overflow-hidden">
        <div className="cinema-statement__image" />
        <div className="cinema-statement__shade" />
        <div className="cinema-container relative py-28"><p className="cinema-eyebrow">03 / A cidade é sua</p><h2 className="cinema-heading max-w-4xl">Algumas cidades são feitas de ruas. <em>Avenue é feita de histórias.</em></h2><p className="mt-8 max-w-xl text-base leading-8 text-white/65">Da primeira conversa à conquista que parecia impossível, tudo começa quando você decide fazer parte.</p></div>
      </section>

      <section className="cinema-journey section-luxury">
        <div className="cinema-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><p className="cinema-eyebrow">04 / Faça parte</p><h2 className="cinema-heading">Sua história<br /><em>merece ser vivida.</em></h2><p className="mt-6 max-w-xl leading-8 text-white/60">Conecte sua conta Discord, leia as regras e participe da entrevista de whitelist. Nossa equipe vai orientar você em cada etapa.</p><div className="mt-9 flex flex-wrap gap-3"><Link to={player ? '/whitelist' : '/cadastro'} className="cinema-button cinema-button--gold">Começar minha jornada <span>↗</span></Link><Link to="/regras" className="cinema-button cinema-button--glass">Ler as regras</Link></div></div>
          <div className="cinema-steps">
            <Link to="/cadastro"><span>01</span><div><strong>Conecte seu Discord</strong><small>Identifique sua conta na comunidade.</small></div><b>↗</b></Link>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"><span>02</span><div><strong>Entre no nosso Discord</strong><small>Encontre os canais oficiais da Avenue.</small></div><b>↗</b></a>
            <Link to="/regras"><span>03</span><div><strong>Prepare-se para a entrevista</strong><small>Conheça as regras antes da whitelist.</small></div><b>↗</b></Link>
          </div>
        </div>
      </section>

      <section id="jogar-agora" className="cinema-final-cta">
        <div className="cinema-container relative z-10 py-24 text-center sm:py-32"><p className="cinema-eyebrow justify-center">AVENUE ROLEPLAY / EST. 2026</p><h2 className="cinema-final-word">A CIDADE<br /><em>TE ESPERA.</em></h2><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/60">O próximo capítulo depende de você. Entre para a comunidade e dê o primeiro passo.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><a href={SERVER_CONNECT || '/cadastro'} target={SERVER_CONNECT ? '_blank' : undefined} rel={SERVER_CONNECT ? 'noreferrer' : undefined} className="cinema-button cinema-button--gold">{SERVER_CONNECT ? 'Jogue agora' : 'Iniciar whitelist'} <span>↗</span></a><a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="cinema-button cinema-button--glass">Acessar Discord <span>↗</span></a></div></div>
      </section>
    </div>
  )
}
