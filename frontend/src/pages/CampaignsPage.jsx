import { useState, useEffect } from 'react'
import axios from 'axios'
import { useToast } from '../components/Toast'
import './CampaignsPage.css'

const API = 'http://localhost:5000/api/user'

export default function CampaignsPage() {
  const toast = useToast()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get(`${API}/campaigns`)
      .then(r => setCampaigns(r.data.data || []))
      .catch(() => toast('Could not load campaigns. Is the server running?', 'error'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = campaigns.filter(c =>
    c.campaign_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.captions?.toLowerCase().includes(search.toLowerCase())
  )

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast('Copied!', 'info')
  }

  return (
    <div className="campaigns">
      <div className="campaigns__orb campaigns__orb--1" />
      <div className="campaigns__orb campaigns__orb--2" />

      <div className="campaigns__inner">
        <div className="campaigns__header">
          <div className="section-label">Campaign Library</div>
          <h1 className="campaigns__title">Your <span className="gradient-text">Saved Campaigns</span></h1>
          <p className="campaigns__sub">Browse, copy, and reuse your AI-generated ad campaigns.</p>
        </div>

        <div className="campaigns__toolbar">
          <input
            className="input-field campaigns__search"
            placeholder="🔍 Search campaigns..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="badge">{filtered.length} campaign{filtered.length !== 1 ? 's' : ''}</div>
        </div>

        {loading ? (
          <div className="campaigns__loading">
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className="camp-skeleton glass-card shimmer" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="campaigns__empty glass-card">
            <div className="campaigns__empty-icon">🎨</div>
            <h3>{search ? 'No campaigns match your search.' : 'No campaigns saved yet.'}</h3>
            <p>Head over to the Studio to create and save your first AI ad!</p>
            <a href="/studio" className="btn-primary" style={{ display: 'inline-flex', marginTop: 8 }}>
              ✦ Open Studio
            </a>
          </div>
        ) : (
          <div className="campaigns__grid">
            {filtered.map((c, i) => (
              <CampaignCard key={c._id || i} campaign={c} onCopy={copyText} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CampaignCard({ campaign, onCopy }) {
  const date = campaign.date_created
    ? new Date(campaign.date_created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Unknown date'

  return (
    <div className="camp-card glass-card">
      {/* Image */}
      <div className="camp-card__image-wrap">
        <img src={campaign.imageurl} alt={campaign.campaign_name} className="camp-card__image" />
        <div className="camp-card__overlay">
          <a href={campaign.imageurl} download className="btn-icon camp-card__download" title="Download">⬇</a>
        </div>
      </div>

      <div className="camp-card__body">
        {/* Name */}
        <div className="camp-card__meta">
          <h3 className="camp-card__name">{campaign.campaign_name || 'Untitled Campaign'}</h3>
          <span className="camp-card__date">{date}</span>
        </div>

        {/* Caption */}
        <p className="camp-card__caption">{campaign.captions}</p>

        {/* Hashtags */}
        <div className="camp-card__hashtags">
          {campaign.hashtags?.slice(0, 5).map(h => (
            <button key={h} className="hashtag-pill hashtag-pill--click" onClick={() => onCopy(h)}>
              #{h.replace(/^#/, '')}
            </button>
          ))}
          {campaign.hashtags?.length > 5 && (
            <span className="camp-card__more">+{campaign.hashtags.length - 5}</span>
          )}
        </div>

        {/* Copy */}
        <button
          className="btn-secondary camp-card__copy"
          onClick={() => onCopy(`${campaign.captions}\n\n${campaign.hashtags?.join(' ')}`)}
        >
          📋 Copy Caption + Tags
        </button>
      </div>
    </div>
  )
}
