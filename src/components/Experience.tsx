import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .exp-section {
    padding: var(--section-padding);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  .exp-company {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--accent-gold);
    margin-bottom: 0.5rem;
    letter-spacing: 0.1em;
  }
  .exp-timeline {
    position: relative;
    margin-top: 3rem;
    padding-left: 60px;
  }
  .exp-timeline::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, var(--accent-blue), var(--accent-gold), transparent);
  }
  .exp-item {
    position: relative;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateX(-20px);
  }
  .exp-item::before {
    content: '';
    position: absolute;
    left: -46px;
    top: 8px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid var(--accent-blue);
    background: var(--bg);
    z-index: 1;
  }
  .exp-item.active::before {
    background: var(--accent-blue);
    box-shadow: 0 0 12px rgba(0, 170, 255, 0.4);
  }
  .exp-year {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-blue);
    letter-spacing: 0.15em;
    margin-bottom: 0.4rem;
  }
  .exp-role {
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .exp-project {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.2rem 1.5rem;
    margin-top: 1rem;
    transition: border-color 0.3s ease;
  }
  .exp-project:hover {
    border-color: var(--accent-blue);
  }
  .exp-project-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.4rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .exp-project-name .badge {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    background: var(--accent-blue-dim);
    color: var(--accent-blue);
    padding: 2px 8px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }
  .exp-project-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.7;
  }
  .exp-highlight {
    color: var(--accent-gold);
    font-weight: 500;
  }
  .exp-migrations {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 1rem;
  }
  .exp-migration-tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 5px 12px;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .exp-migration-tag .arrow {
    color: var(--accent-gold);
  }
  @media (max-width: 768px) {
    .exp-timeline { padding-left: 40px; }
    .exp-item::before { left: -26px; }
    .exp-timeline::before { left: 10px; }
  }
`

const timeline = [
  {
    year: '2023 — PRESENT',
    role: 'Technical Lead',
    active: true,
    projects: [
      {
        name: 'DRM — Data Retention Management',
        badge: 'Current',
        desc: 'Manages data retention rules across entities and applications. Ensures GDPR compliance — prevents over-retention. Applications send purge logs: what they purged, when. "Kind of like a garbage collector for the organization." Leads a team of 5.',
      },
    ],
  },
  {
    year: '2022 — 2023',
    role: 'Senior Developer',
    projects: [
      {
        name: 'PnP — Policies & Procedures',
        badge: 'Group-Level',
        desc: 'Group-level policy management system. Manages how group-level policies are published down to each entity. "Most complex architecture I\'ve built." Built a RAG-based chatbot using Azure OpenAI — 95% accuracy for policy Q&A.',
      },
    ],
  },
  {
    year: '2020 — 2022',
    role: 'Software Developer',
    projects: [
      {
        name: 'PPS — Policy Publishing System',
        badge: 'India Entity',
        desc: 'Local entity-level tool for the complete policy lifecycle: Creation → Approval → Renewal → Publishing → Email notification. Was so successful that international entities started adopting it.',
      },
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const items = el.querySelectorAll('.exp-item')
    gsap.to(items, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.25,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 65%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section className="exp-section" id="experience" ref={sectionRef}>
        <div className="section-label">Experience</div>
        <h2 className="section-title">The SocGen Journey</h2>
        <div className="exp-company">SOCIÉTÉ GÉNÉRALE — BANGALORE</div>

        <div className="exp-timeline">
          {timeline.map((item, i) => (
            <div className={`exp-item ${item.active ? 'active' : ''}`} key={i}>
              <div className="exp-year">{item.year}</div>
              <div className="exp-role">{item.role}</div>

              {item.projects.map((proj, j) => (
                <div className="exp-project" key={j}>
                  <div className="exp-project-name">
                    {proj.name}
                    <span className="badge">{proj.badge}</span>
                  </div>
                  <div className="exp-project-desc">{proj.desc}</div>
                </div>
              ))}

              {i === 0 && (
                <div className="exp-migrations">
                  <span className="exp-migration-tag">JDK 8 <span className="arrow">→</span> 21</span>
                  <span className="exp-migration-tag">Jenkins <span className="arrow">→</span> GitHub Actions</span>
                  <span className="exp-migration-tag">Internal Repo <span className="arrow">→</span> JFrog</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
