import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Camera, Film, Music, ChefHat, Dice5, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .life-section {
    padding: var(--section-padding);
    max-width: 1200px;
    margin: 0 auto;
  }
  .life-intro {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: var(--text-secondary);
    max-width: 600px;
    margin-bottom: 3rem;
    line-height: 1.8;
  }
  .life-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .life-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 2rem;
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(20px);
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .life-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right, var(--accent-blue), var(--accent-gold));
    transform: scaleX(0);
    transition: transform 0.4s ease;
    transform-origin: left;
  }
  .life-card:hover {
    border-color: var(--border-hover);
    transform: translateY(-4px) !important;
  }
  .life-card:hover::after {
    transform: scaleX(1);
  }
  .life-card-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
  }
  .life-card-icon.blue {
    background: var(--accent-blue-dim);
    color: var(--accent-blue);
  }
  .life-card-icon.gold {
    background: var(--accent-gold-dim);
    color: var(--accent-gold);
  }
  .life-card-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .life-card-text {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  .life-card-link {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--accent-blue);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s;
    text-decoration: none;
  }
  .life-card-link:hover {
    color: var(--accent-gold);
  }
  .life-card-places {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 0.5rem;
  }
  .life-place {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 3px 8px;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-muted);
  }
  @media (max-width: 768px) {
    .life-grid { grid-template-columns: 1fr; }
  }
`

const cards = [
  {
    icon: <Camera size={20} />,
    color: 'blue',
    title: 'Cinematography',
    text: 'Shoots and edits on DaVinci Resolve and Lightroom. Travel cinematography from Rome, Cinque Terre, Positano, Paris, Kedarkantha.',
    link: { label: '@the_permanent_sojourner', url: 'https://instagram.com/the_permanent_sojourner' },
  },
  {
    icon: <Film size={20} />,
    color: 'gold',
    title: 'Film Criticism',
    text: '"Rewatching Raanjhanaa will be the Gangajal for the sin of watching this movie." Sharp, honest, no sugarcoating.',
    link: { label: 'Letterboxd: svatsa159', url: 'https://letterboxd.com/svatsa159' },
  },
  {
    icon: <ChefHat size={20} />,
    color: 'gold',
    title: 'Italian Cooking',
    text: 'Fresh pasta from scratch. Pizza in the air fryer. Had pizza in Naples and came back with opinions. "I like rich foods — rich texture and everything."',
  },
  {
    icon: <Music size={20} />,
    color: 'blue',
    title: 'Music',
    text: 'Sings "relatively great." Plays piano. Has recordings on Instagram reels. The guy who breaks into song at gatherings and people actually want him to continue.',
    link: { label: '@svatsa159', url: 'https://instagram.com/svatsa159' },
  },
  {
    icon: <Dice5 size={20} />,
    color: 'blue',
    title: 'Board Games',
    text: 'Collection: Jaipur, Flip7, 7 Wonders Duel, Trio, Catan, Scotland Yard, Wyrmspan. Always acquiring the next one.',
  },
  {
    icon: <MapPin size={20} />,
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

    gsap.to(el.querySelectorAll('.life-card'), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el.querySelector('.life-grid'),
        start: 'top 70%',
      },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section className="life-section" id="lifestyle" ref={sectionRef}>
        <div className="section-label">The Other Stuff</div>
        <h2 className="section-title">Not Just Code</h2>
        <p className="life-intro">
          The same person who architects distributed K8s systems also cooks authentic Italian, 
          shoots cinematography, sings at the piano, and has strong opinions about every film ever made.
        </p>

        <div className="life-grid">
          {cards.map((card, i) => (
            <div className="life-card" key={i}>
              <div className={`life-card-icon ${card.color}`}>
                {card.icon}
              </div>
              <div className="life-card-title">{card.title}</div>
              <div className="life-card-text">{card.text}</div>
              {card.link && (
                <a href={card.link.url} target="_blank" rel="noopener noreferrer" className="life-card-link">
                  {card.link.label} →
                </a>
              )}
              {card.places && (
                <div className="life-card-places">
                  {card.places.map((p) => (
                    <span className="life-place" key={p}>{p}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
