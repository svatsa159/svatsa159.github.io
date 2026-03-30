import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .proj-section {
    padding: var(--section-padding);
    max-width: 1200px;
    margin: 0 auto;
  }
  .proj-featured {
    background: linear-gradient(135deg, rgba(0, 170, 255, 0.05), rgba(255, 170, 0, 0.05));
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: clamp(2rem, 4vw, 3rem);
    margin-bottom: 3rem;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
  }
  .proj-featured::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(to right, var(--accent-blue), var(--accent-gold));
  }
  .proj-featured-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--accent-gold);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .proj-featured-title {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }
  .proj-featured-sub {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 600px;
    line-height: 1.7;
  }
  .proj-featured-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
    max-width: 500px;
  }
  .proj-stat-val {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 800;
    font-family: var(--font-mono);
    color: var(--accent-blue);
    line-height: 1;
  }
  .proj-stat-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 4px;
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
  }
  .proj-featured-arch {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.8;
    padding: 1rem 1.5rem;
    background: rgba(0,0,0,0.3);
    border-radius: 6px;
    border: 1px solid var(--border);
    max-width: 600px;
  }
  .proj-featured-arch span {
    color: var(--accent-blue);
  }
  .proj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  .proj-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    cursor: default;
    opacity: 0;
    transform: translateY(20px);
    position: relative;
    overflow: hidden;
  }
  .proj-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--accent-blue);
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }
  .proj-card:hover {
    border-color: var(--accent-blue);
    transform: translateY(-4px) !important;
    box-shadow: 0 8px 30px rgba(0, 170, 255, 0.08);
  }
  .proj-card:hover::before {
    transform: scaleX(1);
  }
  .proj-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0.8rem;
  }
  .proj-card-title {
    font-size: 1.05rem;
    font-weight: 700;
  }
  .proj-card-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.2rem;
  }
  .proj-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .proj-card-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 3px 10px;
    background: var(--bg-elevated);
    border-radius: 4px;
    color: var(--text-muted);
    letter-spacing: 0.03em;
  }
  .proj-card-link {
    color: var(--text-muted);
    transition: color 0.2s;
  }
  .proj-card-link:hover {
    color: var(--accent-blue);
  }
  @media (max-width: 768px) {
    .proj-featured-stats { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .proj-grid { grid-template-columns: 1fr; }
  }
`

const projects = [
  {
    title: 're-memory',
    desc: 'Brain-anatomical memory engine for AI agents. Models hippocampus and prefrontal cortex memory patterns. Inspired by how ADHD affects memory — "what makes memory personal is that we forget things."',
    tags: ['Python', 'Rust', 'AI/ML', 'Memory Systems'],
    link: 'https://github.com/svatsa159',
  },
  {
    title: 'Review-Zone',
    desc: 'Flask webapp for movie/TV reviews using TMDB API + MongoDB. Generates Instagram story cards using canvas-based text fitting — the same concept as Pretext.',
    tags: ['Flask', 'MongoDB', 'TMDB API', 'Canvas'],
    link: 'https://github.com/svatsa159',
  },
  {
    title: 'react-doodle-icons',
    desc: 'Published npm package with 400+ handcrafted doodle icons for React. Open source with community adoption.',
    tags: ['React', 'npm', 'SVG', 'Open Source'],
    stars: 5,
    link: 'https://github.com/svatsa159',
  },
  {
    title: 'Market Screener Suite',
    desc: 'Stock market screening tools + swing trade screener + quant notebooks. Currently using Karpathy\'s autoresearcher + Claude to optimize trading algorithms.',
    tags: ['Python', 'Spring Boot', 'Angular', 'Finance'],
    link: 'https://github.com/svatsa159',
  },
  {
    title: 'BookMyShow Bot',
    desc: 'Puppeteer-based ticket monitor with alert sounds. Because FOMO for movie tickets is real.',
    tags: ['Puppeteer', 'Node.js', 'Automation'],
    link: 'https://github.com/svatsa159',
  },
  {
    title: 'Home Media Server',
    desc: 'Plex + Radarr + Sonarr + Jackett + Overseerr — fully Dockerized. The ultimate self-hosted streaming setup.',
    tags: ['Docker', 'Plex', 'Self-Hosted', 'Automation'],
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.to(el.querySelector('.proj-featured'), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 65%',
      },
    })

    gsap.to(el.querySelectorAll('.proj-card'), {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el.querySelector('.proj-grid'),
        start: 'top 75%',
      },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section className="proj-section" id="projects" ref={sectionRef}>
        <div className="section-label">Projects</div>
        <h2 className="section-title">Things I&apos;ve Built</h2>

        <div className="proj-featured">
          <div className="proj-featured-label">
            <Star size={12} /> Flagship Project
          </div>
          <div className="proj-featured-title">OptiPro — Distributed Data Orchestrator</div>
          <div className="proj-featured-sub">
            A distributed data collection and orchestration platform built as an exploration into 
            Kubernetes-native job scheduling, ephemeral worker pods, and browser automation at scale. 
            Designed the entire architecture from scratch.
          </div>

          <div className="proj-featured-stats">
            <div>
              <div className="proj-stat-val">10+</div>
              <div className="proj-stat-label">Data Sources</div>
            </div>
            <div>
              <div className="proj-stat-val">2.6K</div>
              <div className="proj-stat-label">Tracked Entities</div>
            </div>
            <div>
              <div className="proj-stat-val">65K</div>
              <div className="proj-stat-label">Events/Day</div>
            </div>
          </div>

          <div className="proj-featured-arch">
            <span>Architecture:</span> Master-Worker on Kubernetes<br/>
            <span>Orchestrator:</span> TypeScript/Express singleton → cron scheduling → dynamic K8s Job creation<br/>
            <span>Workers:</span> Ephemeral Puppeteer pods (1-4Gi RAM), session state persisted to cloud storage<br/>
            <span>Quality:</span> Reconciliation engine with rolling averages, auto-retry, and data completeness checks
          </div>
        </div>

        <div className="proj-grid">
          {projects.map((p, i) => (
            <div className="proj-card" key={i}>
              <div className="proj-card-header">
                <div className="proj-card-title">{p.title}</div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-card-link">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              <div className="proj-card-desc">{p.desc}</div>
              <div className="proj-card-tags">
                {p.tags.map((t) => (
                  <span className="proj-card-tag" key={t}>{t}</span>
                ))}
                {p.stars && (
                  <span className="proj-card-tag" style={{ color: 'var(--accent-gold)' }}>
                    ★ {p.stars}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
