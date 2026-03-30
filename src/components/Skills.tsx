import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .skills-section {
    padding: var(--section-padding);
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .terminal {
    background: #0d0d0d;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    font-family: var(--font-mono);
    font-size: clamp(0.7rem, 1.2vw, 0.85rem);
    margin-top: 2rem;
    opacity: 0;
    transform: translateY(20px);
  }
  .terminal-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #161616;
    border-bottom: 1px solid var(--border);
  }
  .terminal-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .terminal-dot.red { background: #ff5f57; }
  .terminal-dot.yellow { background: #febc2e; }
  .terminal-dot.green { background: #28c840; }
  .terminal-title {
    flex: 1;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.7rem;
  }
  .terminal-body {
    padding: 1.5rem;
    line-height: 2;
    max-height: 500px;
    overflow-y: auto;
  }
  .terminal-prompt {
    color: var(--accent-blue);
  }
  .terminal-cmd {
    color: var(--accent-gold);
  }
  .terminal-output {
    color: var(--text-secondary);
    padding-left: 1rem;
  }
  .terminal-category {
    color: var(--text-primary);
    font-weight: 600;
    margin-top: 0.5rem;
  }
  .terminal-item {
    color: var(--text-secondary);
    padding-left: 1.5rem;
    display: inline-block;
  }
  .terminal-highlight {
    color: var(--accent-blue);
  }
  .terminal-gold {
    color: var(--accent-gold);
  }
  .terminal-cursor {
    display: inline-block;
    width: 8px;
    height: 1.1em;
    background: var(--accent-blue);
    vertical-align: text-bottom;
    animation: termBlink 1s step-end infinite;
  }
  @keyframes termBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .skills-floating {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 2rem;
    justify-content: center;
  }
  .skill-float-tag {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-secondary);
    transition: all 0.4s ease;
    cursor: default;
    opacity: 0;
    letter-spacing: 0.03em;
  }
  .skill-float-tag:hover {
    border-color: var(--accent-blue);
    color: var(--accent-blue);
    background: var(--accent-blue-dim);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 170, 255, 0.1);
  }
  .skill-float-tag.gold:hover {
    border-color: var(--accent-gold);
    color: var(--accent-gold);
    background: var(--accent-gold-dim);
    box-shadow: 0 4px 15px rgba(255, 170, 0, 0.1);
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

const allSkills = skillCategories.flatMap(c => c.items)

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const [_visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.to(el.querySelector('.terminal'), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 65%',
        onEnter: () => setVisible(true),
      },
    })

    gsap.to(el.querySelectorAll('.skill-float-tag'), {
      opacity: 1,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el.querySelector('.skills-floating'),
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section className="skills-section" id="skills" ref={sectionRef}>
        <div className="section-label">Skills</div>
        <h2 className="section-title">The Arsenal</h2>

        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <div className="terminal-title">svatsa@portfolio ~ /skills</div>
          </div>
          <div className="terminal-body">
            <div>
              <span className="terminal-prompt">$ </span>
              <span className="terminal-cmd">cat philosophy.txt</span>
            </div>
            <div className="terminal-output">
              &quot;There is not one single language or anything that can stop me.&quot;
            </div>
            <br/>
            {skillCategories.map((cat, i) => (
              <div key={i}>
                <div>
                  <span className="terminal-prompt">$ </span>
                  <span className="terminal-cmd">svatsa {cat.cmd}</span>
                </div>
                <div className="terminal-category">
                  {'// '}{cat.label}
                </div>
                <div>
                  {cat.items.map((item, j) => (
                    <span className="terminal-item" key={j}>
                      <span className="terminal-highlight">→</span> {item}
                      {j < cat.items.length - 1 ? '  ' : ''}
                    </span>
                  ))}
                </div>
                <br/>
              </div>
            ))}
            <div>
              <span className="terminal-prompt">$ </span>
              <span className="terminal-cursor" />
            </div>
          </div>
        </div>

        <div className="skills-floating">
          {allSkills.map((skill, i) => (
            <span
              key={i}
              className={`skill-float-tag ${i % 3 === 0 ? 'gold' : ''}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}
