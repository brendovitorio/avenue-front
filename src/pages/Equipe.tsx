const DISCORD_INVITE = import.meta.env.VITE_DISCORD_INVITE ?? 'https://discord.com/'

const departments = [
  { number: '01', title: 'Direção', description: 'Responsável pela visão, identidade e evolução da Avenue.', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85' },
  { number: '02', title: 'Gestão de roleplay', description: 'Cuida da qualidade das histórias, experiências e diretrizes da cidade.', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=85' },
  { number: '03', title: 'Comunidade & suporte', description: 'Acolhe novos moradores e ajuda a manter a comunidade conectada.', image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1000&q=85' },
]

export function Equipe() {
  return <main className="cinema-team">
    <section className="cinema-subhero">
      <div className="cinema-container relative z-10 py-28 sm:py-36"><p className="cinema-eyebrow">AVENUE ROLEPLAY / NOSSA EQUIPE</p><h1 className="cinema-heading max-w-4xl">Por trás de cada história,<br /><em>pessoas de verdade.</em></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/65">Uma cidade forte é construída por pessoas que trabalham todos os dias para criar experiências, cuidar da comunidade e manter a Avenue em movimento.</p></div>
    </section>
    <section className="section-luxury py-20 sm:py-28">
      <div className="cinema-container"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="cinema-eyebrow">01 / Quem faz acontecer</p><h2 className="cinema-heading">Uma equipe.<br /><em>Um propósito.</em></h2></div><p className="max-w-md text-sm leading-7 text-white/55">Conheça as áreas responsáveis por cuidar da experiência Avenue. Os nomes e integrantes oficiais podem ser apresentados nos canais da comunidade.</p></div>
        <div className="grid gap-5 md:grid-cols-3">{departments.map((item) => <article key={item.number} className="cinema-team-card"><div className="cinema-team-card__image" style={{ backgroundImage: `url("${item.image}")` }} /><div className="cinema-team-card__content"><span>{item.number} / AVENUE</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
        <div className="mt-16 border-t border-white/15 pt-10"><p className="cinema-eyebrow">Faça parte da comunidade</p><h2 className="mt-4 font-display text-3xl font-bold uppercase text-white sm:text-4xl">Quer falar com a equipe?</h2><p className="mt-3 max-w-xl leading-7 text-white/55">Entre no Discord oficial para encontrar os canais de atendimento, suporte e whitelist.</p><a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="cinema-button cinema-button--gold mt-7">Acessar Discord <span>↗</span></a></div>
      </div>
    </section>
  </main>
}
