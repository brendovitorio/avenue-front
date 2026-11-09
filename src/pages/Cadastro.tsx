import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { buttonVariants, pageShellClass } from '../components/ui/variants'
import { cn } from '../lib/cn'
import { apiFetch, ApiError } from '../lib/api'
import { useAuth } from '../state/AuthContext'

const DISCORD_INVITE = import.meta.env.VITE_DISCORD_INVITE ?? 'https://discord.com/'

const shellClass = cn('max-w-4xl pb-24', pageShellClass)

export function Cadastro() {
  const { player, loading } = useAuth()
  const [characterName, setCharacterName] = useState('')
  const [age, setAge] = useState('')
  const [experience, setExperience] = useState('')
  const [story, setStory] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    setSubmitting(true); setError('')
    try {
      await apiFetch('/api/whitelist/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ characterName, age: Number(age), experience, story }) })
      setSubmitted(true)
    } catch (err) {
      const body = err instanceof ApiError && err.body && typeof err.body === 'object' ? err.body as { error?: string } : {}
      setError(body.error === 'application_exists' ? 'Você já possui uma solicitação em análise. Entre no Discord para acompanhar.' : body.error === 'already_approved' ? 'Sua whitelist já consta como aprovada. Confira o Discord para as instruções.' : 'Não foi possível enviar sua solicitação. Tente novamente em instantes.')
    } finally { setSubmitting(false) }
  }

  if (loading) return <section className={shellClass}><p className="pt-16 text-mute">Carregando...</p></section>
  if (!player) return <section className={shellClass}><PageHeader title="Whitelist" lede="Entre com sua conta Discord para iniciar seu processo de acesso."/><div className="border border-line bg-panel p-7"><a href={`${import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'}/auth/discord/login`} className={cn(buttonVariants(), 'inline-flex')}>Entrar com Discord ↗</a></div></section>

  if (submitted) return <section className={shellClass}><PageHeader title="Solicitação enviada" lede="Seu primeiro passo para fazer parte da cidade foi concluído."/><div className="border border-online/30 bg-panel p-8"><span className="text-xs font-bold uppercase tracking-[.2em] text-online">Cadastro recebido</span><h2 className="mt-3 font-display text-4xl font-bold uppercase text-ink">Agora é hora da entrevista.</h2><p className="mt-4 max-w-2xl leading-7 text-mute">Sua solicitação foi registrada. Entre no nosso Discord oficial, procure o canal de whitelist e aguarde a equipe orientar você sobre a entrevista por call. A aprovação acontece após a conversa com a equipe.</p><a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className={cn(buttonVariants(), 'mt-6 inline-flex')}>Abrir Discord ↗</a></div></section>

  return <section className={shellClass}>
    <PageHeader title="Whitelist" lede="Conecte sua identidade, apresente seu personagem e prepare-se para conversar com nossa equipe por voz."/>
    <div className="mb-8 grid gap-px border border-line bg-line sm:grid-cols-3">
      {[['01','Conecte','Sua conta Discord já está autenticada.'],['02','Apresente','Preencha os dados do personagem.'],['03','Converse','Faça a entrevista de whitelist por call.']].map(([n,t,d]) => <div key={n} className="bg-panel p-5"><span className="font-display text-3xl font-bold text-accent">{n}</span><h3 className="mt-3 font-display text-xl font-bold uppercase text-ink">{t}</h3><p className="mt-1 text-sm leading-6 text-mute">{d}</p></div>)}
    </div>
    <form onSubmit={submit} className="space-y-6 border border-line bg-panel p-6 sm:p-8">
      <div className="flex items-center gap-3 border-b border-line pb-5"><img src={player.discordAvatarUrl ?? ''} alt="" className="size-11 rounded-full bg-void object-cover"/><div><p className="text-xs uppercase tracking-wider text-mute">Conta conectada</p><p className="font-semibold text-ink">{player.discordUsername ?? player.displayName}</p></div><span className="ml-auto text-xs font-bold text-online">DISCORD OK</span></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ink">Nome do personagem<input required minLength={3} maxLength={48} value={characterName} onChange={e => setCharacterName(e.target.value)} placeholder="Ex.: Gabriel Oliveira" className="mt-2"/></label>
        <label className="block text-sm font-semibold text-ink">Sua idade<input required type="number" min={1} max={99} value={age} onChange={e => setAge(e.target.value)} placeholder="18" className="mt-2"/></label>
      </div>
      <label className="block text-sm font-semibold text-ink">Experiência com Roleplay<textarea required minLength={20} maxLength={1200} value={experience} onChange={e => setExperience(e.target.value)} placeholder="Conte brevemente se já jogou RP e o que aprendeu com essas experiências." className="mt-2 min-h-28"/></label>
      <label className="block text-sm font-semibold text-ink">História e conceito do personagem<textarea required minLength={80} maxLength={3000} value={story} onChange={e => setStory(e.target.value)} placeholder="Quem é seu personagem? De onde veio, quais são seus objetivos e como pretende construir sua história na cidade?" className="mt-2 min-h-40"/></label>
      <label className="flex items-start gap-3 text-sm leading-6 text-mute"><input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-1"/><span>Declaro que li as <Link className="font-bold text-accent underline" to="/regras">regras da cidade</Link>, que as informações são verdadeiras e que estou ciente de que a whitelist depende de entrevista por voz e aprovação da equipe.</span></label>
      {error && <p role="alert" className="border border-danger/30 bg-danger/10 p-3 text-sm text-danger">{error}</p>}
      <button disabled={!accepted || submitting} className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-50')}>{submitting ? 'Enviando solicitação...' : 'Enviar solicitação de whitelist ↗'}</button>
      <p className="text-xs leading-6 text-mute/70">O envio não aprova automaticamente o acesso. A equipe fará a avaliação e conduzirá a entrevista pelos canais oficiais do Discord.</p>
    </form>
  </section>
}
