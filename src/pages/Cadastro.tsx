import { Link } from 'react-router-dom'
import { API_BASE } from '../lib/api'
import { useAuth } from '../state/AuthContext'

const DISCORD_INVITE = import.meta.env.VITE_DISCORD_INVITE ?? 'https://discord.com/'

export function Cadastro() {
  const { player, loading } = useAuth()

  return (
    <main className="cinema-whitelist">
      <section className="cinema-subhero cinema-subhero--whitelist">
        <div className="cinema-container relative z-10 py-28 sm:py-36">
          <p className="cinema-eyebrow">AVENUE ROLEPLAY / ACESSO À CIDADE</p>
          <h1 className="cinema-heading max-w-5xl">Toda história<br />começa com <em>um convite.</em></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/65">A entrada na Avenue acontece por entrevista no Discord. Conheça as regras, conecte sua conta e converse com nossa equipe para dar o primeiro passo.</p>
        </div>
      </section>
      <section className="section-luxury py-20 sm:py-28">
        <div className="cinema-container">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
            <div><p className="cinema-eyebrow">01 / Processo de entrada</p><h2 className="cinema-heading">Seu acesso.<br /><em>Em três etapas.</em></h2><p className="mt-6 max-w-lg text-sm leading-8 text-white/55">Não existe formulário automático de aprovação. Nossa equipe realiza a entrevista por voz no Discord para conhecer você e explicar como funciona a cidade.</p></div>
            <div className="cinema-steps">
              <div><span>01</span><div><strong>Conecte sua conta</strong><small>Entre com seu Discord para identificar seu perfil na comunidade.</small></div><b>↗</b></div>
              <div><span>02</span><div><strong>Leia as regras</strong><small>Conheça as diretrizes e tire suas dúvidas antes da entrevista.</small></div><b>↗</b></div>
              <div><span>03</span><div><strong>Faça a entrevista</strong><small>Acesse o Discord e procure o canal de whitelist para falar com a equipe.</small></div><b>↗</b></div>
            </div>
          </div>

          <div className="cinema-whitelist__panel mt-16">
            {loading ? <p className="text-sm text-white/55">Verificando sua conexão...</p> : player ? (
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  {player.discordAvatarUrl ? <img src={player.discordAvatarUrl} alt="" className="size-14 rounded-full border border-[#c6a66b]/50 object-cover"/> : <span className="grid size-14 place-items-center rounded-full border border-[#c6a66b]/50 bg-[#c6a66b]/10 font-display text-2xl text-[#e8d2a6]">{player.displayName.slice(0,1).toUpperCase()}</span>}
                  <div className="min-w-0"><p className="text-[.6rem] font-bold uppercase tracking-[.2em] text-[#c6a66b]">Discord conectado</p><h3 className="mt-1 truncate font-display text-2xl font-bold uppercase text-white">{player.displayName}</h3><p className="mt-1 text-xs text-white/45">Sua conta está pronta para continuar.</p></div>
                </div>
                <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="cinema-button cinema-button--gold">Ir para entrevista ↗</a>
              </div>
            ) : (
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex-1"><p className="text-[.6rem] font-bold uppercase tracking-[.2em] text-[#c6a66b]">Primeiro passo</p><h3 className="mt-2 font-display text-2xl font-bold uppercase text-white">Conecte seu Discord.</h3><p className="mt-2 text-sm leading-7 text-white/55">Entre com sua conta Discord para identificar seu perfil e continuar o processo de whitelist.</p></div>
                <a href={`${API_BASE}/auth/discord/login`} className="cinema-button cinema-button--gold">Entrar com Discord ↗</a>
              </div>
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-white/40"><Link to="/regras" className="text-[#c6a66b] underline underline-offset-4">Ler o manual de regras</Link><span>•</span><a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="text-[#c6a66b] underline underline-offset-4">Comunidade oficial no Discord</a></div>
        </div>
      </section>
    </main>
  )
}
