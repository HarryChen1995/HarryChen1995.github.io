import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight, Download, Github, Linkedin, Mail, Menu, X, ExternalLink, Code2, Network,
  Sparkles, Database, Cloud, Braces
} from 'lucide-react'

type Repo = { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; forks_count: number; topics?: string[]; readmeSummary?: string }

const featured = [
  {
    number: '01', name: 'Omni-Coder', type: 'OPEN SOURCE · AI DEVELOPER TOOLS',
    description: 'An AI coding agent that plans, edits, and tests code through scoped filesystem and shell tools — with human approval built into the workflow.',
    tags: ['Python', 'MCP', 'SQLite', 'Ollama'],
    metric: '900+', metricLabel: 'tests · 88% coverage',
    href: 'https://pypi.org/project/omni-coder/', code: 'https://github.com/HarryChen1995',
    highlight: 'Plan. Edit. Test.',
    highlightDetail: 'An AI coding workflow with scoped tools and human approval.',
    challenge: 'Give an AI coding agent useful project access without removing human oversight.'
  },
  {
    number: '02', name: 'Chase Debit Platform', type: 'ENTERPRISE · DISTRIBUTED SYSTEMS',
    description: 'Designed and deployed microservices-based transaction middleware supporting more than 30 million daily Visa and Mastercard debit transactions.',
    tags: ['Java', 'Kubernetes', 'Microservices'],
    metric: '30M+', metricLabel: 'daily transactions',
    href: 'https://www.jpmorganchase.com/', code: '',
    highlight: 'Built for scale.',
    highlightDetail: 'Transaction middleware supporting Visa and Mastercard debit.',
    challenge: 'Support high-volume debit transactions across major card networks.'
  },
  {
    number: '03', name: 'Customer Experience Survey', type: 'BANKING · MICROSERVICES & DATA',
    description: 'Built asynchronous branch-survey upload, report-generation, and configuration services, plus a MapReduce job to summarize warehouse reports.',
    tags: ['Java', 'Spring Boot', 'Kubernetes', 'MapReduce'],
    metric: 'ASYNC', metricLabel: 'survey processing',
    href: 'https://www.jpmorganchase.com/', code: '',
    highlight: 'Collect → process → report.',
    highlightDetail: 'Asynchronous survey uploads and warehouse summaries.',
    challenge: 'Connect branch survey collection with report generation and warehouse summaries.'
  },
  {
    number: '04', name: 'Blueprint', type: 'BRANCH OPERATIONS · FULL STACK',
    description: 'Developed a branch field-management tool with a manager launch pad for scheduling visits, supporting sales initiatives, and tracking incentives. Streamed events to analytics with Kafka.',
    tags: ['Java', 'Vue.js', 'Redux', 'Kafka', 'Spring Boot'],
    metric: 'EVENT', metricLabel: 'driven analytics',
    href: 'https://www.jpmorganchase.com/', code: '',
    highlight: 'Branch work, organized.',
    highlightDetail: 'Visit planning, sales initiatives, and incentive tracking.',
    challenge: 'Give branch managers one place to coordinate visits and sales initiatives.'
  },
  {
    number: '05', name: 'Core Consumer Banking Service', type: 'BANKING · CORE SERVICES',
    description: 'Implemented and maintained a core deposit and withdrawal service integrated with chase.com.',
    tags: ['Java', 'React', 'Oracle SQL'],
    metric: 'CORE', metricLabel: 'deposit & withdrawal',
    href: 'https://www.jpmorganchase.com/', code: '',
    highlight: 'Core banking flows.',
    highlightDetail: 'Deposit and withdrawal services integrated with chase.com.',
    challenge: 'Maintain core deposit and withdrawal flows for consumer banking.'
  },
  {
    number: '06', name: 'Payment Integration', type: 'FINTECH · PAYMENT APIs',
    description: 'Integrated Stripe, Google Pay, and Chase Payment APIs with an internal payment service for utility-bill invoicing.',
    tags: ['C#', 'JavaScript', 'SQL Server', 'Payments'],
    metric: '3 APIs', metricLabel: 'payment integrations',
    href: 'https://www.invoicecloud.com/', code: '',
    highlight: 'One payment service.',
    highlightDetail: 'Stripe, Google Pay, and Chase APIs for utility invoices.',
    challenge: 'Bring several payment providers into a utility-bill invoicing flow.'
  },
  {
    number: '07', name: 'Intelligent Video Streaming', type: 'COMPUTER VISION · CLOUD & IOT',
    description: 'Connected camera feeds from NVIDIA Xavier hardware and IoT devices to AWS streaming infrastructure for healthcare providers.',
    tags: ['Python', 'Swift', 'TensorFlow', 'CUDA', 'AWS Kinesis'],
    metric: 'EDGE', metricLabel: 'to cloud streaming',
    href: 'https://github.com/HarryChen1995', code: 'https://github.com/HarryChen1995',
    highlight: 'From edge to cloud.',
    highlightDetail: 'Camera feeds from NVIDIA Xavier and IoT devices to AWS.',
    challenge: 'Connect camera feeds from edge hardware and IoT devices to cloud streaming.'
  }
]

