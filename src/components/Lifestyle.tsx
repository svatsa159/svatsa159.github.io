import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Camera, Film, Music, ChefHat, Dice5, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .life-intro {
    color: var(--text-secondary);
    max-width: 68ch;
    margin-bottom: 1rem;
  }
  .life-grid {
    margin-top: 1.1rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }
  .life-card {
    border: 1px solid var(--border);
    border-radius: 14px;
    background: rgba(9, 14, 25, 0.45);
    padding: 14px;
    opacity: 0;
    transform: translateY(16px);
  }
  .life-card-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.6rem;
  }
  .life-card-icon.blue { background: var(--accent-blue-dim); color: var(--accent-blue-strong); }
  .life-card-icon.gold { background: var(--accent-gold-dim); color: var(--accent-gold-strong); }
  .life-card-title {
    font-size: 1rem;
    margin-bottom: 0.45rem;
  }
  .life-card-text {
    color: var(--text-secondary);
    font-size: 0.85rem;
    margin-bottom: 0.8rem;
  }
  .life-card-link {
    font-family: var(--font-mono);
    font-size: 0.64rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .life-card-places {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .life-place {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-muted);
    padding: 4px 8px;
  }
  @media (max-width: 980px) {
    .life-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 700px) {
    .life-grid { grid-template-columns: 1fr; }
  }
`

const cards = [
  {
    icon: <Camera size={18} />,
    color: 'blue',
    title: 'Cinematography',
    text: 'Shoots and edits on DaVinci Resolve and Lightroom. Travel cinematography from Rome, Cinque Terre, Positano, Paris, Kedarkantha.',
    link: { label: '@the_permanent_sojourner', url: 'https://instagram.com/the_permanent_sojourner' },
  },
  {
    icon: <Film size={18} />,
    color: 'gold',
    title: 'Film Criticism',
    text: '"Rewatching Raanjhanaa will be the Gangajal for the sin of watching this movie." Sharp, honest, no sugarcoating.',
    link: { label: 'Letterboxd: svatsa159', url: 'https://letterboxd.com/svatsa159' },
  },
  {
    icon: <ChefHat size={18} />,
    color: 'gold',
    title: 'Italian Cooking',
    text: 'Fresh pasta from scratch. Pizza in the air fryer. Had pizza in Naples and came back with opinions. "I like rich foods — rich texture and everything."',
  },
  {
    icon: <Music size={18} />,
    color: 'blue',
    title: 'Music',
    text: 'Sings "relatively great." Plays piano. Has recordings on Instagram reels. The guy who breaks into song at gatherings and people actually want him to continue.',
    link: { label: '@svatsa159', url: 'https://instagram.com/svatsa159' },
  },
  {
    icon: <Dice5 size={18} />,
    color: 'blue',
    title: 'Board Games',
    text: 'Collection: Jaipur, Flip7, 7 Wonders Duel, Trio, Catan, Scotland Yard, Wyrmspan. Always acquiring the next one.',
  },
  {
    icon: <MapPin size={18} />,
    color: 'gold',
    title: 'Travel',
    text: 'Italy, France, treks across India. Documents everything through lens and memory.',
    places: ['Rome', 'Cinque Terre', 'Positano', 'Naples', 'Paris', 'Kedarkantha', 'Bandaje'],
  },
]

export default function Lifestyle() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set(el.querySelectorAll('.life-card'), { opacity: 1, y: 0 })
      return
    }

    gsap.to(el.querySelectorAll('.life-card'), {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 74%' },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section id="lifestyle" ref={sectionRef}>
        <div className="section-shell">
          <div className="section-panel">
            <div className="section-label">The Other Stuff</div>
            <h2 className="section-title">Not Just Code</h2>
            <p className="life-intro">
              The same person who architects distributed K8s systems also cooks authentic Italian, shoots cinematography, sings at the piano, and has strong opinions about every film ever made.
            </p>
            <div className="life-grid">
              {cards.map((card) => (
                <article className="life-card" key={card.title}>
                  <div className={`life-card-icon ${card.color}`}>{card.icon}</div>
                  <h3 className="life-card-title">{card.title}</h3>
                  <p className="life-card-text">{card.text}</p>
                  {card.link && (
                    <a href={card.link.url} target="_blank" rel="noopener noreferrer" className="life-card-link">{card.link.label} →</a>
                  )}
                  {card.places && (
                    <div className="life-card-places">
                      {card.places.map((place) => <span className="life-place" key={place}>{place}</span>)}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
