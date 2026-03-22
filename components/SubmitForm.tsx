'use client'

import { useState, useRef } from 'react'
import { submitBuildLog } from '@/app/actions'

export default function SubmitForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await submitBuildLog(formData)

    if (result?.error) {
      setError(result.error)
      setStatus('error')
    } else {
      formRef.current?.reset()
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div style={{
      background: '#161616',
      border: '1px solid #2a2a2a',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '32px',
    }}>
      <h2 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 600, color: '#e8e8e8' }}>
        What did you ship today?
      </h2>

      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>
            Your name
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="e.g. Alex Chen"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>
            What you shipped
          </label>
          <textarea
            name="description"
            required
            placeholder="Launched dark mode for my SaaS, fixed a gnarly auth bug, shipped v2 of my CLI tool..."
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '88px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '6px' }}>
            Project link <span style={{ color: '#555' }}>(optional)</span>
          </label>
          <input
            name="project_link"
            type="url"
            placeholder="https://..."
            style={inputStyle}
          />
        </div>

        {error && (
          <p style={{ margin: 0, color: '#f87171', fontSize: '13px' }}>{error}</p>
        )}
        {status === 'success' && (
          <p style={{ margin: 0, color: '#4ade80', fontSize: '13px' }}>Shipped! Your build is posted.</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          style={{
            padding: '10px 20px',
            background: status === 'loading' || status === 'success' ? '#4a3a9a' : '#7c5cfc',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
            alignSelf: 'flex-start',
            transition: 'background 0.15s',
          }}
        >
          {status === 'loading' ? 'Posting...' : status === 'success' ? 'Posted!' : 'Post it'}
        </button>
      </form>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0d0d0d',
  border: '1px solid #2a2a2a',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#e8e8e8',
  fontSize: '14px',
  outline: 'none',
}