const experience = [
  { role: 'Software Engineer', company: 'ProVia', date: 'MAY 2026 — NOV 2026', place: 'Sugarcreek, Ohio', desc: 'Building entryLINK dealer ordering and quoting tools, plus MCP servers that connect AI coding agents to ticketing, source control, and SQL data.', stack: ['ASP.NET', 'VB.NET', 'SQL Server', 'SSRS', 'MCP'] },
  { role: 'Senior Software Engineer', company: 'JPMorgan Chase & Co.', date: 'NOV 2021 — MAY 2026', place: 'Columbus, Ohio', desc: 'Full-stack software and data engineering across Community & Consumer Banking and the Chase debit platform.', stack: ['Java', 'Spring Boot', 'Kubernetes', 'Kafka'] },
  { role: 'Software Engineer', company: 'InvoiceCloud', date: 'JUN 2021 — NOV 2021', place: 'Columbus, Ohio', desc: 'Built payment integrations connecting Stripe, Google Pay, and Chase Payment APIs with internal invoicing services.', stack: ['C#', 'JavaScript', 'SQL Server'] },
  { role: 'Software Engineer', company: 'Medforall', date: 'FEB 2021 — APR 2021', place: 'Columbus, Ohio', desc: 'Worked on remote-sensing software, iOS development, and intelligent video streaming workflows.', stack: ['Python', 'Swift', 'TensorFlow', 'AWS'] }
]

