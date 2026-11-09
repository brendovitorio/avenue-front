import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { buttonVariants, pageShellClass } from '../components/ui/variants'
import { API_BASE, apiFetch, getAccountDashboard, type AccountDashboardResponse } from '../lib/api'
import { cn } from '../lib/cn'
import { useAuth } from '../state/AuthContext'

interface MyWhitelist {
  application: { id: string; characterName: string; status: 'pending' | 'approved' | 'rejected'; submittedAt: string } | null
}
const statusText = { pending: 'Em análise', approved: 'Aprovada', rejected: 'Requer nova solicitação' }

export function Painel() {
  const { player, loading: authLoading, logout } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState<AccountDashboardResponse | null>(null)
  const [whitelist, setWhitelist] = useState<MyWhitelist['application']>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!player) { setLoading(false); return }
    let active = true
    Promise.all([getAccountDashboard(), apiFetch<MyWhitelist>('/api/whitelist/me')])
      .then(([account, wl]) => { if (active) { setData(account); setWhitelist(wl.application) } })
      .catch(() => { if (active) setError(true) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [player])

  async function signOut() {
    if (busy) return
    setBusy(true)
    try { await logout(); navigate('/', { replace: true }) }
    finally { setBusy(false) }
  }

  if (authLoading || loading) return <section className={cn(pageShellClass,'py-24')}><p className="text-mute">Carregando sua conta...</p></section>
  if (!player) return <section className={cn(pageShellClass,'py-24')}><div className="max-w-2xl border border-line bg-panel p-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Área do cidadão</p><h1 className="mt-3 font-display text-5xl font-bold uppercase text-ink">Sua jornada começa aqui.</h1><p className="mt-4 leading-7 text-mute">Entre com Discord para acompanhar sua whitelist e as informações da sua conta.</p><a href={`${API_BASE}/auth/discord/login`} className={cn(buttonVariants(), 'mt-6 inline-flex')}>Entrar com Discord ↗</a></div></section>
  if (error || !data) return <section className={cn(pageShellClass,'py-24')}><p className="text-mute">Não foi possível carregar seus dados. Atualize a página e tente novamente.</p></section>

  const profile = data.profile
  return <section className={cn(pageShellClass,'pb-24 pt-12')}>
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-accent">Portal do cidadão</p><h1 className="mt-2 font-display text-5xl font-bold uppercase text-ink">Meu painel</h1></div><button onClick={signOut} disabled={busy} className={cn(buttonVariants({intent:'outline'}))}>{busy ? 'Saindo...' : 'Sair da conta'}</button></div>
    <section className="mt-8 flex flex-wrap items-center gap-5 border border-line bg-panel p-6 sm:p-8"><img src={profile.discordAvatarUrl ?? ''} alt="" className="size-16 rounded-full border border-accent/40 bg-void object-cover"/><div className="min-w-0"><p className="text-xs uppercase tracking-wider text-mute">Conta conectada via Discord</p><h2 className="mt-1 truncate font-display text-3xl font-bold uppercase text-ink">{profile.displayName}</h2><p className="text-sm text-mute">@{profile.discordUsername}</p></div><span className="ml-auto border border-online/30 bg-online/10 px-3 py-2 text-xs font-bold uppercase text-online">Conta ativa</span></section>
    <div className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <section className="border border-line bg-panel p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Processo de acesso</p><h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink">Sua whitelist</h2>
        {whitelist ? <><p className="mt-3 text-mute">Personagem: <strong className="text-ink">{whitelist.characterName}</strong></p><p className={cn('mt-5 inline-flex border px-3 py-2 text-sm font-bold',whitelist.status === 'approved' ? 'border-online/30 text-online' : 'border-accent/30 text-accent')}>{statusText[whitelist.status]}</p><p className="mt-4 text-sm leading-6 text-mute">{whitelist.status === 'pending' ? 'A equipe está avaliando sua solicitação. Acompanhe os canais de whitelist no Discord para realizar sua entrevista por voz.' : whitelist.status === 'approved' ? 'Sua whitelist foi aprovada. Confira o Discord para receber as orientações de entrada na cidade.' : 'Sua solicitação anterior foi encerrada. Você pode revisar as regras e enviar uma nova solicitação.'}</p></> : <><p className="mt-3 leading-7 text-mute">Você ainda não enviou sua solicitação. Leia as regras e apresente seu personagem para iniciar o processo.</p><Link to="/whitelist" className={cn(buttonVariants(), 'mt-5 inline-flex')}>Solicitar whitelist ↗</Link></>}
      </section>
      <section className="border border-line bg-panel p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Benefícios</p><h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink">Minha conta</h2><p className="mt-3 text-sm leading-6 text-mute">Acompanhe os benefícios e itens associados à sua conta.</p><p className="mt-6 font-display text-5xl font-bold text-ink">{data.entitlements.length.toString().padStart(2,'0')}</p><p className="text-xs uppercase tracking-wider text-mute">Benefícios ativos</p><Link to="/loja" className="mt-5 inline-flex text-sm font-bold uppercase tracking-wider text-accent">Conhecer a loja ↗</Link></section>
    </div>
    {data.entitlements.length > 0 && <section className="mt-7 border border-line bg-panel"><div className="border-b border-line p-6"><h2 className="font-display text-2xl font-bold uppercase text-ink">Itens e benefícios ativos</h2></div><ul className="divide-y divide-line">{data.entitlements.map(item=><li key={item.id} className="flex flex-wrap items-center justify-between gap-3 p-5"><div><p className="font-semibold text-ink">{item.key}</p><p className="mt-1 text-xs text-mute">{item.kind.toUpperCase()} · {item.expiresAt ? `Expira em ${new Date(item.expiresAt).toLocaleDateString('pt-BR')}` : 'Permanente'}</p></div><span className="text-xs font-bold uppercase text-online">Ativo</span></li>)}</ul></section>}
  </section>
}
