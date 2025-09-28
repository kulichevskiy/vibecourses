import { SubscriptionForm } from "@/components/subscription-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background via-secondary to-background px-6 py-16">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm font-medium uppercase tracking-wide text-primary">
          Announcement
        </span>
        <div className="space-y-4">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            VibeCourses is coming soon
          </h1>
          <p className="text-balance text-base text-muted-foreground sm:text-lg">
            We&apos;re curating immersive, community-led courses to help you level up your creative practice. Be the first to know when we open the doors.
          </p>
        </div>
        <SubscriptionForm />
      </section>
    </main>
  )
}