const skillGroups = [
  { icon: Braces, title: 'Python engineering', items: 'Python · FastAPI · Django · PySpark · NumPy · OpenCV · PyQt5 · Boto3 · pytest · CLI tooling' },
  { icon: Network, title: 'AI, LLMs & agent systems', items: 'LLM applications · MCP · Ollama · Qwen · OpenAI-compatible APIs · LangChain · LangGraph · TensorFlow · Keras · Agentic workflows' },
  { icon: Database, title: 'Backend & distributed systems', items: 'Java · Spring Boot · Kafka · Spark · Kubernetes · SQL Server · Oracle · MySQL · MongoDB · SQLite' },
  { icon: Code2, title: 'Full-stack development', items: 'TypeScript · React · JavaScript · C# · ASP.NET · VB.NET · Swift · REST APIs' },
  { icon: Cloud, title: 'Cloud & infrastructure', items: 'AWS · Azure · Lambda · EC2 · S3 · Kinesis · AKS · Azure Functions · Docker' }
]

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [repoState, setRepoState] = useState<'loading'|'ready'|'error'>('loading')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [year] = useState(new Date().getFullYear())

  useEffect(() => {
    const summarizeReadme = async (repo: Repo): Promise<Repo> => {
      if (repo.description) return repo
      try {
        const response = await fetch(`https://api.github.com/repos/HarryChen1995/${encodeURIComponent(repo.name)}/readme`)
        if (!response.ok) return repo
        const payload = await response.json()
        const markdown = decodeURIComponent(escape(window.atob(payload.content.replace(/\\s/g, ''))))
        const lines = markdown.split(/\\r?\\n/)
          .map(line => line.trim())
          .filter(line => line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('[![') && !line.startsWith('<') && !line.startsWith('```'))
        const summary = lines.slice(0, 3).join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`>#]/g, '').slice(0, 240)
        return summary ? { ...repo, readmeSummary: summary } : repo
      } catch {
        return repo
      }
    }

    fetch('https://api.github.com/users/HarryChen1995/repos?per_page=100&sort=updated')
      .then(r => { if (!r.ok) throw new Error('GitHub API unavailable'); return r.json() })
      .then(async (data: Repo[]) => {
        const ordered = data.filter(r => !r.name.startsWith('.')).sort((a,b) => b.stargazers_count-a.stargazers_count)
        const needsReadme = ordered.filter(r => !r.description).slice(0, 8)
        const enriched = await Promise.all(needsReadme.map(summarizeReadme))
        const summaryByName = new Map(enriched.map(r => [r.name, r.readmeSummary]))
        setRepos(ordered.map(r => summaryByName.has(r.name) ? { ...r, readmeSummary: summaryByName.get(r.name) } : r))
        setRepoState('ready')
      })
      .catch(() => setRepoState('error'))
  }, [])

  const languages = useMemo(() => ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[])).sort()], [repos])
  const visibleRepos = useMemo(() => repos.filter(r => filter === 'All' || r.language === filter).slice(0, 8), [repos, filter])

  const closeMenu = () => setMenuOpen(false)
  const nav = [['Work','#work'],['Experience','#experience'],['Stack','#stack'],['About','#about']]
  return <div className="site">
    <div className="announcement"><span className="announcement-dot"/> OPEN TO INTERESTING ENGINEERING CONVERSATIONS <span className="announcement-arrow">↗</span></div>
    <header className="nav-wrap">
      <nav className="nav container">
        <a className="brand" href="#top" aria-label="Hanlin Chen home"><span className="brand-mark">HC</span><span>hanlin<span className="brand-muted">.chen</span></span></a>
        <div className={`nav-links ${menuOpen?'nav-open':''}`}>
          {nav.map(([label,href])=><a href={href} key={label} onClick={closeMenu}>{label}</a>)}
          <a className="nav-resume" href="/resume.pdf" download="Hanlin-Chen-Resume.pdf" onClick={closeMenu}>Resume <Download size={14}/></a>
          <a className="nav-contact" href="mailto:hanlinchen.jobs@gmail.com">Let's talk <ArrowUpRight size={14}/></a>
        </div>
        <button className="mobile-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen?<X/>:<Menu/>}</button>
      </nav>
    </header>

    <main id="top">
      <section className="hero container">
        <motion.div className="hero-copy" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
          <div className="eyebrow"><span className="eyebrow-line"/> SOFTWARE ENGINEER <span className="eyebrow-sep">/</span> AI BUILDER</div>
          <h1>From bold idea<br/>to <span className="gradient-text">software that scales.</span></h1>
          <p className="hero-sub">I’m Hanlin, a software engineer who takes ideas from prototype to production—building AI-powered developer tools and reliable systems for real-world scale.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <ArrowUpRight size={16}/></a>
            <a className="button button-secondary" href="/resume.pdf" download="Hanlin-Chen-Resume.pdf">Download resume <Download size={16}/></a>
          </div>
          <div className="hero-meta"><span><i className="status-dot"/> Based in Ohio, USA</span><span className="meta-divider"/><span>Open to interesting projects</span></div>
        </motion.div>
        <motion.div className="hero-visual" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.15}}>
          <div className="profile-visual">
            <img src="/profile-photo.png" alt="Hanlin Chen at the Hoover Dam" />
            <div className="profile-photo-shade" />
            <div className="profile-photo-label">
              <span className="profile-live"><i className="status-dot" /> AVAILABLE FOR CONVERSATIONS</span>
              <strong>Hanlin Chen</strong>
              <span>Software Engineer · AI Builder</span>
            </div>
            <div className="profile-photo-chip"><Sparkles size={15} /> Building with AI</div>
          </div>
        </motion.div>
        <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><div/></div>
      </section>

      <section className="proof-strip container" aria-label="Career highlights">
        <div className="proof-item"><strong>30M+</strong><span>daily transactions supported</span></div>
        <div className="proof-item"><strong>900+</strong><span>automated tests in open source</span></div>
        <div className="proof-item"><strong>5+ years</strong><span>building production software</span></div>
      </section>

      <section className="ticker" aria-label="Areas of focus"><div className="ticker-track">{['AI ENGINEERING','DISTRIBUTED SYSTEMS','DEVELOPER TOOLS','LLM APPLICATIONS','FULL-STACK DEVELOPMENT','OPEN SOURCE','AI ENGINEERING','DISTRIBUTED SYSTEMS'].map((t,i)=><span key={i}>{t}<b>✳</b></span>)}</div></section>

      <section className="section container" id="work">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> SELECTED WORK</div><h2>Things I’ve <span className="muted-heading">built.</span></h2></div><p className="section-intro">A mix of open-source experiments and production engineering — built to solve real problems, not just fill a portfolio.</p></div>
        <div className="projects">
          {featured.map((p,i)=><motion.article className={`project-card ${i===0?'project-featured':''}`} key={p.number} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.5,delay:i*.08}}>
            <div className="project-info"><div className="project-kicker"><span>{p.number}</span>{p.type}</div><h3>{p.name}</h3><span className="project-approach-label">APPROACH</span><p>{p.description}</p><div className="tag-list">{p.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div><div className="project-bottom"><div className="project-links">{i===0 ? <><a className="project-action" href={p.href} target="_blank" rel="noreferrer">Try on PyPI <ArrowUpRight size={14}/></a><a className="project-action" href={p.code} target="_blank" rel="noreferrer"><Github size={14}/> Source</a></> : <><a href={p.href} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}><ArrowUpRight size={17}/></a>{p.code&&<a href={p.code} target="_blank" rel="noreferrer" aria-label="GitHub source"><Github size={16}/></a>}</>}</div></div></div>
            <div className="project-copy"><span>{i===0?'FLAGSHIP PROJECT':'CASE STUDY'}</span><strong>{p.highlight}</strong><p>{p.highlightDetail}</p><div className="case-study-notes"><div className="case-challenge"><span>CHALLENGE</span><p>{p.challenge}</p></div><div className="case-impact"><span>IMPACT</span><strong>{p.metric}</strong><p>{p.metricLabel}</p></div></div></div>
          </motion.article>)}
        </div>
      </section>

      <section className="section experience-section" id="experience"><div className="container">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> THE PATH SO FAR</div><h2>Experience that <span className="muted-heading">scales.</span></h2></div><p className="section-intro">From enterprise transaction platforms to AI-native developer workflows.</p></div>
        <div className="timeline">{experience.map((job,i)=><motion.div className="timeline-row" key={job.company} initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.08}}><div className="timeline-date">{job.date}</div><div className="timeline-marker"><span/></div><div className="timeline-content"><div className="timeline-title"><h3>{job.role}</h3><span>{job.place}</span></div><h4>{job.company}</h4><p>{job.desc}</p><div className="tag-list">{job.stack.map(s=><span className="tag" key={s}>{s}</span>)}</div></div></motion.div>)}</div>
      </div></section>

      <section className="section container" id="stack">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> THE TOOLKIT</div><h2>Tools of the <span className="muted-heading">trade.</span></h2></div><p className="section-intro">A broad toolkit, with a focus on choosing the right technology for the problem.</p></div>
        <div className="skills-grid">{skillGroups.map((g,i)=><motion.div className="skill-card" key={g.title} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07}}><div className="skill-icon"><g.icon size={19}/></div><h3>{g.title}</h3><p>{g.items}</p><span className="skill-index">0{i+1}</span></motion.div>)}</div>
      </section>

      <section className="section github-section"><div className="container">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> OPEN SOURCE ACTIVITY</div><h2>From the <span className="muted-heading">workbench.</span></h2></div><a className="text-link" href="https://github.com/HarryChen1995" target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={16}/></a></div>
        <div className="github-panel"><div className="github-head"><div className="github-profile"><div className="github-avatar">HC</div><div><b>HarryChen1995</b><span>Public repositories · fetched live from GitHub</span></div></div><a href="https://github.com/HarryChen1995" target="_blank" rel="noreferrer" className="github-follow"><Github size={15}/> GitHub profile <ExternalLink size={13}/></a></div>
          {repoState==='loading'&&<div className="repo-message">Loading public repositories<span className="loading-pulse">...</span></div>}
          {repoState==='error'&&<div className="repo-message">GitHub’s API is temporarily unavailable. <a href="https://github.com/HarryChen1995">Browse repositories directly <ArrowUpRight size={13}/></a></div>}
          {repoState==='ready'&&<><div className="repo-filters">{languages.map(l=><button key={l} className={filter===l?'filter-active':''} onClick={()=>setFilter(l)}>{l}</button>)}</div><div className="repo-grid">{visibleRepos.map(r=><a className="repo-card" href={r.html_url} target="_blank" rel="noreferrer" key={r.name}><div className="repo-name"><Code2 size={15}/><b>{r.name}</b><ArrowUpRight size={13}/></div><p>{r.description || r.readmeSummary || `${r.language || 'Open-source'} project${r.topics?.length ? ` exploring ${r.topics.slice(0, 3).join(', ')}` : ` by Harry Chen`}. Open the repository to see its README, implementation, and development history.`}</p><div className="repo-meta">{r.language&&<span><i className="language-dot"/>{r.language}</span>}<span>★ {r.stargazers_count}</span><span>⑂ {r.forks_count}</span></div></a>)}</div>{visibleRepos.length===0&&<div className="repo-message">No repositories found for this language.</div>}</>}
        </div>
      </div></section>

      <section className="section about-section container" id="about"><div className="about-mark"><img src="/profile-photo.png" alt="Hanlin Chen" /><div className="about-orbit"/></div><div className="about-copy"><div className="eyebrow"><span className="eyebrow-line"/> A LITTLE ABOUT ME</div><h2>Curious by default.<br/><span className="muted-heading">Builder by nature.</span></h2><p>I enjoy working at the intersection of software engineering and emerging technology — exploring how intelligent systems can make the tools we use every day more capable. Outside the code, I’m interested in travel, food, and the craft of building things from the ground up.</p><a href="mailto:hanlinchen.jobs@gmail.com" className="text-link">Say hello <ArrowUpRight size={16}/></a></div></section>

      <section className="contact-section"><div className="container contact-inner"><div className="eyebrow"><span className="eyebrow-line"/> HAVE SOMETHING IN MIND?</div><h2>Let's build something<br/><span className="gradient-text">meaningful.</span></h2><p>Interesting engineering challenge, AI idea, or just want to connect? My inbox is open.</p><a className="contact-email" href="mailto:hanlinchen.jobs@gmail.com">hanlinchen.jobs@gmail.com</a><a className="button button-primary contact-button" href="mailto:hanlinchen.jobs@gmail.com">Get in touch <ArrowUpRight size={17}/></a><div className="contact-glow"/></div></section>
    </main>

    <footer className="footer"><div className="container footer-inner"><a className="brand" href="#top"><span className="brand-mark">HC</span><span>hanlin<span className="brand-muted">.chen</span></span></a><span>© {year} Hanlin Chen. Built with curiosity.</span><div className="footer-social"><a href="https://github.com/HarryChen1995" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href="https://linkedin.com/in/hanlin-chen-41663b139" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a href="mailto:hanlinchen.jobs@gmail.com" aria-label="Email"><Mail size={17}/></a></div></div></footer>
  </div>
}
