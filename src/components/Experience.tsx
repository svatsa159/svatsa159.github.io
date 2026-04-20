import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .exp-company {
    font-family: var(--font-mono);
    font-size: 0.73rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent-gold-strong);
    margin-bottom: 1.3rem;
  }
  .exp-timeline {
    --timeline-axis: 10px;
    position: relative;
    padding-left: calc(var(--timeline-axis) + clamp(18px, 3vw, 30px));
    display: grid;
    gap: 18px;
  }
  .exp-timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--timeline-axis);
    border-left: 1px dashed var(--border-strong);
  }
  .exp-item {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: rgba(9, 14, 25, 0.42);
    padding: 16px;
    opacity: 0;
    transform: translateY(18px);
  }
  .exp-item::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--accent-blue);
    position: absolute;
    left: calc((var(--timeline-axis) + clamp(18px, 3vw, 30px)) * -1 + var(--timeline-axis) - 6px);
    top: 18px;
    background: var(--bg);
  }
  .exp-item.active::before {
    background: var(--accent-blue);
    box-shadow: 0 0 0 4px rgba(91, 168, 255, 0.2);
  }
  .exp-year {
    font-family: var(--font-mono);
    font-size: 0.67rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--accent-blue-strong);
    margin-bottom: 0.35rem;
  }
  .exp-role {
    font-size: clamp(1.12rem, 1.8vw, 1.45rem);
    margin-bottom: 0.8rem;
  }
  .exp-project {
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(18, 27, 47, 0.6);
    padding: 12px;
  }
  .exp-project-name {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-bottom: 0.45rem;
    font-weight: 640;
  }
  .exp-project-badge {
    font-family: var(--font-mono);
    font-size: 0.63rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border-radius: 999px;
    padding: 4px 8px;
    color: var(--accent-gold-strong);
    border: 1px solid rgba(255, 211, 138, 0.5);
    background: rgba(255, 211, 138, 0.08);
  }
  .exp-project-desc {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  .exp-migrations {
    margin-top: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .exp-migration-tag {
    font-family: var(--font-mono);
    font-size: 0.64rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-secondary);
    background: rgba(9, 14, 25, 0.6);
    padding: 5px 10px;
  }
  @media (max-width: 768px) {
    .exp-timeline {
      --timeline-axis: 8px;
      padding-left: calc(var(--timeline-axis) + 18px);
    }
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
        desc: 'Manages data retention rules across entities and applications. Ensures GDPR compliance — prevents over-retention. Applications send purge logs: what they purged, when. "Kind of like a garbage collector for the organization." Has led close to 15 engineers across projects and mentoring tracks.',
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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = el.querySelectorAll('.exp-item')

    if (reduceMotion) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.16,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 72%',
      },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section id="experience" ref={sectionRef}>
        <div className="section-shell">
          <div className="section-panel">
            <div className="section-label">Experience</div>
            <h2 className="section-title">The SocGen Journey</h2>
            <div className="exp-company">Société Générale — Bangalore</div>

            <div className="exp-timeline">
              {timeline.map((item, i) => (
                <article className={`exp-item ${item.active ? 'active' : ''}`} key={i}>
                  <div className="exp-year">{item.year}</div>
                  <h3 className="exp-role">{item.role}</h3>
                  {item.projects.map((project, j) => (
                    <div className="exp-project" key={j}>
                      <div className="exp-project-name">
                        {project.name}
                        <span className="exp-project-badge">{project.badge}</span>
                      </div>
                      <div className="exp-project-desc">{project.desc}</div>
                    </div>
                  ))}

                  {i === 0 && (
                    <div className="exp-migrations">
                      <span className="exp-migration-tag">JDK 8 → 21</span>
                      <span className="exp-migration-tag">Jenkins → GitHub Actions</span>
                      <span className="exp-migration-tag">Internal Repo → JFrog</span>
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
