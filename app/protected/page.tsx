import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-4 text-center">
      <p className="text-lg font-medium">
        Привет, <span className="font-semibold">{data.claims.email}</span>!
      </p>
      <p className="text-muted-foreground">
        Это закрытый раздел Вайбкурсов. Здесь появляются материалы только для участников.
      </p>
      <LogoutButton />
    </div>
  )
}
