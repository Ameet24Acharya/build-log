import { createClient } from '@supabase/supabase-js'
import SubmitForm from '@/components/SubmitForm'
import BuildCard from '@/components/BuildCard'
import { BuildLog } from '@/lib/supabase'

async function getLogs(): Promise<BuildLog[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data, error } = await supabase
    .from('build_logs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch build logs:', error.message)
    return []
  }
  return data ?? []
}

export default async function Home() {
  const logs = await getLogs()

  return (
    <main style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '24px' }}>🚢</span>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#e8e8e8', letterSpacing: '-0.5px' }}>
            Build Log
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          A public wall for what people are shipping. No auth. Just builds.
        </p>
      </div>

      {/* Submit form */}
      <SubmitForm />

      {/* Feed */}
      {logs.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#555',
          fontSize: '14px',
          border: '1px dashed #2a2a2a',
          borderRadius: '12px',
        }}>
          No ships yet. Be the first to post.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {logs.map((log) => (
            <BuildCard key={log.id} log={log} />
          ))}
        </div>
      )}
    </main>
  )
}
