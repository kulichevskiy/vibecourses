"use client"

import { useActionState, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { subscribe, type SubscriptionFormState } from "@/app/actions/subscribe"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const initialState: SubscriptionFormState = {
  status: "idle",
  message: "",
}

export function SubscriptionForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, pending] = useActionState(subscribe, initialState)
  const [toastState, setToastState] = useState<SubscriptionFormState | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (state.status === "idle") {
      return
    }

    if (state.status === "success") {
      formRef.current?.reset()
    }

    setToastState(state)

    const timeout = setTimeout(() => {
      setToastState(null)
    }, 4000)

    return () => clearTimeout(timeout)
  }, [state])

  const toastTitle = useMemo(() => {
    if (!toastState) return ""
    return toastState.status === "success"
      ? "Подписка подтверждена"
      : "Попробуем ещё раз"
  }, [toastState])

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        className="flex w-full flex-col gap-4 sm:flex-row"
      >
        <div className="w-full sm:max-w-xs">
          <Label htmlFor="email">Электронная почта</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="ivan@example.com"
            autoComplete="email"
            required
            aria-invalid={state.status === "error"}
            aria-describedby="email-help"
            disabled={pending}
          />
        </div>
        <Button type="submit" disabled={pending} className="sm:self-end">
          {pending ? "Отправляем..." : "Сообщите мне"}
        </Button>
      </form>
      <p id="email-help" className="text-sm text-muted-foreground">
        Запишитесь в лист ожидания и узнайте первыми о запуске курсов.
      </p>
      {isMounted && toastState
        ? createPortal(
            <div className="pointer-events-none fixed inset-x-4 top-4 z-[100] flex justify-center sm:inset-x-auto sm:right-4 sm:justify-end">
              <Card
                className={cn(
                  "pointer-events-auto border shadow-lg",
                  toastState.status === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                    : "border-destructive/40 bg-destructive/10 text-destructive"
                )}
              >
                <CardContent className="space-y-1.5 py-4">
                  <p className="text-sm font-semibold">{toastTitle}</p>
                  <p
                    className={cn(
                      "text-sm",
                      toastState.status === "success"
                        ? "text-emerald-900/90 dark:text-emerald-100"
                        : "text-destructive/80"
                    )}
                  >
                    {toastState.message}
                  </p>
                </CardContent>
              </Card>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
