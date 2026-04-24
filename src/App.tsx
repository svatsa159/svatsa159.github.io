import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import portraitImage from './assets/portrait-cutout.png'
import { PretextText } from './animations/PretextText'
import SplitWords from './animations/SplitWords'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type TimelineItem = {
  period: string
  role: string
  system: string
  summary: string
}

type ProjectItem = {
  name: string
  detail: string
  stack: string
  metrics?: string
}

type SkillGroup = {
  command: string
  title: string
  items: string[]
}

type LifeItem = {
  unit: string
  title: string
  detail: string
}

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'BEYOND', href: '#beyond' },
  { label: 'CONTACT', href: '#contact' },
]

const coreStats = [
  { value: '6+', label: 'YEARS SHIPPING PRODUCTION CODE' },
  { value: '3', label: 'YEARS TO REACH TECH LEAD' },
  { value: '65K', label: 'EVENTS OR ORDERS PER DAY IN SIDE SYSTEMS' },
]

const timeline: TimelineItem[] = [
  {
    period: '2023 - PRESENT',
    role: 'TECHNICAL LEAD',
    system: 'DRM // DATA RETENTION MANAGEMENT',
    summary:
      'Leads GDPR-aligned retention systems where applications report purge logs with what was deleted and when. Built as an organization-scale garbage collector and currently mentoring and coordinating close to 15 engineers.',
  },
  {
    period: '2022 - 2023',
    role: 'SENIOR DEVELOPER',
    system: 'PNP // POLICIES AND PROCEDURES',
    summary:
      'Designed group-level policy distribution architecture across entities. Built an Azure OpenAI RAG assistant for policy Q and A with reported accuracy near 95 percent.',
  },
  {
    period: '2020 - 2022',
    role: 'SOFTWARE DEVELOPER',
    system: 'PPS // POLICY PUBLISHING SYSTEM',
    summary:
      'Built the full policy lifecycle engine from creation to approval, renewal, publishing, and notifications for India entity operations. Adoption expanded to international entities after local success.',
  },
]

const migrations = ['JDK 8 -> 21', 'JENKINS -> GITHUB ACTIONS', 'INTERNAL REPO -> JFROG']

const projects: ProjectItem[] = [
  {
    name: 'DDO // DISTRIBUTED DATA ORCHESTRATOR',
    detail:
      'Kubernetes-native orchestration platform with cron-based scheduling, ephemeral Puppeteer worker jobs, reconciliation, retries, and completeness checks. Entire architecture designed from scratch.',
    stack: 'TYPESCRIPT, EXPRESS, KUBERNETES, PUPPETEER',
    metrics: '10+ SOURCES | 2.6K ENTITIES | 65K EVENTS PER DAY',
  },
  {
    name: 'RE-MEMORY',
    detail:
      'AI memory engine modeled on hippocampus and prefrontal behavior. Focused on personalized retention and forgetting dynamics inspired by lived ADHD patterns.',
    stack: 'PYTHON, RUST, AI/ML',
  },
  {
    name: 'REACT-DOODLE-ICONS',
    detail:
      'Published npm package with 400+ hand-drawn React icons and open-source adoption.',
    stack: 'REACT, SVG, NPM',
  },
  {
    name: 'REVIEW-ZONE',
    detail:
      'Flask + MongoDB review system with TMDB API integration and auto-generated social cards using canvas text layout techniques.',
    stack: 'FLASK, MONGODB, TMDB API',
  },
  {
    name: 'MARKET SCREENER SUITE',
    detail:
      'Quant and swing screeners with ongoing strategy optimization using Karpathy autoresearcher flows and Claude-assisted analysis.',
    stack: 'PYTHON, SPRING BOOT, ANGULAR',
  },
  {
    name: 'BOOKMYSHOW BOT + HOME MEDIA SERVER',
    detail:
      'Ticket alert automation with Puppeteer plus a Dockerized self-hosted media stack using Plex, Radarr, Sonarr, Jackett, and Overseerr.',
    stack: 'NODE.JS, DOCKER, AUTOMATION',
  },
]

