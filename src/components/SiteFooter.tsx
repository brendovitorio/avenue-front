import { Link } from 'react-router-dom'
import { pageShellClass } from './ui/variants'

const footerGroups = [
  { title: 'Explore', links: [{ to: '/cidade', label: 'A cidade' }, { to: '/equipe', label: 'Nossa equipe' }, { to: '/regras', label: 'Regras' }] },
  { title: 'Comunidade', links: [{ to: '/whitelist', label: 'Whitelist' }, { to: '/loja', label: 'Loja' }, { to: '/painel', label: 'Minha conta' }] },
  { title: 'Legal', links: [{ to: '/termos', label: 'Termos de uso' }, { to: '/privacidade', label: 'Privacidade' }] },
]

export function SiteFooter() {
  return <footer className="avenue-footer mt-auto">
    <div className="cinema-container grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
      <div><Link to="/" aria-label="Avenue Roleplay — início" className="footer-wordmark">AVENUE<span>.</span></Link><p className="mt-5 max-w-sm text-sm leading-7 text-white/45">Uma cidade. Mil histórias. O próximo capítulo começa quando você decide fazer parte.</p><p className="mt-8 text-[.58rem] font-bold uppercase tracking-[.28em] text-[#c6a66b]">A cidade é sua para viver.</p></div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{footerGroups.map((group) => <nav key={group.title} aria-label={group.title}><h2 className="footer-group-title">{group.title}</h2><ul className="mt-5 space-y-4">{group.links.map((link) => <li key={link.to}><Link className="footer-link" to={link.to}>{link.label}</Link></li>)}</ul></nav>)}</div>
    </div>
    <div className="border-t border-white/10"><div className="cinema-container flex flex-col gap-4 py-6 text-[.6rem] uppercase tracking-[.13em] text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Avenue Roleplay. Todos os direitos reservados.</p><p>Não afiliado à Rockstar Games ou Cfx.re.</p><a className="footer-credit" href="https://goatnetwork.dev" target="_blank" rel="noreferrer">Criado por <span>GOAT NETWORK</span> <b>↗</b></a></div></div>
  </footer>
}
