import { useState, useRef, useCallback } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { useToast } from '../components/Toast'
import './StudioPage.css'

const API = 'http://localhost:7999/api/user'

const STEPS = ['Upload Logo', 'Write Prompt', 'Generate', 'Results']

export default function StudioPage() {
  const toast = useToast()

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('Generating your ad...')

  // Step 1: Logo
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [logoDragging, setLogoDragging] = useState(false)
  const [logoUploaded, setLogoUploaded] = useState(false)
  const fileInputRef = useRef(null)

  // Step 2: Prompt
  const [prompt, setPrompt] = useState('')

  // Step 3/4: Results
  const [result, setResult] = useState(null)
  const [campaignName, setCampaignName] = useState('')
  const [saved, setSaved] = useState(false)

  /* ─── Logo handlers ─── */
  const handleLogoFile = file => {
    if (!file || !file.type.startsWith('image/')) {
      toast('Please select a valid image file.', 'error')
      return
    }
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const onDrop = useCallback(e => {
    e.preventDefault()
    setLogoDragging(false)
    const file = e.dataTransfer.files[0]
    handleLogoFile(file)
  }, [])

  const uploadLogo = async () => {
    if (!logoFile) { toast('Please select a logo first.', 'error'); return }
    setLoading(true)
    setLoadingText('Uploading logo...')
    try {
      const fd = new FormData()
      fd.append('logo', logoFile)
      await axios.post(`${API}/uploadlogo`, fd)
      setLogoUploaded(true)
      setStep(1)
      toast('Logo uploaded successfully!', 'success')
    } catch {
      toast('Logo upload failed. Is the server running?', 'error')
    } finally {
      setLoading(false)
    }
  }

  /* ─── Generate ─── */
  const generate = async () => {
    if (!prompt.trim()) { toast('Please enter a prompt.', 'error'); return }
    if (!logoUploaded) { toast('Please upload your logo first.', 'error'); setStep(0); return }
    setLoading(true)
    setLoadingText('✦ AI is crafting your ad image & captions...')
    try {
      const { data } = await axios.post(`${API}/generate`, { prompt })
      setResult(data)
      setSaved(false)
      setStep(3)
    } catch (err) {
      toast(err?.response?.data?.message || 'Generation failed. Check API keys.', 'error')
    } finally {
      setLoading(false)
    }
  }

  /* ─── Save ─── */
  const saveAd = async () => {
    if (!result) return
    setLoading(true)
    setLoadingText('Saving campaign...')
    try {
      await axios.post(`${API}/save`, {
        prompt,
        imageurl: result.image,
        hashtags: result.hastag,
        captions: result.caption,
        campaign_name: campaignName || undefined,
      })
      setSaved(true)
      toast('Campaign saved to library! 🎉', 'success')
    } catch {
      toast('Could not save campaign.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const copyText = text => {
    navigator.clipboard.writeText(text)
    toast('Copied to clipboard!', 'info')
  }

  /* ─── Render ─── */
  return (
    <div className="studio">
      {loading && <Loader text={loadingText} />}

      <div className="studio__orb studio__orb--1" />
      <div className="studio__orb studio__orb--2" />

      <div className="studio__inner">
        <div className="studio__header">
          <div className="section-label">AI Studio</div>
          <h1 className="studio__title">Create Your <span className="gradient-text">Perfect Ad</span></h1>
          <p className="studio__sub">Three simple steps — AI does the heavy lifting.</p>
        </div>

        {/* Step indicator */}
        <div className="step-indicator">
          {STEPS.map((s, i) => (
            <div key={s} className={`step-indicator__item ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} onClick={() => i < step && setStep(i)}>
              <div className="step-indicator__dot">
                {i < step ? '✓' : i + 1}
              </div>
              <span className="step-indicator__label">{s}</span>
              {i < STEPS.length - 1 && <div className="step-indicator__line" />}
            </div>
          ))}
        </div>

        {/* ─── STEP 0: Upload Logo ─── */}
        {step === 0 && (
          <div className="studio__panel glass-card anim-fade-up">
            <div className="panel-header">
              <div className="panel-num gradient-text">01</div>
              <div>
                <h2 className="panel-title">Upload Your Brand Logo</h2>
                <p className="panel-desc">Your logo will be watermarked onto every generated image.</p>
              </div>
            </div>

            <div
              className={`drop-zone ${logoDragging ? 'drop-zone--dragging' : ''} ${logoPreview ? 'drop-zone--has-file' : ''}`}
              onDragOver={e => { e.preventDefault(); setLogoDragging(true) }}
              onDragLeave={() => setLogoDragging(false)}
              onDrop={onDrop}
              onClick={() => !logoPreview && fileInputRef.current.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleLogoFile(e.target.files[0])}
              />
              {logoPreview ? (
                <div className="drop-zone__preview">
                  <img src={logoPreview} alt="Logo preview" />
                  <div className="drop-zone__preview-actions">
                    <p className="drop-zone__filename">{logoFile.name}</p>
                    <button
                      className="btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                      onClick={e => { e.stopPropagation(); setLogoFile(null); setLogoPreview(null); setLogoUploaded(false) }}
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                <div className="drop-zone__empty">
                  <div className="drop-zone__icon">🖼️</div>
                  <p className="drop-zone__title">Drag & drop your logo here</p>
                  <p className="drop-zone__hint">or click to browse · PNG, SVG, JPG supported</p>
                </div>
              )}
            </div>

            <div className="panel-actions">
              <button
                className="btn-primary"
                onClick={uploadLogo}
                disabled={!logoFile}
              >
                Upload Logo & Continue →
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 1: Prompt ─── */}
        {step === 1 && (
          <div className="studio__panel glass-card anim-fade-up">
            <div className="panel-header">
              <div className="panel-num gradient-text">02</div>
              <div>
                <h2 className="panel-title">Describe Your Ad</h2>
                <p className="panel-desc">Write a simple prompt. Our AI will enhance it into a cinematic SDXL description.</p>
              </div>
            </div>

            <div className="prompt-box">
              <label className="prompt-label">Your Ad Concept</label>
              <textarea
                className="input-field prompt-textarea"
                placeholder="e.g. A sleek luxury watch on a dark marble surface with moody studio lighting, for a premium watch brand ad..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                rows={5}
              />
              <div className="prompt-counter">{prompt.length} / 1000</div>
            </div>

            <div className="prompt-suggestions">
              <p className="prompt-suggestions__label">Quick ideas:</p>
              {[
                'A modern skincare product on a clean white background with soft pink lighting',
                'A bold sports shoe floating in space with neon streaks and dynamic motion',
                'A cozy café interior with golden hour light and artisan coffee in foreground',
              ].map(s => (
                <button key={s} className="suggestion-chip" onClick={() => setPrompt(s)}>{s}</button>
              ))}
            </div>

            <div className="panel-actions">
              <button className="btn-secondary" onClick={() => setStep(0)}>← Back</button>
              <button
                className="btn-primary"
                onClick={() => { if (prompt.trim()) setStep(2); else toast('Enter a prompt first.', 'error') }}
              >
                Review & Generate →
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Confirm & Generate ─── */}
        {step === 2 && (
          <div className="studio__panel glass-card anim-fade-up">
            <div className="panel-header">
              <div className="panel-num gradient-text">03</div>
              <div>
                <h2 className="panel-title">Review & Generate</h2>
                <p className="panel-desc">Everything looks good? Hit Generate to fire up the AI.</p>
              </div>
            </div>

            <div className="review-grid">
              <div className="review-item glass-card">
                <div className="review-item__label">🖼️ Logo</div>
                <img src={logoPreview} alt="logo" className="review-logo" />
                <p className="review-item__val">{logoFile?.name}</p>
              </div>
              <div className="review-item glass-card">
                <div className="review-item__label">✏️ Prompt</div>
                <p className="review-item__val review-item__val--prompt">{prompt}</p>
              </div>
            </div>

            <div className="generate-area">
              <div className="generate-info glass-card">
                <span>🤖</span>
                <p>AI will enhance your prompt → generate SDXL image → compose logo → write captions & hashtags</p>
              </div>
              <div className="panel-actions">
                <button className="btn-secondary" onClick={() => setStep(1)}>← Edit Prompt</button>
                <button className="btn-primary generate-btn" onClick={generate}>
                  ✦ Generate Ad
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 3: Results ─── */}
        {step === 3 && result && (
          <div className="studio__panel anim-fade-up">
            <div className="results-header">
              <div className="badge">✦ Ad Generated Successfully</div>
              <h2 className="results-title">Your <span className="gradient-text">AI-Generated Ad</span></h2>
            </div>

            <div className="results-grid">
              {/* Image */}
              <div className="result-image-wrap glass-card">
                <div className="result-image-label">Generated Image</div>
                <img src={result.image} alt="Generated ad" className="result-image" />
                <a href={result.image} download className="btn-primary" style={{ marginTop: 16, justifyContent: 'center' }}>
                  ⬇ Download Image
                </a>
              </div>

              {/* Captions & Hashtags */}
              <div className="result-text-col">
                <div className="result-section glass-card">
                  <div className="result-section__header">
                    <div className="result-section__title">📝 Caption</div>
                    <button className="btn-icon" onClick={() => copyText(result.caption)} title="Copy">📋</button>
                  </div>
                  <p className="result-caption">{result.caption}</p>
                </div>

                <div className="result-section glass-card">
                  <div className="result-section__header">
                    <div className="result-section__title">🏷️ Hashtags</div>
                    <button className="btn-icon" onClick={() => copyText(result.hastag?.join(' '))} title="Copy all">📋</button>
                  </div>
                  <div className="hashtags-wrap">
                    {result.hastag?.map(h => (
                      <button
                        key={h}
                        className="hashtag-pill hashtag-pill--click"
                        onClick={() => copyText(h)}
                      >#{h.replace(/^#/, '')}</button>
                    ))}
                  </div>
                </div>

                {/* Save section */}
                <div className="result-section glass-card">
                  <div className="result-section__title" style={{ marginBottom: 12 }}>💾 Save Campaign</div>
                  <input
                    className="input-field"
                    placeholder="Campaign name (optional)"
                    value={campaignName}
                    onChange={e => setCampaignName(e.target.value)}
                    style={{ marginBottom: 14 }}
                  />
                  <button
                    className={`btn-primary ${saved ? 'btn-saved' : ''}`}
                    onClick={saveAd}
                    disabled={saved}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {saved ? '✓ Saved to Library' : '💾 Save Campaign'}
                  </button>
                </div>
              </div>
            </div>

            <div className="results-actions">
              <button className="btn-secondary" onClick={() => { setResult(null); setPrompt(''); setStep(1) }}>
                ← Create Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
