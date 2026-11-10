import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { API_BASE } from '../lib/api'
import { cn } from '../lib/cn'
import { useAuth } from '../state/AuthContext'
import { pageShellClass } from './ui/variants'

interface PublicNavLink { to: string; label: string }
const PUBLIC_LINKS: PublicNavLink[] = [
  { to: '/', label: 'Início' },
  { to: '/cidade', label: 'A cidade' },
  { to: '/regras', label: 'Regras' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/whitelist', label: 'Whitelist' },
  { to: '/loja', label: 'Loja' },
]

export function Nav() {
  const { player, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className={cn('nav avenue-nav fixed inset-x-0 top-0 z-50 transition-all duration-500', isHome ? 'avenue-nav--home' : 'avenue-nav--inner')}>
      <div className={cn(pageShellClass, 'flex min-h-[4.7rem] items-center justify-between gap-5')}>
        <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center gap-3" end aria-label="Avenue Roleplay — Início">
          <span className="avenue-nav__monogram">A</span>
          <span className="leading-none"><strong className="block font-display text-xl font-bold uppercase tracking-[.16em] text-white">AVENUE</strong><small className="mt-1 block text-[.52rem] font-semibold uppercase tracking-[.29em] text-white/50">ROLEPLAY EXPERIENCE</small></span>
        </NavLink>

        <nav aria-label="Principal" className={cn('avenue-nav__menu', menuOpen && 'is-open')}>
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1">
            {PUBLIC_LINKS.map(({ to, label }) => <li key={to}>
              <NavLink to={to} end={to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => cn('avenue-nav__link', isActive && 'is-active')}>{label}</NavLink>
            </li>)}
            <li className="pt-2 md:hidden"><a href={`${API_BASE}/auth/discord/login`} className="cinema-button cinema-button--gold w-full">Entrar com Discord ↗</a></li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {!loading && (player ? <Link to="/painel" className="avenue-nav__account"><DiscordAvatar url={player.discordAvatarUrl} name={player.displayName}/><span className="hidden max-w-28 truncate sm:inline">{player.displayName}</span><span className="text-[#c6a66b]">↗</span></Link> : <a className="avenue-nav__discord hidden md:inline-flex" href={`${API_BASE}/auth/discord/login`}><DiscordGlyph/> Entrar</a>)}
          <button type="button" className="avenue-nav__toggle md:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span/><span/></button>
        </div>
      </div>
    </header>
  )
}

function DiscordAvatar({ url, name }: { url?: string | null; name: string }) {
  const [failed, setFailed] = useState(false)
  if (!url || failed) return <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-[#c6a66b]/20 text-[.65rem] font-bold text-[#e8d2a6]">{name.slice(0, 1).toUpperCase()}</span>
  return <img src={url} alt="" className="size-6 rounded-full border border-[#c6a66b]/50 object-cover" onError={() => setFailed(true)} />
}
function DiscordGlyph() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M20.3 4.4A19.6 19.6 0 0 0 15.4 3l-.6 1.3a18.2 18.2 0 0 0-5.6 0L8.6 3a19.5 19.5 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.8 19.8 0 0 0 6 3l1.3-2.1a12.8 12.8 0 0 1-2-1l.5-.4a14 14 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.7 19.7 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7ZM8.3 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm7.4 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z"/></svg>
}
