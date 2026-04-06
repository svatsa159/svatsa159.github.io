import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .proj-featured {
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: clamp(18px, 3vw, 30px);
    background: linear-gradient(155deg, rgba(91, 168, 255, 0.13), rgba(255, 211, 138, 0.07));
    margin-bottom: 1.3rem;
    opacity: 0;
    transform: translateY(20px);
  }
  .proj-featured-label {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent-gold-strong);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 0.7rem;
  }
  .proj-featured-title {
    font-size: clamp(1.4rem, 2.4vw, 2rem);
    margin-bottom: 0.45rem;
  }
  .proj-featured-sub {
    color: var(--text-secondary);
    max-width: 72ch;
    margin-bottom: 1.1rem;
    font-size: 0.95rem;
  }
  .proj-featured-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 1rem;
    max-width: 560px;
  }
  .proj-stat {
    border: 1px solid var(--border);
    border-radius: 10px;
    background: rgba(9, 14, 25, 0.5);
    padding: 9px;
  }
  .proj-stat strong {
    display: block;
    font-family: var(--font-mono);
    font-size: 1.02rem;
    color: var(--accent-blue-strong);
  }
  .proj-stat span {
    font-size: 0.67rem;
    font-family: var(--font-mono);
    color: var(--text-muted);
  }
  .proj-featured-arch {
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(9, 14, 25, 0.5);
    padding: 12px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-secondary);
    line-height: 1.65;
  }
  .proj-featured-arch span { color: var(--accent-blue-strong); }
  .proj-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .proj-card {
    border: 1px solid var(--border);
    border-radius: 14px;
    background: rgba(9, 14, 25, 0.45);
    padding: 14px;
    min-height: 178px;
    opacity: 0;
    transform: translateY(18px);
    transition: border-color 0.2s ease, transform 0.2s ease;
  }
  .proj-card:hover {
    border-color: var(--border-strong);
    transform: translateY(-3px);
  }
  .proj-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 0.6rem;
  }
  .proj-card-title {
    font-size: 1rem;
    font-weight: 640;
  }
  .proj-card-link {
    color: var(--text-muted);
    display: inline-flex;
  }
  .proj-card-link:hover { color: var(--accent-blue-strong); }
  .proj-card-desc {
    color: var(--text-secondary);
    font-size: 0.86rem;
    margin-bottom: 0.85rem;
  }
  .proj-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .proj-card-tag {
    font-family: var(--font-mono);
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(18, 27, 47, 0.7);
    color: var(--text-muted);
    font-size: 0.62rem;
    letter-spacing: 0.04em;
    padding: 4px 8px;
  }
  @media (max-width: 900px) {
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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set(el.querySelectorAll('.proj-featured, .proj-card'), { opacity: 1, y: 0 })
      return
    }

    gsap.to(el.querySelector('.proj-featured'), {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 72%' },
    })

    gsap.to(el.querySelectorAll('.proj-card'), {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.07,
      ease: 'power2.out',
      scrollTrigger: { trigger: el.querySelector('.proj-grid'), start: 'top 80%' },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section id="projects" ref={sectionRef}>
        <div className="section-shell">
          <div className="section-panel">
            <div className="section-label">Projects</div>
            <h2 className="section-title">Things I&apos;ve Built</h2>

            <article className="proj-featured">
              <div className="proj-featured-label"><Star size={12} /> Flagship Project</div>
              <h3 className="proj-featured-title">OptiPro — Distributed Data Orchestrator</h3>
              <p className="proj-featured-sub">
                A distributed data collection and orchestration platform built as an exploration into Kubernetes-native job scheduling, ephemeral worker pods, and browser automation at scale. Designed the entire architecture from scratch.
              </p>
              <div className="proj-featured-stats">
                <div className="proj-stat"><strong>10+</strong><span>Data Sources</span></div>
                <div className="proj-stat"><strong>2.6K</strong><span>Tracked Entities</span></div>
                <div className="proj-stat"><strong>65K</strong><span>Events/Day</span></div>
              </div>
              <div className="proj-featured-arch">
                <span>Architecture:</span> Master-Worker on Kubernetes<br />
                <span>Orchestrator:</span> TypeScript/Express singleton → cron scheduling → dynamic K8s Job creation<br />
                <span>Workers:</span> Ephemeral Puppeteer pods (1-4Gi RAM), session state persisted to cloud storage<br />
                <span>Quality:</span> Reconciliation engine with rolling averages, auto-retry, and data completeness checks
              </div>
            </article>

            <div className="proj-grid">
              {projects.map((project, i) => (
                <article className="proj-card" key={i}>
                  <div className="proj-card-header">
                    <h3 className="proj-card-title">{project.title}</h3>
                    {project.link && (
                      <a className="proj-card-link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <p className="proj-card-desc">{project.desc}</p>
                  <div className="proj-card-tags">
                    {project.tags.map((tag) => (
                      <span className="proj-card-tag" key={tag}>{tag}</span>
                    ))}
                    {project.stars && <span className="proj-card-tag">★ {project.stars}</span>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
