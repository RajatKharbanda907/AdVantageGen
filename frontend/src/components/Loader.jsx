import './Loader.css'

export default function Loader({ text = 'Generating your ad...' }) {
  return (
    <div className="loader-overlay">
      <div className="loader-box glass-card">
        <div className="loader-ring-wrap">
          <svg className="loader-ring" width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="5"/>
            <circle
              cx="40" cy="40" r="34"
              fill="none"
              stroke="url(#lgrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="213"
              strokeDashoffset="160"
              className="loader-arc"
            />
            <defs>
              <linearGradient id="lgrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED"/>
                <stop offset="100%" stopColor="#06B6D4"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="loader-dot"></div>
        </div>
        <p className="loader-text">{text}</p>
        <p className="loader-sub">AI is crafting something amazing ✦</p>
      </div>
    </div>
  )
}
