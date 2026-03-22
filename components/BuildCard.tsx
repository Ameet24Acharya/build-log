'use client'

import { BuildLog } from '@/lib/supabase'

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = Math.floor((now - then) / 1000)

  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function avatarInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

const AVATAR_COLORS = [
  '#7c5cfc', '#f59e0b', '#10b981', '#3b82f6',
  '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6',
]

function avatarColor(name: string): string {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % AVATAR_COLORS.length
  return AVATAR_COLORS[hash]
}

export default function BuildCard({ log }: { log: BuildLog }) {
  const initials = avatarInitials(log.name)
  const color = avatarColor(log.name)

  return (
    <div style={{
      background: '#161616',
      border: '1px solid #2a2a2a',
      borderRadius: '12px',
      padding: '18px 20px',
      display: 'flex',
      gap: '14px',
      transition: 'border-color 0.15s',
    }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3a3a3a')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
    >
      {/* Avatar */}
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
        letterSpacing: '0.5px',
      }}>
        {initials}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#e8e8e8' }}>
            {log.name}
          </span>
          <span style={{ color: '#555', fontSize: '13px' }}>·</span>
          <span style={{ color: '#555', fontSize: '12px' }}>
            {timeAgo(log.created_at)}
          </span>
        </div>

        <p style={{
          margin: '0 0 10px',
          fontSize: '14px',
          color: '#ccc',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {log.description}
        </p>

        {log.project_link && (
          <a
            href={log.project_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              color: '#7c5cfc',
              textDecoration: 'none',
              background: 'rgba(124,92,252,0.1)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(124,92,252,0.2)',
              fontWeight: 500,
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(124,92,252,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(124,92,252,0.1)')}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Project
          </a>
        )}
      </div>
    </div>
  )
}