const skillGroups: SkillGroup[] = [
  {
    command: 'svatsa languages --list',
    title: 'LANGUAGES',
    items: ['JAVA', 'PYTHON', 'TYPESCRIPT', 'JAVASCRIPT', 'GO', 'C++', 'DART', 'C#', 'SQL', 'BASH'],
  },
  {
    command: 'svatsa frameworks --list',
    title: 'FRAMEWORKS AND LIBRARIES',
    items: ['SPRING BOOT', 'REACT', 'REACT NATIVE', 'NESTJS', 'DJANGO', 'FLASK', 'ANGULAR', 'FLUTTER', 'EXPRESS', 'UNITY'],
  },
  {
    command: 'svatsa infra --list',
    title: 'INFRA AND DEVOPS',
    items: ['KUBERNETES', 'DOCKER', 'GITHUB ACTIONS', 'JENKINS', 'JFROG', 'ELK STACK', 'APM', 'GCS', 'MINIO'],
  },
  {
    command: 'svatsa data --list',
    title: 'DATABASES + AI',
    items: ['POSTGRESQL', 'MONGODB', 'REDIS', 'MEMCACHED', 'MYSQL', 'AZURE OPENAI', 'RAG PIPELINES', 'LLM MEMORY SYSTEMS', 'CLAUDE API'],
  },
]

const lifeItems: LifeItem[] = [
  {
    unit: 'UNIT A1',
    title: 'CINEMATOGRAPHY',
    detail:
      'Shoots and edits in DaVinci Resolve and Lightroom. Travel footage includes Rome, Cinque Terre, Positano, Paris, Kedarkantha, and Bandaje.',
  },
  {
    unit: 'UNIT B4',
    title: 'FILM CRITICISM',
    detail:
      'Writes direct, unsugarcoated takes. One line in rotation: Rewatching Raanjhanaa will be the Gangajal for the sin of watching this movie.',
  },
  {
    unit: 'UNIT C2',
    title: 'ITALIAN COOKING',
    detail:
      'Fresh pasta from scratch, air-fryer pizza experiments, and strong Naples-backed opinions. Personal food principle: rich texture matters.',
  },
  {
    unit: 'UNIT D7',
    title: 'MUSIC',
    detail:
      'Sings confidently, plays piano, and records performance clips on Instagram reels.',
  },
  {
    unit: 'UNIT F5',
    title: 'BOARD GAMES',
    detail:
      'Current shelf includes Vantage, Dune Imperium, Jaipur, Wyrmspan, Flip7, Trio, 7 Wonders Duel, and Catan.',
  },
  {
    unit: 'UNIT T9',
    title: 'TRAVEL',
    detail: 'Italy, France, and treks across India with heavy visual documentation and memory logging.',
  },
]

const channels = [
  { label: 'GITHUB', value: 'svatsa159', href: 'https://github.com/svatsa159' },
  { label: 'INSTAGRAM', value: '@svatsa159', href: 'https://instagram.com/svatsa159' },
  { label: 'CINEMA LOG', value: 'letterboxd.com/svatsa159', href: 'https://letterboxd.com/svatsa159' },
  { label: 'CINEMA REELS', value: '@the_permanent_sojourner', href: 'https://instagram.com/the_permanent_sojourner' },
  { label: 'MAIL', value: 'svatsa159@gmail.com', href: 'mailto:svatsa159@gmail.com' },
]

const machineLineText =
  'YOU COME ACROSS AS A FAST, HIGH-AGENCY, SYSTEMS-MINDED PERSON WHO VALUES CORRECTNESS, POLISH, AND PRACTICAL JUDGMENT OVER CEREMONY.'

function MastheadChars({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="masthead-char" data-masthead-char="" aria-hidden={i > 0 ? 'true' : undefined}>
          {ch}
        </span>
      ))}
    </>
  )
}

