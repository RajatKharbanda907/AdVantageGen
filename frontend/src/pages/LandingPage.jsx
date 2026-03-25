import { Link } from 'react-router-dom'
import './LandingPage.css'

const features = [
  {
    icon: '🎨',
    title: 'AI Image Generation',
    desc: 'Stable Diffusion XL creates stunning, high-quality visuals from your prompt — automatically optimized for ads.',
  },
  {
    icon: '✍️',
    title: 'Smart Captions',
    desc: 'Qwen AI generates viral Instagram captions and trending hashtags tailored to your brand voice.',
  },
  {
    icon: '🏷️',
    title: 'Brand Watermarks',
    desc: 'Your logo is automatically composited onto every generated image for professional brand consistency.',
  },
  {
    icon: '📁',
    title: 'Campaign Library',
    desc: 'Save and manage all your ad campaigns in one organized place. Never lose a great ad again.',
  },
]

const steps = [
  { num: '01', title: 'Upload Your Logo', desc: 'Drag & drop your brand logo. It gets watermarked on every generated ad.' },
  { num: '02', title: 'Describe Your Ad', desc: 'Write a simple prompt. Our AI engineer enhances it into a cinematic SDXL prompt.' },
  { num: '03', title: 'Generate & Save', desc: 'Get your AI image, captions, and hashtags in seconds. Save to your campaign library.' },
]

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Background orbs */}
      <div className="landing__orb landing__orb--1" />
      <div className="landing__orb landing__orb--2" />
      <div className="landing__orb landing__orb--3" />

      {/* ─────── HERO ─────── */}
      <section className="hero">
        <div className="hero__inner">
          <div className="badge hero__badge anim-fade-up" style={{ animationDelay: '0s' }}>
            <span className="badge-dot" />
            Powered by Stable Diffusion XL &amp; Qwen AI
          </div>

          <h1 className="hero__title anim-fade-up" style={{ animationDelay: '0.1s' }}>
            Create Scroll-Stopping<br />
            <span className="gradient-text">AI Ad Campaigns</span><br />
            in Seconds
          </h1>

          <p className="hero__subtitle anim-fade-up" style={{ animationDelay: '0.2s' }}>
            AdVantageGen combines AI image generation with smart caption writing.<br />
            Upload your logo, type a prompt, and watch your next viral post come to life.
          </p>

          <div className="hero__actions anim-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/studio" className="btn-primary hero__cta">
              ✦ Start Creating Free
            </Link>
            <Link to="/campaigns" className="btn-secondary">
              View Campaigns →
            </Link>
          </div>

          <div className="hero__stats anim-fade-up" style={{ animationDelay: '0.45s' }}>
            {[
              { v: 'SDXL', l: 'Image Model' },
              { v: 'Qwen AI', l: 'Caption Engine' },
              { v: '100%', l: 'Brand-Safe' },
            ].map(s => (
              <div key={s.l} className="hero__stat">
                <strong>{s.v}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="hero__visual anim-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="hero__card glass-card">
            <div className="hero__card-header">
              <span className="hero__card-dot" style={{ background: '#EF4444' }} />
              <span className="hero__card-dot" style={{ background: '#F59E0B' }} />
              <span className="hero__card-dot" style={{ background: '#10B981' }} />
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>AdVantageGen Studio</span>
            </div>
            <div className="hero__image-mock shimmer" />
            <div className="hero__card-caption">
              <div className="hero__card-line shimmer" style={{ width: '85%', height: 10 }} />
              <div className="hero__card-line shimmer" style={{ width: '65%', height: 10, marginTop: 6 }} />
              <div className="hero__card-tags">
                {['#marketing', '#brandai', '#creative'].map(t => (
                  <span key={t} className="hashtag-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="hero__glow" />
        </div>
      </section>

      {/* ─────── FEATURES ─────── */}
      <section className="features">
        <div className="section-inner">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">Everything you need to<br /><span className="gradient-text">launch great ads</span></h2>

          <div className="features__grid">
            {features.map((f, i) => (
              <div key={f.title} className="feature-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── HOW IT WORKS ─────── */}
      <section className="how-it-works">
        <div className="section-inner">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Three steps to your<br /><span className="gradient-text">perfect ad</span></h2>

          <div className="steps__grid">
            {steps.map((s, i) => (
              <div key={s.num} className="step-card">
                <div className="step-card__num gradient-text">{s.num}</div>
                <h3 className="step-card__title">{s.title}</h3>
                <p className="step-card__desc">{s.desc}</p>
                {i < steps.length - 1 && <div className="step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── CTA BANNER ─────── */}
      <section className="cta-banner">
        <div className="cta-banner__inner glass-card">
          <div className="cta-banner__glow" />
          <h2 className="cta-banner__title">Ready to create your first<br /><span className="gradient-text">AI-powered campaign?</span></h2>
          <p className="cta-banner__sub">No design skills needed. Just a great idea and your brand logo.</p>
          <Link to="/studio" className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 40px' }}>
            ✦ Open Studio
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <p>© 2025 <span className="gradient-text">AdVantageGen</span> — AI-Powered Ad Creation</p>
      </footer>
    </div>
  )
}
