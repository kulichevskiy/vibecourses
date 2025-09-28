import { CheckCircle2 } from "lucide-react"

import { SubscriptionForm } from "@/components/subscription-form"
import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  {
    title: "Обратная связь от кураторов",
    description:
      "Получайте рекомендации в закрытом чате и на созвонах, чтобы быстрее расти в выбранной практике.",
  },
  {
    title: "Практика без стресса",
    description:
      "Развивайте навыки в тёплой атмосфере: мы разбиваем обучение на понятные шаги и даём время на внедрение.",
  },
  {
    title: "Комьюнити на одной волне",
    description:
      "Общайтесь с единомышленниками, делитесь результатами и вдохновляйтесь примерами других участников.",
  },
  {
    title: "Постоянный доступ к материалам",
    description:
      "Возвращайтесь к урокам, рабочим тетрадям и дополнительным ресурсам в удобном ритме.",
  },
]

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-1/3 h-72 w-72 rounded-full bg-secondary/80 blur-[120px]" />
        <div className="absolute bottom-[-10rem] left-[-6rem] h-64 w-64 rounded-full bg-primary/5 blur-[110px]" />
        <div className="absolute inset-y-0 right-1/2 hidden w-px bg-gradient-to-b from-transparent via-border/60 to-transparent lg:block" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16 sm:py-24 lg:px-12 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
          <section className="mx-auto w-full max-w-2xl space-y-10 lg:mx-0">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
                Анонс
              </span>
              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Вайбкурсы скоро запускаются
                </h1>
                <p className="text-balance text-base text-muted-foreground sm:text-lg">
                  Мы собираем атмосферные курсы с живой поддержкой и сообществом, чтобы вы уверенно развивали творчество и создавали проекты мечты.
                </p>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight.title}
                  className="flex items-start gap-3 rounded-xl border border-primary/10 bg-secondary/60 p-4 text-left shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary">
                    <CheckCircle2 aria-hidden className="h-5 w-5" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold sm:text-base">{highlight.title}</p>
                    <p className="text-xs text-muted-foreground sm:text-sm">{highlight.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mx-auto w-full max-w-xl lg:mx-0">
            <Card className="border border-border/70 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-border/40 dark:bg-foreground/10">
              <CardContent className="space-y-6 p-6 sm:p-10">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Присоединяйтесь к листу ожидания
                  </h2>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    Оставьте почту — и мы первыми пришлём расписание, программы и бонусы для ранних участников.
                  </p>
                </div>
                <SubscriptionForm />
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  )
}