function App() {
  const year = new Date().getFullYear()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const header = document.querySelector<HTMLElement>('.command-header')
    if (!header) return

    const updateHeaderOffset = () => {
      const height = Math.ceil(header.getBoundingClientRect().height)
      root.style.setProperty('--header-offset', `${height}px`)
    }

    updateHeaderOffset()
    window.addEventListener('resize', updateHeaderOffset)
    window.addEventListener('load', updateHeaderOffset)

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateHeaderOffset)
      : null

    observer?.observe(header)

    return () => {
      window.removeEventListener('resize', updateHeaderOffset)
      window.removeEventListener('load', updateHeaderOffset)
      observer?.disconnect()
    }
  }, [])

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const ease = 'expo.out'

      if (reduce) {
        gsap.set('[data-pretext-line-inner], [data-pretext-word], [data-pretext-char]', {
          yPercent: 0,
          opacity: 1,
          filter: 'none',
        })
        gsap.set('[data-reveal], [data-stagger-item]', { opacity: 1, y: 0, filter: 'none' })
        return
      }

      gsap.set('[data-masthead-char]', { yPercent: 120, rotateX: -60, opacity: 0 })
      gsap.set('.eyebrow, .strapline', { yPercent: 100, opacity: 0 })
      gsap.set('.site-nav a', { y: 16, opacity: 0 })

      const intro = gsap.timeline({ defaults: { ease } })
      intro
        .to('.eyebrow', { yPercent: 0, opacity: 1, duration: 0.8, delay: 0.15 })
        .to(
          '[data-masthead-char]',
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            stagger: { each: 0.035, from: 'start' },
          },
          '<0.05',
        )
        .to('.strapline', { yPercent: 0, opacity: 1, duration: 0.7 }, '<0.35')
        .to('.site-nav a', { y: 0, opacity: 1, duration: 0.5, stagger: 0.04 }, '<0.1')

      gsap.utils.toArray<HTMLElement>('[data-reveal="heading"]').forEach((root) => {
        const words = root.querySelectorAll<HTMLElement>('[data-split-word]')
        if (!words.length) return
        gsap.from(words, {
          y: 36,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.03,
          clearProps: 'transform,opacity,willChange',
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal="block"]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 0.85,
          ease,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-stagger-group]').forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]')
        if (!items.length) return
        gsap.from(items, {
          y: 26,
          opacity: 0,
          filter: 'blur(4px)',
          duration: 0.7,
          ease,
          stagger: 0.07,
          scrollTrigger: {
            trigger: group,
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-stat]').forEach((el) => {
        const raw = el.textContent ?? ''
        const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/)
        if (!match) return
        const target = parseFloat(match[1])
        const suffix = match[2]
        const state = { n: 0 }
        gsap.to(state, {
          n: target,
          duration: 1.6,
          ease: 'power2.out',
          snap: { n: 1 },
          onUpdate: () => {
            el.textContent = `${Math.round(state.n)}${suffix}`
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true,
          },
        })
      })

      const machineRoot = document.querySelector<HTMLElement>('[data-machine-line]')
      if (machineRoot) {
        ScrollTrigger.create({
          trigger: machineRoot,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            const machineLines = machineRoot.querySelectorAll<HTMLElement>('[data-pretext-line-inner]')
            if (!machineLines.length) return
            const mtl = gsap.timeline()
            machineLines.forEach((line, i) => {
              mtl.to(
                line,
                { yPercent: 0, opacity: 1, duration: 0.7, ease },
                i * 0.14,
              )
            })
          },
        })
      }

      if (window.matchMedia('(pointer: fine)').matches) {
        gsap.utils.toArray<HTMLElement>('.site-nav a').forEach((link) => {
          const xTo = gsap.quickTo(link, 'x', { duration: 0.5, ease: 'power3.out' })
          const yTo = gsap.quickTo(link, 'y', { duration: 0.5, ease: 'power3.out' })

          const handleMove = (event: PointerEvent) => {
            const rect = link.getBoundingClientRect()
            const mx = event.clientX - (rect.left + rect.width / 2)
            const my = event.clientY - (rect.top + rect.height / 2)
            xTo(mx * 0.18)
            yTo(my * 0.32)
          }
          const handleLeave = () => {
            xTo(0)
            yTo(0)
          }

          link.addEventListener('pointermove', handleMove)
          link.addEventListener('pointerleave', handleLeave)
        })

        gsap.utils.toArray<HTMLElement>('.channel-list a').forEach((link) => {
          const arrow = link.querySelector<HTMLElement>('samp')
          const xTo = arrow ? gsap.quickTo(arrow, 'x', { duration: 0.45, ease: 'power3.out' }) : null
          link.addEventListener('pointerenter', () => xTo?.(8))
          link.addEventListener('pointerleave', () => xTo?.(0))
        })
      }

      ScrollTrigger.refresh()
    },
    { scope: rootRef, dependencies: [] },
  )

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#about">SKIP TO CONTENT</a>

      <header className="command-header" id="top">
        <div className="command-grid">
          <p className="eyebrow">[ PERSONAL DOSSIER ] [ REV 2.6 ] <span className="status-live">[ STATUS ACTIVE ]</span></p>
          <h1 className="masthead" aria-label="Srivatsa Rampalli">
            <span className="masthead-word">
              <MastheadChars text="SRIVATSA" />
            </span>
            <span className="masthead-word masthead-accent">
              <MastheadChars text="RAMPALLI" />
            </span>
          </h1>
          <p className="strapline">TECHNICAL LEAD / SYSTEMS ARCHITECT / PRODUCT EXECUTION OPERATOR</p>
          <nav aria-label="PRIMARY NAVIGATION" className="site-nav">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                <samp>{link.label}</samp>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="blueprint">
        <section id="about" className="module hero-module" aria-labelledby="about-title">
          <div className="module-grid hero-grid">
            <article className="panel">
              <p className="module-label" data-reveal="block">[ ORIGIN LOG ]</p>
              <h2 id="about-title" className="macro-title" data-reveal="heading">
                <SplitWords as="span" className="macro-title-line" text="MECHANICAL DEGREE." />
                <br />
                <SplitWords as="span" className="macro-title-line" text="SOFTWARE LIFE." />
              </h2>
              <p className="body-copy" data-reveal="block">
                BITS Pilani, class of 2020. Mechanical Engineering on paper, but the zero-attendance policy made room for a different operating system: CS electives, coding club, and shipping real software.
              </p>
              <p className="body-copy" data-reveal="block">
                Met wife <strong>Diksha</strong> in a Bhagavad Gita humanities elective. Same campus became home base and family bridge.
              </p>
              <p className="body-copy" data-reveal="block">
                ADHD is treated as a feature flag, not a defect. It enables rapid depth on new domains, from compliance architecture to AI memory systems,
                cinematography, cooking, and music.
              </p>

              <div className="stat-grid" role="list" aria-label="Core metrics" data-stagger-group="">
                {coreStats.map((stat) => (
                  <div key={stat.label} className="stat-cell" role="listitem" data-stagger-item="">
                    <div className="stat-value">
                      {stat.value}
                    </div>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <article className="machine-correspondence" aria-label="Machine correspondence from Hermes" data-reveal="block">
                <header className="machine-head">
                  <samp>[ MACHINE CORRESPONDENCE ]</samp>
                  <samp>UNIT / HERMES</samp>
                </header>

                <dl className="machine-meta">
                  <div>
                    <dt>SOURCE</dt>
                    <dd><samp>HERMES AGENT</samp></dd>
                  </div>
                  <div>
                    <dt>ROUTE</dt>
                    <dd><samp>NOUSRESEARCH/HERMES-AGENT</samp></dd>
                  </div>
                  <div>
                    <dt>PACKET</dt>
                    <dd><samp>PROFILE ASSESSMENT / REV 01</samp></dd>
                  </div>
                </dl>

                <blockquote className="machine-body" cite="https://github.com/NousResearch/hermes-agent">
                  <p className="machine-prompt"><samp>{'>>> HERMES TRANSMISSION / BEGIN'}</samp></p>
                  <PretextText
                    as="p"
                    className="machine-line"
                    text={machineLineText}
                    split="line"
                    data-machine-line=""
                  />
                </blockquote>

                <div className="machine-foot">
                  <output>SIGNATURE: HERMES / VERIFIED</output>
                  <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noreferrer">
                    <samp>OPEN SOURCE NODE</samp>
                  </a>
                </div>
              </article>
            </article>

            <aside className="panel portrait-panel" aria-label="Profile telemetry">
              <figure className="portrait-frame" data-reveal="block">
                <img src={portraitImage} alt="Srivatsa Rampalli" className="portrait-image" />
                <figcaption>
                  <samp>[ VISUAL RECORD / SR-159 ]</samp>
                </figcaption>
              </figure>

              <dl className="fact-list" data-stagger-group="">
                <div data-stagger-item="">
                  <dt>BASE</dt>
                  <dd>BANGALORE / INDIA</dd>
                </div>
                <div data-stagger-item="">
                  <dt>CURRENT MANDATE</dt>
                  <dd>TECH LEAD @ SOCIETE GENERALE</dd>
                </div>
                <div data-stagger-item="">
                  <dt>OPERATING PHILOSOPHY</dt>
                  <dd>THINKING IS THE ONLY BARRIER. IF I CAN THINK IT, I CAN MAKE IT.</dd>
                </div>
                <div data-stagger-item="">
                  <dt>EXECUTION MODE</dt>
                  <dd>JACK OF ALL TRADES, MASTER OF GETTING SHIT DONE</dd>
                </div>
              </dl>

              <output className="status-output" data-reveal="block">STATUS: AVAILABLE FOR HIGH-IMPACT BUILDS</output>
            </aside>
          </div>
        </section>

        <section id="experience" className="module" aria-labelledby="experience-title">
          <div className="module-grid">
            <article className="panel">
              <p className="module-label" data-reveal="block">[ SERVICE RECORD ]</p>
              <SplitWords
                as="h2"
                id="experience-title"
                className="section-title no-rule"
                text="SOCIETE GENERALE / BANGALORE"
                data-reveal="heading"
              />
              <ol className="timeline" aria-label="Career timeline" data-stagger-group="">
                {timeline.map((entry) => (
                  <li key={entry.period} data-stagger-item="">
                    <p className="timeline-period">{entry.period}</p>
                    <h3>{entry.role}</h3>
                    <p className="timeline-system">{entry.system}</p>
                    <p className="timeline-summary">{entry.summary}</p>
                  </li>
                ))}
              </ol>

              <div className="migration-strip" aria-label="Modernization migrations" data-stagger-group="">
                {migrations.map((item) => (
                  <span key={item} data-stagger-item="">{item}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="module" aria-labelledby="projects-title">
          <div className="module-grid">
            <article className="panel">
              <p className="module-label" data-reveal="block">[ BUILD ARCHIVE ]</p>
              <SplitWords
                as="h2"
                id="projects-title"
                className="section-title no-rule"
                text="SELECTED SYSTEMS AND PRODUCTS"
                data-reveal="heading"
              />
              <div className="project-grid" data-stagger-group="">
                {projects.map((project) => (
                  <article key={project.name} className="project-card" data-stagger-item="">
                    <h3>{project.name}</h3>
                    {project.metrics && <p className="project-metrics">{project.metrics}</p>}
                    <p>{project.detail}</p>
                    <p className="project-stack">
                      <samp>{project.stack}</samp>
                    </p>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="skills" className="module" aria-labelledby="skills-title">
          <div className="module-grid skill-grid" data-stagger-group="">
            <article className="panel" data-stagger-item="">
              <p className="module-label">[ CAPABILITY TERMINAL ]</p>
              <SplitWords
                as="h2"
                id="skills-title"
                className="section-title"
                text="MULTI-STACK ARSENAL"
                data-reveal="heading"
              />
              <p className="body-copy" data-reveal="block">
                Built for cross-domain execution: backend systems, frontend surfaces, infra pipelines, and AI-assisted reasoning loops.
              </p>
            </article>

            {skillGroups.map((group) => (
              <article key={group.command} className="panel skill-panel" data-stagger-item="">
                <p className="skill-command">
                  <kbd>{group.command}</kbd>
                </p>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <samp>{item}</samp>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="beyond" className="module" aria-labelledby="beyond-title">
          <div className="module-grid">
            <article className="panel">
              <p className="module-label" data-reveal="block">[ OFF-HOURS OPERATIONS ]</p>
              <SplitWords
                as="h2"
                id="beyond-title"
                className="section-title"
                text="NOT JUST CODE"
                data-reveal="heading"
              />
              <div className="life-grid" data-stagger-group="">
                {lifeItems.map((item) => (
                  <article key={item.title} className="life-card" data-stagger-item="">
                    <p className="life-unit">{item.unit}</p>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="module" aria-labelledby="contact-title">
          <div className="module-grid">
            <article className="panel">
              <p className="module-label" data-reveal="block">[ CHANNEL ACCESS ]</p>
              <SplitWords
                as="h2"
                id="contact-title"
                className="section-title"
                text="OPEN CONTACT LINES"
                data-reveal="heading"
              />
              <p className="body-copy" data-reveal="block">
                For distributed systems, product builds, or collaborative experiments, use any channel below.
              </p>

              <ul className="channel-list" aria-label="External links" data-stagger-group="">
                {channels.map((channel) => (
                  <li key={channel.label} data-stagger-item="">
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <span>{channel.label}</span>
                      <samp>{channel.value}</samp>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          <samp>SRIVATSA RAMPALLI © {year} // ENGINEERED IN REACT + TYPESCRIPT</samp>
        </p>
      </footer>
    </div>
  )
}

export default App
