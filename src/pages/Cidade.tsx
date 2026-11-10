import { Link } from 'react-router-dom'
import { buttonVariants } from '../components/ui/variants'
import { cn } from '../lib/cn'

const DISCORD_INVITE = import.meta.env.VITE_DISCORD_INVITE ?? 'https://discord.com/'
const districts = [
  { id: '01', name: 'Centro urbano', line: 'Onde tudo acontece', copy: 'Uma região em movimento, encontros inesperados e oportunidades em cada esquina.', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=90' },
  { id: '02', name: 'Noites da cidade', line: 'Quando a cidade desperta', copy: 'Luzes, sons e histórias que ganham outro ritmo quando o sol se põe.', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=90' },
  { id: '03', name: 'Novos horizontes', line: 'Seu próximo destino', copy: 'Descubra lugares, construa relações e encontre seu próprio caminho.', image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1600&q=90' },
]
const paths = [
  ['Vida profissional', 'Construa sua carreira, desenvolva habilidades e conquiste seu espaço.'],
  ['Empreendedorismo', 'Transforme ideias em negócios e movimente a economia da cidade.'],
  ['Serviços públicos', 'Faça parte das equipes que mantêm a cidade funcionando.'],
  ['Vida social', 'Crie amizades, participe de eventos e viva histórias em comunidade.'],
]

export function Cidade() {
  return <main className="cinema-city">
    <section className="cinema-subhero cinema-subhero--city">
      <div className="cinema-container relative z-10 py-28 sm:py-40"><p className="cinema-eyebrow">AVENUE ROLEPLAY / EXPLORE</p><h1 className="cinema-heading max-w-5xl">Uma cidade feita<br />para <em>ser vivida.</em></h1><p className="mt-8 max-w-xl text-base leading-8 text-white/65">Mais do que cenários, lugares para encontrar pessoas, descobrir possibilidades e escrever uma história que seja só sua.</p><a href="#lugares" className="cinema-button cinema-button--gold mt-9">Explorar a cidade <span>↓</span></a></div>
    </section>
    <section id="lugares" className="section-luxury py-20 sm:py-28">
      <div className="cinema-container"><div className="mb-12 max-w-3xl"><p className="cinema-eyebrow">01 / Lugares & atmosferas</p><h2 className="cinema-heading">Cada lugar tem<br /><em>uma história.</em></h2></div>
        <div className="space-y-7">{districts.map((item, index) => <article key={item.id} className={`cinema-city-feature ${index % 2 ? 'cinema-city-feature--reverse' : ''}`}><div className="cinema-city-feature__image" style={{ backgroundImage: `url("${item.image}")` }} /><div className="cinema-city-feature__copy"><span>{item.id} / {item.line}</span><h3>{item.name}</h3><p>{item.copy}</p></div></article>)}</div>
      </div>
    </section>
    <section className="cinema-paths">
      <div className="cinema-container grid gap-12 py-20 sm:py-28 lg:grid-cols-[.8fr_1.2fr]"><div><p className="cinema-eyebrow">02 / Possibilidades</p><h2 className="cinema-heading">Não existe<br />um só <em>caminho.</em></h2><p className="mt-6 max-w-md leading-8 text-white/55">A Avenue é um espaço para criar seu próprio ritmo. Escolha o que faz sentido para seu personagem e descubra até onde sua história pode chegar.</p></div><div className="cinema-path-list">{paths.map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><b>↗</b></article>)}</div></div>
    </section>
    <section className="cinema-city-cta"><div className="cinema-container py-20 sm:py-28"><p className="cinema-eyebrow">03 / Seu lugar está aqui</p><h2 className="cinema-heading max-w-4xl">A próxima história<br /><em>pode ser a sua.</em></h2><div className="mt-8 flex flex-wrap gap-3"><Link to="/regras" className={cn(buttonVariants({ size: 'lg' }), 'cinema-button cinema-button--gold')}>Conhecer as regras ↗</Link><a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="cinema-button cinema-button--glass">Entrar no Discord ↗</a></div></div></section>
  </main>
}
