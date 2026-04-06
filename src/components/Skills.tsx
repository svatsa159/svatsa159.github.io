import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .skills-layout {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 14px;
  }
  .skills-terminal {
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    background: rgba(9, 14, 25, 0.62);
    opacity: 0;
    transform: translateY(18px);
  }
  .skills-terminal-head {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--border);
    background: rgba(18, 27, 47, 0.6);
  }
  .skills-dot { width: 9px; height: 9px; border-radius: 50%; }
  .skills-dot.red { background: #ff6f6f; }
  .skills-dot.yellow { background: #ffcc66; }
  .skills-dot.green { background: #4fd08f; }
  .skills-terminal-title {
    margin-left: auto;
    font-family: var(--font-mono);
    color: var(--text-muted);
    font-size: 0.65rem;
    letter-spacing: 0.05em;
  }
  .skills-terminal-body {
    padding: 14px;
    font-family: var(--font-mono);
    font-size: 0.76rem;
    line-height: 1.8;
  }
  .skills-prompt { color: var(--accent-blue-strong); }
  .skills-cmd { color: var(--accent-gold-strong); }
  .skills-out {
    color: var(--text-secondary);
    margin-left: 10px;
    margin-bottom: 4px;
  }
  .skills-cat {
    color: var(--text-primary);
    margin-top: 8px;
    font-size: 0.75rem;
  }
  .skills-item {
    display: inline-block;
    margin-left: 14px;
    color: var(--text-secondary);
  }
  .skills-grid {
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: rgba(9, 14, 25, 0.62);
    padding: 14px;
    opacity: 0;
    transform: translateY(18px);
  }
  .skills-grid h3 {
    font-size: 0.9rem;
    font-family: var(--font-mono);
    color: var(--text-secondary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .skills-chip-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .skills-chip {
    font-family: var(--font-mono);
    border: 1px solid var(--border);
    border-radius: 8px;
    background: rgba(18, 27, 47, 0.62);
    color: var(--text-secondary);
    font-size: 0.66rem;
    padding: 6px 8px;
  }
  @media (max-width: 980px) {
    .skills-layout { grid-template-columns: 1fr; }
  }
`

const skillCategories = [
  {
    cmd: 'languages --list',
    label: 'Languages',
    items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'Go', 'C++', 'Dart', 'C#', 'SQL', 'Bash'],
  },
  {
    cmd: 'frameworks --list',
    label: 'Frameworks & Libraries',
    items: ['Spring Boot', 'React', 'React Native', 'NestJS', 'Django', 'Flask', 'Angular', 'Flutter', 'Express', 'Unity'],
  },
  {
    cmd: 'infra --list',
    label: 'Infrastructure & DevOps',
    items: ['Kubernetes', 'Docker', 'GitHub Actions', 'Jenkins', 'JFrog', 'ELK Stack', 'APM', 'GCS', 'MinIO'],
  },
  {
    cmd: 'databases --list',
    label: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Memcached', 'MySQL'],
  },
  {
    cmd: 'ai --list',
    label: 'AI/ML',
    items: ['Azure OpenAI', 'RAG Pipelines', 'LLM Memory Systems', 'Claude API'],
  },
]

const allSkills = skillCategories.flatMap((c) => c.items)

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set(el.querySelectorAll('.skills-terminal, .skills-grid'), { opacity: 1, y: 0 })
      return
    }

    gsap.to(el.querySelectorAll('.skills-terminal, .skills-grid'), {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 74%' },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section id="skills" ref={sectionRef}>
        <div className="section-shell">
          <div className="section-panel">
            <div className="section-label">Skills</div>
            <h2 className="section-title">The Arsenal</h2>
            <div className="skills-layout">
              <div className="skills-terminal">
                <div className="skills-terminal-head">
                  <span className="skills-dot red" />
                  <span className="skills-dot yellow" />
                  <span className="skills-dot green" />
                  <span className="skills-terminal-title">svatsa / capabilities</span>
                </div>
                <div className="skills-terminal-body">
                  <div><span className="skills-prompt">$ </span><span className="skills-cmd">cat philosophy.txt</span></div>
                  <div className="skills-out">"There is not one single language or anything that can stop me."</div>
                  {skillCategories.map((cat) => (
                    <div key={cat.label}>
                      <div><span className="skills-prompt">$ </span><span className="skills-cmd">svatsa {cat.cmd}</span></div>
                      <div className="skills-cat">// {cat.label}</div>
                      <div>
                        {cat.items.map((item, i) => (
                          <span key={item} className="skills-item">→ {item}{i < cat.items.length - 1 ? ' ' : ''}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="skills-grid" aria-label="Skill tags">
                <h3>Quick Scan</h3>
                <div className="skills-chip-wrap">
                  {allSkills.map((skill) => (
                    <span key={skill} className="skills-chip">{skill}</span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
