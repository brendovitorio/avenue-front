import type { PlayerSummary } from '../lib/api'
import { cn } from '../lib/cn'
import { chipVariants } from './ui/variants'

interface PlayerCardProps {
  player: PlayerSummary
}

/** Community member card for the Avenue Roleplay directory. */
export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <article className={cn('player-card frame chamfer-lg flex items-center gap-4 p-5 hover:frame-lit hover:[--frame-edge:var(--color-line-strong)]')}>
      {player.discordAvatarUrl ? (
        <img
          src={player.discordAvatarUrl}
          alt=""
          loading="lazy"
          className="size-14 shrink-0 rounded-full border border-line object-cover"
        />
      ) : (
        <span aria-hidden="true" className="grid size-14 shrink-0 place-items-center rounded-full border border-line bg-panel-raised font-display text-2xl font-bold text-accent">
          {player.displayName.slice(0, 1).toUpperCase()}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-xl font-semibold text-ink">{player.displayName}</h3>
        <p className="mt-1 truncate text-sm text-mute">
          {player.discordUsername ? `@${player.discordUsername}` : 'Membro da comunidade'}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={chipVariants()}>Avenue Roleplay</span>
          {player.clanTag && <span className={chipVariants()}>{player.clanTag}</span>}
        </div>
      </div>
    </article>
  )
}
