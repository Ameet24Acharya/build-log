'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function submitBuildLog(formData: FormData) {
  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim()
  const project_link = (formData.get('project_link') as string)?.trim() || null

  if (!name || !description) {
    return { error: 'Name and description are required.' }
  }

  const supabase = getSupabase()
  const { error } = await supabase
    .from('build_logs')
    .insert({ name, description, project_link })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  return { success: true }
}
